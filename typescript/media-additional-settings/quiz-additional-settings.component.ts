import { Component, EventEmitter, Input, OnInit }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import { Router } from 'angular2/router';

import { QuizSettingsService }  from './../shared/quiz-settings.service';
import { QuizResultsService }  from './../shared/quiz-results.service';

import { ResultlistComponent }  from './../shared.component/resultlist.component';
import {QuizSpecieService} from "../shared/quiz-specie.service";
import { QuizTranslationService }  from './../shared/quiz-translation.service';

@Component({
	selector: 'birdid-quiz-addditional-settings',
	templateUrl: 'app/media-additional-settings/quiz-additional-settings.component.html',
    styleUrls:  ['app/media-additional-settings/quiz-additional-settings.component.css'],

    directives: [
		ResultlistComponent
	],
	providers: [

	],
})
export class QuizAdditionalSettingsComponent implements OnInit{
	//translation varibles
	title;
	selectAreaTitle;
	diffLevelTitle;
	nrOfQuestionsTitle;
	durationTitle;
	alternativesTitle;
	selSpeciesTitle;
	startQuizButton;
	yesButton;
	noButton;
	unlimitedButton;
	secButton;


	//mediaDiff = ['1', '2', '3', '4'];
   // numberOfQuestions = ['10','30','60']; for the beggining we do not check against the array
    mediaDiff;
    numberOfQuestions;
	areaList=[];
	selectedArea;
	quizHighscoreData;
	quizHighscoreDataLimit50;
	quizHighscoreLoaded = false;
	quizSettings;
	selSpecie = false;
	help = false;
	yes;
	no = "active";
	loading = false;

	updateResultlistIncrement = 0;


	constructor(
		private _quizSettingsService: QuizSettingsService,
		private _quizSpeciesService: QuizSpecieService,
		private _router: Router,
		private _quizResultsService: QuizResultsService,
		private _quizTranslationService: QuizTranslationService
	){}


	ngOnInit() {
		//translations
		this.title = this._quizTranslationService.getTranslationByID(340);
		this.selectAreaTitle = this._quizTranslationService.getTranslationByID(6);
		this.diffLevelTitle = this._quizTranslationService.getTranslationByID(170);
		this.nrOfQuestionsTitle = this._quizTranslationService.getTranslationByID(174);
		this.durationTitle = this._quizTranslationService.getTranslationByID(124);
		this.alternativesTitle = this._quizTranslationService.getTranslationByID(113);
		this.selSpeciesTitle = this._quizTranslationService.getTranslationByID(248);
		this.startQuizButton = this._quizTranslationService.getTranslationByID(149);
		this.yesButton = this._quizTranslationService.getTranslationByID(482);
		this.noButton = this._quizTranslationService.getTranslationByID(483);
		this.unlimitedButton = this._quizTranslationService.getTranslationByID(194);
		this.secButton = this._quizTranslationService.getTranslationByID(111);

		this._quizSettingsService.setMediaDiff(1);
		this._quizSettingsService.selectNumberOfQuestions(10);
		this._quizSettingsService.setDuration(0);
		this._quizSettingsService.setAlternatives(true);
		this.getAreaList();
		this.quizSettings = this._quizSettingsService.getQuizSettings();
		this._quizSettingsService.setHelp(false);

		//console.log("My area: ", this._quizSettingsService.getCurrentAreaName());

	}

	updatehighscorelist(){

		//ugly solution, but it works. It forces an onInput hange event in highscorelist and it loads the new list
		this.updateResultlistIncrement ++;

	}




	onSetArea(){
		 this._quizSettingsService.setArea(this.selectedArea);
		 //console.log("Selected area:", this.selectedArea);
		 this.updatehighscorelist();

	}


	getAreaList(){
		this.areaList=this._quizSettingsService.getAreaList();
	}


    onSelectDiff(selectedDiff: number){
		console.log("selectedDiff:", selectedDiff);
        this._quizSettingsService.setMediaDiff(selectedDiff);
		this.updatehighscorelist();

    }

	matchCurrentSelectedDiff(diff){
		if(diff == this._quizSettingsService.getMediaDiff()){
			return true;
		}else{
			return false;
		}
	}


    onSelectNumQuestions(selectedNumberOfQuestions: number){
        this._quizSettingsService.selectNumberOfQuestions(selectedNumberOfQuestions);
    }

	matchCurrentNumberQuestion(numberOfQuestions){
		if(numberOfQuestions == this._quizSettingsService.getNumberOfQuestions()){
			return true;
		}else{
			return false;
		}
	}

    onSelectDuration(duration: string){
        this._quizSettingsService.setDuration(parseInt(duration));
    }

	matchSelectedDuration(duration){
		if(duration == this._quizSettingsService.duration){
			return true;
		}else{
			return false;
		}
	}

    onSelectAlternative(selectedAlternative: boolean){
        this._quizSettingsService.setAlternatives(selectedAlternative)
    }

	matchSelectedAlternative(selectedAlternative){
		if(selectedAlternative == this._quizSettingsService.alternative){
			return true;
		}else{
			return false;
		}
	}

	onSelectSpecie(selectedSpecie: boolean) {
		this.selSpecie = selectedSpecie;

		if(selectedSpecie == true) {
			this.yes = "active";
		}else{
			this.yes = "";
		}
		if(selectedSpecie == false){
			this.no = "active"
		}else{
			this.no = "";
		}
	}
	setHelp(setHelp: boolean) {
		this._quizSettingsService.setHelp(setHelp);
	}

	matchSetHelp(setHelp){
		if(setHelp == this._quizSettingsService.help){
			return true;
		}else{
			return false;
		}
	}

	startQuiz(){
		this._quizSpeciesService.loadAreaId(this.selectedArea).subscribe((event) => (this.onAreaSubscribe(event)));
		this.loading = true;
	}

	onAreaSubscribe(event) {
		if (event == true) {
			if (this.selSpecie != true) {
				this._router.navigate(["QuizMediaQuiz"]);
			} else {
				this._router.navigate(["QuizSelectSpecies"]);
			}
		}
		
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
