import { Component }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';

import { QuizSettingsService }  from './shared/quiz-settings.service';
import { QuizQuestionsService }  from './shared/quiz-questions.service';

import { QuizMediaSelectComponent }  from './media-select/quiz-media-select.component';
import { QuizAdditionalSettingsComponent }  from './media-additional-settings/quiz-additional-settings.component';
import { TheQuizComponent }  from './the-quiz/the-quiz.component';
import { QuizResultComponent }  from './quiz-results/quiz-results.component';


@Component({
	selector: 'birdid-quiz-master',
	templateUrl: 'app/quiz-master.component.html',
	directives: [
		QuizMediaSelectComponent,
		QuizAdditionalSettingsComponent,
		TheQuizComponent
	],
	providers: [
	  HTTP_PROVIDERS,
	  QuizSettingsService,
	  QuizQuestionsService,
	  QuizResultComponent
	]
})


export class QuizMasterComponent {
	  title = 'Birdid Quiz master!';

	  constructor(
		  private _quizSettingsService: QuizSettingsService,
		  private _quizQuestionService: QuizQuestionsService
	  ){}


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
