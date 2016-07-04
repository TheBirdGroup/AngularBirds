import { Component, EventEmitter, OnInit }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import { Router } from 'angular2/router';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import { QuizSettingsService }  from './../shared/quiz-settings.service';
import { QuizQuestionsService }  from './../shared/quiz-questions.service';
import { QuizLogicService }  from './../shared/quiz-logic.service';
import { QuizSetting }  from './../shared/quiz.settings.interface.ts';
//import { QuizSettingsMock }  from './../mock/quiz-settings.mock.ts';
import { TheQuizImageComponent }  from './the-quiz-image.component';
import { TheQuizSoundComponent }  from './the-quiz-sound.component';
import { QuizSpecieService }  from './../shared/quiz-specie.service';
import { QuizTranslationService }  from './../shared/quiz-translation.service';

import { TheQuizChoicesComponent }  from './the-quiz-choices.component';
import { TheQuizFreetypeComponent }  from './the-quiz-freetype.component';

import { QuizQuestion }  from './../shared.class/the-quiz-question.class';



@Component({
	selector: 'birdid-the-quiz',
	templateUrl: 'app/the-quiz/the-quiz.component.html',
	styleUrls:  ['app/the-quiz/the-quiz.component.css'],
	directives: [
		TheQuizImageComponent,
		TheQuizSoundComponent,
		TheQuizFreetypeComponent,
		TheQuizChoicesComponent
	],
	providers: [
	  HTTP_PROVIDERS
  ],
  outputs: ['quizDoneEvent']
})


export class TheQuizComponent implements OnInit{
	//translation variables
	whatBirdTranslation;
	timeLeftTranslation;
	scoreTranslation;
	timeLeftTextTranslation;
	secLeftTranslation;
	numberOfQuestionTranslation;

	aboutScoreTranslation;
	rightAnswerTranslation;
	wrongAnswerTranslation;
	dontKnowTranslation;

	quitButtonTranslation;



	quizDoneEvent = new EventEmitter<string>();

    quizLoaded = false;


	currentQuizQuestion:QuizQuestion;
    inbetweenQuestions = false;


	quizSettings: QuizSetting[];

	quizDone = false;
	//duration=0;
	duration;
	ticks:number;
	timer;
	timerSubscription;


	  constructor(
		  private _quizSettingsService: QuizSettingsService,
		  private _quizQuestionService: QuizQuestionsService,
		  private _quizLogicService: QuizLogicService,
		  private _quizSpeciesService: QuizSpecieService,
		  private _quizTranslationService: QuizTranslationService,
		  private _router: Router
	  ){}

	ngOnInit() {
		//translations
		this.whatBirdTranslation = this._quizTranslationService.getTranslationByID(248);
		this.scoreTranslation = this._quizTranslationService.getTranslationByID(229);
		this.timeLeftTextTranslation = this._quizTranslationService.getTranslationByID(110);
		this.secLeftTranslation = this._quizTranslationService.getTranslationByID(111);
		this.numberOfQuestionTranslation = this._quizTranslationService.getTranslationByID(174);
		this.aboutScoreTranslation = this._quizTranslationService.getTranslationByID(383);
		this.rightAnswerTranslation = this._quizTranslationService.getTranslationByID(176);
		this.wrongAnswerTranslation = this._quizTranslationService.getTranslationByID(177);
		this.dontKnowTranslation = this._quizTranslationService.getTranslationByID(178);
		this.quitButtonTranslation = this._quizTranslationService.getTranslationByID(569);
		this.timeLeftTranslation = this._quizTranslationService.getTranslationByID(194);
		this.timeLeftTranslation = this._quizTranslationService.getTranslationByID(194);
		this.timeLeftTranslation = this._quizTranslationService.getTranslationByID(194);
		this.timeLeftTranslation = this._quizTranslationService.getTranslationByID(194);



		this._quizLogicService.newQuiz();

		//moch while mile works on his service, replace by getting from it
		this.quizSettings = this._quizSettingsService.getQuizSettings();
		this._quizLogicService.setQuizQuestionsSettings(this.quizSettings);

		if(this._quizSettingsService.isBeginnerQuiz()){
			//Beginner quiz!
			this._quizQuestionService.getBeginnerQuizQuestions(this.quizSettings)
				.subscribe(
					data => {
						this.onQuestionsResived(data);
					},
					error => console.error("getQuizQuestions ERROR! ", error)
			);

		}else{

			this._quizQuestionService.getQuizQuestions(this.quizSettings)
				.subscribe(
					data => {
						this.onQuestionsResived(data);
					},
					error => console.error("getQuizQuestions ERROR! ", error)
			);

		}


	}

	onQuestionsResived(data){
		console.log(data);
		this._quizLogicService.setQuizQuestions(data, this._quizSettingsService.isSeveralSoundQuiz(), this._quizSettingsService.isBeginnerQuiz());

		//console.log("Number of questions", data.metadata['num_Questions']);
		this.startQuiz();
	}

	shouldDisplaySoundComponent(){

		if(this._quizSettingsService.getQuizSettings()[0].mediaTypeID == 2){
			return true;
		}

		//if beginnerquiz with both image AND sound
		if(this._quizSettingsService.isBeginnerQuiz() && this.currentQuizQuestion.getMediaSourses().length > 1){
			return true;
		}

		return false;

	}

	startQuiz(){

        this.setupQuestion();

        this.quizLoaded = true;

    }

	//when done by sub select component (eg next question button clicked)
	subSelectCompleteEvent(event){

		this.nextQuestion();

	}

    nextQuestion(){

		if(this._quizSettingsService.getQuizSettings()[0].timeLimit != 0){
			this.timerSubscription.unsubscribe();
		}


		if(this.quizDone){
			return;
		}

        if(!this.inbetweenQuestions && !this.quizSettings[0].formalTestQuiz){
			//skipping this in formal test
            this.inbetweenQuestions = true;

			//update score based on user choices
			this._quizLogicService.changeScore(this.currentQuizQuestion.getScoreForSelectedAnswers());

        }else{

            this.inbetweenQuestions = false;
			console.log("getSelectedChoice: ", this.currentQuizQuestion.getSelectedChoice());
			this._quizLogicService.gotoNextQuestionNumber();
            //this.questionNumber++;
            this.setupQuestion();

        }



    }


	timerTick(t){

		this.ticks = t
		if(this._quizSettingsService.getQuizSettings()[0].timeLimit-this.ticks < 1){

			this.nextQuestion();
		}

	}


	getDurationUserFriendly(){
		this.duration = this._quizSettingsService.getDuration();

		if (this.duration==0){
			return this.timeLeftTranslation;
		}
		if(this.duration==20) {
			let currentTime = this.duration - this.ticks;
			return currentTime.toString();
		}
		if(this.duration==30) {
			let currentTime = this.duration - this.ticks;
			return currentTime.toString();
		}
		if(this.duration==40) {
			let currentTime = this.duration - this.ticks;
			return currentTime.toString();
		}


	}

    setupQuestion(){

		if(this._quizLogicService.noQuestionsLeft()){
			//QUIZ DONE!
			this.quizDone = true;
			//this.quizDoneEvent.emit("MediaQuizOver");
			if(this.quizSettings[0].formalTestQuiz){
				this._router.navigate(["QuizFormalTestEnd"]);
			}else{
				this._router.navigate(["QuizMediaQuizResults"]);
			}
			return;

		}

		this.currentQuizQuestion = this._quizLogicService.getCurrentQuizQuestion();

		if(this._quizSettingsService.getQuizSettings()[0].timeLimit != 0){
			this.ticks=0;
			this.timer = Observable.timer(2000,1000);
			this.timerSubscription = this.timer.subscribe(t=>this.timerTick(t));
		}

    }

    getQuestionExtraInfo(){
		
		return this.currentQuizQuestion.getExtraInfo();

	}

backToWelcomeFromTheQuiz(){
	this._router.navigate(["QuizWelcome"]);
	}

}
