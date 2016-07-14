module.exports = function(Sequelize, sequelize){

  var Promise = require("bluebird");

  var promise = new Promise(function(resolve, reject){

    var Survey = require('../../../models/Survey')(Sequelize, sequelize);
    var Answer = require('../../../models/Answer')(Sequelize, sequelize);

    Survey.hasMany(Answer);

    Survey.findAll({
      attributes: ['id', 'title'],
      include: [{
        model: Answer,
        attributes: ['answer_id', 'count'],
        where: { survey_id: Sequelize.col('survey.id') }
      }],
      order: [
        ['id', 'ASC'],
        [Answer, 'answer_id', 'ASC']
      ]
    })
    .then(function(results){
      // console.log(JSON.stringify(results));
      resolve(results);
    })
    .catch(function(err){
        reject(err);
    });

  });

  return promise;
};
