import { Component }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';

import { QuizMediaSelectComponent }  from './media-select/quiz-media-select.component';
import { QuizAdditionalSettingsComponent }  from './media-additional-settings/quiz-additional-settings.component';
import { TheQuizComponent }  from './the-quiz/the-quiz.component';
import { QuizResultComponent }  from './quiz-results/quiz-results.component';


@Component({
	selector: 'birdid-quiz-master',
	template: `
	  <h1>{{title}}</h1>
	  <birdid-quiz-media-select></birdid-quiz-media-select>
	  <birdid-quiz-addditional-settings></birdid-quiz-addditional-settings>
	  <birdid-the-quiz></birdid-the-quiz>
	  <birdid-quiz-result></birdid-quiz-result>
	`,
	directives: [
		QuizMediaSelectComponent,
		QuizAdditionalSettingsComponent,
		TheQuizComponent,
		QuizResultComponent
	],
	providers: [
	  HTTP_PROVIDERS
	]
})


export class QuizMasterComponent {
	  title = 'Birdid Quiz master!';
}
