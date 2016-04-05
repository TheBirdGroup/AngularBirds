
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

	constructor(private _http: Http){}

	setMediaType(mediaType:number){

		if(this.allowedMediaTypes.indexOf(mediaType) > -1){

			this.mediaType = mediaType;
			return true;

		}else{

			return false;

		}

	}

	getQuizSettings(){



	}


}
