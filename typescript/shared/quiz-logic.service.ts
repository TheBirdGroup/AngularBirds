
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

	setQuizQuestions(quizQuestionsData, severalSoundQuiz = false){

		this.quizQuestionsData = quizQuestionsData;

		//console.log("this.quizQuestionsData :", this.quizQuestionsData );

		for (let currentID of Object.keys(this.quizQuestionsData.mediaArray)) {
			//console.log("this.quizQuestionsData Current :", this.quizQuestionsData.mediaArray[currentID] );

			let tempQuizData = this.quizQuestionsData.mediaArray[currentID];
			let alts = tempQuizData['mediaChoices'];

			let currentQuizQuestion = new QuizQuestion();
			currentQuizQuestion.addRightAnswer(alts['right_answer']['id'], alts['right_answer']['name'], alts['right_answer']['name']);
			currentQuizQuestion.addChoice(alts['choice_2']['id'], alts['choice_2']['name'], alts['choice_2']['name']);
			currentQuizQuestion.addChoice(alts['choice_3']['id'], alts['choice_3']['name'], alts['choice_3']['name']);
			currentQuizQuestion.addChoice(alts['choice_4']['id'], alts['choice_4']['name'], alts['choice_4']['name']);
			currentQuizQuestion.addChoice(alts['choice_5']['id'], alts['choice_5']['name'], alts['choice_5']['name']);

			currentQuizQuestion.addMediaId(tempQuizData.media_id)
			currentQuizQuestion.addExtraInfo(tempQuizData.extra_info);
			currentQuizQuestion.addMediaSource(tempQuizData.media_url);

			currentQuizQuestion.prosessData();
			currentQuizQuestion.addChoice(-1, "I don't know", "I don't know");

			this.quizQuestions.push(currentQuizQuestion);

		}


		this.quizLoaded = true;
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
