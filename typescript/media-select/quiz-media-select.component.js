System.register(['angular2/core', 'angular2/http', './../shared/quiz-settings.service'], function(exports_1, context_1) {
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
    var core_1, http_1, quiz_settings_service_1;
    var QuizMediaSelectComponent;
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
            }],
        execute: function() {
            QuizMediaSelectComponent = (function () {
                function QuizMediaSelectComponent(_quizSettingsService) {
                    this._quizSettingsService = _quizSettingsService;
                    this.mediaTypes = ['Image', 'Sound', 'Video'];
                    this.title = 'Birdid Quiz, select your media type:';
                    this.quizMediaSelectedEvent = new core_1.EventEmitter();
                }
                QuizMediaSelectComponent.prototype.selectMediaType = function (mediaType) {
                    if (!this._quizSettingsService.setMediaType(mediaType)) {
                        console.log("Nope", mediaType);
                    }
                    else {
                        console.log("cuccess");
                        //Const for value?
                        this.quizMediaSelectedEvent.emit("MediatypeSelected");
                    }
                };
                QuizMediaSelectComponent = __decorate([
                    core_1.Component({
                        selector: 'birdid-quiz-media-select',
                        templateUrl: 'app/media-select/quiz-media-select.component.html',
                        directives: [],
                        providers: [
                            http_1.HTTP_PROVIDERS
                        ],
                        outputs: ['quizMediaSelectedEvent']
                    }), 
                    __metadata('design:paramtypes', [quiz_settings_service_1.QuizSettingsService])
                ], QuizMediaSelectComponent);
                return QuizMediaSelectComponent;
            }());
            exports_1("QuizMediaSelectComponent", QuizMediaSelectComponent);
        }
    }
});
//# sourceMappingURL=quiz-media-select.component.js.map