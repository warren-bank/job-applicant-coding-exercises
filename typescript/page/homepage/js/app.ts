/// <reference path="../../../node_modules/typescript/lib/lib.es6.d.ts" />

import { bootstrap }                          from 'angular2/platform/browser';
import { Component, Inject, enableProdMode }  from 'angular2/core';
import { NgFor }                              from 'angular2/common';
import { HTTP_PROVIDERS, Http }               from 'angular2/http';

import 'rxjs/add/operator/map';

import { IAnswer, Answer }                    from '../../../site/classes/Answer';
import { ISurvey, Survey }                    from '../../../site/classes/Survey';
import { Helper }                             from '../../../site/classes/Helper';

enableProdMode();

// ------------------------------------------------------------------

@Component({
  selector: 'home-page',
  template: `
<div *ngIf="! survey">
  <div class="text-center loading">
    <h2>{{ loading_message }}</h2>
    <span class="spinning glyphicon glyphicon-refresh"></span>
  </div>
</div>
<div *ngIf="survey">
  <h2>Please complete the following survey:</h2>

  <h3>{{ survey.title }}</h3>

  <div class="panel-group">
    <div class="panel panel-default">
      <div class="panel-heading">Question:</div>
      <div class="panel-body">{{ survey.question }}</div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">Choices:</div>
      <div class="panel-body">
        <form role="form">
          <div class="form-group">
            <div class="radio" *ngFor="#answer of survey.answers">
              <label><input type="radio" name="options" (click)="chosen_answer = answer.answer_id" [checked]="answer.answer_id === chosen_answer">{{ answer.answer }}</label>
            </div>
          </div>
          <button type="submit" class="btn btn-default" (click)="save_answer()">Save Answer</button>
        </form>
      </div>
    </div>
  </div>
</div>
  `
})
class Homepage_App {
  http            : Http;
  survey          : Survey;
  chosen_answer   : number;
  loading_message : string;

  static loading_messages : Array<string> = [
    'A survey is being retrieved from the server. Please stand by..',
    'Wonderful! Your answer has been received. Another survey is being retrieved now..'
  ];

  constructor(@Inject(Http) http:Http) {
    this.http            = http;
    this.loading_message = Homepage_App.loading_messages[0];

    this.reset_and_begin();
  }

  reset_and_begin(): void {
    this.survey        = undefined;
    this.chosen_answer = -1;

    this.load_survey();
  }

  load_survey(): void {
    this.http
      .get('/data/survey')
      .map(response => response.json())
      .subscribe(
        (response) => this.process_survey_result(response),
        (err)      => this.process_http_error(err)
      )
    ;
  }

  process_http_error(err): void {
    this.survey = undefined;

    alert( 'communication with data service failed: ' + err.toString() );
  }

  process_data_error(message: string): void {
    this.survey = undefined;

    alert( 'data service response indicates a problem: ' + message );
  }

  process_survey_result(data): void {
    if (! data.success){
      return this.process_data_error( data.error );
    }

    data        = data.data;
    this.survey = Survey.construct_existing(data.id, data.title, data.answers, data.question);
  }

  save_answer(): void {
    if (
         (this.survey === undefined)
      || (this.chosen_answer < 0)
    ) {return;}

    let survey_id: string = (<Survey>this.survey).id.toString();
    let answer_id: string = (<number>this.chosen_answer).toString();

    this.http
      .put(
        `/data/answer/${ survey_id }/${ answer_id }`,
        ''
      )
      .map(response => response.json())
      .subscribe(
        (response) => this.process_save_survey_answer_submission_results(response),
        (err)      => this.process_http_error(err)
      )
    ;

  }

  process_save_survey_answer_submission_results(data: any): void {
    if (! data.success){
      return this.process_data_error( data.error );
    }

    // show a brief acknowledgement to the user
    this.loading_message = Homepage_App.loading_messages[1];

    // reset state and load another survey
    this.reset_and_begin();
  }

  convert_index_to_letter(index: number): string {
    return Helper.convert_index_to_letter(index);
  }

}

// ------------------------------------------------------------------

bootstrap(Homepage_App, [HTTP_PROVIDERS]);
