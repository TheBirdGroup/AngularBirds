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

	mediaType = 0; //image, sound, video
	allowedMediaTypes = [1,2];
	quizType = 0; // 1 = normal, 2 = several soundquiz, 3 = formal test?
	allowedQuizTypes = [1,2,3];

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




	constructor(private _http: Http){} // why do we need this



	initialize(siteID){

		this.siteID = siteID;

		//setup default
		this.setMediaType(2);
		this.setQuizType(2);
		this.setMediaDiff(1);
		this.selectNumberOfQuestions(10);
		this.setDuration(0);
		this.setAlternatives(false);
		this.setArea(0);



		this.loadAreaList();

	}

	setQuizType(quizType){

		this.quizType = quizType;
		//force alts for several singingbirds
		if(quizType == 2){
			this.setAlternatives(true);
		}

	}

	isNormalQuiz(){
		return this.quizType  == 1;
	}
	isSeveralSoundQuiz(){
		return this.quizType  == 2;
	}
	isFormalTestQuiz(){
		return this.quizType  == 3;
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

	dataLoaded(){

		return this.areaListLoaded;

	}

	dataLoadProblems(){

		return this.areaLoadProblems;

	}

	getAreaList(){


			return this.areaListData;
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
		  "quizTypeID": this.quizType,
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
        //console.log(selectedNumberOfQuestions)
        this.numberOfQuestions=selectedNumberOfQuestions;
    }

	getNumberOfQuestions(){
		return this.numberOfQuestions
	}



}
