import { Injectable, OnInit } from 'angular2/core';
import { Http } from 'angular2/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';




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

		this.loadSpecies();

		//this.setSelectedSpecie([1854,1422,1901,1136,1221,1791,1729,1984,1313,1359,1628,1409,1149,1669,1531]);

	}

	private loadSpecies(){

		this._http.get("https://hembstudios.no//birdid/IDprogram/getSpecieList.php?JSON=1&langID=2&siteID="+this.siteID)
			.map(response => response.json()).subscribe(
	            data => {

					this.specieListJSON = data;
					delete this.specieListJSON['numSpeciesDiplayed'];

	                this.speciesData = data;
					this.prosessSpecielist();
	                this.speciesDataLoaded = true;
	            },
	            error => {
					this.speciesLoadProblems = true;
					console.error("getQuizQuestions ERROR! ", error)
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

		let stringList = ""

		for (let id of Object.keys(this.arrayOfSelectedSpecies)) {
			stringList += this.arrayOfSelectedSpecies[id] + ","
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


	// translationsAreLoaded(){
	//
	// 	return this.transDataLoaded;
	//
	// }
	//
	// translationsLoadProblems(){
	//
	// 	return this.transLoadProblems;
	//
	// }

	// getTranslationByID(id){
	//
	//
	// 	//return "TRANSLATIONS NOT LOADED"
	//
	// 	// this.promise = new Promise(function(resolve, reject) {
	// 	// 	// do a thing, possibly async, then…
	// 	//
	// 	// });
	// 	// return this.promise;
	//
	// 	console.log("this.transDataLoaded: ", this.transDataLoaded)
	// 	if(!this.transDataLoaded){
	// 		return "TRANSLATIONS NOT LOADED"
	// 	}else{
	// 		return this.translationData[id];
	// 	}
	//
	//
	// }





}
