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
	backButtonTranslation;

	//TODO, convert to array of JSON object
	mediaTypes = [
		[1, 'Image', 'glyphicon glyphicon-picture', true],
		[2, 'Sound', 'glyphicon glyphicon-volume-up', true],
		[3, 'Video', 'glyphicon glyphicon-facetime-video', true],
		[4, 'Several singingbirds', 'glyphicon glyphicon-volume-up', true],
		[0, 'Beginner quiz', 'glyphicon glyphicon-apple', true],
	];
	title = 'Birdid Quiz, select your media type:';

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
		//siningbirds
		this.mediaTypes[3][1] = this._quizTranslationService.getTranslationByID(312);
		//beginner quiz
		this.mediaTypes[4][1] = this._quizTranslationService.getTranslationByID(168);
		//back
		this.backButtonTranslation = this._quizTranslationService.getTranslationByID(115);

		//disable beginner quiz if on comp group qithout restrictions
		if(this._quizSettingsService.getCompetitionGroupID() >= 0){
			this.mediaTypes[4][3] = false;
		}


	}

	selectMediaType(mediaType){



		if(mediaType == 4){

			this._quizSettingsService.setSeveralSoundquiz();
			this._router.navigate(["QuizMediaAdditionalSettings"]);

		}else if(mediaType == 0){

			this._quizSettingsService.setBeginnerQuiz();
			this._router.navigate(["QuizMediaQuiz"]);

		}else{

			if(!this._quizSettingsService.setMediaType(mediaType)){

				console.log("Nope", mediaType);

			}else{

				this._quizSettingsService.setNormalQuiz();

				this._router.navigate(["QuizMediaAdditionalSettings"]);


			}

		}



	}

	backToWelcomeFromMediaSelect(){
		this._router.navigate(["QuizWelcome"]);

	}

}
