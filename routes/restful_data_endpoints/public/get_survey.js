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

    Survey.findOne({
      attributes: ['id', 'title', 'question'],
      include: [{
        model: Answer,
        attributes: ['answer_id', 'answer'],
        where: { survey_id: Sequelize.col('survey.id') }
      }],
      where: {id: {
        not : id_blacklist
      }},
      order: [
        Sequelize.fn( 'RAND' )
      ]
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
