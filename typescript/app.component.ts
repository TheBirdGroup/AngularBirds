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
import {SelectSpeciesComponent} from "./select-species/select-species.component";
import {FormalTestEndComponent} from "./formal-test/formal-test-end.component";
import {FormalTestStartComponent} from "./formal-test/formal-test-start.component";


import { QuizMasterComponent }  from './quiz-master.component';


import {QuizCompetitionGroupComponent} from "./competition-group/competition-group.component";


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
		SelectSpeciesComponent,
		QuizCompetitionGroupComponent,
		TheQuizComponent,
		QuizResultComponent,
		FormalTestEndComponent,
		FormalTestStartComponent,

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
	{path: '/competitionGroup',			name: 'QuizCompetitionGroup',			component: QuizCompetitionGroupComponent },
	{path: '/mediaSelectSpecies',		name: 'QuizSelectSpecies',				component: SelectSpeciesComponent },
  	{path: '/mediaQuiz',				name: 'QuizMediaQuiz',					component: TheQuizComponent },
	{path: '/mediaQuizResults',			name: 'QuizMediaQuizResults',			component: QuizResultComponent  },
	{path: '/formalTestStart',			name: 'QuizFormalTestStart',			component: FormalTestStartComponent  },
	{path: '/formalTestEnd',			name: 'QuizFormalTestEnd',				component: FormalTestEndComponent  }
])


export class AppComponent {
	  title = 'Birdid app component';
}
