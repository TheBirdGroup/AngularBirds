import { Component, EventEmitter, OnInit }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';

import { QuizSettingsService }  from './../shared/quiz-settings.service';

@Component({
	selector: 'birdid-the-quiz-image',
	templateUrl: 'app/the-quiz/the-quiz-image.component.html',
	styleUrls:  ['app/the-quiz/the-quiz-image.component.css'],
	directives: [

	],
	providers: [
	  HTTP_PROVIDERS
	],
	inputs: ['mediaID:usingMediaID'], //using ALIAS
})


export class TheQuizImageComponent implements OnInit{
	title = 'Birdid Quiz TheQuizComponent!';

	imageURLStart = "https://hembstudios.no/birdid/IDprogram/getMedia.php?mediaID=";
	extraSiteID;

    mediaID = 0;

	constructor(private _quizSettingsService: QuizSettingsService){}

	ngOnInit() {

		let quizSettings = this._quizSettingsService.getQuizSettings();
		let siteID = quizSettings[0].siteID;

		this.extraSiteID = "&siteID="+siteID;

	}


}
