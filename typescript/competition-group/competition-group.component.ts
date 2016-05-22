import { Component, EventEmitter, Input, OnInit,OnChanges }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import { Router } from 'angular2/router';

import { QuizSettingsService }  from './../shared/quiz-settings.service';
import { QuizResultsService }  from './../shared/quiz-results.service';

import { ResultlistComponent }  from './../shared.component/resultlist.component';

import {QuizCompetitionService} from '../shared/quiz-competition-group.service';
import { QuizChangingLanguageService }  from './../shared/quiz-changing-language.service';

import { QuizCompetitionGroupInfoComponent }  from './../competition-group/competition-group-info.component';

import { QuizSpecieService }  from './../shared/quiz-specie.service';
import { QuizAuthenticationService } from '../shared/quiz-authentication.service';

@Component({
	selector: 'birdid-quiz-competition-group',
	templateUrl: 'app/competition-group/quiz-competition-group.component.html',
    styleUrls:  ['app/competition-group/quiz-competition-group.component.css'],

    directives: [
		ResultlistComponent,
		QuizCompetitionGroupInfoComponent
	],
	providers: [


	],
})
export class QuizCompetitionGroupComponent implements OnInit{
	title = 'Competition Groups';

	competitionGroupID;
	competitionGroups;
	competitionGroupsProsessed;
	selectedGroupID;
	updateResultlistIncrement=0;
	selectedCompetitionGroupData = null;
	loading = false;
	languageList=[];

	filterGroupName = "";
	needAccessCode;
	groupAccessCode=null;

	inputGroupAccessCode = "";

	errorMesageCompGroup = "";

	canStartCompeting = false;

	constructor(
		private _quizSettingsService: QuizSettingsService,
		private _router: Router,
		private _quizResultsService: QuizResultsService,
		private _quizCompetitionGroupService: QuizCompetitionService,
        private _http: Http,
		private _quizChangingLanguageService: QuizChangingLanguageService,
		private _quizSpeciesService: QuizSpecieService,
		private _quizAuthenticationService: QuizAuthenticationService
	){}

    storeCompetitionGroupSettings(){

        //setup default
        this._quizSettingsService.setMediaType(this.selectedCompetitionGroupData.media_type_id);
        this._quizSettingsService.setNormalQuiz();
        this._quizSettingsService.setMediaDiff(this.selectedCompetitionGroupData.media_difficulty);
        this._quizSettingsService.selectNumberOfQuestions(this.selectedCompetitionGroupData.num_questions);
        this._quizSettingsService.setDuration(this.selectedCompetitionGroupData.time_limit);
        this._quizSettingsService.setAlternatives(this.selectedCompetitionGroupData.use_specie_list);
        this._quizSettingsService.setArea(this.selectedCompetitionGroupData.area_id);

    }

	ngOnInit() {
		this.getCompetitionGroups();


	}



	startQuiz(){
		console.log(this._router);
		if(this.selectedCompetitionGroupData.restrict_filtes){
			this.storeCompetitionGroupSettings();
	       	this._router.navigate(["QuizMediaQuiz"]);
		}else{
			this._router.navigate(["QuizMediaSelect"]);
		}


	}

	getCompetitionGroups(){
		this.competitionGroups = this._quizCompetitionGroupService.getCompetitionGroups();
		this.competitionGroupsProsessed = this.competitionGroups;

	}

	inputGroupName(event){
		this.prosessCompGroups();
	}

	prosessCompGroups(){


		this.competitionGroupsProsessed = [];

		for (let id of Object.keys(this.competitionGroups)) {

			//add all if undefined
			if(this.filterGroupName == undefined){

				this.competitionGroupsProsessed.push(this.competitionGroups[id]);
				continue;
			}

			//if formSpecieName is a substring of name in list, or there is no formSpecieName
			if(this.competitionGroups[id].name.toLowerCase().indexOf(this.filterGroupName.toLowerCase()) >= 0 || this.filterGroupName.length == 0){

				this.competitionGroupsProsessed.push(this.competitionGroups[id]);

			}

		}


	}

	selectGroup(selectedGroupID){

		this.selectedGroupID = selectedGroupID;


		if(this.isCompetitionGroupUsingAccessCode(selectedGroupID)){
			this.inputGroupAccessCode = "";
			this.needAccessCode = true;
			this.selectedCompetitionGroupData = null;
			this.errorMesageCompGroup = "Group required access code";
		}else{
			this.loading = true;
			this.needAccessCode = false;
			//unset password just in case previous used code
			this._quizSettingsService.setCompetitionGroupAccesssCode("");
			//this is updating the tables that show the results
			this._quizCompetitionGroupService.loadSelectedCompetitionGroup(this._quizSettingsService.getQuizSettings(), selectedGroupID).subscribe((responce) =>{
				this.onGroupInfoLoaded();
			});
		}

	}

	checkAccessCode(groupAccessCode){

		this.groupAccessCode = this.inputGroupAccessCode;
		this.loading = true;

		//this is updating the tables that show the results
		this._quizCompetitionGroupService.loadSelectedCompetitionGroup(this._quizSettingsService.getQuizSettings(), this.selectedGroupID, this.groupAccessCode).subscribe((responce) =>{
			let temGroup =	this._quizCompetitionGroupService.getSelectedCompetitionGroup()
			if(temGroup.codeCorrect){
				this.needAccessCode=false;
				this.loading = false;
				this.errorMesageCompGroup = "";
				this._quizSettingsService.setCompetitionGroupAccesssCode(this.groupAccessCode);
				this.onGroupInfoLoaded();
			}else{
				this.loading = false;
				this.errorMesageCompGroup = "worng password/access code"
			}

		});

	}

	isCompetitionGroupUsingAccessCode(groupID){
		for (let id of Object.keys(this.competitionGroups)){
			if (this.competitionGroups[id].id == groupID){
				if (this.competitionGroups[id].usingAccessCode == true){
					return true;
				}
			}
		}
		return false;
	}

	onGroupInfoLoaded(){

		this._quizSettingsService.setCompetitionGroupID(this.selectedGroupID);
		this.updateResultlistIncrement++;
		this.selectedCompetitionGroupData =	this._quizCompetitionGroupService.getSelectedCompetitionGroup()

		 if(this.selectedCompetitionGroupData.num_attempts > 0 && this.selectedCompetitionGroupData.num_attempts_left == 0){
			//no attems left!

			if(this._quizAuthenticationService.getAuthenticated()){
				//is logged inn
				this.errorMesageCompGroup = "no attems left for you!";

			}else{
				this.errorMesageCompGroup = "You need to log in for this group!";
			}

		}else if(!this._quizAuthenticationService.getAuthenticated() && this.selectedCompetitionGroupData.usingAccessCode){
				//is logged inn
				this.errorMesageCompGroup = "You need to be logged inn!!";

		}else{
			//all ok!
			this.errorMesageCompGroup = "";

			let compSpecieList = this.selectedCompetitionGroupData["specieList"];
			this._quizSpeciesService.clearSelectedSpecies();

			if(compSpecieList["usingSpecieList"]){

				let storeArray = []
				for(let i = 0; i < compSpecieList["numberOfSpecies"]; i++){
					storeArray.push(compSpecieList[i]);
				}

				this._quizSpeciesService.setSelectedSpecie(storeArray);


			}

			this.canStartCompeting = true;

		}

		this.loading = false;


	}

	backToWelcomeFromCompetitionGroup(){
		this._router.navigate(["QuizWelcome"]);
	}


}
