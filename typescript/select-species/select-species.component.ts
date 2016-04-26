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
       // console.log(this.arrayOfSelectedSpecies);
    }
    getSpecieList(){
		//console.log("this._quizSpeciesService.getSpecieList(): ", this._quizSpeciesService.getSpecieList());
        this.specieList=this._quizSpeciesService.getSpecieList();
    }

    deleteSpecie(specie){
        this.j = 0;
        this.i = 0;
        let tempSpecieNames = [];
        let tempSpecieId = [];
        this.delSpecieId = specie.id;
        this.delSpecieName = specie;

        for (let p of Object.keys(this.displaySelectedSpecies)) {
            if(this.displaySelectedSpecies[this.j].id != this.delSpecieName.id) {
                tempSpecieNames.push(this.displaySelectedSpecies[p]);
                this.j++;
            }
        }
        this.displaySelectedSpecies = tempSpecieNames;
        console.log(this.displaySelectedSpecies, "Name array");


        for (let k of Object.keys(this.arrayOfSelectedSpecies)) {
            if(this.arrayOfSelectedSpecies[this.i] != this.delSpecieId) {
                tempSpecieId.push(this.arrayOfSelectedSpecies[k]);
                this.i++;
            }
        }
        this.arrayOfSelectedSpecies = tempSpecieId;
        console.log(this.arrayOfSelectedSpecies, "ID array");
        
    }
    postSpeciesId(){
        this._quizSpeciesService.setSpecie(this.arrayOfSelectedSpecies);
    }

}
