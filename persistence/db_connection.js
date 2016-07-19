module.exports = function(){

  var Sequelize = require('sequelize');

  var db_configs = {
    "basic": {
      "database": (process.env['OPENSHIFT_APP_NAME']          || 'job_applicant_coding_exercise__warren_bank'),
      "username": (process.env['OPENSHIFT_MYSQL_DB_USERNAME'] || 'warren_bank'),
      "password": (process.env['OPENSHIFT_MYSQL_DB_PASSWORD'] || 'SumoMe_hire')
    },
    "advanced": {
      "dialect" : "mysql",
      "timezone": "America/Los_Angeles",
      "host"    : (process.env['OPENSHIFT_MYSQL_DB_HOST']     || 'localhost'),
      "port"    : (process.env['OPENSHIFT_MYSQL_DB_PORT']     || '3306')
    }
  };

  var sequelize = new Sequelize(
    db_configs.basic.database,
    db_configs.basic.username,
    db_configs.basic.password,
    db_configs.advanced
  );

  var exports = {
    "sequelize" : sequelize
  };

  return exports;
}();
