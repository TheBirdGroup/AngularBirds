System.register(['angular2/core', 'angular2/http', 'rxjs/Rx'], function(exports_1, context_1) {
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
    var core_1, http_1;
    var QuizSettingsService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            // import { quizQuestions } from './mock-quizQuestion';
            // import { QuizQuestion } from './quizQuestion';
            QuizSettingsService = (function () {
                function QuizSettingsService(_http) {
                    this._http = _http;
                    this.mediaType = 0;
                    this.allowedMediaTypes = [1, 2, 3];
                    this.mediaDifficulities = 0;
                    this.allowedMediaDifficulities = [1, 2, 3, 4];
                }
                QuizSettingsService.prototype.setMediaType = function (mediaType) {
                    if (this.allowedMediaTypes.indexOf(mediaType) > -1) {
                        this.mediaType = mediaType;
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                QuizSettingsService.prototype.setMediaDiff = function (mediaDiff) {
                    if (this.allowedMediaDifficulities.indexOf(mediaDiff) > -1) {
                        this.mediaDifficulities = mediaDiff;
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                QuizSettingsService.prototype.getQuizSettings = function () {
                };
                QuizSettingsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], QuizSettingsService);
                return QuizSettingsService;
            }());
            exports_1("QuizSettingsService", QuizSettingsService);
        }
    }
});
//# sourceMappingURL=quiz-settings.service.js.map