import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
// import { quizQuestions } from './mock-quizQuestion';
// import { QuizQuestion } from './quizQuestion';

@Injectable()
export class QuizSettingsService{

	mediaType = 0;
	allowedMediaTypes = [1,2,3];

	mediaDifficulities = 0;
//	allowedMediaDifficulities = [1,2,3,4]; for now we do not check

    numberOfQuestions = 0;
   // allowedNumberOfQuestions = [10, 30, 60];// for now we do not check

    duration=0;
    alternatives: boolean;

	areaListLoaded = false;
	areaListData;

	constructor(private _http: Http){} // why do we need this

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

	initialize(){

		//setup default
		this.setMediaDiff(1);
		this.selectNumberOfQuestions(10);
		this.setDuration(0);
		this.setAlternatives("true")

		this.loadAreaList();

	}

	loadAreaList(){

		this._http.get("https://hembstudios.no//birdid/IDprogram/getTranslationsAndData.php?JSON=1&langID=2")
			.map(response => response.json()).subscribe(
	            data => {
	                this.areaListData = data['area_list'];
					//console.log("this.areaListData: ", this.areaListData);
	                this.areaListLoaded = true;
	            },
	            error => console.error("loadAreaList ERROR! ", error)
	        );

	}

	dataLoaded(){

		return this.areaListLoaded;

	}

	getAreaList(){

		return this.areaListData;

	}

	getQuizSettings(){

		let returnSettings = [
		  {"mediaType": this.mediaType,
		  "areaID": 34,
		  "timeLimit": this.duration,
		  "numQuestions": this.numberOfQuestions,
		  "showAlternatives": this.alternatives,
		  "mediaDificulity": this.mediaDifficulities}
		];

		console.log("returnSettings: ", returnSettings)

		return returnSettings;

	}

    setDuration(duration: number){
        console.log(duration);
        this.duration=duration;
    }

    setAlternatives(SelectedAlternatives:string ){
        if (SelectedAlternatives == 'true'){
            this.alternatives = true;
        }else{
            this.alternatives = false;
        }
        console.log(this.alternatives);
        //this.alternatives=alternatives;
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
        console.log(selectedDiff)
        this.mediaDifficulities=selectedDiff;
    }



}
