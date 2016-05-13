import { Component } from 'angular2/core';
import { Router } from 'angular2/router';
import {QuizLoginComponent} from '../login/quiz-login.component';




@Component({
    selector: 'birdid-welcome',
	templateUrl: 'app/welcome.component/the-quiz-welcome.component.html',
directives: [
    QuizLoginComponent
],

})

export class WelcomeComponent{


    constructor(
        private _router: Router

    ){}

    theQuiz(){
        this._router.navigate(["QuizMediaSelect"]);

    }

    competitionGroup(){
        this._router.navigate(["QuizCompetitionGroup"]);

    }

    formalTest(){
        this._router.navigate(["QuizFormalTestStart"]);


    }
}
