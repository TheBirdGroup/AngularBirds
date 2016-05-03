import { Component, ViewChild, EventEmitter, OnInit, OnChanges, OnDestroy,  ElementRef }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';

import { QuizSettingsService }  from './../shared/quiz-settings.service';

import { QuizQuestion }  from './../shared.class/the-quiz-question.class';
import { QuizSoundplayer }  from './../shared.class/the-quiz-soundplayer.class';

@Component({
	selector: 'birdid-the-quiz-sound',
	templateUrl: 'app/the-quiz/the-quiz-sound.component.html',
	styleUrls:  ['app/the-quiz/the-quiz-sound.component.css'],
	directives: [

	],
	providers: [
	  HTTP_PROVIDERS
	],
	inputs: ['specieQuestionObject', 'inbetweenQuestions'], //using ALIAS
})


export class TheQuizSoundComponent implements OnInit, OnChanges, OnDestroy{
	title = 'Birdid Quiz TheQuizComponent!';

	@ViewChild("progressBar") progressBar;
	@ViewChild("progressBarContainer") progressBarContainer;

	specieQuestionObject:QuizQuestion;
	quizSoundObject:QuizSoundplayer = null;

	inbetweenQuestions = false;

	progressPercent = 0;
	currentTime = 0;
	totTime = 0;
	maxWidth = 0;

	mediaURLStart = "https://hembstudios.no/birdid/";
	extraSiteID;
	soundMiddleURL = ""

    mediaURL = "";
	mediaURLs = [];
	volume = 0.5;

	constructor(
		private _quizSettingsService: QuizSettingsService,
		private _elementRef: ElementRef
	){}

	ngOnInit() {



	}

	ngOnChanges(){

		if(!this.inbetweenQuestions){

			let quizSettings = this._quizSettingsService.getQuizSettings();
			let siteID = quizSettings[0].siteID;
			if(siteID == 1){
				this.soundMiddleURL ="bird/db_media/sound/";
			}else if(siteID == 2){
				this.soundMiddleURL ="mammal/db_media/sound/";
			}else if(siteID == 3){
				this.soundMiddleURL ="track/db_media/sound/";
			}

			this.extraSiteID = "&siteID="+siteID;

			this.mediaURL = this.specieQuestionObject.getMediaSourses()[0].mediaUrl;
			this.mediaURLs = this.specieQuestionObject.getMediaSourses();

			if(this.quizSoundObject != null){
				this.quizSoundObject.destroy();
				this.quizSoundObject = null;
			}

			this.quizSoundObject = new QuizSoundplayer(true, true, this);
			this.quizSoundObject.loadMedia(this.mediaURLStart + this.soundMiddleURL, this.specieQuestionObject.getMediaSourses());

		}else{

			if(this.quizSoundObject != null){
				this.quizSoundObject.pause();
			}

		}

	}

	ngOnDestroy(){

		if(this.quizSoundObject != null){
			this.quizSoundObject.destroy();
			this.quizSoundObject = null;
		}

	}





	setCurrentAndTotalTime(current, total){

		this.currentTime = Math.floor(current);
		this.totTime = Math.floor(total);
		this.progressPercent = (current / total) * 100;

	}

	getSoundMiddleUrl(){

	}


	playAudio(){

		this.quizSoundObject.play();

	}

	pauseAudio(){

		this.quizSoundObject.pause();

	}

	volumeIncrease(){

		this.quizSoundObject.setVolume(0.1);

	}

	volumeDecrease(){

		this.quizSoundObject.setVolume(-0.1);

	}


	moveProgress(event){

		//let offSet = ((event.offsetX)/4.41)/100;

		//let startX = this.progressBar.nativeElement.offsetLeft;
		let totSize = this.progressBarContainer.nativeElement.offsetWidth;

		// console.log("event: ",event);
		//
		// console.log("totSize: ", totSize ," startX:", startX, " offSet:", offSet,  " event.offsetX: ", event.offsetX);

		this.quizSoundObject.seek(event.layerX / totSize);

		//this.myAudio.nativeElement.currentTime = this.myAudio.nativeElement.duration * offSet;

		//console.log(this.maxWidth, "Max width");
	}

}
