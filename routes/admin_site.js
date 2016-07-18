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
      res.render('admin/survey_results', { title: 'Survey Results' });
    }
  );

  router.get(
    '/new_survey',
    function(req, res, next) {
      res.render('admin/new_survey', { title: 'New Survey' });
    }
  );

  // the navmenu won't include this link, but I'll keep it active because my github commit comments made several references to it.
  // the page it loads is an alias to the admin "dashboard" link: /admin
  router.get(
    '/survey_results',
    function(req, res, next) {
      res.render('admin/survey_results', { title: 'Survey Results' });
    }
  );

  return router;
}();
