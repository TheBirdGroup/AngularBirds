import { Component, EventEmitter, OnInit, OnChanges, ViewChild, AfterViewInit, ElementRef } from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';

import { QuizSettingsService }  from './../shared/quiz-settings.service';
import { QuizSpecieService }  from './../shared/quiz-specie.service';

@Component({
	selector: 'birdid-the-quiz-choices',
	templateUrl: 'app/the-quiz/the-quiz-choices.component.html',
	styleUrls:  ['app/the-quiz/the-quiz-choices.component.css'],
	directives: [

	],
	providers: [
	  HTTP_PROVIDERS
	],
	pipes: [

	],
	inputs: ['inbetweenQuestions', 'specieQuestionObject'],
	outputs: ['specieSelectedEvent', 'questionDoneEvent']
})


export class TheQuizChoicesComponent implements OnInit, OnChanges{

	formSpecieName;
	selectedSpecie;


	inbetweenQuestions = false;
	specieQuestionObject;
	questionCorrect = false;


	selectedButtonSpecieID = -1;


	specieSelectedEvent = new EventEmitter<number>();
	questionDoneEvent = new EventEmitter<boolean>();

	constructor(
		private _quizSettingsService: QuizSettingsService,
		private _quizSpeciesService: QuizSpecieService,
		private _element: ElementRef){}

	ngOnInit() {


	}

	ngOnChanges(){
		if(this.inbetweenQuestions){
			//console.log("inbetween quests ", this.specieQuestionObject);

		}else{
			//console.log("!inbetween quests");
		}
	}

	ngAfterViewInit() {



	}


	checkIfButtonColorIsCorrect(specieID){


        if(this.specieQuestionObject.checkIfAnserIsCorrect(specieID) && this.inbetweenQuestions == true){
            return true;

        }else{
            return false;
        }

    }

    checkIfButtonColorIsWrong(specieID){


        if(!this.specieQuestionObject.checkIfAnserIsCorrect(specieID)
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

	selectAnswerDisabled(){
		if( this.inbetweenQuestions == true){
				return true;
		}else{
				return false;
		}
	}

	setUserChoice(specieID){

		this.selectedButtonSpecieID = specieID;
		this.specieSelectedEvent.emit(specieID);

		if(this.specieQuestionObject.checkIfAnserIsCorrect(this.selectedButtonSpecieID)){

			console.log("correct!");

		}else{

			console.log("inncorrect!");

		}

	}



	onAnswerButtonClick(){

		this.questionCorrect = this.specieQuestionObject.checkIfAnserIsCorrect(this.selectedButtonSpecieID);

		if(this.inbetweenQuestions){
			this.questionDoneEvent.emit(true);
			this.selectedButtonSpecieID = -1;
		}else{
			this.questionDoneEvent.emit(true);
		}



	}




}
