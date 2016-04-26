import { Component, EventEmitter, Input, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import { QuizSpecieService }  from './../shared/quiz-specie.service';



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

    
    constructor(
        private _quizSpeciesService: QuizSpecieService,
        private _router: Router
    ){}

    ngOnInit() {
        this._quizSpeciesService.getSpecieList();
        console.log(this.specieList);
        this.getSpecieList();

    }
    
    selectSpecie(){
        this.displaySelectedSpecies[this.i++] = this.selectedSpecie;
        this.arrayOfSelectedSpecies[this.j++] = this.selectedSpecie[0];
        this._quizSpeciesService.setSpecie(this.arrayOfSelectedSpecies);
        console.log(this.arrayOfSelectedSpecies);
    }
    getSpecieList(){
        this.specieList=this._quizSpeciesService.getSpecieListJSON();
    }

    deleteSpecie(specie){

    }
    
}



