import { Component, EventEmitter, OnInit }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';

import { QuizSettingsService }  from './../shared/quiz-settings.service';
import { QuizQuestionsService }  from './../shared/quiz-questions.service';

import { QuizSetting }  from './../shared/quiz.settings.interface.ts';
//import { QuizSettingsMock }  from './../mock/quiz-settings.mock.ts';

import { TheQuizImageComponent }  from './the-quiz-image.component';

@Component({
	selector: 'birdid-the-quiz',
	templateUrl: 'app/the-quiz/the-quiz.component.html',
	directives: [
		TheQuizImageComponent
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
    mediaTypeID = 0;

    quizQuestions = [];

    quizLoaded = false;

    questionNumber = 0;

    questionAlternatives: string[];
    questionRightAnswer = "";
    ButtonColor = '';

    inbetweenQuestions = false;

    selectedButton = false;
    selectedButtonAltID = -1;

	quizSettings;

	quizDone = false;


	score = 0;


	  constructor(
		  private _quizSettingsService: QuizSettingsService,
		  private _quizQuestionService: QuizQuestionsService
	  ){}

	  ngOnInit() {

		  //moch while mile works on his service, replace by getting from it
		  this.quizSettings = [
		  	{"mediaType": 1, "areaID": 34, "timeLimit": 0, "numQuestions": 3,	"showAlternatives": true, "mediaDificulity": 1}
		  ];


        this._quizQuestionService.getQuizQuestions(this.quizSettings)
            .subscribe(
                data => {
                    console.log(data);
                    this.quizQuestions = data;
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
            if(this.questionAlternatives[this.selectedButtonAltID] == this.questionRightAnswer){
                this.score ++;
            }else{
                this.score --;
            }
        }else{
            this.inbetweenQuestions = false;
            this.questionNumber++;
            this.setupQuestion();
        }



    }

    setupQuestion(){

		if(this.questionNumber+1 > this.quizSettings[0]['numQuestions']){

			this.quizDone = true;
			this.quizDoneEvent.emit("MediaQuizOver");
			return;

		}

        this.mediaID = this.quizQuestions['mediaArray'][this.questionNumber]['media_id'];
        let alts = this.quizQuestions['mediaArray'][this.questionNumber]['mediaChoices']

        this.questionAlternatives = [];
        this.questionAlternatives.push(alts['right_answer']['name']);
        this.questionAlternatives.push(alts['choice_2']['name']);
        this.questionAlternatives.push(alts['choice_3']['name']);
        this.questionAlternatives.push(alts['choice_4']['name']);
        this.questionAlternatives.push(alts['choice_5']['name']);

        this.questionAlternatives = this.shuffle(this.questionAlternatives);

        this.questionRightAnswer = alts['right_answer']['name'];

        this.selectedButtonAltID = -1;

    }

    checkIfAltCorrect(altID){
        this.selectedButton = true;
        this.selectedButtonAltID = altID;

        if(this.questionAlternatives[altID] == this.questionRightAnswer){

            console.log("correct!");

        }else{

            console.log("incorrect!");

        }

    }

    checkIfButtonColorIsCorrect(altID){


        if(this.questionAlternatives[altID] == this.questionRightAnswer && this.inbetweenQuestions == true){
            return true;

        }else{
            return false;
        }

    }
    checkIfButtonColorIsWrong(altID){


        if(this.questionAlternatives[altID] != this.questionRightAnswer && this.inbetweenQuestions == true){
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
			return this.quizQuestions['mediaArray'][this.questionNumber]['extra_info'];
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
