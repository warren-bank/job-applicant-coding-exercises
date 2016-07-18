/// <reference path="../../../node_modules/typescript/lib/lib.es6.d.ts" />

import { bootstrap }                          from 'angular2/platform/browser';
import { Component, Inject, enableProdMode }  from 'angular2/core';
import { NgFor }                              from 'angular2/common';
import { HTTP_PROVIDERS, Http, Headers }      from 'angular2/http';

import 'rxjs/add/operator/map';

import { IAnswer, Answer }                    from '../../../site/classes/Answer';
import { ISurvey, Survey }                    from '../../../site/classes/Survey';
import { Helper }                             from '../../../site/classes/Helper';

enableProdMode();

// ------------------------------------------------------------------

@Component({
  selector: 'survey-summary',
  inputs: ['survey'],
  host: {
    class: 'panel'
  },
  template: `
    <div class="panel-body">
      <div class="col-md-1  col-sm-2 col-xs-4 text-center well well-sm">
        <h2>
          {{ survey.total_answer_count() }}
        </h2>
        <div>Results</div>
      </div>
      <div class="col-md-10 col-sm-9 col-xs-7">
        {{ survey.title }}
      </div>
    </div>
  `
})
class Survey_Summary_Component {
  survey: Survey;
}

// ------------------------------------------------------------------

@Component({
  selector: 'new-survey',
  directives: [Survey_Summary_Component],
  template: `
<h2>New Survey:</h2>

<form role="form">
  <div class="form-group">
    <label for="title">Title:</label>
    <input id="title" type="text" class="form-control" #new_title>
  </div>
  <div class="form-group">
    <label for="question">Question:</label>
    <textarea id="question" class="form-control" #new_question></textarea>
  </div>
  <div class="form-group">
    <label for="answer">Answer {{ convert_index_to_letter(new_survey_answers.length) }}:</label>
    <textarea id="answer" class="form-control" #new_answer></textarea>
  </div>
  <button type="submit" class="btn btn-default" (click)="add_answer(new_answer)">Add Answer to Survey</button>
  <div>
    <ul class="answers">
      <li *ngFor="#answer of new_survey_answers; #answer_index = index"><span class="glyphicon glyphicon-remove-circle" (click)="remove_answer(answer_index)"></span> <span class="answer_index btn-info">{{ convert_index_to_letter(answer_index) }}</span> {{ answer }}</li>
    </ul>
  </div>
  <button type="submit" class="btn btn-default" (click)="save_survey(new_title, new_question)">Save Survey</button>
</form>

<div class="panel-group">
  <survey-summary *ngFor="#survey of new_surveys" [survey]="survey" class="panel-success"></survey-summary>
  <survey-summary *ngFor="#survey of old_surveys" [survey]="survey" class="panel-default"></survey-summary>
</div>
  `
})
class New_Survey_App {
  http               : Http;
  old_surveys        : Survey[];
  new_surveys        : Survey[];
  new_survey_answers : Array<string>;
  new_survey_data    : any;

  constructor(@Inject(Http) http:Http) {
    this.http               = http;
    this.old_surveys        = [];
    this.new_surveys        = [];
    this.new_survey_answers = [];

    this.load_old_surveys();
  }

  load_old_surveys(): void {
    this.http
      .get('/admin/data/results')
      .map(response => response.json())
      .subscribe(
        (response) => this.process_old_survey_results(response),
        (err)      => this.process_http_error(err)
      )
    ;
  }

  process_http_error(err): void {
    this.new_survey_data = undefined;

    alert( 'communication with data service failed: ' + err.toString() );
  }

  process_data_error(message: string): void {
    this.new_survey_data = undefined;

    alert( 'data service response indicates a problem: ' + message );
  }

  sort_results_descending_by_total_answer_count(data) {
    return data.sort(function(a,b){
      let total_answer_count_a: number = 0;
      let total_answer_count_b: number = 0;

      for (let answer of a.answers){
        total_answer_count_a += answer.count;
      }

      for (let answer of b.answers){
        total_answer_count_b += answer.count;
      }

      return total_answer_count_b - total_answer_count_a;
    });
  }

  process_old_survey_results(data): void {
    if (! data.success){
      return this.process_data_error( data.error );
    }

    data = data.data;
    data = this.sort_results_descending_by_total_answer_count(data);

    for (let survey of data){
      this.old_surveys.push(
        Survey.construct_existing(survey.id, survey.title, survey.answers)
      );
    }
  }

  add_answer(new_answer_DOM: HTMLTextAreaElement): void {
    let new_answer: string = new_answer_DOM.value;

    // validate the value
    if (new_answer === ''){return;}

    // save the value
    this.new_survey_answers.push(new_answer);

    // clear the form field
    new_answer_DOM.value = '';
  }

  remove_answer(answer_index: number): void {
    this.new_survey_answers.splice(answer_index, 1);
  }

  save_survey(new_title_DOM: HTMLInputElement, new_question_DOM: HTMLTextAreaElement): void {
    let new_title    = new_title_DOM.value;
    let new_question = new_question_DOM.value;

    // validate the values
    if (
         (new_title    === '')
      || (new_question === '')
      || (this.new_survey_answers.length === 0)
    ) {return;}

    // build the data structure to POST
    let data = {
      title    : <string>new_title,
      question : <string>new_question,
      answers  : this.new_survey_answers
    };

    // temporarily store this data structure at the object scope,
    // so the "success" callback handler can access it
    this.new_survey_data = data;

    // pass this data to the server, via its RESTful API
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http
      .post(
        '/admin/data/surveys',
        JSON.stringify(data),
        {
          headers: headers
        }
      )
      .map(response => response.json())
      .subscribe(
        (response) => this.process_save_survey_submission_results(response, new_title_DOM, new_question_DOM),
        (err)      => this.process_http_error(err)
      )
    ;

  }

  process_save_survey_submission_results(data: any, new_title_DOM: HTMLInputElement, new_question_DOM: HTMLTextAreaElement): void {
    if (! data.success){
      return this.process_data_error( data.error );
    }

    data = data.data;

    // construct an object representation of the new Survey
    let answers: Array<IAnswer> = [];
    for (let i=0; i<this.new_survey_data.answers.length; i++){
      answers.push({
        survey_id : <number>data.survey_id,
        answer_id : i,
        answer    : <string>this.new_survey_data.answers[i],
        count     : 0
      });
    }

    this.new_surveys.unshift(
      Survey.construct_existing(<number>data.survey_id, this.new_survey_data.title, answers)
    );

    // clear the form fields and reset internal state
    new_title_DOM.value     = '';
    new_question_DOM.value  = '';
    this.new_survey_answers = [];
    this.new_survey_data    = undefined;

  }

  convert_index_to_letter(index: number): string {
    return Helper.convert_index_to_letter(index);
  }

}

// ------------------------------------------------------------------

bootstrap(New_Survey_App, [HTTP_PROVIDERS]);
