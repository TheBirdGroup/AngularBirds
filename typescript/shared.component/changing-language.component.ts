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

			this.languagesList=this._quizChangingLanguageService.getLanguages();

		}
        ngOnChanges(){

            this.quizSettings = this._quizSettingsService.getQuizSettings();



        }

        getLanguagess(){


             this.languagesList = this._quizChangingLanguageService.getLanguages();

		}
		postLanguageId() {
			this._quizSettingsService.setLanguageID(this.selectedlanguage.id, true);
			console.log("this.selectedlanguage.id", this.selectedlanguage.id);
	    }

    }
