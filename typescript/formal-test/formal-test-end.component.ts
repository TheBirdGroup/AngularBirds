import { Component, EventEmitter, OnInit }       from '@angular/core';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import { Router } from '@angular/router-deprecated';

import { QuizSettingsService }  from './../shared/quiz-settings.service';
import { QuizTranslationService }  from './../shared/quiz-translation.service';
import { QuizLogicService }  from './../shared/quiz-logic.service';
import { QuizFormalTestService }  from './../shared/quiz-formal-test.service';

@Component({
	selector: 'birdid-formal-test-end',
	templateUrl: 'app/formal-test/formal-test-end.component.html',
	styleUrls:  ['app/formal-test/formal-test-end.component.css'],
	directives: [

	],
	providers: [
	  HTTP_PROVIDERS
  	],
	//outputs: ['quizMediaSelectedEvent']
})


export class FormalTestEndComponent implements OnInit{

	answerListCSV = "";
	mediaIdsCSV = "";
	submitErrorText = "";
	submitError = false;
	loading = true;
	submitSuccess = false;

	constructor(
		private _quizSettingsService: QuizSettingsService,
		private _quizTranslationService: QuizTranslationService,
		private _quizLogicService: QuizLogicService,
		private _quizFormalTestService: QuizFormalTestService,
		private _router: Router
	){}

	ngOnInit() {

		this.answerListCSV = this._quizLogicService.getAnswerListCSV();
		this.mediaIdsCSV = this._quizLogicService.getMediaIdsCSV();
		let code = this._quizSettingsService.getQuizSettings()[0].formalTestAccessCode;

		if(this._quizSettingsService.getQuizSettings()[0].formalTestQuiz){

			this._quizFormalTestService.submitFormalTestRespoce(this._quizSettingsService.getQuizSettings(), code, this.answerListCSV, this.mediaIdsCSV)
				.subscribe((response) => (this.onFormalTestSubmit(response)));

		}
		console.log("this.answerListCSV: ", this.answerListCSV);
		console.log("this.mediaIdsCSV: ", this.mediaIdsCSV);

	}

	onFormalTestSubmit(responce){

		this.loading = false

		if(responce.returnData){
			this.submitSuccess = true;
		}else{
			this.submitError = true;
			this.submitErrorText = responce.returnData;
		}

		console.log("responce: ", responce);


	}







}
