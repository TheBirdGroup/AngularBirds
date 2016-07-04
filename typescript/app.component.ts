import { Component, OnInit }       from '@angular/core';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';


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
import {ErrorComponent} from "./shared.component/error.component";


import { QuizMasterComponent }  from './quiz-master.component';


import {QuizCompetitionGroupComponent} from "./competition-group/competition-group.component";
import {QuizSummaryComponent} from "./quiz-results/quiz-summary.component";
import {QuizWelcomeComponent} from "./quiz-welcome/quiz-welcome.component";
import {QuizChangingLanguageComponent} from "./shared.component/changing-language.component";



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
		QuizSummaryComponent,
		QuizWelcomeComponent,
		QuizChangingLanguageComponent,


		ROUTER_DIRECTIVES
	],
	providers: [
	  HTTP_PROVIDERS,
	  ROUTER_PROVIDERS
	]
})

@RouteConfig([
	{path: '/mediaSelect', 				name: 'QuizMediaSelect', 				component: QuizMediaSelectComponent },
    {path: '/mediaAdditionalSettings', 	name: 'QuizMediaAdditionalSettings', 	component: QuizAdditionalSettingsComponent  },
	{path: '/competitionGroup',			name: 'QuizCompetitionGroup',			component: QuizCompetitionGroupComponent },
	{path: '/mediaSelectSpecies',		name: 'QuizSelectSpecies',				component: SelectSpeciesComponent },
  	{path: '/mediaQuiz',				name: 'QuizMediaQuiz',					component: TheQuizComponent },
	{path: '/mediaQuizResults',			name: 'QuizMediaQuizResults',			component: QuizResultComponent  },
	{path: '/formalTestStart',			name: 'QuizFormalTestStart',			component: FormalTestStartComponent  },
	{path: '/formalTestEnd',			name: 'QuizFormalTestEnd',				component: FormalTestEndComponent  },
	{path: '/quizError/:errorID',		name: 'QuizError',						component: ErrorComponent  },
	{path: '/mediaQuizSummary',			name: 'QuizMediaQuizSummary',			component: QuizSummaryComponent	},
	{path: '/welcome',					name: 'QuizWelcome',					component: QuizWelcomeComponent, useAsDefault: true},
	{path: '/changingLanguage',			name: 'QuizChangingLanguage',			component: QuizChangingLanguageComponent},
])


export class AppComponent {
	  title = 'Birdid app component';
}
