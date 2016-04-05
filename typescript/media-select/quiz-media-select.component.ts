import { Component }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';

import { QuizSettingsService }  from './../shared/quiz-settings.service';

@Component({
	selector: 'birdid-quiz-media-select',
	templateUrl: 'app/media-select/quiz-media-select.component.html',
	directives: [

	],
	providers: [
	  HTTP_PROVIDERS
	]
})


export class QuizMediaSelectComponent {

	mediaTypes = ['Image', 'Sound', 'Video'];

	title = 'Birdid Quiz, select your media type:';

	constructor(
		private _quizSettingsService: QuizSettingsService
	){}

	selectMediaType(mediaType){

		if(!this._quizSettingsService.setMediaType(mediaType)){

			console.log("Nope", mediaType);

		}else{

			console.log("cuccess");
			//TODO: GO TO NEXT COMPONENT!

		}



	}

}
