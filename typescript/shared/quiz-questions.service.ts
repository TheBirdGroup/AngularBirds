
import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


// import { quizQuestions } from './mock-quizQuestion';
// import { QuizQuestion } from './quizQuestion';

@Injectable()
export class QuizQuestionsService{

	constructor(private _http: Http){}

	getQuizQuestions(): Observable<any>{

		return this._http.get("https://hembstudios.no//birdid/IDprogram/getQuestionsData.php?JSON=1")
			.map(response => response.json());

		//return Promise.resolve(quizQuestions);

	}


}
