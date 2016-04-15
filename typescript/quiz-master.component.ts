import { Component, OnInit }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import { Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import { QuizSettingsService }  from './shared/quiz-settings.service';
import { QuizQuestionsService }  from './shared/quiz-questions.service';
import { QuizLogicService }  from './shared/quiz-logic.service';
import { QuizTranslationService }  from './shared/quiz-translation.service';
import { QuizResultsService }  from './shared/quiz-results.service';

import { QuizMediaSelectComponent }  from './media-select/quiz-media-select.component';
import { QuizAdditionalSettingsComponent }  from './media-additional-settings/quiz-additional-settings.component';
import { TheQuizComponent }  from './the-quiz/the-quiz.component';
import { QuizResultComponent }  from './quiz-results/quiz-results.component';


@Component({
	selector: 'birdid-quiz-master',
	templateUrl: 'app/quiz-master.component.html',
	styleUrls:  ['app/quiz-master.component.css'],
	directives: [
		QuizMediaSelectComponent,
		QuizAdditionalSettingsComponent,
		TheQuizComponent,
		QuizResultComponent,
		ROUTER_DIRECTIVES
	],
	providers: [
		ROUTER_PROVIDERS,
		HTTP_PROVIDERS,
		QuizSettingsService,
		QuizQuestionsService,
		QuizLogicService,
		QuizTranslationService,
		QuizResultsService
	]
})




export class QuizMasterComponent implements OnInit {
	  title = 'Birdid Quiz master!';

	  testString = "";

	  asyncDataLoaded = false;

	  currentActive = 0;
 	 //0 = mediatype selkect
 	 //1 = additional settings
 	 //2 = quiz
 	 //3 =  result

	  constructor(
		  private _quizSettingsService: QuizSettingsService,
		  private _quizQuestionService: QuizQuestionsService,
		  private _quizLogicService: QuizLogicService,
		  private _quizTranslationService: QuizTranslationService,
		  private _quizResultsService: QuizResultsService,
		  private _router: Router
	  ){

		  //looking for route change
		  _router.subscribe((newRoute) => this.onRouteChange(newRoute))

	  }

	  onRouteChange(newRoute){

		  console.log("Route change: ", newRoute );

		  //mostly only used for dev bar on top currently
		  if(newRoute == 'mediaSelect'){
			  this.currentActive = 0;
		  }else if(newRoute == 'mediaAdditionalSettings'){
			  this.currentActive = 1;
		  }else if(newRoute == 'mediaQuiz'){
			  this.currentActive = 2;
		  }else if(newRoute == 'mediaQuizResults'){
			  this.currentActive = 3;
		  }

	  }

	  ngOnInit() {

		  //load data from server
		this._quizTranslationService.initialize();
		this._quizSettingsService.initialize();

	 }

	  nextComponent(){

		  this.currentActive ++;
		  if(this.currentActive > 3){
			  this.currentActive = 0;
		  }


	  }

	  gotoComponent(compID){

	    this.currentActive = compID;

	  }

	  subIsActive(compID){

		  if(this.currentActive == compID){
			  return true
		  }else{
			  return false;
		  }


	  }


}
