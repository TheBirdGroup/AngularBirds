import { Component, EventEmitter, Input, OnInit }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import { Router } from 'angular2/router';

import { QuizSettingsService }  from './../shared/quiz-settings.service';
import { QuizResultsService }  from './../shared/quiz-results.service';

import { ResultlistComponent }  from './../shared.component/resultlist.component';

@Component({
	selector: 'birdid-quiz-competition-group',
	templateUrl: 'app/competition-group/quiz-competition-group.component.html',
    styleUrls:  ['app/competition-group/quiz-competition-group.component.css'],

    directives: [
		ResultlistComponent
	],
	providers: [

	],
})
export class QuizCompetitionGroupComponent implements OnInit{
	title = 'Birdid Quiz competition group!';

	quizHighscoreData;
	quizHighscoreDataLimit50;
	quizSettings;
	mediaType = 1; //image, sound, video
	allowedMediaTypes = [1,2];
	quizType = 1; // 1 = normal, 2 = several soundquiz, 3 = formal test?
	allowedQuizTypes = [1,2,3];

	mediaDifficulities = 1;
//	allowedMediaDifficulities = [1,2,3,4]; for now we do not check

    numberOfQuestions = 10;
   // allowedNumberOfQuestions = [10, 30, 60];// for now we do not check

    duration=0;
    alternative: boolean;

	siteID = 1;

	areaListLoaded = false;
	areaLoadProblems = false;
	areaListData;
	selectedArea = 0;




	constructor(
		private _quizSettingsService: QuizSettingsService,
		private _router: Router,
		private _quizResultsService: QuizResultsService
	){}


	ngOnInit() {



	}



	startQuiz(){
		console.log(this._router);
		this._router.navigate(["QuizMediaQuiz"]);
	}
}
