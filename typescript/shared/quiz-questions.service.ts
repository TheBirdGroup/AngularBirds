
import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { QuizSetting }  from './../shared/quiz.settings.interface.ts';
import { QuizSpecieService }  from './../shared/quiz-specie.service';

import {constants} from './../constants';



// import { quizQuestions } from './mock-quizQuestion';
 //import { QuizQuestion } from './quizQuestion';

@Injectable()
export class QuizQuestionsService{

	lastQuizSettings;

	constructor(
		private _http: Http,
		private _quizSpeciesService: QuizSpecieService
	){}

	getBeginnerQuizQuestions(settings:QuizSetting[]): Observable<any>{

		this.lastQuizSettings = settings;

		let numQuestions = settings[0].numQuestions;

		let extraURL = "";

		extraURL += "&numberQuestions=" + numQuestions;

		return this._http.get(constants.baseURL+"/getBeginnerQuestionsData.php?JSON=1"+extraURL)
			.map(response => response.json());

	}

	getQuizQuestions(settings:QuizSetting[]): Observable<any>{

		this.lastQuizSettings = settings;

		let competitionGroupID = settings[0].competitionGroupID;
		let mediaTypeID = settings[0].mediaTypeID;
		let areaID = settings[0].areaID;
		//areaID = 0;
		//let timeLimit = settings[0].timeLimit;
		let numQuestions;
		if(settings[0].severalSoundQuiz){
			numQuestions = Math.floor(settings[0].numQuestions * 2.5);
		}else{
			numQuestions = settings[0].numQuestions;
		}

		//let showAlternatives = settings[0].showAlternatives;
		let mediaDificulity = settings[0].mediaDificulity;
		let siteID = settings[0].siteID;
		let langID = settings[0].langID;

		let extraURL = "";
		extraURL += "&numberQuestions=" + numQuestions;
		extraURL += "&numRepeatingSpecies=" + Math.floor(numQuestions*0.1);
		extraURL += "&difficulty=" + mediaDificulity;
		extraURL += "&areaID=" + areaID;
		extraURL += "&mediaType=" + mediaTypeID;
		extraURL += "&competitionGroupID=" + competitionGroupID;

		if(settings[0].formalTestQuiz){
			extraURL += "&accessCode=" + settings[0].formalTestAccessCode;
		}

		if(this._quizSpeciesService.getSelectedSpecieList().length > 0){
			extraURL += "&custumSpecieList=" + this._quizSpeciesService.getSelectedSpecieListCSV();
		}


		extraURL += "&langID=" + langID;
		extraURL += "&siteID=" + siteID;

		//console.log("https://hembstudios.no//birdid/IDprogram/getQuestionsData.php?JSON=1"+extraURL)


		return this._http.get(constants.baseURL+"/getQuestionsData.php?JSON=1"+extraURL)
			.map(response => response.json());

		//return Promise.resolve(quizQuestions);

	}


}
