import { IAnswer, Answer } from './Answer';

export interface ISurvey {
  id       : number;
  title    : string;
  question : string;
  answers  : Array<Answer>;
}

export class Survey {
  id       : number;
  title    : string;
  question : string;
  answers  : Array<Answer>;

  constructor(data: ISurvey) {
    this.id       = data.id;
    this.title    = data.title;
    this.question = data.question;
    this.answers  = data.answers;
  }

  // create new survey that doesn't yet exist in the database
  static construct_new(title: string, question : string) : Survey {
    if (title    === ''){return;}
    if (question === ''){return;}

    let data: ISurvey = {
      id       : 0,
      title    : title,
      question : question,
      answers  : []
    };
    return new Survey(data);
  }

  // create a partial representation of an survey with incomplete data retrieved from the database 
  static construct_existing(id: number, title: string, answers: Array<IAnswer>, question?: string) : Survey {
    let data: ISurvey = {
      id       : id,
      title    : title,
      question : (question || ''),
      answers  : []
    };

    for (let answer of answers) {
      data.answers.push( Answer.construct_existing(id, answer.answer_id, (answer.count? answer.count : 0), (answer.answer? answer.answer : '')) );
    }

    return new Survey(data);
  }

  total_answer_count(): number {
    let count = 0;

    for (let answer of this.answers) {
      count += answer.count;
    }
    return count;
  }

}
