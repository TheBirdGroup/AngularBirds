import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import {QuizLoginComponent} from '../shared.component/quiz-login.component';

import { QuizSpecieService }  from './../shared/quiz-specie.service';
import { QuizTranslationService }  from './../shared/quiz-translation.service';


@Component({
    selector: 'birdid-welcome',
	templateUrl: 'app/quiz-welcome/quiz-welcome.component.html',
    styleUrls:  ['app/quiz-welcome/quiz-welcome.component.css'],
directives: [
    QuizLoginComponent
],

})

export class QuizWelcomeComponent implements OnInit{
    //translation variables
    titleTranslation;
    normalQuizTranslation;
    competitionGroupsTranslation;
    takeFormalTestTranslation;
    selectLanguageTranslation;


    constructor(
        private _router: Router,
        private _quizSpeciesService: QuizSpecieService,
        private _quizTranslationService: QuizTranslationService

    ){}
    
    ngOnInit(){
        this.titleTranslation = this._quizTranslationService.getTranslationByID(120);
        this.normalQuizTranslation = this._quizTranslationService.getTranslationByID(158);
        this.competitionGroupsTranslation = this._quizTranslationService.getTranslationByID(439);
        this.takeFormalTestTranslation = this._quizTranslationService.getTranslationByID(217);
        this.selectLanguageTranslation = this._quizTranslationService.getTranslationByID(27);
        
    }

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

    changeLanguage(){
        this._router.navigate(["QuizChangingLanguage"]);
    }
}
