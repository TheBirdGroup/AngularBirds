
import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { QuizQuestion }  from './../the-quiz/the-quiz-question.class';

@Injectable()
export class QuizLogicService{

	quizLoaded = false;

	score = 0;
	questionNumber = 0; //start at 0

	quizQuestionsData;
	quizQuestionsSettings;

	quizQuestions:QuizQuestion[] = [];

	constructor(private _http: Http){}

	//reset for a new quiz as the service is persistent across multible quizes
	newQuiz(){

		this.score = 0;
		this.questionNumber = 0;
		this.quizLoaded = false;

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

		//do the rest
		while(questionsLeft > 0){

			//add to random place if less than 3 (witch is max)
			//http://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
			let randomnumber = Math.floor(Math.random() * (numQuestionsTotal - 0 + 1)) + 0;
			if(arrayOfQuestiongroups[randomnumber] < 3){
				arrayOfQuestiongroups[randomnumber] += 1;
				questionsLeft --;
			}
		}

		console.log("arrayOfQuestiongroups ", arrayOfQuestiongroups);

		return arrayOfQuestiongroups;


	}

	setQuizQuestions(quizQuestionsData, severalSoundQuiz = false){

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
					throw new Error("NO QUESTIONS LEFT! A check for loading of questions needs to be implemented in QuizLogicService.setQuizQuestions");
				}

				let alts = tempQuizData['mediaChoices'];

				currentQuizQuestion.addRightAnswer(alts['right_answer']['id'], alts['right_answer']['name'], alts['right_answer']['name']);
				currentQuizQuestion.addChoice(alts['choice_2']['id'], alts['choice_2']['name'], alts['choice_2']['name']);
				currentQuizQuestion.addChoice(alts['choice_3']['id'], alts['choice_3']['name'], alts['choice_3']['name']);
				currentQuizQuestion.addChoice(alts['choice_4']['id'], alts['choice_4']['name'], alts['choice_4']['name']);
				currentQuizQuestion.addChoice(alts['choice_5']['id'], alts['choice_5']['name'], alts['choice_5']['name']);

				currentQuizQuestion.addMediaId(tempQuizData.media_id)
				currentQuizQuestion.addExtraInfo(tempQuizData.extra_info);
				currentQuizQuestion.addMediaSource(tempQuizData.media_url);

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






}
