import { Component } from 'angular2/core';
import { Router } from 'angular2/router';
import {QuizLoginComponent} from '../shared.component/quiz-login.component';

import { QuizSpecieService }  from './../shared/quiz-specie.service';


@Component({
    selector: 'birdid-welcome',
	templateUrl: 'app/welcome.component/the-quiz-welcome.component.html',
directives: [
    QuizLoginComponent
],

})

export class WelcomeComponent{


    constructor(
        private _router: Router,
        private _quizSpeciesService: QuizSpecieService

    ){}

    theQuiz(){
        this._router.navigate(["QuizMediaSelect"]);

    }

    competitionGroup(){
        //removes specie list if set
        this._quizSpeciesService.clearSelectedSpecies();
        this._router.navigate(["QuizCompetitionGroup"]);

    }

    formalTest(){
        //removes specie list if set
        this._quizSpeciesService.clearSelectedSpecies();
        this._router.navigate(["QuizFormalTestStart"]);


    }
}
