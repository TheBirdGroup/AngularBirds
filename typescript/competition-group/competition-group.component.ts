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
	errorM;

	constructor(
		private _quizSettingsService: QuizSettingsService,
		private _router: Router,
		private _quizResultsService: QuizResultsService,
		private _quizCompetitionGroupService: QuizCompetitionService,
        private _http: Http,
		private _quizChangingLanguageService: QuizChangingLanguageService,
		private _quizSpeciesService: QuizSpecieService
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
		//console.log("this are the copetition groups", this.competitionGroups)
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
		//console.log('test0',this.selectedGroupID)

		if(this.isCompetitionGroupUsingAccessCode(selectedGroupID)){
			this.needAccessCode=true;
			console.log("we need password",this.needAccessCode)

		}else{
			this.loading = true;
			this.needAccessCode=false;
			console.log("we DO NOT NEED password",this.needAccessCode)
			//this is updating the tables that show the results
			this._quizCompetitionGroupService.loadSelectedCompetitionGroup(this._quizSettingsService.getQuizSettings(), selectedGroupID).subscribe((responce) =>{
				this.onGroupInfoLoaded();
			});
		}

	}

	checkAccessCode(groupAccessCode){
		this.groupAccessCode=groupAccessCode;
		this.loading = true;
		console.log("we DO NOT NEED password",this.needAccessCode)
		//this is updating the tables that show the results
		this._quizCompetitionGroupService.loadSelectedCompetitionGroup(this._quizSettingsService.getQuizSettings(), this.selectedGroupID,this.groupAccessCode).subscribe((responce) =>{
			let temGroup =	this._quizCompetitionGroupService.getSelectedCompetitionGroup()
			if(temGroup.codeCorrect==true){
				this.needAccessCode=false;
				this.loading = false;
				this.onGroupInfoLoaded();
			}else{
				this.loading = false;
				this.errorM="worng password"
			}

			this.onGroupInfoLoaded();
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

		let compSpecieList = this.selectedCompetitionGroupData["specieList"];
		this._quizSpeciesService.clearSelectedSpecies();

		if(compSpecieList["usingSpecieList"]){

			let storeArray = []
			for(let i = 0; i < compSpecieList["numberOfSpecies"]; i++){
				storeArray.push(compSpecieList[i]);
			}

			this._quizSpeciesService.setSelectedSpecie(storeArray);
		}

		this.loading = false;
		//console.log("this.competitionGroupSelected:", this.selectedCompetitionGroupData, " id: ", this.selectedGroupID);

	}


}
