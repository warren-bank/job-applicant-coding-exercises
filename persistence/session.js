module.exports = function(app){

  var session = require('express-session');

  var Sequelize = require('sequelize');
  var SequelizeStore = require('connect-session-sequelize')(session.Store);

  var sequelize = (require('./db_connection')).sequelize;
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
      path: '/',
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

  var exports = {
    "Sequelize"      : Sequelize,
    "SequelizeStore" : SequelizeStore,

    "session"        : session,
    "sequelize"      : sequelize,
    "sequelizeStore" : sequelizeStore,
    "passport"       : passport
  };

  return exports;
};
