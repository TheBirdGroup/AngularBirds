import { Component, EventEmitter, Input, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import { QuizSettingsService }  from './../shared/quiz-settings.service';



@Component({
    selector: 'birdid-select-species',
    templateUrl: 'app/select-species/select-species.component.html'

})
export class SelectSpeciesComponent implements OnInit {
    title = "Select species";

    specieList = [];
    selectedSpecie;
    displaySelectedSpecies = [];
    arrayOfSelectedSpecies = [];
    i = 0;
    j = 0;

    mockSpecies = [
        {"id": "1", "name":"Lars"},
        {"id": "2", "name":"Greger"},
        {"id": "3", "name":"Mile"},
        {"id": "4", "name":"Mariya"},

    ];


    
    constructor(
        private _quizSettingsService: QuizSettingsService,
        private _router: Router
    ){}

    ngOnInit() {
        this._quizSettingsService.getSpecieList();
        console.log(this.specieList);
        this.getSpecieList();

    }
    
    selectSpecie(){
        this.displaySelectedSpecies[this.i++] = this.selectedSpecie.name;
        this.arrayOfSelectedSpecies[this.j++] = this.selectedSpecie.id;
        this._quizSettingsService.setSpecie(this.arrayOfSelectedSpecies);
        console.log(this.specieList[1]);
    }
    getSpecieList(){
        this.specieList=this._quizSettingsService.getSpecieList();
    }
    
}



