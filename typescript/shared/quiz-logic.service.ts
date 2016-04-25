
import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class QuizLogicService{

	quizLoaded = false;

	score = 0;
	questionNumber = 0; //start at 0

	quizQuestionsData;
	quizQuestionsSettings;

	constructor(private _http: Http){}

	//reset for a new quiz as the service is persistent across multible quizes
	newQuiz(){

		this.score = 0;
		this.questionNumber = 0;
		this.quizLoaded = false;

	}

	setQuizQuestions(quizQuestionsData){
		this.quizQuestionsData = quizQuestionsData;
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
