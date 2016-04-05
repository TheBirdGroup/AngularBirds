System.register(['angular2/core', 'angular2/http', './../shared/quiz-settings.service', './../shared/quiz-questions.service', './the-quiz-image.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, quiz_settings_service_1, quiz_questions_service_1, the_quiz_image_component_1;
    var TheQuizComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (quiz_settings_service_1_1) {
                quiz_settings_service_1 = quiz_settings_service_1_1;
            },
            function (quiz_questions_service_1_1) {
                quiz_questions_service_1 = quiz_questions_service_1_1;
            },
            function (the_quiz_image_component_1_1) {
                the_quiz_image_component_1 = the_quiz_image_component_1_1;
            }],
        execute: function() {
            TheQuizComponent = (function () {
                function TheQuizComponent(_quizSettingsService, _quizQuestionService) {
                    this._quizSettingsService = _quizSettingsService;
                    this._quizQuestionService = _quizQuestionService;
                    this.title = 'Birdid Quiz TheQuizComponent!';
                    this.mediaID = 0;
                    this.mediaTypeID = 0;
                    this.quizQuestions = [];
                    this.quizLoaded = false;
                    this.questionNumber = 0;
                    this.questionRightAnswer = "";
                    this.score = 0;
                }
                TheQuizComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._quizQuestionService.getQuizQuestions()
                        .subscribe(function (data) {
                        console.log(data);
                        _this.quizQuestions = data;
                        _this.startQuiz();
                    }, function (error) { return console.error("getQuizQuestions ERROR! ", error); });
                };
                TheQuizComponent.prototype.startQuiz = function () {
                    console.log("starting quiz!!!", this.quizQuestions['mediaArray'][0]['media_id']);
                    this.setupQuestion();
                    this.quizLoaded = true;
                };
                TheQuizComponent.prototype.nextQuestion = function () {
                    this.questionNumber++;
                    this.setupQuestion();
                };
                TheQuizComponent.prototype.setupQuestion = function () {
                    this.mediaID = this.quizQuestions['mediaArray'][this.questionNumber]['media_id'];
                    var alts = this.quizQuestions['mediaArray'][this.questionNumber]['mediaChoices'];
                    this.questionAlternatives = [];
                    this.questionAlternatives.push(alts['right_answer']['name']);
                    this.questionAlternatives.push(alts['choice_2']['name']);
                    this.questionAlternatives.push(alts['choice_3']['name']);
                    this.questionAlternatives.push(alts['choice_4']['name']);
                    this.questionAlternatives.push(alts['choice_5']['name']);
                    this.questionAlternatives = this.shuffle(this.questionAlternatives);
                    this.questionRightAnswer = alts['right_answer']['name'];
                };
                TheQuizComponent.prototype.checkIfAltCorrect = function (altID) {
                    if (this.questionAlternatives[altID] == this.questionRightAnswer) {
                        this.score++;
                        console.log("correct!");
                    }
                    else {
                        this.score--;
                        console.log("inncorrect!");
                    }
                };
                //http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
                TheQuizComponent.prototype.shuffle = function (array) {
                    var currentIndex = array.length, temporaryValue, randomIndex;
                    // While there remain elements to shuffle...
                    while (0 !== currentIndex) {
                        // Pick a remaining element...
                        randomIndex = Math.floor(Math.random() * currentIndex);
                        currentIndex -= 1;
                        // And swap it with the current element.
                        temporaryValue = array[currentIndex];
                        array[currentIndex] = array[randomIndex];
                        array[randomIndex] = temporaryValue;
                    }
                    return array;
                };
                TheQuizComponent = __decorate([
                    core_1.Component({
                        selector: 'birdid-the-quiz',
                        templateUrl: 'app/the-quiz/the-quiz.component.html',
                        directives: [
                            the_quiz_image_component_1.TheQuizImageComponent
                        ],
                        providers: [
                            http_1.HTTP_PROVIDERS
                        ]
                    }), 
                    __metadata('design:paramtypes', [quiz_settings_service_1.QuizSettingsService, quiz_questions_service_1.QuizQuestionsService])
                ], TheQuizComponent);
                return TheQuizComponent;
            }());
            exports_1("TheQuizComponent", TheQuizComponent);
        }
    }
});
//# sourceMappingURL=the-quiz.component.js.map