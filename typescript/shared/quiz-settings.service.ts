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

    duration=null;
    alternatives: boolean;

	//constructor(private _http: Http){} // why do we need this

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

    setDuration(duration: string){
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
	getQuizSettings(){	}


}