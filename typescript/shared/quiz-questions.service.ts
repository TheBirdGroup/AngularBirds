
import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { QuizSetting }  from './../shared/quiz.settings.interface.ts';


// import { quizQuestions } from './mock-quizQuestion';
 //import { QuizQuestion } from './quizQuestion';

@Injectable()
export class QuizQuestionsService{

	lastQuizSettings;

	constructor(private _http: Http){}

	getQuizQuestions(settings:QuizSetting[]): Observable<any>{

		this.lastQuizSettings = settings;


		let mediaTypeID = settings[0].mediaTypeID;
		let areaID = settings[0].areaID;
		//let timeLimit = settings[0].timeLimit;
		let numQuestions = settings[0].numQuestions;
		//let showAlternatives = settings[0].showAlternatives;
		let mediaDificulity = settings[0].mediaDificulity;

		let extraURL = "";
		extraURL += "&numberQuestions=" + numQuestions;
		extraURL += "&numRepeatingSpecies=" + 2;
		extraURL += "&difficulty=" + mediaDificulity;
		extraURL += "&areaID=" + areaID;
		extraURL += "&mediaType=" + mediaTypeID;
		extraURL += "&langID=" + 2;



		return this._http.get("https://hembstudios.no//birdid/IDprogram/getQuestionsData.php?JSON=1"+extraURL)
			.map(response => response.json());

		//return Promise.resolve(quizQuestions);

	}


}
