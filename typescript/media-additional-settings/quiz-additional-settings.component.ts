import { Component, EventEmitter, Input, OnInit }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import { QuizSettingsService }  from './../shared/quiz-settings.service';

@Component({
	selector: 'birdid-quiz-addditional-settings',
	templateUrl: 'app/media-additional-settings/quiz-additional-settings.component.html',
	directives: [

	],
	providers: [
		
	],
	outputs: ['quizMediaSettingsEvent']
})
export class QuizAdditionalSettingsComponent implements OnInit{
	title = 'Birdid Quiz media additional settings!';
	//mediaDiff = ['1', '2', '3', '4'];
   // numberOfQuestions = ['10','30','60']; for the beggining we do not check against the array
    mediaDiff;
    numberOfQuestions;


	quizMediaSettingsEvent = new EventEmitter<string>();

	constructor(
		private _quizSettingsService: QuizSettingsService
	){}


	ngOnInit() {

		this._quizSettingsService.setMediaDiff(1);
		this._quizSettingsService.selectNumberOfQuestions(10);
		this._quizSettingsService.setDuration(0);
		this._quizSettingsService.setAlternatives("true")

	}


    onSelectDiff(selectedDiff: number){
        this._quizSettingsService.setMediaDiff(selectedDiff);
    }
    onSelectNumQuestions(selectedNumberOfQuestions: number){
        this._quizSettingsService.selectNumberOfQuestions(selectedNumberOfQuestions);
    }
    onSelectDuration(duration: string){
        this._quizSettingsService.setDuration(parseInt(duration));
    }
    onSelectAlternatives(SelectedAlternatives: string){
        this._quizSettingsService.setAlternatives(SelectedAlternatives)
    }



	startQuiz(){

		this.quizMediaSettingsEvent.emit("MediaAditionalSettingsDone");

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
