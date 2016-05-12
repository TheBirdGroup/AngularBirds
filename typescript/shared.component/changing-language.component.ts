import { Component, EventEmitter, OnInit, OnChanges, ViewChild, AfterViewInit, ElementRef }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';

import { QuizSettingsService }  from './../shared/quiz-settings.service';
import { QuizChangingLanguageService }  from './../shared/quiz-changing-language.service';

@Component({
	selector: 'birdid-changing-language',
	templateUrl: 'app/shared.component/changing-language.component.html',
	styleUrls:  ['app/shared.component/changing-language.component.css'],
	directives: [

	],
	providers: [
	  HTTP_PROVIDERS
	],
	//inputs: ['timespan:usingTimespan', 'limit:usingLimit', 'updateResultlistInc'] //using ALIAS
})

export class QuizChangingLanguageComponent implements OnInit, OnChanges{
    quizSettings;
    competitionGroupID;
    languagesList;


	constructor(
		private _quizChangingLanguageService: QuizChangingLanguageService,
		private _quizSettingsService: QuizSettingsService){}

		ngOnInit() {
			//this.competitionGroupID=24;

		}
        ngOnChanges(){

            this.quizSettings = this._quizSettingsService.getQuizSettings();


        }

        getLanguages(){
            this.languagesList = this._quizChangingLanguageService.getLanguages();
            console.log(this.languagesList);

		}
    }
