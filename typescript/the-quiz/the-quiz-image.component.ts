import { Component, EventEmitter }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';


@Component({
	selector: 'birdid-the-quiz-image',
	templateUrl: 'app/the-quiz/the-quiz-image.component.html',
	directives: [

	],
	providers: [
	  HTTP_PROVIDERS
	],
	inputs: ['mediaID:usingMediaID'], //using ALIAS
})


export class TheQuizImageComponent {
	title = 'Birdid Quiz TheQuizComponent!';

	imageURLStart = "https://hembstudios.no//birdid/IDprogram/getMedia.php?mediaID=";

    mediaID = 0;


}
