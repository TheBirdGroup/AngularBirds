import { Component }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';

@Component({
	selector: 'birdid-quiz-addditional-settings',
	template: `
	  <h1>{{title}}</h1>
	`,
	directives: [

	],
	providers: [
	  HTTP_PROVIDERS
	]
})


export class QuizAdditionalSettingsComponent {
	  title = 'Birdid Quiz media additional settings!';
}
