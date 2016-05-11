import { Component, OnInit, EventEmitter }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import { Router } from 'angular2/router';
import { QuizLogicService }  from './../shared/quiz-logic.service';
import { QuizSpecieService }  from './../shared/quiz-specie.service';
import { TheQuizImageComponent }  from './../the-quiz/the-quiz-image.component';
import { TheQuizSoundComponent }  from './../the-quiz/the-quiz-sound.component';

import { ResultlistComponent }  from './../shared.component/resultlist.component';
import {QuizSettingsService} from "../shared/quiz-settings.service";

@Component({
    selector: 'birdid-quiz-summary',
    templateUrl: 'app/quiz-results/quiz-summary.component.html',
    styleUrls:  ['app/quiz-results/quiz-summary.component.css'],
    directives: [
        TheQuizImageComponent,
        TheQuizSoundComponent
    ],
    providers: [
        HTTP_PROVIDERS
    ]
})


export class QuizSummaryComponent implements OnInit  {
    title = "See your quiz summary!"
    quizSummary = [];
    specieList =[];
    areaCountry;            //display area country instead of alteratives when freetype
    mediaType;      //true == sound  -  false == img
    alternativeType; //true == choices - false == freetype

    constructor(
        private _quizSpeciesService: QuizSpecieService,
        private _quizLogicService: QuizLogicService,
        private _quizSettingsService: QuizSettingsService,
        private _router: Router

    ) {}
    ngOnInit() {
        this.quizSummary = this._quizLogicService.quizQuestions;
        console.log(this.quizSummary);
        this.specieList = this._quizSpeciesService.getSpecieList();
        this.areaCountry = this._quizSettingsService.getCurrentAreaName();
        this.setQuizInfo();
        this.setName();

    }
    goToResults(){
        this._router.navigate(["QuizMediaQuizResults"]);
    }

   setName() {
       if (this.alternativeType == true) {          //checks only alternatives when choices
           let j = 0;
           for (let id of Object.keys(this.quizSummary)) {
               while (j < this.quizSummary[id].selectedChoices.length) {
                   for (let i of Object.keys(this.quizSummary[id].choices)) {
                       if (this.quizSummary[id].choices[i].id == this.quizSummary[id].selectedChoices[j].id) {
                           this.quizSummary[id].selectedChoices[j].name = this.quizSummary[id].choices[i].name;
                       }
                   }
                   j++;
               }
               j = 0;
           }
       }else{                                         //checks whole specielist when freetype
           let j = 0;
           for (let id of Object.keys(this.quizSummary)) {
               while (j < this.quizSummary[id].selectedChoices.length) {
                   for (let i of Object.keys(this.specieList)) {
                       if (this.specieList[i].id == this.quizSummary[id].selectedChoices[j].id) {
                           this.quizSummary[id].selectedChoices[j].name = this.specieList[i].name;
                       }
                   }
                   j++;
               }
               j = 0;
           }

       }

       for (let k of Object.keys(this.quizSummary)){
            if(this.quizSummary[k].selectedChoices.length == 0){
                this.quizSummary[k].selectedChoices.push({'name': 'I dont know'});
            }
       }
   }
   setQuizInfo(){
       if(this._quizSettingsService.mediaType == 1){
           this.mediaType = false;
       }else{
           this.mediaType = true;
       }

       if(this._quizSettingsService.alternative == true){
           this.alternativeType = true;
       }else{
           this.alternativeType = false;
       }
   }
}
