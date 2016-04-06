import { Component, EventEmitter }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';

import { QuizSettingsService }  from './../shared/quiz-settings.service';

@Component({
	selector: 'birdid-quiz-media-select',
	templateUrl: 'app/media-select/quiz-media-select.component.html',
	styleUrls:  ['app/media-select/quiz-media-select.component.css'],
	directives: [

	],
	providers: [
	  HTTP_PROVIDERS
  	],
	outputs: ['quizMediaSelectedEvent']
})


export class QuizMediaSelectComponent {

	mediaTypes = [
		[1, 'Image', 'glyphicon glyphicon-picture'],
		[2, 'Sound', 'glyphicon glyphicon-volume-up'],
		[3, 'Video', 'glyphicon glyphicon-facetime-video'],
	];
	title = 'Birdid Quiz, select your media type:';
	quizMediaSelectedEvent = new EventEmitter<string>();

	constructor(
		private _quizSettingsService: QuizSettingsService
	){}

	selectMediaType(mediaType){

		if(!this._quizSettingsService.setMediaType(mediaType)){

			console.log("Nope", mediaType);

		}else{

			console.log("cuccess");
			//Const for value?
			this.quizMediaSelectedEvent.emit("MediatypeSelected");

		}



	}

}
