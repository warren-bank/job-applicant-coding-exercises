module.exports = function(app){

  var express = require('express');
  var router = express.Router();

  var session = require('express-session');

  var Sequelize = require('sequelize')
  var SequelizeStore = require('connect-session-sequelize')(session.Store);
  var sequelize = new Sequelize('mysql://warren_bank:SumoMe_hire@localhost:3306/job_applicant_coding_exercise__warren_bank');
  var sequelizeStore = new SequelizeStore({ db: sequelize });

  sequelize
    .authenticate()
    .then(function(err) {
      console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
      console.log('Unable to connect to the database:', err);
    });

  // sequelizeStore.sync();

  app.use(session({
    name: 'admin-session-id',
    secret: 'sumome-hiring-exercise',
    store: sequelizeStore,
    proxy: false,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      path: '/admin',
      httpOnly: true,
      secure: false,
      maxAge: 600000
    }
  }));

  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;
  var User = require('../models/User')(Sequelize, sequelize);

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
      console.log(id)
      User
        .findById(id)
        .then(function(user){
          done(null, user);
      })
      .catch(function(err){
          done(err, null);
      });
  });

  passport.use(new LocalStrategy(
      function(username, password, done) {
          User
          .findOne({
              where: {
                  username: username
              }
          })
          .then(function(user) {
              if (!user) {
                  return done(null, false, {
                      message: 'Incorrect username.'
                  });
              }
              if (user.password !== password) {
                  return done(null, false, {
                      message: 'Incorrect password.'
                  });
              }
              return done(null, user);
          })
          .catch(function(err){
              done(err, null);
          });
      }
  ));

  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/admin/login');
  });

  router.get(
    '/login',
    function(req, res, next) {
      if (req.user){
        return res.redirect('/admin');
      }
      res.render('admin/login', { title: 'Admin Login' });
    }
  );

  router.post(
    '/login',
    passport.authenticate('local', {
      successRedirect: '/admin',
      failureRedirect: '/admin/login'
    })
  );

  router.use(function(req, res, next) {
    if (! req.user){
      return res.redirect('/admin/login');
    }
    next();
  });

  // all subsequent routes require an active login session to access

  router.get(
    '/?',
    function(req, res, next) {
      res.render('admin/index', { title: 'Admin Dashboard' });
    }
  );

  return router;

};
