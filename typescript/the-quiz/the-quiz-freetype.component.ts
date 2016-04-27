import { Component, EventEmitter, OnInit, ViewChild, AfterViewInit, ElementRef }       from 'angular2/core';
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

	]
	//inputs: ['mediaID:usingMediaID'], //using ALIAS
})


export class TheQuizFreetypeComponent implements OnInit{

	formSpecieName;
	selectedSpecie;

	specieList;
	specieListProsessed;

	constructor(
		private _quizSettingsService: QuizSettingsService,
		private _quizSpeciesService: QuizSpecieService,
		private _element: ElementRef){}

	ngOnInit() {

		this.specieList = this._quizSpeciesService.getSpecieList();
		this.specieListProsessed = this.specieList;

	}

	ngAfterViewInit() {



	}

	//well, pipes did not work, neither did pre prosessing of list so this will have to do...
	inputSpecieNameChange(){

		this.specieListProsessed = [];

		for (let id of Object.keys(this.specieList)) {

			//if formSpecieName is a substring of name in list, or there is no formSpecieName
			if(this.specieList[id].name.toLowerCase().indexOf(this.formSpecieName.toLowerCase()) >= 0 || this.formSpecieName.length == 0){

				this.specieListProsessed.push(this.specieList[id]);

			}

		}



	}




}
