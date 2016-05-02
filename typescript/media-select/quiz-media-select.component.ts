import { Component, EventEmitter, OnInit }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import { Router } from 'angular2/router';

import { QuizSettingsService }  from './../shared/quiz-settings.service';
import { QuizTranslationService }  from './../shared/quiz-translation.service';

@Component({
	selector: 'birdid-quiz-media-select',
	templateUrl: 'app/media-select/quiz-media-select.component.html',
	styleUrls:  ['app/media-select/quiz-media-select.component.css'],
	directives: [

	],
	providers: [
	  HTTP_PROVIDERS
  	],
	//outputs: ['quizMediaSelectedEvent']
})


export class QuizMediaSelectComponent implements OnInit{

	mediaTypes = [
		[1, 'Image', 'glyphicon glyphicon-picture'],
		[2, 'Sound', 'glyphicon glyphicon-volume-up'],
		[3, 'Video', 'glyphicon glyphicon-facetime-video'],
		[4, 'Several singingbirds', 'glyphicon glyphicon-volume-up'],
	];
	title = 'Birdid Quiz, select your media type:';
	//quizMediaSelectedEvent = new EventEmitter<string>();

	constructor(
		private _quizSettingsService: QuizSettingsService,
		private _quizTranslationService: QuizTranslationService,
		private _router: Router
	){}

	ngOnInit() {

		//add translations:
		//image
		this.mediaTypes[0][1] = this._quizTranslationService.getTranslationByID(4);
		//sound
		this.mediaTypes[1][1] = this._quizTranslationService.getTranslationByID(5);
		//video
		this.mediaTypes[2][1] = this._quizTranslationService.getTranslationByID(169);

		//console.log("media t: ", this.mediaTypes[0][1]);

	}

	selectMediaType(mediaType){

		if(mediaType == 4){

			this._quizSettingsService.setMediaType(2);
			this._quizSettingsService.setQuizType(2);
			this._router.navigate(["QuizMediaAdditionalSettings"]);

		}else{

			if(!this._quizSettingsService.setMediaType(mediaType)){

				console.log("Nope", mediaType);

			}else{

				//console.log("scuccess");
				//Const for value?
				//this.quizMediaSelectedEvent.emit("MediatypeSelected");
				this._quizSettingsService.setQuizType(1);
				this._router.navigate(["QuizMediaAdditionalSettings"]);

			}

		}



	}

}
