import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import {constants} from './../constants';


@Injectable()
export class QuizTranslationService{

	translationData;

	transDataLoaded = false;
	transLoadProblems = false;

	dataLoadedEventEmiter = new EventEmitter<boolean>();

	siteID = 1;
	langID = 2;

	promise;

	constructor(private _http: Http){}

	initialize(siteID, langID){

		this.siteID = siteID;
		this.langID = langID;

		setTimeout(() => {
			this.loadTranslations();
		}, 0);

		return this.dataLoadedEventEmiter;

	}

	private loadTranslations(){

		this._http.get(constants.baseURL+"/getTranslationsAndData.php?JSON=1&langID="+this.langID+"&siteID="+this.siteID)
			.map(response => response.json()).subscribe(
	            data => {
	                this.translationData = data['translations'];
	                this.transDataLoaded = true;
					this.dataLoadedEventEmiter.emit(true);
	            },
	            error => {
					this.transLoadProblems = true;
					console.error("getQuizQuestions ERROR! ", error);
					this.dataLoadedEventEmiter.emit(false);
				}
	        );

		//return Promise.resolve(quizQuestions);

	}


	translationsAreLoaded(){

		return this.transDataLoaded;

	}

	translationsLoadProblems(){

		return this.transLoadProblems;

	}

	getTranslationByID(id){


		//return "TRANSLATIONS NOT LOADED"

		// this.promise = new Promise(function(resolve, reject) {
		// 	// do a thing, possibly async, then…
		//
		// });
		// return this.promise;

		//console.log("this.transDataLoaded: ", this.transDataLoaded)
		if(!this.transDataLoaded){
			return "TRANSLATIONS NOT LOADED"
		}else{
			return this.translationData[id];
		}


	}





}
