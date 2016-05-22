import { Component, OnInit, EventEmitter }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import { Router } from 'angular2/router';

import { QuizSettingsService }  from './../shared/quiz-settings.service';
import { QuizResultsService }  from './../shared/quiz-results.service';
import { QuizLogicService }  from './../shared/quiz-logic.service';
import { QuizTranslationService }  from './../shared/quiz-translation.service';
import { QuizAuthenticationService } from '../shared/quiz-authentication.service';

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

	updateResultlistInc = 0;

	disableSubmitScore = false;

	fomralTestInfoTranslation = "";

	loading = false;

	constructor(
		private _quizResultsService: QuizResultsService,
		private _quizLogicService: QuizLogicService,
		private _quizSettingsService: QuizSettingsService,
		private _quizTranslationService: QuizTranslationService,
		private _router: Router,
		private _quizAuthenticationService: QuizAuthenticationService
	) {}

	ngOnInit() {

		this.quizSettings = this._quizSettingsService.getQuizSettings();

		if(this._quizSettingsService.isUsingHelp()){
			this.disableSubmitScore = true;
			this.dataSavedStatus = "You can't submit your score since you used help/hints";
		}

		this.loadQuizResults();

		this.fomralTestInfoTranslation = this._quizTranslationService.getTranslationByID(162);

		//submit statistic if logged in and not several soundquiz
		if(	this._quizAuthenticationService.getAuthenticated()
			&& !this._quizSettingsService.isSeveralSoundQuiz()
			&& !this._quizSettingsService.isUsingHelp()
			&& !this._quizSettingsService.isBeginnerQuiz()){

			let payload:string = this._quizLogicService.getQuizPayload();

			//console.log("payload", payload);

			if(payload.length > 0){
				this._quizResultsService.postUserQuizResults(this._quizSettingsService.getQuizSettings(), payload)
					.subscribe((response) => (this.onUserResultSumbitted(response)));
			}
		}

	}

	onUserResultSumbitted(response){

		console.log("done onUserResultSumbitted: ", response);

	}

	loadQuizResults(){

		setTimeout(() => {

			this.updateResultlistInc ++;

		}, 500);


	}


	onSubmit(formSubmitObject){

		this.disableSubmitScore = true;

		this.dataSavedStatus = "";

		let score = this._quizLogicService.score;
		let maxScore = this._quizLogicService.getMaxScoreQuiz();
		console.log("score: ", score);
		console.log("maxScore: ", maxScore);

		this._quizResultsService.uploadQuizResults(score, maxScore, this.formDataUsername, this._quizSettingsService.getQuizSettings()).subscribe(
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
		this.dataSavedStatus = "Your score was successfully saved to the server";
		this.loadQuizResults();

	}

	startNewQuiz(){

		this._router.navigate(["QuizMediaSelect"]);

	}
	goToSummary(){
		this._router.navigate(["QuizMediaQuizSummary"]);

	}




}
