import { Injectable, OnInit, EventEmitter} from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { QuizSetting }  from './../shared/quiz.settings.interface.ts';

import {constants} from './../constants';




@Injectable()
export class QuizCompetitionService implements OnInit{

	siteID = 1;
	langID = 2;
	competitionGroups;
	promise;
	selectedCompetitionGroupID;
	selectedCompetitionGroupAccessCode;
	competitionGroupSelected;

	compLoadProblems = false;

	dataLoadedEventEmiter = new EventEmitter<boolean>();
	dataLoadedSpesificGroupEE = new EventEmitter<boolean>();


	constructor(
		private _http: Http
	){}

	//not working in services?
	ngOnInit() {

		console.log("QuizTranslationService ngOnInit");
		//this.initialize();
	 }

	initialize(siteID, langID){

		this.siteID = siteID;
		this.langID = langID;

		setTimeout(() => {
			this.loadCompetitionGroups();
		}, 0);

		return this.dataLoadedEventEmiter;


	}

	 private loadCompetitionGroups(){
		 this._http.get(constants.baseURL+"/getCompetitionGroup.php")
			.map(response => response.json()).subscribe(
				data => {
					//console.log("comp data: ", data);
					this.competitionGroups = data;
					this.dataLoadedEventEmiter.emit(true);
				},
	            error => {
					this.compLoadProblems = true;
					console.error("compLoadProblems ERROR! ", error);
					this.dataLoadedEventEmiter.emit(false);
				}
			);

	}

	getCompetitionGroups(){
		return this.competitionGroups;

	}

	loadSelectedCompetitionGroup(settings:QuizSetting[], selectedGroupID, accessCode = ""){

		this.selectedCompetitionGroupID = selectedGroupID;
		this.selectedCompetitionGroupAccessCode = accessCode

		let sessionID = settings[0].authenticationToken;

		this._http.get(constants.baseURL+"/getCompetitionGroup.php?compGroupID="+this.selectedCompetitionGroupID+"&accessCode="+accessCode+"&sessionID="+sessionID)
		.map(response => response.json()).subscribe(
			data => {
				this.competitionGroupSelected = data;
				this.dataLoadedSpesificGroupEE.emit(true);
			},
			error => {
				console.error("loadSelectedCompetitionGroup ERROR! ", error);
				this.dataLoadedEventEmiter.emit(false);
			}
		);

		return this.dataLoadedSpesificGroupEE;
	}

	getSelectedCompetitionGroup(){

		return this.competitionGroupSelected;

	}






}
