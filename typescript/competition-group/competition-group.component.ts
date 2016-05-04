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
	title = 'Birdid Q';
competitionGroupID;



	constructor(
		private _quizSettingsService: QuizSettingsService,
		private _router: Router,
		private _quizResultsService: QuizResultsService,
        private _http: Http
	){}

    storeCompetitionGroupSettings(){

        //setup default
        this._quizSettingsService.setMediaType(1);
        this._quizSettingsService.setNormalQuiz();
        this._quizSettingsService.setMediaDiff(1);
        this._quizSettingsService.selectNumberOfQuestions(10);
        this._quizSettingsService.setDuration(0);
        this._quizSettingsService.setAlternatives(false);
        this._quizSettingsService.setArea(0);

    }

	ngOnInit() {
        this._quizSettingsService.setCompetitionGroupID(24);


	}


	startQuiz(){
		//console.log(this._router);
        this.storeCompetitionGroupSettings();
        this._router.navigate(["QuizMediaQuiz"]);
	}
}
