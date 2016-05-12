import { Injectable, OnInit, EventEmitter } from 'angular2/core';
import { Http } from 'angular2/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import {constants} from './../constants';




@Injectable()
export class QuizSpecieService implements OnInit{

	speciesData;
	specieList;
	specieListJSON;
	numSpecies = 0;
	arrayOfSelectedSpecies = [];

	speciesDataLoaded = false;
	speciesLoadProblems = false;

	siteID = 1;
	areaID=0;
	langID = 2;

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

	initialize(siteID, langID){

		this.siteID = siteID;
		this.langID = langID;

		setTimeout(() => {
			this.loadSpecies();
		}, 0);

		return this.dataLoadedEventEmiter;

		//this.setSelectedSpecie([1854,1422,1901,1136,1221,1791,1729,1984,1313,1359,1628,1409,1149,1669,1531]);

	}

	loadAreaId(areaID: number){
		this.areaID = areaID;
		this.loadSpecies();
​
		return this.dataLoadedEventEmiter;
		}

	private loadSpecies(){

		this._http.get(constants.baseURL+"/getSpecieList.php?JSON=1&langID="+this.langID+"&siteID="+this.siteID+"&areaID="+this.areaID)
			.map(response => response.json()).subscribe(
	            data => {

					this.specieListJSON = data;
					delete this.specieListJSON['numSpeciesDiplayed'];

	                this.speciesData = data;
					this.prosessSpecielist();
	                this.speciesDataLoaded = true;
					this.dataLoadedEventEmiter.emit(true);
	            },
	            error => {
					this.speciesLoadProblems = true;
					console.error("getQuizQuestions ERROR! ", error)
					this.dataLoadedEventEmiter.emit(false);
				}
	        );

		//return Promise.resolve(quizQuestions);

	}

	//somewhat JSON to js array
	private prosessSpecielist(){



		// console.log(this.speciesData);
		// console.log(this.speciesData['numSpeciesDiplayed']);

		this.numSpecies = this.speciesData['numSpeciesDiplayed'];

		this.specieList = [];

		//make Array of JSON objects
		for (let id of Object.keys(this.speciesData)) {
			this.specieList.push(this.speciesData[id]);
		}


		// console.log(this.speciesData[5]);
		//console.log("this.specieList: ---------- ", this.specieList);
		// console.log("this.specieList11: ", this.specieList[1][1]);


	}

	getSpecieList(){

		return this.specieList;
	}

	getSelectedSpecieList(){

		return this.arrayOfSelectedSpecies;

	}

	getSelectedSpecieListCSV(){

		let stringList = "";

		for (let id of Object.keys(this.arrayOfSelectedSpecies)) {
			stringList += this.arrayOfSelectedSpecies[id].id + ","
		}

		return stringList.substring(0, stringList.length-1);

	}

	setSelectedSpecie(arrayOfSelectedSpecies){
		if(arrayOfSelectedSpecies==undefined || arrayOfSelectedSpecies==null){

		}else{
			this.arrayOfSelectedSpecies = arrayOfSelectedSpecies;
		}

	}

	getSpecieListJSON(){

		return this.specieListJSON;

	}

	getNumSpeciesTotal(){

		return this.numSpecies;

	}

	dataLoaded(){

		return this.speciesDataLoaded;

	}
	loadSpecieList(){
		return this.arrayOfSelectedSpecies;
	}

}
