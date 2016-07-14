module.exports = function(Sequelize, sequelize){
  var User = sequelize.define('user',
    {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
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
      freezeTableName: true,
      timestamps: false,
      underscored: true
    }
  );

  // User.sync();

  return User;
};
