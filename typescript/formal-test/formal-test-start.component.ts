import { Component, EventEmitter, OnInit }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import { Router } from 'angular2/router';

import { QuizSettingsService }  from './../shared/quiz-settings.service';
import { QuizTranslationService }  from './../shared/quiz-translation.service';
import { QuizSpecieService } from "./../shared/quiz-specie.service";
import { QuizFormalTestService }  from './../shared/quiz-formal-test.service';

@Component({
	selector: 'birdid-formal-test-start',
	templateUrl: 'app/formal-test/formal-test-start.component.html',
	styleUrls:  ['app/formal-test/formal-test-start.component.css'],
	directives: [

	],
	providers: [
	  HTTP_PROVIDERS
  	],
	//outputs: ['quizMediaSelectedEvent']
})


export class FormalTestStartComponent implements OnInit{

	loading = false;
	codeOk = false;
	specieListLoaded = false;
	accessCodeWrong = false;
	formAccessCode = "oXT5a5ptKo";

	//quizMediaSelectedEvent = new EventEmitter<string>();

	constructor(
		private _quizSettingsService: QuizSettingsService,
		private _quizTranslationService: QuizTranslationService,
		private _quizSpeciesService: QuizSpecieService,
		private _quizFormalTestService: QuizFormalTestService,
		private _router: Router
	){}

	ngOnInit() {


	}

	onStartButtonClick(){

		this.loading = true;
		this._quizSpeciesService.loadAreaId(34)
			.subscribe((event) => (this.specieLostLoaded(event)));
		this._quizFormalTestService.confirmAccessCodeCorrect(this.formAccessCode)
			.subscribe((response) => (this.formalTestCodeStatus(response)));

	}


	formalTestCodeStatus(status){

		let tStatus = true;

		//TODO acually check if status is correct
		console.log("status formal test code:",status);
		console.log("status formal test code:",status.returnData);

		if(status.returnData == true){
			//code correct
			this.codeOk = true;

			this._quizSettingsService.setMediaType(status.mediaTypeID);
			this._quizSettingsService.setArea(status.areaID);
			this._quizSettingsService.setFormalTest(true);
			this._quizSettingsService.setFormalTestAccessCode(this.formAccessCode);
			this._quizSettingsService.setMediaDiff(7);
			this._quizSettingsService.setDuration(6); //20

			if(status.areaID == 0){ //WP
				this._quizSettingsService.selectNumberOfQuestions(60);
			}else{ //NARSONAL
				this._quizSettingsService.selectNumberOfQuestions(30);
			}



			this.startFormalTest();

		}else{

			this.codeOk = false;
			this.accessCodeWrong = true;
			this.loading = false;
			this.startFormalTest();

		}


	}


	startFormalTest(){

		if(this.codeOk && this.specieListLoaded){




			this._router.navigate(["QuizMediaQuiz"]);
		}



	}

	specieLostLoaded(status){

		if(status){

			this.specieListLoaded = true;
			this.startFormalTest();

		}else{
			throw new Error("quizSpeciesService.loadAreaId in formal test start")
		}

	}

}
