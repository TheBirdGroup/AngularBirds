import { Component, EventEmitter, Input }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import { QuizSettingsService }  from './../shared/quiz-settings.service';

@Component({
	selector: 'birdid-quiz-addditional-settings',
	templateUrl: 'app/media-additional-settings/quiz-additional-settings.component.html',
	directives: [

	],
	providers: [
		QuizSettingsService
	],
	outputs: ['quizMediaSettingsEvent']
})
export class QuizAdditionalSettingsComponent {
	title = 'Birdid Quiz media additional settings!';
	//mediaDiff = ['1', '2', '3', '4'];
   // numberOfQuestions = ['10','30','60']; for the beggining we do not check against the array
    mediaDiff;
    numberOfQuestions;


	quizMediaSettingsEvent = new EventEmitter<string>();

	constructor(
		private _quizSettingsService: QuizSettingsService
	){}


    onSelectDiff(selectedDiff: number){
        this._quizSettingsService.setMediaDiff(selectedDiff);
    }
    onSelectNumQuestions(selectedNumberOfQuestions: number){
        this._quizSettingsService.selectNumberOfQuestions(selectedNumberOfQuestions);
    }
    onSelectDuration(duration: string){
        this._quizSettingsService.setDuration(duration);
    }
    onSelectAlternatives(SelectedAlternatives: string){
        this._quizSettingsService.setAlternatives(SelectedAlternatives)
    }
    
    
    
	/*selectMediaDiff(mediaDifficulity){
		if(this._quizSettingsService.setMediaDiff(mediaDifficulity)){

            console.log(mediaDifficulity+"media diff");
            //Const for value?
            //this.quizMediaSettingsEvent.emit("MediaAditionalSettingsDone");

		}else{
            console.log("Nope", mediaDifficulity);
		}

	}*/

   /* selectNumberOfQuestions(numberOfQuestions){
        if (this._quizSettingsService.selectNumberOfQuestions(numberOfQuestions)) {
            console.log(numberOfQuestions + 'number of questions')
        }
        else{
            console.log('something went wrong')
        }
    }*/

    



}