System.register(['angular2/core', 'angular2/http'], function(exports_1, context_1) {
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
    var TheQuizImageComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            TheQuizImageComponent = (function () {
                function TheQuizImageComponent() {
                    this.title = 'Birdid Quiz TheQuizComponent!';
                    this.imageURLStart = "https://hembstudios.no//birdid/IDprogram/getMedia.php?mediaID=";
                    this.mediaID = 0;
                }
                TheQuizImageComponent = __decorate([
                    core_1.Component({
                        selector: 'birdid-the-quiz-image',
                        templateUrl: 'app/the-quiz/the-quiz-image.component.html',
                        directives: [],
                        providers: [
                            http_1.HTTP_PROVIDERS
                        ],
                        inputs: ['mediaID:usingMediaID'],
                    }), 
                    __metadata('design:paramtypes', [])
                ], TheQuizImageComponent);
                return TheQuizImageComponent;
            }());
            exports_1("TheQuizImageComponent", TheQuizImageComponent);
        }
    }
});
//# sourceMappingURL=the-quiz-image.component.js.map