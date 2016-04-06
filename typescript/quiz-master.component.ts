import { Component, OnInit }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';

import { QuizSettingsService }  from './shared/quiz-settings.service';
import { QuizQuestionsService }  from './shared/quiz-questions.service';
import { QuizLogicService }  from './shared/quiz-logic.service';
import { QuizTranslationService }  from './shared/quiz-translation.service';

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
		QuizResultComponent
	],
	providers: [
		HTTP_PROVIDERS,
		QuizSettingsService,
		QuizQuestionsService,
		QuizLogicService,
		QuizTranslationService,
	]
})


export class QuizMasterComponent {
	  title = 'Birdid Quiz master!';

	  testString = "";

	  constructor(
		  private _quizSettingsService: QuizSettingsService,
		  private _quizQuestionService: QuizQuestionsService,
		  private _quizLogicService: QuizLogicService,
		  private _quizTranslationService: QuizTranslationService
	  ){}

	  ngOnInit() {

		this._quizTranslationService.initialize();
		//console.log("Trans 24 in english: ", this._quizTranslationService.getTranslationByID(24));


	  }


	 currentActive = 0;
	 //0 = mediatype selkect
	 //1 = additional settings
	 //2 = quiz
	 //3 =  result

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

	  mediaTypeSelectEvent(event){

		  if(event == "MediatypeSelected"){
			  this.currentActive = 1;
		  }


	  }

	  mediaAdditionalSettingsDoneEvent(event){

		  if(event == "MediaAditionalSettingsDone"){
			 this.currentActive = 2;
		 }

	  }

}
