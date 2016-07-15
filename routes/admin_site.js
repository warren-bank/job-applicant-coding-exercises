module.exports = function(){

  var express   = require('express');
  var router    = express.Router();
  var passport  = require('passport');

  router.get(
    '/logout',
    function(req, res){
      req.logout();
      res.redirect('/admin/login');
    }
  );

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

  router.get(
    '/new_survey',
    function(req, res, next) {
      res.render('admin/new_survey', { title: 'New Survey' });
    }
  );

  router.get(
    '/survey_results',
    function(req, res, next) {
      res.render('admin/survey_results', { title: 'Survey Results' });
    }
  );

  return router;
}();
