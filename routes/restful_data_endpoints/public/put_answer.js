module.exports = function(Sequelize, sequelize, survey_id, answer_id, session){

  var Promise = require("bluebird");

  var promise = new Promise(function(resolve, reject){

    // only allow one answer per visitor
    if (
         (typeof session === 'object')
      && (typeof session.surveys_answered === 'object')
      && (session.surveys_answered[survey_id])
    ){
      return reject(new Error('This Survey has already been answered. Please try another.'));
    }

    var Answer = require('../../../models/Answer')(Sequelize, sequelize);

    Answer
    .findOne(
      { where: {survey_id: survey_id, answer_id : answer_id} }
    )
    .then(function(answer){
      return answer.increment('count', {by: 1});
    })
    .then(function(answer){
      if (typeof session === 'object') {
        if (typeof session.surveys_answered !== 'object'){
          session.surveys_answered = {};
        }
        session.surveys_answered[survey_id] = true;
      }

      return resolve({survey_id : survey_id, answer_id : answer_id, count : answer.count});
    })
    .catch(function(err){
      return reject(err);
    });

  });

  return promise;
};
