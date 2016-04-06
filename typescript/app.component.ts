import { Component }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';

import { QuizMasterComponent }  from './quiz-master.component';

@Component({
	selector: 'birdid-idclient-main',
	template: `
	  <birdid-quiz-master></birdid-quiz-master>
	`,
	styleUrls: ['app/app.component.css'],
	directives: [
		QuizMasterComponent
	],
	providers: [
	  HTTP_PROVIDERS
	]
})


export class AppComponent {
	  title = 'Birdid app component';
}
