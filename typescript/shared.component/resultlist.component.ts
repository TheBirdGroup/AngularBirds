import { Component, EventEmitter, OnInit, OnChanges, ViewChild, AfterViewInit, ElementRef }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';

import { QuizSettingsService }  from './../shared/quiz-settings.service';
import { QuizResultsService }  from './../shared/quiz-results.service';
import { QuizTranslationService }  from './../shared/quiz-translation.service';

@Component({
	selector: 'birdid-resultlist',
	templateUrl: 'app/shared.component/resultlist.component.html',
	styleUrls:  ['app/shared.component/resultlist.component.css'],
	directives: [

	],
	providers: [
	  HTTP_PROVIDERS
	],
	inputs: ['timespan:usingTimespan', 'limit:usingLimit', 'updateResultlistInc'], //using ALIAS
})

export class ResultlistComponent implements OnInit, OnChanges{
	//translation variables
	showAllTranslation;
	highscoresTranslation;
	dayTranslation;
	yearTranslation;
	nameTranslation;
	areaTranslation;
	scoreTranslation;
	timeTranslation;

	timespan;
	limit = 10;
	competitionGroupID;
	updateResultlistInc = -1;

	quizSettings;
	quizHighscoreData;
	quizHighscoreLoaded = false;

	constructor(
		private _quizResultsService: QuizResultsService,
		private _quizTranslationService: QuizTranslationService,
		private _quizSettingsService: QuizSettingsService){}

		ngOnInit() {
			this.showAllTranslation = this._quizTranslationService.getTranslationByID(278);
			this.highscoresTranslation = this._quizTranslationService.getTranslationByID(331);
			this.dayTranslation = this._quizTranslationService.getTranslationByID(85);
			this.yearTranslation = this._quizTranslationService.getTranslationByID(87);
			this.nameTranslation = this._quizTranslationService.getTranslationByID(525);
			this.areaTranslation = this._quizTranslationService.getTranslationByID(171);
			this.scoreTranslation = this._quizTranslationService.getTranslationByID(229);
			this.timeTranslation = this._quizTranslationService.getTranslationByID(230);

		}

		//fires also on init when inputs are set for the first time
		ngOnChanges(){

			this.quizSettings = this._quizSettingsService.getQuizSettings();
			this.loadQuizResults();
		//	this.checkTimespan();

		}

		loadQuizResults(){

			this.competitionGroupID = this._quizSettingsService.getCompetitionGroupID();

			this._quizResultsService.getQuizResults(this.quizSettings, this.timespan, this.limit, this.competitionGroupID)
	            .subscribe(
	                data => {
	                    //console.log(data);
	                    this.quizHighscoreData = Object.keys(data).map(function(k) {
							//console.log("data[k]: ", data[k], " K:",k)
							// if(k != 'returnData'){
								return data[k];
							// }
						});
						//remove returnData = true/false
						this.quizHighscoreData.pop();

						//console.log(this.quizHighscoreData);
	                    this.quizHighscoreLoaded = true;
	                },
	                error => console.error("getQuizResults ERROR! ", error)
	            )

		}

}
