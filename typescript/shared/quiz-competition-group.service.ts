import { Injectable, OnInit } from 'angular2/core';
import { Http } from 'angular2/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';




@Injectable()
export class QuizCompetitionService implements OnInit{


	siteID = 1;

	promise;

	constructor(
		private _http: Http
	){}

	//not working in services?
	ngOnInit() {

		console.log("QuizTranslationService ngOnInit");
		//this.initialize();

	 }

	initialize(siteID){

		this.siteID = siteID;


	}



}
