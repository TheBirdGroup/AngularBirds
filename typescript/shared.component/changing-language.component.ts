import { Component, EventEmitter, OnInit, OnChanges, ViewChild, AfterViewInit, ElementRef }       from '@angular/core';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import { Router } from '@angular/router-deprecated';
import { QuizSettingsService }  from './../shared/quiz-settings.service';
import { QuizChangingLanguageService }  from './../shared/quiz-changing-language.service';
import { QuizTranslationService }  from './../shared/quiz-translation.service';


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
	//translation variables
	titleTranslation;
	saveLanguageTranslation;
	backButtonTranslation;

    quizSettings;
    competitionGroupID;
    languagesList;
	selectedlanguage;


	constructor(
		private _quizChangingLanguageService: QuizChangingLanguageService,
		private _quizSettingsService: QuizSettingsService,
		private _quizTranslationService: QuizTranslationService,
		private _router: Router
	){}


		ngOnInit() {
			//translation
			this.titleTranslation = this._quizTranslationService.getTranslationByID(27);
			this.saveLanguageTranslation = this._quizTranslationService.getTranslationByID(28);
			this.backButtonTranslation = this._quizTranslationService.getTranslationByID(115);

			this.languagesList=this._quizChangingLanguageService.getLanguages();

		}
        ngOnChanges(){

            this.quizSettings = this._quizSettingsService.getQuizSettings();



        }

        getLanguagess(){

             this.languagesList = this._quizChangingLanguageService.getLanguages();

		}
		postLanguageId() {
			if(this.selectedlanguage != undefined){
				this._quizSettingsService.setLanguageID(this.selectedlanguage.id, true);
				console.log("this.selectedlanguage.id", this.selectedlanguage.id);
			}
	    }
	backToWelcomeFromSelectLanguage(){
		this._router.navigate(["QuizWelcome"]);

	}

    }
