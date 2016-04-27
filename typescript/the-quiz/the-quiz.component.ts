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

import { TheQuizFreetypeComponent }  from './the-quiz-freetype.component';

import { QuizQuestion }  from './the-quiz-question.class';



@Component({
	selector: 'birdid-the-quiz',
	templateUrl: 'app/the-quiz/the-quiz.component.html',
	directives: [
		TheQuizImageComponent,
		TheQuizSoundComponent,
		TheQuizFreetypeComponent
	],
	providers: [
	  HTTP_PROVIDERS
  ],
  outputs: ['quizDoneEvent']
})


export class TheQuizComponent implements OnInit{
	title = 'Birdid Quiz TheQuizComponent!';

	quizDoneEvent = new EventEmitter<string>();

	mediaID = 0;
	mediaURL = "";
    //mediaTypeID = 0;

    quizQuestions = [];

    quizLoaded = false;

    //questionNumber = 0; //move to Logic service

	currentQuizQuestion;
    ButtonColor = '';

    inbetweenQuestions = false;

    selectedButton = false;
	selectedButtonSpecieID = -1;

	quizSettings: QuizSetting[];

	quizDone = false;
	duration=0;
	ticks=0;
	timer;
	timerSubscription;



	//score = 0;


	  constructor(
		  private _quizSettingsService: QuizSettingsService,
		  private _quizQuestionService: QuizQuestionsService,
		  private _quizLogicService: QuizLogicService,
		  private _router: Router
	  ){}

	  ngOnInit() {


		  this._quizLogicService.newQuiz();

		  //moch while mile works on his service, replace by getting from it
		  this.quizSettings = this._quizSettingsService.getQuizSettings();
		  this._quizLogicService.setQuizQuestionsSettings(this.quizSettings);
		//   [
		//   	{"mediaType": 1, "areaID": 34, "timeLimit": 0, "numQuestions": 3,	"showAlternatives": true, "mediaDificulity": 1}
		//   ];


		//console.log("_quizSettingsService.getQuizSettings()[0].mediaTypeID: ", this._quizSettingsService.getQuizSettings()[0].mediaTypeID)


        this._quizQuestionService.getQuizQuestions(this.quizSettings)
            .subscribe(
                data => {
                    console.log(data);
                    this.quizQuestions = data;
					this._quizLogicService.setQuizQuestions(data);

                    this.startQuiz();
                },
                error => console.error("getQuizQuestions ERROR! ", error)
            )



    }

	startQuiz(){

        this.setupQuestion();

        this.quizLoaded = true;

    }

	specieSelectedEvent(event){

		console.log("specieSelectedEvent: ", event);
		this.nextQuestion();


	}

    nextQuestion(){

		if(this._quizSettingsService.getQuizSettings()[0].timeLimit != 0){
			this.timerSubscription.unsubscribe();
		}


		if(this.quizDone){
			return;
		}

        if(!this.inbetweenQuestions) {
            this.inbetweenQuestions = true;


			//right answer selected
            if(this.currentQuizQuestion.checkIfAnserIsCorrect(this.selectedButtonSpecieID)){

				if(Number(this.selectedButtonSpecieID) >= 0){ //NOT i don't know
					this._quizLogicService.changeScore(1);
				}
                //this.score ++;
            }else{

				//wrong answer selected
				if(Number(this.selectedButtonSpecieID) >= 0){ //NOT i don't know
					this._quizLogicService.changeScore(-1);
				}
                //this.score --;
            }

        }else{
            this.inbetweenQuestions = false;
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

    setupQuestion(){

		if(this._quizLogicService.noQuestionsLeft()){

			this.quizDone = true;
			//this.quizDoneEvent.emit("MediaQuizOver");
			this._router.navigate(["QuizMediaQuizResults"]);
			return;

		}

		this.mediaURL = this.quizQuestions['mediaArray'][this._quizLogicService.getQuestionNumber()]['media_url'];

        this.mediaID = this.quizQuestions['mediaArray'][this._quizLogicService.getQuestionNumber()]['media_id'];
        let alts = this.quizQuestions['mediaArray'][this._quizLogicService.getQuestionNumber()]['mediaChoices']


		this.currentQuizQuestion = new QuizQuestion();
		this.currentQuizQuestion.addRightAnswer(alts['right_answer']['id'], alts['right_answer']['name'], alts['right_answer']['name']);
		this.currentQuizQuestion.addChoice(alts['choice_2']['id'], alts['choice_2']['name'], alts['choice_2']['name']);
		this.currentQuizQuestion.addChoice(alts['choice_3']['id'], alts['choice_3']['name'], alts['choice_3']['name']);
		this.currentQuizQuestion.addChoice(alts['choice_4']['id'], alts['choice_4']['name'], alts['choice_4']['name']);
		this.currentQuizQuestion.addChoice(alts['choice_5']['id'], alts['choice_5']['name'], alts['choice_5']['name']);
		this.currentQuizQuestion.prosessData();
		this.currentQuizQuestion.addChoice(-1, "I don't know", "I don't know");

		console.log("this.currentQuizQuestion: ", this.currentQuizQuestion.getChoices());


		if(this._quizSettingsService.getQuizSettings()[0].timeLimit != 0){
			this.ticks=0;
			this.timer = Observable.timer(2000,1000);
			this.timerSubscription = this.timer.subscribe(t=>this.timerTick(t));
		}

		//this.testQuizQuestionClass();

    }

	testQuizQuestionClass(){

		let alts = this.quizQuestions['mediaArray'][this._quizLogicService.getQuestionNumber()]['mediaChoices']

		let tempQuestion = new QuizQuestion();
		tempQuestion.addRightAnswer(alts['right_answer']['id'], alts['right_answer']['name'], alts['right_answer']['name']);
		tempQuestion.addRightAnswer(alts['choice_2']['id'], alts['choice_2']['name'], alts['choice_2']['name']);
		tempQuestion.addChoice(alts['choice_3']['id'], alts['choice_3']['name'], alts['choice_3']['name']);
		tempQuestion.addChoice(alts['choice_4']['id'], alts['choice_4']['name'], alts['choice_4']['name']);
		tempQuestion.addChoice(alts['choice_5']['id'], alts['choice_5']['name'], alts['choice_5']['name']);

		tempQuestion.prosessData();

		if(tempQuestion.checkIfAnserIsCorrect(alts['right_answer']['id'])){
			console.log("checkIfAnserIsCorrect: ", "TRUE")
		}
		if(tempQuestion.checkIfAnserIsCorrect(alts['choice_2']['id'])){
			console.log("checkIfAnserIsCorrect: ", "TRUE")
		}
		if(tempQuestion.checkIfAnserIsCorrect(alts['choice_3']['id'])){
			console.log("checkIfAnserIsCorrect: ", "FALSE")
		}
		if(tempQuestion.checkIfAnserIsCorrect(alts['choice_5']['id'])){
			console.log("checkIfAnserIsCorrect: ", "FALSE")
		}

	}

	selectAnswerDisabled(){
		if( this.inbetweenQuestions == true){
				return true;
		}else{
				return false;
		}
	}

    checkIfAltCorrect(specieID){
        this.selectedButton = true;
		this.selectedButtonSpecieID = specieID;

		if(this.currentQuizQuestion.checkIfAnserIsCorrect(specieID)){

            console.log("correct!", specieID);

        }else{

            console.log("incorrect!");

        }

    }

    checkIfButtonColorIsCorrect(specieID){


        if(this.currentQuizQuestion.checkIfAnserIsCorrect(specieID) && this.inbetweenQuestions == true){
            return true;

        }else{
            return false;
        }

    }
    checkIfButtonColorIsWrong(specieID){


        if(!this.currentQuizQuestion.checkIfAnserIsCorrect(specieID)
			&& this.inbetweenQuestions == true
			&& specieID == this.selectedButtonSpecieID){

            return true;

        }else{
            return false;
        }

    }
    checkIfButtonIsSelected(specieID){
        if(this.inbetweenQuestions){
            return false
        }
        if(specieID == this.selectedButtonSpecieID){
            return true;
        }else{
            return false;
        }
    }



    getQuestionExtraInfo(){

		if(!this.quizDone){
			return this.quizQuestions['mediaArray'][this._quizLogicService.getQuestionNumber()]['extra_info'];
		}else{
			return ""
		}

	}


    //http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        }

        return array;
    }



}
