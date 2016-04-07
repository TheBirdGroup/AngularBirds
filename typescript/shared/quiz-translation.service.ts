import { Injectable, OnInit } from 'angular2/core';
import { Http } from 'angular2/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class QuizTranslationService implements OnInit{

	translationData;

	transDataLoaded = false;

	promise;

	constructor(private _http: Http){}

	//not working in services?
	ngOnInit() {

		console.log("QuizTranslationService ngOnInit");
		//this.initialize();

	 }

	initialize(){

		this.loadTranslations();

	}

	private loadTranslations(){

		return this._http.get("https://hembstudios.no//birdid/IDprogram/getTranslationsAndData.php?JSON=1&langID=2")
			.map(response => response.json()).subscribe(
	            data => {
	                this.translationData = data['translations'];
	                this.translationsLoaded();
	            },
	            error => console.error("getQuizQuestions ERROR! ", error)
	        );

		//return Promise.resolve(quizQuestions);

	}

	translationsLoaded(){

		this.transDataLoaded = true;
		//console.log("loaded!");
		//this.promise.resolve(this.translationData['24']);


		//console.log(this.translationData);

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
