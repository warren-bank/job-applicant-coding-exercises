var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
System.register("site/classes/Answer", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Answer;
    return {
        setters:[],
        execute: function() {
            Answer = (function () {
                function Answer(data) {
                    this.survey_id = data.survey_id;
                    this.answer_id = data.answer_id;
                    this.answer = data.answer;
                    this.count = data.count;
                }
                // create new answer that doesn't yet exist in the database
                Answer.construct_new = function (answer, answer_id) {
                    if (answer === '') {
                        return;
                    }
                    var data = {
                        survey_id: 0,
                        answer_id: (answer_id || 0),
                        answer: answer,
                        count: 0
                    };
                    return new Answer(data);
                };
                // create a partial representation of an answer with incomplete data retrieved from the database 
                Answer.construct_existing = function (survey_id, answer_id, count, answer) {
                    var data = {
                        survey_id: survey_id,
                        answer_id: answer_id,
                        count: (count || 0),
                        answer: (answer || '')
                    };
                    return new Answer(data);
                };
                return Answer;
            }());
            exports_1("Answer", Answer);
        }
    }
});
System.register("site/classes/Survey", ["site/classes/Answer"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Answer_1;
    var Survey;
    return {
        setters:[
            function (Answer_1_1) {
                Answer_1 = Answer_1_1;
            }],
        execute: function() {
            Survey = (function () {
                function Survey(data) {
                    this.id = data.id;
                    this.title = data.title;
                    this.question = data.question;
                    this.answers = data.answers;
                }
                // create new survey that doesn't yet exist in the database
                Survey.construct_new = function (title, question) {
                    if (title === '') {
                        return;
                    }
                    if (question === '') {
                        return;
                    }
                    var data = {
                        id: 0,
                        title: title,
                        question: question,
                        answers: []
                    };
                    return new Survey(data);
                };
                // create a partial representation of an survey with incomplete data retrieved from the database 
                Survey.construct_existing = function (id, title, answers, question) {
                    var data = {
                        id: id,
                        title: title,
                        question: (question || ''),
                        answers: []
                    };
                    for (var _i = 0, answers_1 = answers; _i < answers_1.length; _i++) {
                        var answer = answers_1[_i];
                        data.answers.push(Answer_1.Answer.construct_existing(id, answer.answer_id, (answer.count ? answer.count : 0), (answer.answer ? answer.answer : '')));
                    }
                    return new Survey(data);
                };
                Survey.prototype.total_answer_count = function () {
                    var count = 0;
                    for (var _i = 0, _a = this.answers; _i < _a.length; _i++) {
                        var answer = _a[_i];
                        count += answer.count;
                    }
                    return count;
                };
                return Survey;
            }());
            exports_2("Survey", Survey);
        }
    }
});
System.register("site/classes/Helper", [], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var Helper;
    return {
        setters:[],
        execute: function() {
            Helper = (function () {
                function Helper() {
                }
                Helper.convert_index_to_letter = function (index) {
                    if ((index < 0) || (index > Helper.letters.length)) {
                        return '';
                    }
                    return Helper.letters[index];
                };
                Helper.letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
                return Helper;
            }());
            exports_3("Helper", Helper);
        }
    }
});
/// <reference path="../../../node_modules/typescript/lib/lib.es6.d.ts" />
System.register("page/homepage/js/app", ['angular2/platform/browser', 'angular2/core', 'angular2/http', 'rxjs/add/operator/map', "site/classes/Survey", "site/classes/Helper"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var browser_1, core_1, http_1, Survey_1, Helper_1;
    var Homepage_App;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (Survey_1_1) {
                Survey_1 = Survey_1_1;
            },
            function (Helper_1_1) {
                Helper_1 = Helper_1_1;
            }],
        execute: function() {
            core_1.enableProdMode();
            // ------------------------------------------------------------------
            Homepage_App = (function () {
                function Homepage_App(http) {
                    this.http = http;
                    this.loading_message = Homepage_App.loading_messages[0];
                    this.reset_and_begin();
                }
                Homepage_App.prototype.reset_and_begin = function () {
                    this.survey = undefined;
                    this.chosen_answer = -1;
                    this.load_survey();
                };
                Homepage_App.prototype.load_survey = function () {
                    var _this = this;
                    this.http
                        .get('/data/survey')
                        .map(function (response) { return response.json(); })
                        .subscribe(function (response) { return _this.process_survey_result(response); }, function (err) { return _this.process_http_error(err); });
                };
                Homepage_App.prototype.process_http_error = function (err) {
                    this.survey = undefined;
                    alert('communication with data service failed: ' + err.toString());
                };
                Homepage_App.prototype.process_data_error = function (message) {
                    this.survey = undefined;
                    alert('data service response indicates a problem: ' + message);
                };
                Homepage_App.prototype.process_survey_result = function (data) {
                    if (!data.success) {
                        return this.process_data_error(data.error);
                    }
                    data = data.data;
                    this.survey = Survey_1.Survey.construct_existing(data.id, data.title, data.answers, data.question);
                };
                Homepage_App.prototype.save_answer = function () {
                    var _this = this;
                    if ((this.survey === undefined)
                        || (this.chosen_answer < 0)) {
                        return;
                    }
                    var survey_id = this.survey.id.toString();
                    var answer_id = this.chosen_answer.toString();
                    this.http
                        .put("/data/answer/" + survey_id + "/" + answer_id, '')
                        .map(function (response) { return response.json(); })
                        .subscribe(function (response) { return _this.process_save_survey_answer_submission_results(response); }, function (err) { return _this.process_http_error(err); });
                };
                Homepage_App.prototype.process_save_survey_answer_submission_results = function (data) {
                    if (!data.success) {
                        return this.process_data_error(data.error);
                    }
                    // show a brief acknowledgement to the user
                    this.loading_message = Homepage_App.loading_messages[1];
                    // reset state and load another survey
                    this.reset_and_begin();
                };
                Homepage_App.prototype.convert_index_to_letter = function (index) {
                    return Helper_1.Helper.convert_index_to_letter(index);
                };
                Homepage_App.loading_messages = [
                    'A survey is being retrieved from the server. Please stand by..',
                    'Wonderful! Your answer has been received. Another survey is being retrieved now..'
                ];
                Homepage_App = __decorate([
                    core_1.Component({
                        selector: 'home-page',
                        template: "\n<div *ngIf=\"! survey\">\n  <div class=\"text-center loading\">\n    <h2>{{ loading_message }}</h2>\n    <span class=\"spinning glyphicon glyphicon-refresh\"></span>\n  </div>\n</div>\n<div *ngIf=\"survey\">\n  <h2>Please complete the following survey:</h2>\n\n  <h3>{{ survey.title }}</h3>\n\n  <div class=\"panel-group\">\n    <div class=\"panel panel-default\">\n      <div class=\"panel-heading\">Question:</div>\n      <div class=\"panel-body\">{{ survey.question }}</div>\n    </div>\n    <div class=\"panel panel-default\">\n      <div class=\"panel-heading\">Choices:</div>\n      <div class=\"panel-body\">\n        <form role=\"form\">\n          <div class=\"form-group\">\n            <div class=\"radio\" *ngFor=\"#answer of survey.answers\">\n              <label><input type=\"radio\" name=\"options\" (click)=\"chosen_answer = answer.answer_id\" [checked]=\"answer.answer_id === chosen_answer\">{{ answer.answer }}</label>\n            </div>\n          </div>\n          <button type=\"submit\" class=\"btn btn-default\" (click)=\"save_answer()\">Save Answer</button>\n        </form>\n      </div>\n    </div>\n  </div>\n</div>\n  "
                    }),
                    __param(0, core_1.Inject(http_1.Http))
                ], Homepage_App);
                return Homepage_App;
            }());
            // ------------------------------------------------------------------
            browser_1.bootstrap(Homepage_App, [http_1.HTTP_PROVIDERS]);
        }
    }
});
