export interface IAnswer {
  survey_id : number;
  answer_id : number;
  answer    : string;
  count     : number;
}

export class Answer {
  survey_id : number;
  answer_id : number;
  answer    : string;
  count     : number;

  constructor(data: IAnswer) {
    this.survey_id = data.survey_id;
    this.answer_id = data.answer_id;
    this.answer    = data.answer;
    this.count     = data.count;
  }

  // create new answer that doesn't yet exist in the database
  static construct_new(answer: string, answer_id?: number) : Answer {
    if (answer === ''){return;}

    let data: IAnswer = {
      survey_id : 0,
      answer_id : (answer_id || 0),
      answer    : answer,
      count     : 0
    };
    return new Answer(data);
  }

  // create a partial representation of an answer with incomplete data retrieved from the database 
  static construct_existing(survey_id: number, answer_id: number, count?: number, answer?: string) : Answer {
    let data: IAnswer = {
      survey_id : survey_id,
      answer_id : answer_id,
      count     : (count  || 0),
      answer    : (answer || '')
    };
    return new Answer(data);
  }

}
