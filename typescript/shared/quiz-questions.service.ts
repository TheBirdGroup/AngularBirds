
import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { QuizSetting }  from './../shared/quiz.settings.interface.ts';
import { QuizSpecieService }  from './../shared/quiz-specie.service';


// import { quizQuestions } from './mock-quizQuestion';
 //import { QuizQuestion } from './quizQuestion';

@Injectable()
export class QuizQuestionsService{

	lastQuizSettings;

	constructor(
		private _http: Http,
		private _quizSpeciesService: QuizSpecieService
	){}

	getQuizQuestions(settings:QuizSetting[], severalSoundquiz = false): Observable<any>{

		this.lastQuizSettings = settings;


		let mediaTypeID = settings[0].mediaTypeID;
		let areaID = settings[0].areaID;
		//areaID = 0;
		//let timeLimit = settings[0].timeLimit;
		let numQuestions;
		if(severalSoundquiz){
			numQuestions = Math.floor(settings[0].numQuestions * 2.5);
		}else{
			numQuestions = settings[0].numQuestions;
		}

		//let showAlternatives = settings[0].showAlternatives;
		let mediaDificulity = settings[0].mediaDificulity;
		let siteID = settings[0].siteID;

		let extraURL = "";
		extraURL += "&numberQuestions=" + numQuestions;
		extraURL += "&numRepeatingSpecies=" + 2;
		extraURL += "&difficulty=" + mediaDificulity;
		extraURL += "&areaID=" + areaID;
		extraURL += "&mediaType=" + mediaTypeID;

		if(this._quizSpeciesService.getSelectedSpecieList().length > 0){
			extraURL += "&custumSpecieList=" + this._quizSpeciesService.getSelectedSpecieListCSV();
		}


		extraURL += "&langID=" + 2;
		extraURL += "&siteID=" + siteID;

		console.log("https://hembstudios.no//birdid/IDprogram/getQuestionsData.php?JSON=1"+extraURL)


		return this._http.get("https://hembstudios.no//birdid/IDprogram/getQuestionsData.php?JSON=1"+extraURL)
			.map(response => response.json());

		//return Promise.resolve(quizQuestions);

	}


}
