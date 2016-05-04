import { Component, EventEmitter, OnInit, OnChanges, ViewChild, AfterViewInit, ElementRef } from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';

import { QuizSettingsService }  from './../shared/quiz-settings.service';
import { QuizSpecieService }  from './../shared/quiz-specie.service';

import { QuizQuestion }  from './../shared.class/the-quiz-question.class';

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
	outputs: ['questionDoneEvent']
})


export class TheQuizChoicesComponent implements OnInit, OnChanges{

	formSpecieName;
	selectedSpecie;
	disableButton = false;
	hints = "Unlimited for now";
	numbOfQuestion =  0;


	inbetweenQuestions = false;
	specieQuestionObject:QuizQuestion;
	//questionCorrect = false;


	//selectedButtonSpecieID = -1;

	questionDoneEvent = new EventEmitter<boolean>();

	constructor(
		private _quizSettingsService: QuizSettingsService,
		private _quizSpeciesService: QuizSpecieService,
		private _element: ElementRef){}

	ngOnInit() {
		console.log(this.specieQuestionObject);
		this.numbOfQuestion = this._quizSettingsService.numberOfQuestions;
		this.checkIfDisable();

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
	checkIfDisable(){
		if(this._quizSettingsService.help == false){
			this.disableButton = true;
			this.hints ="Hints are disabled";
		}

	}


	checkIfButtonColorIsCorrect(specieID){


        if(this.specieQuestionObject.checkIfAnserIsCorrect(specieID)
		&& this.inbetweenQuestions == true){
            return true;

        }else{
            return false;
        }

    }

    checkIfButtonColorIsWrong(specieID){


        if(!this.specieQuestionObject.checkIfAnserIsCorrect(specieID)
			&& this.inbetweenQuestions == true
			&& this.specieQuestionObject.choiceIsSelected(specieID)){

            return true;

        }else{
            return false;
        }

    }

    checkIfButtonIsSelected(specieID){
        if(this.inbetweenQuestions){
            return false
        }
        if(this.specieQuestionObject.choiceIsSelected(specieID)){
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

		if(this.specieQuestionObject.choiceIsSelected(specieID)){
			//deselect it!!
			this.specieQuestionObject.removeSelectedChoice(specieID);
			//this.specieDeselectEvent.emit(specieID);
		}else{
			//select it!!
			this.specieQuestionObject.addSelectedChoice(specieID);
			//this.specieSelectedEvent.emit(specieID);
		}



		if(this.specieQuestionObject.checkIfAnserIsCorrect(specieID)){

			console.log("correct!");

		}else{

			console.log("inncorrect!");

		}

	}



	onAnswerButtonClick(){

		//this.questionCorrect = this.specieQuestionObject.checkIfAnserIsCorrect(this.selectedButtonSpecieID);

		if(this.inbetweenQuestions){
			this.questionDoneEvent.emit(true);
			//this.selectedButtonSpecieID = -1;
		}else{
			this.questionDoneEvent.emit(true);
		}



	}
	removeWrongAnswer(){
		this.specieQuestionObject.removeWrongAlternative();
		/*this.hints--;
		if (this.hints >= 1){

		}else{
			this.disableButton = true;
		}*/
	}




}
