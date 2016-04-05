import { Component }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';

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
		TheQuizComponent,
		QuizResultComponent
	],
	providers: [
	  HTTP_PROVIDERS
	]
})


export class QuizMasterComponent {
	  title = 'Birdid Quiz master!';


	 currentActive = 0;

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

}
