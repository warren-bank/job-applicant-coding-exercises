module.exports = function(Sequelize, sequelize){
  var Survey = sequelize.define('survey',
    {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      question: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    },
    {
      tableName: 'surveys',
      freezeTableName: true,
      timestamps: false,
      underscored: true
    }
  );

  // Survey.sync();

  return Survey;
};
