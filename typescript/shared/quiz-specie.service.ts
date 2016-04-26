import { Injectable, OnInit } from 'angular2/core';
import { Http } from 'angular2/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class QuizSpecieService implements OnInit{

	speciesData;
	specieList: string[][];
	numSpecies = 0;

	speciesDataLoaded = false;
	speciesLoadProblems = false;

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

		this.loadSpecies();

	}

	private loadSpecies(){

		this._http.get("https://hembstudios.no//birdid/IDprogram/getSpecieList.php?JSON=1&langID=2&siteID="+this.siteID)
			.map(response => response.json()).subscribe(
	            data => {

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

		for(var i = 0; i < this.numSpecies; i ++){
			this.specieList.push([this.speciesData[i]['id'], this.speciesData[i]['name'], this.speciesData[i]['latin']])
		}


		// console.log(this.speciesData[5]);
		// console.log("this.specieList: ", this.specieList);
		// console.log("this.specieList11: ", this.specieList[1][1]);


	}

	getSpecieList(){

		return this.specieList;

	}

	getNumSpeciesTotal(){

		return this.numSpecies;

	}

	dataLoaded(){

		return this.speciesDataLoaded;

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