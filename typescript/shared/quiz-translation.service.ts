import { Injectable, OnInit } from 'angular2/core';
import { Http } from 'angular2/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class QuizTranslationService implements OnInit{

	translationData;

	transDataLoaded = false;

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

		this.loadTranslations();

	}

	private loadTranslations(){

		this._http.get("https://hembstudios.no//birdid/IDprogram/getTranslationsAndData.php?JSON=1&langID=2&siteID="+this.siteID)
			.map(response => response.json()).subscribe(
	            data => {
	                this.translationData = data['translations'];
	                this.transDataLoaded = true;
	            },
	            error => console.error("getQuizQuestions ERROR! ", error)
	        );

		//return Promise.resolve(quizQuestions);

	}


	translationsAreLoaded(){

		return this.transDataLoaded;

	}

	getTranslationByID(id){


		//return "TRANSLATIONS NOT LOADED"

		// this.promise = new Promise(function(resolve, reject) {
		// 	// do a thing, possibly async, then…
		//
		// });
		// return this.promise;

		console.log("this.transDataLoaded: ", this.transDataLoaded)
		if(!this.transDataLoaded){
			return "TRANSLATIONS NOT LOADED"
		}else{
			return this.translationData[id];
		}


	}





}
