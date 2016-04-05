import { Component, EventEmitter }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';

import { QuizSettingsService }  from './../shared/quiz-settings.service';

@Component({
	selector: 'birdid-quiz-addditional-settings',
	templateUrl: 'app/media-additional-settings/quiz-additional-settings.component.html',
	directives: [

	],
	providers: [
	  HTTP_PROVIDERS
  ],
  outputs: ['quizMediaSettingsEvent']
})


export class QuizAdditionalSettingsComponent {
	title = 'Birdid Quiz media additional settings!';
	mediaDiff = ['Lvl1', 'Lvl2', 'Lvl3'];

	quizMediaSettingsEvent = new EventEmitter<string>();

	constructor(
		private _quizSettingsService: QuizSettingsService
	){}

	selectMediaDiff(mediaDifficulity){

		if(!this._quizSettingsService.setMediaDiff(mediaDifficulity)){

			console.log("Nope", mediaDifficulity);

		}else{

			console.log("scuccess");
			//Const for value?
			this.quizMediaSettingsEvent.emit("MediaAditionalSettingsDone");

		}



	}


}
