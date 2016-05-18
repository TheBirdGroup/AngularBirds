import { Component, EventEmitter, Input, OnInit, OnChanges }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import { Router } from 'angular2/router';

import { QuizSettingsService }  from './../shared/quiz-settings.service';
import { QuizResultsService }  from './../shared/quiz-results.service';

import { ResultlistComponent }  from './../shared.component/resultlist.component';

import {QuizCompetitionService} from '../shared/quiz-competition-group.service';
import { QuizChangingLanguageService }  from './../shared/quiz-changing-language.service';

@Component({
	selector: 'birdid-quiz-competition-group-info',
	templateUrl: 'app/competition-group/quiz-competition-group-info.component.html',
    styleUrls:  ['app/competition-group/quiz-competition-group-info.component.css'],

    directives: [
		ResultlistComponent
	],
	providers: [


	],
	inputs: ['competitionGroup'],
})
export class QuizCompetitionGroupInfoComponent implements OnInit, OnChanges{

	title = "comp info"
	competitionGroup = null;
	displayInfo = false;
	noRestrictions = false;


	constructor(
		private _quizSettingsService: QuizSettingsService,
		private _router: Router,
		private _quizResultsService: QuizResultsService,
		private _quizCompetitionGroupService: QuizCompetitionService,
        private _http: Http,
		private _quizChangingLanguageService: QuizChangingLanguageService
	){}

	ngOnChanges(){

		if(this.competitionGroup != null){
			this.displayInfo = true;
			console.log("this.competitionGroup.restrict_filtes: ", this.competitionGroup.restrict_filtes);
			if(this.competitionGroup.restrict_filtes){
				this.noRestrictions = false;
			}else{
				this.noRestrictions = true;
			}
		}else{
			this.displayInfo = false;
		}

	}

	ngOnInit() {

	}



}
