import { Injectable, EventEmitter } from 'angular2/core';
import { Http } from 'angular2/http';
import 'rxjs/Rx';
//import { Observable } from 'rxjs/Observable';
import {Observable} from 'rxjs/Rx';
// import { quizQuestions } from './mock-quizQuestion';
// import { QuizQuestion } from './quizQuestion';

import { QuizSetting }  from './../shared/quiz.settings.interface.ts';

import {constants} from './../constants';

@Injectable()
export class QuizSettingsService{

	mediaType = 0; //image, sound, video
	allowedMediaTypes = [1,2];
	quizType = 0; // 1 = normal, 2 = several soundquiz, 3 = formal test?
	allowedQuizTypes = [1,2,3];
	severalSoundQuiz = false;
	beginnerQuiz = false;
	formalTestQuiz = false;
	formalTestAccessCode = "";

	mediaDifficulities = 0;
//	allowedMediaDifficulities = [1,2,3,4]; for now we do not check

    numberOfQuestions = 0;
   // allowedNumberOfQuestions = [10, 30, 60];// for now we do not check

    duration=0;
    alternative: boolean;

	siteID = 1;

	lastError = ""

	areaListLoaded = false;
	areaLoadProblems = false;
	areaListData;
	selectedArea = 0;

	help = false;

	competitionGroupID=-1;

	langID = 2;


	dataLoadedEventEmiter = new EventEmitter<boolean>();
	laguageChangedEE = new EventEmitter<boolean>();

	constructor(private _http: Http){} // why do we need this



	initialize(siteID, langID){

		this.siteID = siteID;
		this.setLanguageID(langID);

		//setup default
		this.setMediaType(1);
		this.setNormalQuiz();
		this.setSeveralSoundquiz();
		this.setMediaDiff(1);
		this.selectNumberOfQuestions(5); //min 5
		this.setDuration(0);
		this.setAlternatives(true);
		this.setArea(0);
		this.setCompetitionGroupID(-1);

		//this.setBeginnerQuiz();



		setTimeout(() => {
			this.loadAreaList();
		}, 0);

		return this.dataLoadedEventEmiter;

	}

	getLanguageChnageEvent(){
		return this.laguageChangedEE;
	}
	getLanguageID(){
		return this.langID;
	}
	setLanguageID(langID, reload = false){
		this.langID = langID;
		if(reload){
			this.laguageChangedEE.emit(true);
		}
	}

	setNormalQuiz(){
		this.severalSoundQuiz = false;
		this.formalTestQuiz = false;
		this.beginnerQuiz = false;
	}
	setSeveralSoundquiz(){
		this.setAlternatives(true);
		this.setMediaType(2);
		this.severalSoundQuiz = true;
	}
	setFormalTest(){
		this.setAlternatives(false);
		this.formalTestQuiz = true;
	}
	setFormalTestAccessCode(code:string){
		this.formalTestAccessCode = code;
	}
	setBeginnerQuiz(){

		this.setMediaType(1);
		this.setMediaDiff(1);
		this.selectNumberOfQuestions(5); //min 5
		this.setDuration(0);
		this.setAlternatives(true);
		this.setCompetitionGroupID(-1);
		this.beginnerQuiz = true;

	}
	isBeginnerQuiz(){
		return this.beginnerQuiz
	}

	isNormalQuiz(){
		return (!this.severalSoundQuiz && !this.formalTestQuiz && !this.beginnerQuiz);
	}
	isSeveralSoundQuiz(){
		return this.severalSoundQuiz;
	}
	isFormalTestQuiz(){
		return this.formalTestQuiz;
	}


	setErrorMessage(error){
		this.lastError = error;
	}
	getLastErrorMessage(){
		return this.lastError;
	}

	getMediaNameFromID(mediaID):string{
		if(mediaID == 1){
			return 'Image';
		}else if(mediaID == 2){
			return 'Sound';
		}else if(mediaID == 3){
			return 'Video';
		}else{
			return "Unknown: "+mediaID;
		}
	}

	getUserFriendlyBools(bool):string{
		if(bool){
		   return 'Yes';
	   }else if(!bool){
		   return 'No';
	   }else{
		   return "Unknown: "+bool;
	   }
	}

	getSiteID(){
		return this.siteID;
	}

	loadAreaList() {

		this._http.get(constants.baseURL+"/getTranslationsAndData.php?JSON=1&langID=2&siteID="+this.siteID)
			.map(response => response.json()).subscribe( // this is getting the translation PLUS the areas
	            data => {
	                this.areaListData = data['area_list'];
				//	console.log("this.areaListData: ", this.areaListData);
	                this.areaListLoaded = true;
					this.dataLoadedEventEmiter.emit(true);
	            },
	            error => {
					this.areaLoadProblems = true;
					this.dataLoadedEventEmiter.emit(false);
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

	getAreaNameByID(id){

	//	console.log("this.areaListData: ", this.areaListData);
		let tempID = id;
		let currentAreaName = this.areaListData.find(function(element, index, array) {
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
		  "severalSoundQuiz": this.isSeveralSoundQuiz(),
		  "beginnerQuiz": this.isBeginnerQuiz(),
		  "formalTestQuiz": this.isFormalTestQuiz(),
		  "areaID": this.selectedArea,
		  "timeLimit": this.duration,
		  "numQuestions": this.numberOfQuestions,
		  "showAlternatives": this.alternative,
		  "mediaDificulity": this.mediaDifficulities,
		  "formalTestAccessCode": this.formalTestAccessCode,
		  "competitionGroupID": this.competitionGroupID,
	  	  "siteID": this.siteID,
	  	  "langID": this.langID}
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



	getAlternativeUserFriendly(){
		if(this.alternative === true){ // this is just for the user to see yes/no in the table below the choices
			return "Yes";
		}else{
			return "No";
		}

	}


    setMediaType(mediaType:number){
		if(this.allowedMediaTypes.indexOf(mediaType) > -1){
			this.mediaType = mediaType;

			return true;

		}else{
			return false;
		}

	}


	getMediaTypeUserFriendly(){
		if(this.mediaType==1){
			return 'Picture exercise';
		}
		if(this.mediaType==2 || this.severalSoundQuiz==false){
			return 'Sound exercise';
		}
		if(this.mediaType==2 || this.severalSoundQuiz==true){
			return 'Several singing birds';
		}
		if(this.mediaType==3){
			return 'Video quiz';
		}
		if(this.formalTestQuiz==true){
			return 'Formal quiz';
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
        this.numberOfQuestions = selectedNumberOfQuestions;
    }

	getNumberOfQuestions(){
		return this.numberOfQuestions
	}

	setHelp(wantHelp: boolean){
		this.help = wantHelp;
	}
	isUsingHelp(){
		return this.help;
	}

	setCompetitionGroupID(selectedID:number){
		this.competitionGroupID=selectedID;
		//console.log("the group id that is set issssssss ", this.competitionGroupID);
	}

	getCompetitionGroupID(){
		return this.competitionGroupID;
	}

	getCompetitionGroupIDUserFriendly(){
		if(this.competitionGroupID!==-1){
			return this.competitionGroupID;
		}
	}

}
