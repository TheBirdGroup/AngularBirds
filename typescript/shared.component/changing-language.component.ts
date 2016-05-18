import { Component, EventEmitter, OnInit, OnChanges, ViewChild, AfterViewInit, ElementRef }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import { Router } from 'angular2/router';
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
	selectedlanguage;


	constructor(
		private _quizChangingLanguageService: QuizChangingLanguageService,
		private _quizSettingsService: QuizSettingsService,
		private _router: Router
	){}


		ngOnInit() {
			//this.competitionGroupID=24;
			this.languagesList=this._quizChangingLanguageService.getLanguages();
			//console.log("dadasdadada", this.languagesList)
		}
        ngOnChanges(){

            this.quizSettings = this._quizSettingsService.getQuizSettings();



        }

        getLanguagess(){
			//console.log("list", this.languagesList);

             this.languagesList = this._quizChangingLanguageService.getLanguages();

		}
		postLanguageId() {
			this._quizSettingsService.setLanguageID(this.selectedlanguage.id, true);
			//this._quizChangingLanguageService.setSelectedLanguage(this.selectedlanguage.id);
			console.log("this.selectedlanguage.id", this.selectedlanguage.id);
	    }

    }
