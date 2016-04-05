
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
	allowedMediaDifficulities = [1,2,3,4];

	constructor(private _http: Http){}

	setMediaType(mediaType:number){

		if(this.allowedMediaTypes.indexOf(mediaType) > -1){

			this.mediaType = mediaType;
			return true;

		}else{

			return false;

		}

	}

	setMediaDiff(mediaDiff:number){

		if(this.allowedMediaDifficulities.indexOf(mediaDiff) > -1){

			this.mediaDifficulities = mediaDiff;
			return true;

		}else{

			return false;

		}

	}

	getQuizSettings(){



	}


}
