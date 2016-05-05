import { Component, EventEmitter, Input, OnInit }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import { Router } from 'angular2/router';

import { QuizSettingsService }  from './../shared/quiz-settings.service';
import { QuizResultsService }  from './../shared/quiz-results.service';

import { ResultlistComponent }  from './../shared.component/resultlist.component';

import {QuizCompetitionService} from '../shared/quiz-competition-group.service';


@Component({
	selector: 'birdid-quiz-competition-group',
	templateUrl: 'app/competition-group/quiz-competition-group.component.html',
    styleUrls:  ['app/competition-group/quiz-competition-group.component.css'],

    directives: [
		ResultlistComponent
	],
	providers: [


	],
})
export class QuizCompetitionGroupComponent implements OnInit{
	title = 'Competition Groups';

	competitionGroupID;
	competitionGroups;
	selectedGroupID;
	updateResultlistIncrement=0;
	selectedCompetitionGroupData;
	loading = false;


	constructor(
		private _quizSettingsService: QuizSettingsService,
		private _router: Router,
		private _quizResultsService: QuizResultsService,
		private _quizCompetitionGroupService: QuizCompetitionService,
        private _http: Http
	){}

    storeCompetitionGroupSettings(){

        //setup default
        this._quizSettingsService.setMediaType(this.selectedCompetitionGroupData.media_type_id);
        this._quizSettingsService.setNormalQuiz();
        this._quizSettingsService.setMediaDiff(this.selectedCompetitionGroupData.media_difficulty);
        this._quizSettingsService.selectNumberOfQuestions(this.selectedCompetitionGroupData.num_questions);
        this._quizSettingsService.setDuration(this.selectedCompetitionGroupData.time_limit);
        this._quizSettingsService.setAlternatives(!this.selectedCompetitionGroupData.use_specie_list);
        this._quizSettingsService.setArea(this.selectedCompetitionGroupData.area_id);

    }

	ngOnInit() {
        this._quizSettingsService.setCompetitionGroupID(this.selectedGroupID);
		this._quizCompetitionGroupService.getCompetitionGroups();
		this.getCompetitionGroups();
	}

	startQuiz(){
		//console.log(this._router);
        this.storeCompetitionGroupSettings();
        this._router.navigate(["QuizMediaQuiz"]);
	}

	getCompetitionGroups(){
		this.competitionGroups=this._quizCompetitionGroupService.getCompetitionGroups();
		//console.log('this is COMPETITION GROUps', this.competitionGroups)
	}

	selectGroup(selectedGroupID){
		this.selectedGroupID=selectedGroupID
		console.log('test0',this.selectedGroupID)

		//this is updating the tables that show the results

		this.loading = true;

		this._quizCompetitionGroupService.loadSelectedCompetitionGroup(selectedGroupID).subscribe((responce) =>{
			this.onGroupInfoLoaded();
		});




	}

	onGroupInfoLoaded(){

		this.loading = false;
		this._quizSettingsService.setCompetitionGroupID(this.selectedGroupID)
		this.updateResultlistIncrement++;
		this.selectedCompetitionGroupData =	this._quizCompetitionGroupService.getSelectedCompetitionGroup(this.selectedGroupID)
		console.log('this is the data from the selected groupid', this.selectedCompetitionGroupData)

	}

}
