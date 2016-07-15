module.exports = function(){

  var express = require('express');
  var router = express.Router();

  var Sequelize = require('sequelize');
  var sequelize = (require('../persistence/db_connection')).sequelize;

  router.get(
    '/survey',
    function(req, res, next) {
      require('./restful_data_endpoints/public/get_survey')(Sequelize, sequelize, req.session)
        .then(function(results){
          res.json({success : true, data : results});
        })
        .catch(function(err){
          res.json({success : false, error : err.message});
        })
      ;
    }
  );

  router.put(
    '/answer/:survey_id/:answer_id',
    function (req, res, next) {
      require('./restful_data_endpoints/public/put_answer')(Sequelize, sequelize, req.params.survey_id, req.params.answer_id, req.session)
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
