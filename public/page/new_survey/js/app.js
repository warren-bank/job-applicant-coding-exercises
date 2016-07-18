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
System.register("page/new_survey/js/app", ['angular2/platform/browser', 'angular2/core', 'angular2/http', 'rxjs/add/operator/map', "site/classes/Survey", "site/classes/Helper"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var browser_1, core_1, http_1, Survey_1, Helper_1;
    var Survey_Summary_Component, New_Survey_App;
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
            Survey_Summary_Component = (function () {
                function Survey_Summary_Component() {
                }
                Survey_Summary_Component = __decorate([
                    core_1.Component({
                        selector: 'survey-summary',
                        inputs: ['survey'],
                        host: {
                            class: 'panel'
                        },
                        template: "\n    <div class=\"panel-body\">\n      <div class=\"col-md-1  col-sm-2 col-xs-4 text-center well well-sm\">\n        <h2>\n          {{ survey.total_answer_count() }}\n        </h2>\n        <div>Results</div>\n      </div>\n      <div class=\"col-md-10 col-sm-9 col-xs-7\">\n        {{ survey.title }}\n      </div>\n    </div>\n  "
                    })
                ], Survey_Summary_Component);
                return Survey_Summary_Component;
            }());
            // ------------------------------------------------------------------
            New_Survey_App = (function () {
                function New_Survey_App(http) {
                    this.http = http;
                    this.old_surveys = [];
                    this.new_surveys = [];
                    this.new_survey_answers = [];
                    this.load_old_surveys();
                }
                New_Survey_App.prototype.load_old_surveys = function () {
                    var _this = this;
                    this.http
                        .get('/admin/data/results')
                        .map(function (response) { return response.json(); })
                        .subscribe(function (response) { return _this.process_old_survey_results(response); }, function (err) { return _this.process_http_error(err); });
                };
                New_Survey_App.prototype.process_http_error = function (err) {
                    this.new_survey_data = undefined;
                    alert('communication with data service failed: ' + err.toString());
                };
                New_Survey_App.prototype.process_data_error = function (message) {
                    this.new_survey_data = undefined;
                    alert('data service response indicates a problem: ' + message);
                };
                New_Survey_App.prototype.sort_results_descending_by_total_answer_count = function (data) {
                    return data.sort(function (a, b) {
                        var total_answer_count_a = 0;
                        var total_answer_count_b = 0;
                        for (var _i = 0, _a = a.answers; _i < _a.length; _i++) {
                            var answer = _a[_i];
                            total_answer_count_a += answer.count;
                        }
                        for (var _b = 0, _c = b.answers; _b < _c.length; _b++) {
                            var answer = _c[_b];
                            total_answer_count_b += answer.count;
                        }
                        return total_answer_count_b - total_answer_count_a;
                    });
                };
                New_Survey_App.prototype.process_old_survey_results = function (data) {
                    if (!data.success) {
                        return this.process_data_error(data.error);
                    }
                    data = data.data;
                    data = this.sort_results_descending_by_total_answer_count(data);
                    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                        var survey = data_1[_i];
                        this.old_surveys.push(Survey_1.Survey.construct_existing(survey.id, survey.title, survey.answers));
                    }
                };
                New_Survey_App.prototype.add_answer = function (new_answer_DOM) {
                    var new_answer = new_answer_DOM.value;
                    // validate the value
                    if (new_answer === '') {
                        return;
                    }
                    // save the value
                    this.new_survey_answers.push(new_answer);
                    // clear the form field
                    new_answer_DOM.value = '';
                };
                New_Survey_App.prototype.remove_answer = function (answer_index) {
                    this.new_survey_answers.splice(answer_index, 1);
                };
                New_Survey_App.prototype.save_survey = function (new_title_DOM, new_question_DOM) {
                    var _this = this;
                    var new_title = new_title_DOM.value;
                    var new_question = new_question_DOM.value;
                    // validate the values
                    if ((new_title === '')
                        || (new_question === '')
                        || (this.new_survey_answers.length === 0)) {
                        return;
                    }
                    // build the data structure to POST
                    var data = {
                        title: new_title,
                        question: new_question,
                        answers: this.new_survey_answers
                    };
                    // temporarily store this data structure at the object scope,
                    // so the "success" callback handler can access it
                    this.new_survey_data = data;
                    // pass this data to the server, via its RESTful API
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    this.http
                        .post('/admin/data/surveys', JSON.stringify(data), {
                        headers: headers
                    })
                        .map(function (response) { return response.json(); })
                        .subscribe(function (response) { return _this.process_save_survey_submission_results(response, new_title_DOM, new_question_DOM); }, function (err) { return _this.process_http_error(err); });
                };
                New_Survey_App.prototype.process_save_survey_submission_results = function (data, new_title_DOM, new_question_DOM) {
                    if (!data.success) {
                        return this.process_data_error(data.error);
                    }
                    data = data.data;
                    // construct an object representation of the new Survey
                    var answers = [];
                    for (var i = 0; i < this.new_survey_data.answers.length; i++) {
                        answers.push({
                            survey_id: data.survey_id,
                            answer_id: i,
                            answer: this.new_survey_data.answers[i],
                            count: 0
                        });
                    }
                    this.new_surveys.unshift(Survey_1.Survey.construct_existing(data.survey_id, this.new_survey_data.title, answers));
                    // clear the form fields and reset internal state
                    new_title_DOM.value = '';
                    new_question_DOM.value = '';
                    this.new_survey_answers = [];
                    this.new_survey_data = undefined;
                };
                New_Survey_App.prototype.convert_index_to_letter = function (index) {
                    return Helper_1.Helper.convert_index_to_letter(index);
                };
                New_Survey_App = __decorate([
                    core_1.Component({
                        selector: 'new-survey',
                        directives: [Survey_Summary_Component],
                        template: "\n<h2>New Survey:</h2>\n\n<form role=\"form\">\n  <div class=\"form-group\">\n    <label for=\"title\">Title:</label>\n    <input id=\"title\" type=\"text\" class=\"form-control\" #new_title>\n  </div>\n  <div class=\"form-group\">\n    <label for=\"question\">Question:</label>\n    <textarea id=\"question\" class=\"form-control\" #new_question></textarea>\n  </div>\n  <div class=\"form-group\">\n    <label for=\"answer\">Answer {{ convert_index_to_letter(new_survey_answers.length) }}:</label>\n    <textarea id=\"answer\" class=\"form-control\" #new_answer></textarea>\n  </div>\n  <button type=\"submit\" class=\"btn btn-default\" (click)=\"add_answer(new_answer)\">Add Answer to Survey</button>\n  <div>\n    <ul class=\"answers\">\n      <li *ngFor=\"#answer of new_survey_answers; #answer_index = index\"><span class=\"glyphicon glyphicon-remove-circle\" (click)=\"remove_answer(answer_index)\"></span> <span class=\"answer_index btn-info\">{{ convert_index_to_letter(answer_index) }}</span> {{ answer }}</li>\n    </ul>\n  </div>\n  <button type=\"submit\" class=\"btn btn-default\" (click)=\"save_survey(new_title, new_question)\">Save Survey</button>\n</form>\n\n<div class=\"panel-group\">\n  <survey-summary *ngFor=\"#survey of new_surveys\" [survey]=\"survey\" class=\"panel-success\"></survey-summary>\n  <survey-summary *ngFor=\"#survey of old_surveys\" [survey]=\"survey\" class=\"panel-default\"></survey-summary>\n</div>\n  "
                    }),
                    __param(0, core_1.Inject(http_1.Http))
                ], New_Survey_App);
                return New_Survey_App;
            }());
            // ------------------------------------------------------------------
            browser_1.bootstrap(New_Survey_App, [http_1.HTTP_PROVIDERS]);
        }
    }
});
