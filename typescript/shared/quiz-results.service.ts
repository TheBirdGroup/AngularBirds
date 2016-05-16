
import { Injectable } from 'angular2/core';
import { Http, Headers } from 'angular2/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { QuizSetting }  from './../shared/quiz.settings.interface.ts';

import {constants} from './../constants';



// import { quizQuestions } from './mock-quizQuestion';
 //import { QuizQuestion } from './quizQuestion';

@Injectable()
export class QuizResultsService{

	siteID = 1;
	langID = 2;

	constructor(private _http: Http){}

	initialize(siteID, langID){

		this.langID = langID;
		this.siteID = siteID;

	}

	uploadQuizResults(score, maxScore, name, quizSettings:QuizSetting[]){

		//for JSON, not in use
		// let data = {
		// 	score: score,
		// 	maxScore: 5,
		// 	scorePercent: 50,
		// 	mediaTypeID: 1,
		// 	areaID: 0,
		// 	difficulty: 1,
		// 	specialAreas: "false",
		// 	siteID: 1,
		// 	name: name
		// };

		let mediaTypeID = quizSettings[0].mediaTypeID;
		let areaID = quizSettings[0].areaID;
		let mediaDificulity = quizSettings[0].mediaDificulity;
		let competitionGroupID = quizSettings[0].competitionGroupID;

		if(quizSettings[0].beginnerQuiz){
			mediaDificulity = 0;
			mediaTypeID = 0;
			areaID = 0;
		}

		let data2 = "score=" + score;
		data2 += "&name=" + name;
		data2 += "&maxScore=" + maxScore;
		data2 += "&scorePercent=" + 50;
		data2 += "&mediaTypeID=" + mediaTypeID;
		//data2 += "&areaID=" + areaID; NOT WORKING DUE TO MILE =D
		data2 += "&areaID=" + 0;
		data2 += "&difficulty=" + mediaDificulity;
		data2 += "&specialAreas=false";
		data2 += "&siteID=" + this.siteID;
		data2 += "&competitionGroupID=" + competitionGroupID;

		const body = data2;
		//they result in 501 not implemented by server
		// const headers = new Headers();
		// headers.append('Content-Type', 'application/json');

		var headers = new Headers();
  		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(constants.baseURL+'/scoreQuiz.php?JSON=1&langID='+this.langID+'&siteID='+this.siteID, body,{
	    	headers: headers
	    })
			.map(response => response.json());
			//.map(response => response);

	}

	getQuizResults(quizSettings, timespan, limit, competitionGroupID){

		let mediaTypeID = quizSettings[0].mediaTypeID;
		let areaID = quizSettings[0].areaID;
		//areaID = 0;
		//let timeLimit = quizSettings[0].timeLimit;
		let numQuestions = quizSettings[0].numQuestions;
		//let showAlternatives = quizSettings[0].showAlternatives;
		let mediaDificulity = quizSettings[0].mediaDificulity;
		let siteID = quizSettings[0].siteID;

		if(quizSettings[0].beginnerQuiz){
			mediaDificulity = 0;
			mediaTypeID = 0;
			areaID = 0;
		}

		let extraURL = "";
		extraURL += "&retriveBy=" + timespan;
		extraURL += "&limit=" + limit;
		extraURL += "&specialAreas=" + "false";
		extraURL += "&difficulty=" + mediaDificulity;
		extraURL += "&areaID=" + areaID;
		extraURL += "&mediaTypeID=" + mediaTypeID;
		extraURL += "&langID=" + 2;
		extraURL += "&siteID=" + siteID;
		extraURL += "&competitionGroupID=" + competitionGroupID;

		return this._http.get(constants.baseURL+"/scoreQuiz.php?JSON=1"+extraURL)
			.map(response => response.json());

	}

	getQuizResultsLimit50(quizSettings){

		let mediaTypeID = quizSettings[0].mediaTypeID;
		let areaID = quizSettings[0].areaID;
		//areaID = 0;
		//let timeLimit = quizSettings[0].timeLimit;
		let numQuestions = quizSettings[0].numQuestions;
		//let showAlternatives = quizSettings[0].showAlternatives;
	//	let mediaDificulity = quizSettings[0].mediaDificulity;
		let mediaDificulity = quizSettings[0].mediaDificulity;

		let siteID = quizSettings[0].siteID;

		let extraURL = "";
		extraURL += "&retriveBy=" + "year";
		extraURL += "&limit=" + 50;
		extraURL += "&specialAreas=" + "false";
		extraURL += "&difficulty=" + mediaDificulity;
		extraURL += "&areaID=" + areaID;
		extraURL += "&mediaTypeID=" + mediaTypeID;
		extraURL += "&langID=" + 2;
		extraURL += "&siteID=" + siteID;
		extraURL += "&competitionGroupID=" + "false";

		return this._http.get(constants.baseURL+"/scoreQuiz.php?JSON=1"+extraURL)
			.map(response => response.json());

	}



}
