import { Component }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';

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
	  title = 'Birdid Quiz media select yolo!';
}
