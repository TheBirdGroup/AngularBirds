import { Injectable, OnInit, EventEmitter } from 'angular2/core';
import { Http, Headers } from 'angular2/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { QuizSetting }  from './../shared/quiz.settings.interface.ts';

import {constants} from './../constants';

@Injectable()
export class QuizChangingLanguageService{

	siteID = 1;
	languagesData;

	langDataLoaded = false;
	langLoadProblems = false;
	dataLoadedEventEmiter = new EventEmitter<boolean>();

	constructor(private _http: Http){}

	initialize(siteID){

		this.siteID = siteID;
		setTimeout(() => {
			this.loadLanguages();
		}, 0);

		return this.dataLoadedEventEmiter;

	}
	private loadLanguages(){

		this._http.get("https://hembstudios.no//birdid/API/language/languages.php?JSON=1")
			.map(response => response.json()).subscribe(
	            data => {
	                this.languagesData = data['languages'];
					console.log("langs d ", data);
	                this.langDataLoaded = true;
					this.dataLoadedEventEmiter.emit(true);
	            },
	            error => {
					this.langLoadProblems = true;
					console.error(" ERROR! ", error);
					this.dataLoadedEventEmiter.emit(false);
				}
	        );

		//return Promise.resolve(quizQuestions);

	}
	languagesAreLoaded(){

		return this.langDataLoaded;

	}

	languagesLoadProblems(){

		return this.langLoadProblems;

	}

	getLanguages(){
		return this.languagesData;

	}



	/*getLanguages(){
		return this._http.get("https://hembstudios.no//birdid/API/language/languages.php?JSON=1")
			.map(response => response.json()).subscribe(
	            data => {

					this.languageList = data;
				})

	}*/
	/*getLanguageList(){
		return this.languageList;
	}*/

}
