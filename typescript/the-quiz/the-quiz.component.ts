import { Component, EventEmitter, OnInit }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';

import { QuizSettingsService }  from './../shared/quiz-settings.service';
import { QuizQuestionsService }  from './../shared/quiz-questions.service';

import { TheQuizImageComponent }  from './the-quiz-image.component';

@Component({
	selector: 'birdid-the-quiz',
	templateUrl: 'app/the-quiz/the-quiz.component.html',
	directives: [
		TheQuizImageComponent
	],
	providers: [
	  HTTP_PROVIDERS
	]
})


export class TheQuizComponent implements OnInit{
	title = 'Birdid Quiz TheQuizComponent!';


	mediaID = 0;
    mediaTypeID = 0;

    quizQuestions = [];

    quizLoaded = false;

    questionNumber = 0;

    questionAlternatives: string[];
    questionRightAnswer = ""


	score = 0;


	  constructor(
		  private _quizSettingsService: QuizSettingsService,
		  private _quizQuestionService: QuizQuestionsService
	  ){}

	  ngOnInit() {

        this._quizQuestionService.getQuizQuestions()
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

        console.log("starting quiz!!!", this.quizQuestions['mediaArray'][0]['media_id']);

        this.setupQuestion();



        this.quizLoaded = true;

    }

    nextQuestion(){

        this.questionNumber ++;
        this.setupQuestion();




    }

    setupQuestion(){

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



    }

    checkIfAltCorrect(altID){

        if(this.questionAlternatives[altID] == this.questionRightAnswer){

			this.score ++;
            console.log("correct!");

        }else{

			this.score --;
            console.log("inncorrect!");

        }

    }


	getQuestionExtraInfo(){

		return this.quizQuestions['mediaArray'][this.questionNumber]['extra_info'];

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
