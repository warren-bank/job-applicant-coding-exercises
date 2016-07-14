module.exports = function(Sequelize, sequelize){
  var Answer = sequelize.define('answer',
    {
      survey_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        unique: 'compositePrimaryKey',
        autoIncrement: false,
        allowNull: false,
        references: {
            model: 'surveys',
            key: 'id'
        }
      },
      answer_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        unique: 'compositePrimaryKey',
        primaryKey: true,
//      autoIncrement: true,
        allowNull: false
      },
      answer: {
        type: Sequelize.STRING,
        allowNull: false
      },
      count: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      tableName: 'answers',
      freezeTableName: true,
      timestamps: false,
      underscored: true
    }
  );

  // Answer.sync();

  return Answer;
};
