module.exports = function(Sequelize, sequelize, survey_id){

  var Promise = require("bluebird");

  var promise = new Promise(function(resolve, reject){

    var Survey = require('../../../models/Survey')(Sequelize, sequelize);
    var Answer = require('../../../models/Answer')(Sequelize, sequelize);

    Survey.hasMany(Answer);

    Survey.findOne({
      attributes: ['id', 'title', 'question'],
      include: [{
        model: Answer,
        attributes: ['answer_id', 'answer', 'count'],
        where: { survey_id: Sequelize.col('survey.id') }
      }],
      where: {id: survey_id},
      order: [
        [Answer, 'answer_id', 'ASC']
      ],
      raw: true
    })
    .then(function(results){
      // console.log(JSON.stringify(results));
      return resolve(results);
    })
    .catch(function(err){
      return reject(err);
    });

  });

  return promise;
};
