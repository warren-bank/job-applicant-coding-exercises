module.exports = function(Sequelize, sequelize, data){

  var Promise = require("bluebird");

  var promise = new Promise(function(resolve, reject){

    // example of expected data format:
    // {title:"title!", question:"question?", answers:["yes", "no", "maybe"]}

    // test that the data structure is correct
    if (
         (typeof data !== 'object')
      || (data === null)
      || (typeof data.title    !== 'string')
      || (typeof data.question !== 'string')
      || (data.title    === '')
      || (data.question === '')
      || (typeof data.answers !== 'object')
      || (! Array.isArray(data.answers))
      || (data.answers.length === 0)
    ){
      return reject(new Error('data submission is incomplete'));
    }

    var answers = [];
    var i, answer;
    for (i=0; i<data.answers.length; i++){
      answer = data.answers[i];
      if (
              (typeof answer === 'string')
           && (answer !== '')
      ){
        answers.push({answer : answer});
      }
    }

    if (answers.length === 0){
      return reject(new Error('data submission is incomplete'));
    }

    var Survey = require('../../../models/Survey')(Sequelize, sequelize);
    var Answer = require('../../../models/Answer')(Sequelize, sequelize);

    Survey.hasMany(Answer);

    var survey = Survey.build({
      title    : data.title,
      question : data.question
    });

    survey
      .save()
      .then(function(){
        var survey_id = survey.id;

        for (i=0; i<answers.length; i++){
          answers.survey_id = survey_id;
        }

        Answer
          .bulkCreate(answers)
          .then(function(){
            return resolve({survey_id: survey_id, answers_count: answers.length});
          })
          .catch(function(err){
            survey.destroy();
            return reject(new Error('Failed to save answers. Removing survey question. Please try again later.'));
          })
        ;

      })
      .catch(function(err){
        return reject(err);
      })
    ;

  });

  return promise;
};
