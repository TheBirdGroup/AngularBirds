import { Component }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';

import { QuizSettingsService }  from './../shared/quiz-settings.service';
import { QuizResultsService }  from './../shared/quiz-results.service';
import { QuizLogicService }  from './../shared/quiz-logic.service';

@Component({
	selector: 'birdid-quiz-result',
	templateUrl: 'app/quiz-results/quiz-results.component.html',
	styleUrls:  ['app/quiz-results/quiz-results.component.css'],
	directives: [

	],
	providers: [
		HTTP_PROVIDERS
	]
})


export class QuizResultComponent {
	title = ' The Birdid Quiz QuizResultComponent 15!';

	response;

	formDataUsername = "";
	dataSavedStatus = "";
	formInformation;

	constructor(
		private _quizResultsService: QuizResultsService,
		private _quizLogicService: QuizLogicService,
		private _quizSettingsService: QuizSettingsService
	) {}

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

		console.log("working: ", response);

		this.dataSavedStatus = "Saved: " + response['returnData'];

	}



}
