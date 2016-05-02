import { Injectable, OnInit, EventEmitter } from 'angular2/core';
import { Http } from 'angular2/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class QuizTranslationService implements OnInit{

	translationData;

	transDataLoaded = false;
	transLoadProblems = false;

	dataLoadedEventEmiter = new EventEmitter<boolean>();

	siteID = 1;

	promise;

	constructor(private _http: Http){}

	//not working in services?
	ngOnInit() {

		console.log("QuizTranslationService ngOnInit");
		//this.initialize();

	 }

	initialize(siteID){

		this.siteID = siteID;

		setTimeout(() => {
			this.loadTranslations();
		}, 0);

		return this.dataLoadedEventEmiter;



	}

	private loadTranslations(){

		this._http.get("https://hembstudios.no//birdid/IDprogram/getTranslationsAndData.php?JSON=1&langID=2&siteID="+this.siteID)
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
