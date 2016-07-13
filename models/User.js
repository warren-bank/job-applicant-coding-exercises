// http://docs.sequelizejs.com/en/latest/api/sequelize/
// http://docs.sequelizejs.com/en/latest/api/sequelize/#definemodelname-attributes-options-model
// http://docs.sequelizejs.com/en/latest/docs/models-definition/#data-types

// http://docs.sequelizejs.com/en/latest/api/model/
// http://docs.sequelizejs.com/en/latest/api/model/#findoneoptions-promiseinstance

module.exports = function(Sequelize, sequelize){
  var User = sequelize.define('user',
    {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'admin_users',
      freezeTableName: true
    }
  );

  // User.sync();

  return User;
};
