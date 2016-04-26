import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import 'rxjs/Rx';
//import { Observable } from 'rxjs/Observable';
import {Observable} from 'rxjs/Rx';
// import { quizQuestions } from './mock-quizQuestion';
// import { QuizQuestion } from './quizQuestion';

import { QuizSetting }  from './../shared/quiz.settings.interface.ts';

@Injectable()
export class QuizSettingsService{

	mediaType = 0;
	allowedMediaTypes = [1,2,3];

	mediaDifficulities = 0;
//	allowedMediaDifficulities = [1,2,3,4]; for now we do not check

    numberOfQuestions = 0;
   // allowedNumberOfQuestions = [10, 30, 60];// for now we do not check

    duration=0;
    alternative: boolean;

	siteID = 1;

	areaListLoaded = false;
	areaLoadProblems = false;
	areaListData;
	selectedArea = 0;
	
	arrayOfSpecies =[];
	specieListData = [];
	specieListLoaded = false;
	specieLoadProblems = false;




	constructor(private _http: Http){} // why do we need this



	initialize(siteID){

		this.siteID = siteID;

		//setup default
		this.setMediaType(2);
		this.setMediaDiff(1);
		this.selectNumberOfQuestions(10);
		this.setDuration(5);
		this.setAlternatives(true);
		this.setArea(0);



		this.loadAreaList();
		this.loadSpecieList();

	}

	loadAreaList() {

		this._http.get("https://hembstudios.no//birdid/IDprogram/getTranslationsAndData.php?JSON=1&langID=2&siteID="+this.siteID)
			.map(response => response.json()).subscribe( // this is getting the translation PLUS the areas
	            data => {
	                this.areaListData = data['area_list'];
				//	console.log("this.areaListData: ", this.areaListData);
	                this.areaListLoaded = true;
	            },
	            error => {
					this.areaLoadProblems = true;
					console.error("loadAreaList ERROR! ", error)
				}
	        );

	}
	loadSpecieList() {

		this._http.get("https://hembstudios.no//birdid/IDprogram/getSpecieList.php?JSON=1")
			.map(response => response.json()).subscribe( // this is getting the translation PLUS the areas
			data => {
				this.specieListData = [];
				if (data) {
					for (let id of Object.keys(data)) {
						this.specieListData.push(data[id]);


					}
				}
				//	console.log("this.areaListData: ", this.areaListData);
				this.specieListLoaded = true;
			},
			error => {
				this.specieLoadProblems = true;
				console.error("loadSpecieList ERROR! ", error)
			}
		);

	}
	dataLoaded(){

		return this.areaListLoaded;

	}

	dataLoadProblems(){

		return this.areaLoadProblems;

	}

	getAreaList(){


			return this.areaListData;
	}
	getSpecieList(){
		
		return this.specieListData;
	}

	getCurrentAreaName(){

	//	console.log("this.areaListData: ", this.areaListData);
		let tempID = this.selectedArea;
		var currentAreaName = this.areaListData.find(function(element, index, array) {
		//	console.log("current", element['id'], " tempID: ", tempID);
			if(element['id'] == tempID){
				return true;
			}
		});
		//console.log("BKJHGHJGJHGHGJ",countryData.country);
		return currentAreaName.country;

	}


	getQuizSettings(){
	//	let timer = Observable.timer(2000, 1000 );
					//	timer.subscribe(t => this.tickerFunc(t));

		let returnSettings: QuizSetting[] = [
		  {"mediaTypeID": this.mediaType,
		  "areaID": this.selectedArea,
		  "timeLimit": this.duration,
		  "numQuestions": this.numberOfQuestions,
		  "showAlternatives": this.alternative,
		  "mediaDificulity": this.mediaDifficulities,
	  	  "siteID": this.siteID}
		];

		//console.log("returnSettings: ", returnSettings)

		return returnSettings;

	}

	setArea(selectedArea: number){
	//	console.log("the selected area is", selectedArea);
		if (selectedArea==undefined || selectedArea==null){
			this.selectedArea=2;
			}else{
				this.selectedArea = selectedArea;
			}




	}
	setSpecie(arrayOfSelectedSpecies){
		if(arrayOfSelectedSpecies==undefined || arrayOfSelectedSpecies==null){

		}else{
			this.arrayOfSpecies = arrayOfSelectedSpecies;
		}

	}


	tickerFunc(duration){
				console.log(this);
				this.duration = duration
			}

    setDuration(duration: number){
      //  console.log(duration);
        this.duration=duration;
    }
		getDuration(){
			return this.duration;
		}

    setAlternatives(selectedAlternative:boolean ){
            this.alternative = selectedAlternative;
        	//	console.log(this.alternative);
        //this.alternatives=alternatives;
    }
		getAlternative(){
			return this.alternative;
		}


    setMediaType(mediaType:number){
		if(this.allowedMediaTypes.indexOf(mediaType) > -1){
			this.mediaType = mediaType;
			return true;
		}else{
			return false;
		}
	}

	/*setMediaDiff(mediaDiff:number){
		if(this.allowedMediaDifficulities.indexOf(mediaDiff) > -1){
			this.mediaDifficulities = mediaDiff;
			return true;
		}else{

			return false;

		}
	}*/
    setMediaDiff(selectedDiff: number){
      //  console.log(selectedDiff)
        this.mediaDifficulities=selectedDiff;
    }
		getMediaDiff(){
        return this.mediaDifficulities;
    }

		selectNumberOfQuestions(selectedNumberOfQuestions: number){
        /*if(this.allowedNumberOfQuestions.valueOf()){
            this.numberOfQuestions = numberOfQuestions;
            return true;

        }else {
            return false;
        }*/
        console.log(selectedNumberOfQuestions)
        this.numberOfQuestions=selectedNumberOfQuestions;
    }
		getNumberOfQuestions(){
			return this.numberOfQuestions
		}



}
