import { Injectable, OnInit, EventEmitter} from 'angular2/core';
import { Http } from 'angular2/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import {constants} from './../constants';




@Injectable()
export class QuizCompetitionService implements OnInit{

	siteID = 1;
	competitionGroups;
	promise;

	dataLoadedEventEmiter = new EventEmitter<boolean>();

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

		setTimeout(() => {
			this.loadCompetitionGroups();
		}, 0);

		return this.dataLoadedEventEmiter;


	}

	 private loadCompetitionGroups(){
		 this._http.get(constants.baseURL+"/getCompetitionGroup.php")
			.map(response => response.json()).subscribe(
				data => {
					this.competitionGroups = data;
					this.dataLoadedEventEmiter.emit(true);
				}
			);

	}

	getCompetitionGroups(){
		return this.competitionGroups;

	}



}
