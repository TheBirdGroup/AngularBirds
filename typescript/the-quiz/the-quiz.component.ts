import { Component, EventEmitter, OnInit }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import { Router } from 'angular2/router';

import { QuizSettingsService }  from './../shared/quiz-settings.service';
import { QuizQuestionsService }  from './../shared/quiz-questions.service';
import { QuizLogicService }  from './../shared/quiz-logic.service';

import { QuizSetting }  from './../shared/quiz.settings.interface.ts';
//import { QuizSettingsMock }  from './../mock/quiz-settings.mock.ts';

import { TheQuizImageComponent }  from './the-quiz-image.component';
import { TheQuizSoundComponent }  from './the-quiz-sound.component';



@Component({
	selector: 'birdid-the-quiz',
	templateUrl: 'app/the-quiz/the-quiz.component.html',
	directives: [
		TheQuizImageComponent,
		TheQuizSoundComponent
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

    questionAlternatives: string[][]; //[id, name]
    questionRightAnswerID = "";
    ButtonColor = '';

    inbetweenQuestions = false;

    selectedButton = false;
    selectedButtonAltID = -1;

	quizSettings: QuizSetting[];

	quizDone = false;


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

    nextQuestion(){

		if(this.quizDone){
			return;
		}

        if(!this.inbetweenQuestions) {
            this.inbetweenQuestions = true;
            if(this.questionAlternatives[this.selectedButtonAltID][0] == this.questionRightAnswerID){
				this._quizLogicService.changeScore(1);
                //this.score ++;
            }else{
				this._quizLogicService.changeScore(-1);
                //this.score --;
            }
        }else{
            this.inbetweenQuestions = false;
			this._quizLogicService.gotoNextQuestionNumber();
            //this.questionNumber++;
            this.setupQuestion();
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

		let tempArr = [alts['right_answer']['id'], alts['right_answer']['name']];

        this.questionAlternatives = [];
		this.questionAlternatives.push([alts['right_answer']['id'], alts['right_answer']['name']]);
		this.questionAlternatives.push([alts['choice_2']['id'], alts['choice_2']['name']]);
		this.questionAlternatives.push([alts['choice_3']['id'], alts['choice_3']['name']]);
		this.questionAlternatives.push([alts['choice_4']['id'], alts['choice_4']['name']]);
		this.questionAlternatives.push([alts['choice_5']['id'], alts['choice_5']['name']]);

		// this.questionAlternatives.push(alts['right_answer']['name']);
        // this.questionAlternatives.push(alts['choice_2']['name']);
        // this.questionAlternatives.push(alts['choice_3']['name']);
        // this.questionAlternatives.push(alts['choice_4']['name']);
        // this.questionAlternatives.push(alts['choice_5']['name']);

        this.questionAlternatives = this.shuffle(this.questionAlternatives);

        this.questionRightAnswerID = alts['right_answer']['id'];

        this.selectedButtonAltID = -1;

    }

    checkIfAltCorrect(altID){
        this.selectedButton = true;
        this.selectedButtonAltID = altID;

        if(this.questionAlternatives[altID][0] == this.questionRightAnswerID){

            console.log("correct!");

        }else{

            console.log("incorrect!");

        }

    }

    checkIfButtonColorIsCorrect(altID){


        if(this.questionAlternatives[altID][0] == this.questionRightAnswerID && this.inbetweenQuestions == true){
            return true;

        }else{
            return false;
        }

    }
    checkIfButtonColorIsWrong(altID){


        if(this.questionAlternatives[altID][0] != this.questionRightAnswerID && this.inbetweenQuestions == true){
            return true;

        }else{
            return false;
        }

    }
    checkIfButtonIsSelected(altID){
        if(this.inbetweenQuestions){
            return false
        }
        if(altID == this.selectedButtonAltID){
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
