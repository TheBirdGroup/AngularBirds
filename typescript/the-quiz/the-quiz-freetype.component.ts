import { Component, EventEmitter, OnInit, OnChanges, ViewChild, AfterViewInit, ElementRef }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';

import { QuizSettingsService }  from './../shared/quiz-settings.service';
import { QuizSpecieService }  from './../shared/quiz-specie.service';

import { QuizQuestion }  from './../shared.class/the-quiz-question.class';

@Component({
	selector: 'birdid-the-quiz-freetype',
	templateUrl: 'app/the-quiz/the-quiz-freetype.component.html',
	styleUrls:  ['app/the-quiz/the-quiz-freetype.component.css'],
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


export class TheQuizFreetypeComponent implements OnInit, OnChanges{

	formSpecieName = "";
	selectedSpecie;

	specieList = [];
	specieListProsessed = [];

	inbetweenQuestions = false;
	specieQuestionObject:QuizQuestion;
	questionCorrect = false;

	hints = "Unlimited for now";
	disableButton = false;

	letter = "";
	nrLetters = 1;

	questionDoneEvent = new EventEmitter<boolean>();

	constructor(
		private _quizSettingsService: QuizSettingsService,
		private _quizSpeciesService: QuizSpecieService,
		private _element: ElementRef){}

	ngOnInit() {
		console.log(this.specieQuestionObject);
		this.specieList = this._quizSpeciesService.getSpecieList();
		this.specieListProsessed = this.specieList;
		//add i don't know at beginning and elect it
		this.compileProsessedList();
		this.checkIfDisable();

	}

	ngOnChanges(){
		if(this.inbetweenQuestions){
			//console.log("inbetween quests ", this.specieQuestionObject);

		}else{
			//console.log("!inbetween quests");
			if(this.specieList.length > 0){
				this.formSpecieName = ""
				this.compileProsessedList();
				this.selectedSpecie = this.specieListProsessed[0];
			}
		}
		this.letter = "";
		this.nrLetters = 1;
	}

	ngAfterViewInit() {



	}
	checkIfDisable(){
		if(this._quizSettingsService.help == false){
			this.disableButton = true;
			this.hints ="Hints are disabled";
		}

	}
	//returns object 0 if not found
	getNextObjetInProsessedArrat(currentID){

		let nextObject = this.specieListProsessed[0];
		let next = false;

		for (let id of Object.keys(this.specieListProsessed)) {

			//if last iteration found current, return this as it is the next
			if(next){
				return this.specieListProsessed[id];
			}

			//return next
			if(this.specieListProsessed[id].id == currentID){
				//but return this if lat
				nextObject = this.specieListProsessed[id];
				next = true;
			}

		}

		return nextObject;

	}

	//returns object 0 if not found
	getPrevObjetInProsessedArrat(currentID){

		let prevObject = this.specieListProsessed[0];

		//loops and always save current in prevObject, then it returns that on the next iteration if it is a match
		for (let id of Object.keys(this.specieListProsessed)) {
			//return prev
			if(this.specieListProsessed[id].id == currentID){
				//but return this if lat
				return prevObject
			}

			prevObject = this.specieListProsessed[id];

		}

		return prevObject;

	}

	handleSelectAnswer(){

		this.questionCorrect = this.specieQuestionObject.checkIfAnserIsCorrect(this.selectedSpecie.id);

		if(this.inbetweenQuestions){
			this.formSpecieName = ""
			this.compileProsessedList();
			this.selectedSpecie = this.specieListProsessed[0];
		}

		this.questionDoneEvent.emit(true);

	}

	newValueSelectedList(){

		//console.log("selectedSpecie: ", this.selectedSpecie);
		console.log("correct species: ", this.specieQuestionObject.getRigthAnsers()[0].name, " What i added: ", this.selectedSpecie.id);
		setTimeout(() => {
			//console.log("added to list: ", this.selectedSpecie.id);
			this.specieQuestionObject.addSelectedChoice(this.selectedSpecie.id);
		},1);



	}

	inputSpecieListKey(event){

		if(event.key == 'Enter' || event.keyCode == 13){
			//transmit to a higher power what was seleted
			this.handleSelectAnswer();
		}

	}

	//well, pipes did not work, neither did pre prosessing of list so this will have to do...
	inputSpecieNameChange(event){

		//key fro firefox, keycode for stupid crome
		//console.log("event: ", event.keyCode);

		if(event.key == 'Enter' || event.keyCode == 13){
			//transmit to a higher power what was seleted
			this.handleSelectAnswer();
		}else if(event.key  == 'ArrowUp' || event.keyCode == 38){

			//select last element if no is selected
			if(this.selectedSpecie == undefined && this.specieListProsessed.length > 0){
				this.selectedSpecie = this.specieListProsessed[this.specieListProsessed.length-1];
			}else if(this.specieListProsessed.length > 1){
				//or move to prev
				this.selectedSpecie = this.getPrevObjetInProsessedArrat(this.selectedSpecie.id);
			}

			//waith for the stack to finiz and then change
			setTimeout(e => {
				this.newValueSelectedList();
			}, 0);


		}else if(event.key  == 'ArrowDown' || event.keyCode == 40){

			//select first element if no is selected
			if(this.selectedSpecie == undefined && this.specieListProsessed.length > 0){
				this.selectedSpecie = this.specieListProsessed[0];
			}else if(this.specieListProsessed.length > 1){
				//or move to next
				this.selectedSpecie = this.getNextObjetInProsessedArrat(this.selectedSpecie.id);
			}

			//waith for the stack to finiz and then change
			setTimeout(e => {
				this.newValueSelectedList();
			}, 0);

		}else{
			//do the limiting!

			this.compileProsessedList();


		}



	}

	compileProsessedList(){

		this.specieListProsessed = [];
		this.specieListProsessed.push({'id': -1, 'name': "I don't know", latin: "I relly don't know"});

		for (let id of Object.keys(this.specieList)) {

			//add all if undefined
			if(this.formSpecieName == undefined){

				this.specieListProsessed.push(this.specieList[id]);
				continue;
			}

			//if formSpecieName is a substring of name in list, or there is no formSpecieName
			if(this.specieList[id].name.toLowerCase().indexOf(this.formSpecieName.toLowerCase()) >= 0 || this.formSpecieName.length == 0){

				this.specieListProsessed.push(this.specieList[id]);

			}

		}

		if(this.selectedSpecie == undefined){
			//select first, witch is i don't know
			this.selectedSpecie = this.specieListProsessed[0];

		}

		//if one choice oly, select it (eg i don't know + choice)
		if(this.specieListProsessed.length == 2){
			this.selectedSpecie = this.specieListProsessed[1];
		}


	}
	showALetter(){
		this.letter = this.specieQuestionObject.getFirstLetters(this.nrLetters);

		this.formSpecieName = this.letter;

		this.compileProsessedList();

		this.nrLetters++;
		
		//this.disableButton = true;
		/*this.hints--;
		 if (this.hints >= 1){

		 }else{
		 this.disableButton = true;
		 }*/
	}





}
