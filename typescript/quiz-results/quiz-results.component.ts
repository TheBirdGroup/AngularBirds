import { Component, OnInit, EventEmitter }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import { Router } from 'angular2/router';

import { QuizSettingsService }  from './../shared/quiz-settings.service';
import { QuizResultsService }  from './../shared/quiz-results.service';
import { QuizLogicService }  from './../shared/quiz-logic.service';

import { ResultlistComponent }  from './../shared.component/resultlist.component';

@Component({
	selector: 'birdid-quiz-result',
	templateUrl: 'app/quiz-results/quiz-results.component.html',
	styleUrls:  ['app/quiz-results/quiz-results.component.css'],
	directives: [
		ResultlistComponent
	],
	providers: [
		HTTP_PROVIDERS
	]
})


export class QuizResultComponent implements OnInit  {
	title = ' You have successfully completed the quiz!';

	response;

	formDataUsername = "";
	dataSavedStatus = "";
	formInformation;

	quizSettings;
	quizHighscoreData;
	quizHighscoreLoaded = false;

	randomValue = 0;

	constructor(
		private _quizResultsService: QuizResultsService,
		private _quizLogicService: QuizLogicService,
		private _quizSettingsService: QuizSettingsService,
		private _router: Router
	) {}

	ngOnInit() {

		this.quizSettings = this._quizSettingsService.getQuizSettings();

		this.loadQuizResults();

	}

	loadQuizResults(){


	}


	onSubmit(formSubmitObject){

		this.dataSavedStatus = "";

		let maxScore = this._quizSettingsService.getQuizSettings()[0].numQuestions;

		this._quizResultsService.uploadQuizResults(this._quizLogicService.score, maxScore, this.formDataUsername, this._quizSettingsService.getQuizSettings()).subscribe(
			//data => this.response = JSON.stringify(data),
			data => this.onServerSubmit(data),
			error => console.log("error: ", error)
		);

		//console.log(formSubmitObject);
		//console.log("formDataUsername: ", this.formDataUsername)
		this.formInformation = formSubmitObject.value;

	}

	onServerSubmit(response){

		//console.log("working: ", response);

		this.dataSavedStatus = "Saved: " + response['returnData'];
		this.loadQuizResults();

	}

	startNewQuiz(){

		this._router.navigate(["QuizMediaSelect"]);

	}



}
