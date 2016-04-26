import { Component, EventEmitter, OnInit, ViewChild, AfterViewInit, ElementRef }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';

import { NameSearchPipe }  from './../shared.pipe/name-search.pipe';

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
		NameSearchPipe
	]
	//inputs: ['mediaID:usingMediaID'], //using ALIAS
})


export class TheQuizFreetypeComponent implements OnInit{

	formSpecieName;
	selectedSpecie;

	specieList;

	constructor(
		private _quizSettingsService: QuizSettingsService,
		private _quizSpeciesService: QuizSpecieService,
		private _element: ElementRef){}

	ngOnInit() {

		this.specieList = this._quizSpeciesService.getSpecieList();

	}

	ngAfterViewInit() {



	}

	inputSpecieNameChange(){

		console.log("inputSpecieNameChange: ", this.formSpecieName);

	}



}
