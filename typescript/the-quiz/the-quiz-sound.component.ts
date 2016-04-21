import { Component, EventEmitter, OnInit }       from 'angular2/core';
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

	mediaURLStart = "https://hembstudios.no/birdid/";
	extraSiteID;
	soundMiddleURL = ""

    mediaURL = "";

	constructor(private _quizSettingsService: QuizSettingsService){}

	ngOnInit() {

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


}
