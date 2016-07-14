module.exports = function(){

  var Sequelize = require('sequelize');
  var sequelize = new Sequelize('mysql://warren_bank:SumoMe_hire@localhost:3306/job_applicant_coding_exercise__warren_bank');

  var exports = {
    "sequelize" : sequelize
  };

  return exports;
}();
