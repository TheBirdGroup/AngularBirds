
import { Injectable } from 'angular2/core';
import { Http, Headers } from 'angular2/http';


import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { QuizSetting }  from './../shared/quiz.settings.interface.ts';
import { QuizSpecieService }  from './../shared/quiz-specie.service';


// import { quizQuestions } from './mock-quizQuestion';
 //import { QuizQuestion } from './quizQuestion';

@Injectable()
export class QuizFormalTestService{

	lastQuizSettings;

	siteID = 1;

	constructor(
		private _http: Http,
		private _quizSpeciesService: QuizSpecieService
	){}

	initialize(siteID){

		this.siteID = siteID;

	}

	confirmAccessCodeCorrect(code:string): Observable<any>{

		let accessCode = code;
		let languageID = 2;

		let data = "accessCode=" + accessCode;
		data += "&siteID=" + this.siteID;
		data += "&langID=" + languageID;


		const body = data;
		//they result in 501 not implemented by server
		// const headers = new Headers();
		// headers.append('Content-Type', 'application/json');

		var headers = new Headers();
  		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post('https://hembstudios.no/birdid/IDprogram/setStartTimeFormalTest.php?JSON=1&siteID='+this.siteID, body,{
	    	headers: headers
	    })
			//.map(response => response.json());


	}


}
