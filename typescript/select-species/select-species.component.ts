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
        this.displaySelectedSpecies.push(this.selectedSpecie);
        this.arrayOfSelectedSpecies.push(this.selectedSpecie.id);
       // console.log(this.arrayOfSelectedSpecies);
    }
    getSpecieList(){
		//console.log("this._quizSpeciesService.getSpecieList(): ", this._quizSpeciesService.getSpecieList());
        this.specieList=this._quizSpeciesService.getSpecieList();
    }

    deleteSpecie(specie){
        let tempSpecieNames = [];
        let tempSpecieId = [];
        this.delSpecieId = specie.id;
        this.delSpecieName = specie;

        for (let i of Object.keys(this.displaySelectedSpecies)) {
            if(this.displaySelectedSpecies[i].id != this.delSpecieName.id) {
                tempSpecieNames.push(this.displaySelectedSpecies[i]);
            }
        }
        this.displaySelectedSpecies = tempSpecieNames;
        console.log(this.displaySelectedSpecies, "Name array");


        for (let j of Object.keys(this.arrayOfSelectedSpecies)) {
            if(this.arrayOfSelectedSpecies[j] != this.delSpecieId) {
                tempSpecieId.push(this.arrayOfSelectedSpecies[j]);
            }
        }
        this.arrayOfSelectedSpecies = tempSpecieId;
        console.log(this.arrayOfSelectedSpecies, "ID array");
        
    }
    postSpeciesId(){
        this._quizSpeciesService.setSpecie(this.arrayOfSelectedSpecies);
        this._router.navigate(["QuizMediaQuiz"]);
    }

}
