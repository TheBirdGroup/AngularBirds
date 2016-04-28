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
	//mediaDiff = ['1', '2', '3', '4'];
   // numberOfQuestions = ['10','30','60']; for the beggining we do not check against the array


	quizHighscoreData;
	quizHighscoreDataLimit50;
	quizSettings;




	constructor(
		private _quizSettingsService: QuizSettingsService,
		private _router: Router,
		private _quizResultsService: QuizResultsService
	){}


	ngOnInit() {



	}



	startQuiz(){
		
	}



}
