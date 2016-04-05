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
    var QuizAdditionalSettingsComponent;
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
            QuizAdditionalSettingsComponent = (function () {
                function QuizAdditionalSettingsComponent(_quizSettingsService) {
                    this._quizSettingsService = _quizSettingsService;
                    this.title = 'Birdid Quiz media additional settings!';
                    this.mediaDiff = ['Lvl1', 'Lvl2', 'Lvl3'];
                    this.quizMediaSettingsEvent = new core_1.EventEmitter();
                }
                QuizAdditionalSettingsComponent.prototype.selectMediaDiff = function (mediaDifficulity) {
                    if (!this._quizSettingsService.setMediaDiff(mediaDifficulity)) {
                        console.log("Nope", mediaDifficulity);
                    }
                    else {
                        console.log("scuccess");
                        //Const for value?
                        this.quizMediaSettingsEvent.emit("MediaAditionalSettingsDone");
                    }
                };
                QuizAdditionalSettingsComponent = __decorate([
                    core_1.Component({
                        selector: 'birdid-quiz-addditional-settings',
                        templateUrl: 'app/media-additional-settings/quiz-additional-settings.component.html',
                        directives: [],
                        providers: [
                            http_1.HTTP_PROVIDERS
                        ],
                        outputs: ['quizMediaSettingsEvent']
                    }), 
                    __metadata('design:paramtypes', [quiz_settings_service_1.QuizSettingsService])
                ], QuizAdditionalSettingsComponent);
                return QuizAdditionalSettingsComponent;
            }());
            exports_1("QuizAdditionalSettingsComponent", QuizAdditionalSettingsComponent);
        }
    }
});
//# sourceMappingURL=quiz-additional-settings.component.js.map