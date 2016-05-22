import { Component, EventEmitter, OnInit, OnChanges, ViewChild, AfterViewInit, ElementRef }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import { Router, RouteParams } from 'angular2/router';

import { QuizSettingsService }  from './../shared/quiz-settings.service';
import { QuizResultsService }  from './../shared/quiz-results.service';

@Component({
	selector: 'birdid-resultlist',
	templateUrl: 'app/shared.component/error.component.html',
	styleUrls:  ['app/shared.component/error.component.css'],
	directives: [

	],
	providers: [
	  HTTP_PROVIDERS
	],
	inputs: ['timespan:usingTimespan', 'limit:usingLimit', 'updateResultlistInc'], //using ALIAS
})

export class ErrorComponent implements OnInit, OnChanges{

	errorMessage ="No error =)"

	constructor(
		private _quizResultsService: QuizResultsService,
		private _quizSettingsService: QuizSettingsService,
		private _routeParams: RouteParams,
		private _router: Router
	){}

		ngOnInit() {
			//this.competitionGroupID=24;
			let errorID = + this._routeParams.get('errorID');
			if(errorID == 1){
				this.errorMessage = "Unable to load questions. Please change some settings and pray it will work";
			}else if(errorID == 2){
				this.errorMessage = "Unable to load questions. createSeveralSoundquizDistrubutionArray infinate loop detected, > 1000";
			}

		}

		//fires also on init when inputs are set for the first time
		ngOnChanges(){



		}

		navigateToStart(){

			this._router.navigate(["QuizWelcome"]);

		}


}
