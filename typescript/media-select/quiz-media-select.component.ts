import { Component, EventEmitter }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';

import { QuizSettingsService }  from './../shared/quiz-settings.service';

@Component({
	selector: 'birdid-quiz-media-select',
	templateUrl: 'app/media-select/quiz-media-select.component.html',
	directives: [

	],
	providers: [
	  HTTP_PROVIDERS
  	],
	outputs: ['quizMediaSelectedEvent']
})


export class QuizMediaSelectComponent {

	mediaTypes = ['Image', 'Sound', 'Video'];
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
