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
    delSpecieId;
    delSpecieName;


    constructor(
        private _quizSpeciesService: QuizSpecieService,
        private _router: Router
    ){}

    ngOnInit() {
        this._quizSpeciesService.getSpecieList();
        //console.log(this.specieList);
        this.getSpecieList();

    }

    selectSpecie(){
        this.displaySelectedSpecies[this.i++] = this.selectedSpecie;
        this.arrayOfSelectedSpecies[this.j++] = this.selectedSpecie.id;
        this._quizSpeciesService.setSpecie(this.arrayOfSelectedSpecies);
        console.log(this.arrayOfSelectedSpecies);
    }
    getSpecieList(){
		//console.log("this._quizSpeciesService.getSpecieList(): ", this._quizSpeciesService.getSpecieList());
        this.specieList=this._quizSpeciesService.getSpecieList();
    }

    deleteSpecie(specie){
        this.delSpecieId = specie.id;
        this.delSpecieName = specie.name;
        delete this.displaySelectedSpecies[this.delSpecieName];

        console.log(this.delSpecieName);
        console.log(this.displaySelectedSpecies);
        
    }

}
