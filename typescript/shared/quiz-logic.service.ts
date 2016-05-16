
import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Router } from 'angular2/router';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { QuizQuestion }  from './../shared.class/the-quiz-question.class';

@Injectable()
export class QuizLogicService{

	quizLoaded = false;

	score = 0;
	questionNumber = 0; //start at 0

	quizQuestionsData;
	quizQuestionsSettings;

	quizQuestions:QuizQuestion[] = [];

	constructor(
		private _http: Http,
		private _router: Router
	){}

	//reset for a new quiz as the service is persistent across multible quizes
	newQuiz(){

		this.score = 0;
		this.questionNumber = 0;
		this.quizLoaded = false;
		this.quizQuestions = [];

	}

	//creates an array of 2 and 3
	createSeveralSoundquizDistrubutionArray(){

		let numQuestionsTotal = this.quizQuestionsSettings[0].numQuestions;

		let arrayOfQuestiongroups = [];
		//add 2 to all places
		for(let i = 0; i < numQuestionsTotal; i ++){
			arrayOfQuestiongroups.push(2);
		}
		let questionsLeft = Math.floor(numQuestionsTotal*0.5);

		let loopCount = 0;
		//do the rest
		while(questionsLeft > 0){

			//add to random place if less than 3 (witch is max)
			//http://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
			let randomnumber = Math.floor(Math.random() * (numQuestionsTotal - 0 + 1)) + 0;
			if(arrayOfQuestiongroups[randomnumber] < 3){
				arrayOfQuestiongroups[randomnumber] += 1;
				questionsLeft --;
			}

			loopCount ++;
			if(loopCount > 1000){
				let link = ['QuizError', { errorID: 2 }];
				this._router.navigate(link);
				throw new Error("createSeveralSoundquizDistrubutionArray infinate loop detected, > 1000");
			}

		}

		//console.log("arrayOfQuestiongroups ", arrayOfQuestiongroups);

		return arrayOfQuestiongroups;


	}

	setQuizQuestions(quizQuestionsData, severalSoundQuiz = false, beginnerQuiz = false){

		let numQuestionsTotal = this.quizQuestionsSettings[0].numQuestions;

		this.quizQuestionsData = quizQuestionsData;

		let arrayOfQuestiongroups = [];
		//add 1 to all places. Used by default when not several soundquiz
		for(let i = 0; i < numQuestionsTotal; i ++){
			arrayOfQuestiongroups.push(1);
		}


		if(severalSoundQuiz){

			arrayOfQuestiongroups = this.createSeveralSoundquizDistrubutionArray();

		}

		//loops all the "groupes"
		let currentQuestionObjectID = 0;
		for (let currentGroupID of Object.keys(arrayOfQuestiongroups)) {

			let currentQuizQuestion = new QuizQuestion(severalSoundQuiz);

			//combines the number of questions in each group together
			for(let i = 0; i < arrayOfQuestiongroups[currentGroupID]; i ++){

				let tempQuizData = this.quizQuestionsData.mediaArray[currentQuestionObjectID];

				//temporary!!
				if(tempQuizData == undefined){
					//NO QUESTIONS LEFT!
					let link = ['QuizError', { errorID: 1 }];
					this._router.navigate(link);
					throw new Error("NO QUESTIONS LEFT! A check for loading of questions needs to be implemented in QuizLogicService.setQuizQuestions");
				}

				let alts = tempQuizData['mediaChoices'];

				//preventing the same question from containing the same specie twice.
				//this will mean in some rare cases one question qwill ony have one right answer.
				if(!currentQuizQuestion.checkIfAnserIsCorrect(alts['right_answer']['id'])){

					currentQuizQuestion.addRightAnswer(alts['right_answer']['id'], alts['right_answer']['name'], alts['right_answer']['nameLatin']);
					currentQuizQuestion.addChoice(alts['choice_2']['id'], alts['choice_2']['name'], alts['choice_2']['nameLatin']);
					currentQuizQuestion.addChoice(alts['choice_3']['id'], alts['choice_3']['name'], alts['choice_3']['nameLatin']);
					currentQuizQuestion.addChoice(alts['choice_4']['id'], alts['choice_4']['name'], alts['choice_4']['nameLatin']);
					currentQuizQuestion.addChoice(alts['choice_5']['id'], alts['choice_5']['name'], alts['choice_5']['nameLatin']);

					currentQuizQuestion.addMediaId(tempQuizData.media_id)
					currentQuizQuestion.addExtraInfo(tempQuizData.extra_info);
					currentQuizQuestion.addMediaSource(tempQuizData.media_url);

					if(beginnerQuiz){
						if(tempQuizData.media_url_sound != null){
							//add sound if is is there
							currentQuizQuestion.addMediaSource(tempQuizData.media_url_sound);
						}
					}

				}else{
					console.log("one removed due to duplicate rigth answer in question "+currentQuestionObjectID);
				}

				currentQuestionObjectID ++;

			}

			currentQuizQuestion.prosessData();
			this.quizQuestions.push(currentQuizQuestion);

		}

		this.quizLoaded = true;

	}
	//return based on this.questionNumber
	getCurrentQuizQuestion(){

		return this.quizQuestions[this.questionNumber];

	}

	setQuizQuestionsSettings(quizQuestionsSettings){
		this.quizQuestionsSettings = quizQuestionsSettings;
	}

	setScore(score){
		this.score = score;
	}
	changeScore(change){
		this.score += change;
	}
	getScore(){
		return this.score;
	}

	gotoNextQuestionNumber(){
		this.questionNumber += 1;
	}
	getQuestionNumber(){
		return this.questionNumber;
	}

	noQuestionsLeft(){


		if(this.questionNumber+1 > this.quizQuestionsSettings[0]['numQuestions']){
			return true;
		}else{
			return false;
		}

	}

	//ONLY supports one choice pr question!!
	getAnswerListCSV(){

		let answerCsvString:string = "";

		for (let currentQuestionID of Object.keys(this.quizQuestions)) {
			let currentQuestionMedias = this.quizQuestions[currentQuestionID].getSelectedChoice();

			//console.log("currentQuestionMedias: ", currentQuestionMedias);
			if(currentQuestionMedias.length > 0){
				//API uses -1 as i donæt know, here we change to comply with that. Maby change API later?
				if(currentQuestionMedias[0].id == -1){
					answerCsvString += "0,";
				}else{
					answerCsvString += currentQuestionMedias[0].id + ",";
				}
			}else{
				answerCsvString += "0,";
			}

		}

		if(answerCsvString.length > 0){
			return answerCsvString.substring(0, answerCsvString.length-1);
		}else{
			return "";
		}

	}

	//ONLY supports one right answer!!
	getMediaIdsCSV(){

		let mediaCsvString:string = "";

		for (let currentQuestionID of Object.keys(this.quizQuestions)) {
			let currentQuestionMedias = this.quizQuestions[currentQuestionID].getMediaIds()[0].id;

			mediaCsvString += currentQuestionMedias + ",";

		}

		if(mediaCsvString.length > 0){
			return mediaCsvString.substring(0, mediaCsvString.length-1);
		}else{
			return "";
		}


	}






}
