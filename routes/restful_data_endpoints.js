module.exports = function(){

  var express = require('express');
  var router = express.Router();

  var Sequelize = require('sequelize');
  var sequelize = (require('../persistence/db_connection')).sequelize;

  router.get(
    '/results',
    function(req, res, next) {
      require('./restful_data_endpoints/admin/get_results')(Sequelize, sequelize)
        .then(function(results){
          res.json({success : true, data : results});
        })
        .catch(function(err){
          res.json({success : false, error : err.message});
        })
      ;
    }
  );

  router.get(
    '/result/:survey_id',
    function (req, res, next) {
      require('./restful_data_endpoints/admin/get_result')(Sequelize, sequelize, req.params.survey_id)
        .then(function(results){
          res.json({success : true, data : results});
        })
        .catch(function(err){
          res.json({success : false, error : err.message});
        })
      ;
    }
  );

  router.post(
    '/surveys',
    function(req, res, next) {
      require('./restful_data_endpoints/admin/post_surveys')(Sequelize, sequelize, req.body)
        .then(function(results){
          res.json({success : true, data : results});
        })
        .catch(function(err){
          res.json({success : false, error : err.message});
        })
      ;
    }
  );

  return router;
}();
