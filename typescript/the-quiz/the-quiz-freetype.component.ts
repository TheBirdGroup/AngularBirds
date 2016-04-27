import { Component, EventEmitter, OnInit, OnChanges, ViewChild, AfterViewInit, ElementRef }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';

import { QuizSettingsService }  from './../shared/quiz-settings.service';
import { QuizSpecieService }  from './../shared/quiz-specie.service';

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
	inputs: ['inbetweenQuestions', 'specieQuestionObject'], //using ALIAS
	outputs: ['specieSelectedEvent']
})


export class TheQuizFreetypeComponent implements OnInit, OnChanges{

	formSpecieName;
	selectedSpecie;

	specieList;
	specieListProsessed;

	inbetweenQuestions = false;
	specieQuestionObject;

	specieSelectedEvent = new EventEmitter<number>();

	constructor(
		private _quizSettingsService: QuizSettingsService,
		private _quizSpeciesService: QuizSpecieService,
		private _element: ElementRef){}

	ngOnInit() {

		this.specieList = this._quizSpeciesService.getSpecieList();
		this.specieListProsessed = this.specieList;
		//add i don't know at beginning and elect it
		this.compileProsessedList();

	}

	ngOnChanges(){
		if(this.inbetweenQuestions){
			console.log("inbetween quests");
		}else{
			console.log("!inbetween quests");
		}
	}

	ngAfterViewInit() {



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

	//well, pipes did not work, neither did pre prosessing of list so this will have to do...
	inputSpecieNameChange($event){

		//console.log("$event: ", $event.key);

		if($event.key == 'Enter'){
			//transmit to a higher power what was seleted
			this.specieSelectedEvent.emit(this.selectedSpecie.id);
		}else if($event.key  == 'ArrowUp'){

			//select last element if no is selected
			if(this.selectedSpecie == undefined && this.specieListProsessed.length > 0){
				this.selectedSpecie = this.specieListProsessed[this.specieListProsessed.length-1];
			}else if(this.specieListProsessed.length > 1){
				//or move to prev
				this.selectedSpecie = this.getPrevObjetInProsessedArrat(this.selectedSpecie.id);
			}

		}else if($event.key  == 'ArrowDown'){

			//select first element if no is selected
			if(this.selectedSpecie == undefined && this.specieListProsessed.length > 0){
				this.selectedSpecie = this.specieListProsessed[0];
			}else if(this.specieListProsessed.length > 1){
				//or move to next
				this.selectedSpecie = this.getNextObjetInProsessedArrat(this.selectedSpecie.id);
			}

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


	}




}
