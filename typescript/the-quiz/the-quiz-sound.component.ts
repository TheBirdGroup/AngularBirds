import { Component, ViewChild, EventEmitter, OnInit }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';

import { QuizSettingsService }  from './../shared/quiz-settings.service';

@Component({
	selector: 'birdid-the-quiz-sound',
	templateUrl: 'app/the-quiz/the-quiz-sound.component.html',
	styleUrls:  ['app/the-quiz/the-quiz-sound.component.css'],
	directives: [

	],
	providers: [
	  HTTP_PROVIDERS
	],
	inputs: ['mediaURL:usingMediaURL'], //using ALIAS
})


export class TheQuizSoundComponent implements OnInit{
	title = 'Birdid Quiz TheQuizComponent!';
	@ViewChild("myAudio") myAudio;
	@ViewChild("progressBar") progressBar;

	progressPercent = 0;
	currentTime = 0;
	totTime = 0;
	maxWidth = 0;

	mediaURLStart = "https://hembstudios.no/birdid/";
	extraSiteID;
	soundMiddleURL = ""

    mediaURL = "";
	volume = 0.5;

	constructor(private _quizSettingsService: QuizSettingsService){}

	ngOnInit() {
		let audio = this.myAudio;
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

	}
	playAudio(){
		this.myAudio.nativeElement.play();
		console.log(this.myAudio);
	}

	pauseAudio(){
		this.myAudio.nativeElement.pause();
	}

	volumeIncrease(){
		this.volume+=0.1;
		if(this.volume>1){
			this.volume = 1;
		}
		this.myAudio.nativeElement.volume=this.volume;
	}

	volumeDecrease(){
		this.volume-=0.1;
		if(this.volume<0){
			this.volume = 0;
		}
		this.myAudio.nativeElement.volume=this.volume;
	}

	updateProgressbar(event){

		this.progressPercent = (this.myAudio.nativeElement.currentTime / this.myAudio.nativeElement.duration) * 100;
		console.log("this.progressPercent: ", this.progressPercent);

		this.currentTime = Math.floor(this.myAudio.nativeElement.currentTime);
		this.totTime = Math.floor(this.myAudio.nativeElement.duration);

		console.log('tot:',this.myAudio.nativeElement.duration , ' CURRENT: ', this.myAudio.nativeElement.currentTime)

		//console.log(this.progressPercent);

	}

	soundLoadedEvent(event){

		this.currentTime = Math.floor(this.myAudio.nativeElement.currentTime);
		this.totTime = Math.floor(this.myAudio.nativeElement.duration);

	}

	moveProgress(event){

		let offSet = ((event.offsetX)/4.41)/100;

		this.myAudio.nativeElement.currentTime = this.myAudio.nativeElement.duration * offSet;

		console.log(this.maxWidth, "Max width");
	}

}
