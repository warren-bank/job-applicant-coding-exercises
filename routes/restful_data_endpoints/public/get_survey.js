module.exports = function(Sequelize, sequelize, session){

  var Promise = require("bluebird");

  var promise = new Promise(function(resolve, reject){

    var id_blacklist = undefined;
    if (
         (typeof session === 'object')
      && (typeof session.surveys_answered === 'object')
    ){
      id_blacklist = Object.keys( session.surveys_answered );
    }

    var Survey = require('../../../models/Survey')(Sequelize, sequelize);
    var Answer = require('../../../models/Answer')(Sequelize, sequelize);

    Survey.hasMany(Answer);

    Survey
    .findOne({
      attributes: ['id', 'title', 'question'],
      where: {id: {
        not : id_blacklist
      }},
      order: [
        Sequelize.fn( 'RAND' )
      ],
      raw: true
    })
    .then(function(survey){
        if (! survey){
          return reject(new Error('No more surveys are available.'));
        }

        return Answer
        .findAll({
          attributes: ['answer_id', 'answer'],
          where: { survey_id: survey.id },
          order: [
            ['answer_id', 'ASC']
          ],
          raw: true
        })
        .then(function(answers){
          survey.answers = answers;

          // console.log(JSON.stringify(survey));
          return resolve(survey);
        })
       .catch(function(err){
         return reject(err);
       });
    })
    .catch(function(err){
      return reject(err);
    });

  });

  return promise;
};
