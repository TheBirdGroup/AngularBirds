import { Component, OnInit }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';


import { QuizSettingsService }  from './shared/quiz-settings.service';
import { QuizQuestionsService }  from './shared/quiz-questions.service';
import { QuizLogicService }  from './shared/quiz-logic.service';
import { QuizTranslationService }  from './shared/quiz-translation.service';
import { QuizResultsService }  from './shared/quiz-results.service';

import { QuizMediaSelectComponent }  from './media-select/quiz-media-select.component';
import { QuizAdditionalSettingsComponent }  from './media-additional-settings/quiz-additional-settings.component';
import { TheQuizComponent }  from './the-quiz/the-quiz.component';
import { QuizResultComponent }  from './quiz-results/quiz-results.component';


import { QuizMasterComponent }  from './quiz-master.component';

@Component({
	selector: 'birdid-idclient-main',
	template: `
	  <birdid-quiz-master></birdid-quiz-master>
	`,
	styleUrls: ['app/app.component.css'],
	directives: [
		QuizMasterComponent,
		QuizMediaSelectComponent,
		QuizAdditionalSettingsComponent,
		TheQuizComponent,
		QuizResultComponent,
		ROUTER_DIRECTIVES
	],
	providers: [
	  HTTP_PROVIDERS,
	  ROUTER_PROVIDERS
	]
})

@RouteConfig([
	{path: '/mediaSelect', 				name: 'QuizMediaSelect', 				component: QuizMediaSelectComponent, useAsDefault: true},
    {path: '/mediaAdditionalSettings', 	name: 'QuizMediaAdditionalSettings', 	component: QuizAdditionalSettingsComponent  },
  	{path: '/mediaQuiz',				name: 'QuizMediaQuiz',					component: TheQuizComponent },
	{path: '/mediaQuizResults',			name: 'QuizMediaQuizResults',			component: QuizResultComponent  }
])


export class AppComponent {
	  title = 'Birdid app component';
}
