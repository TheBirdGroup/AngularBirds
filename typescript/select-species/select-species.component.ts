import { Component, EventEmitter, Input, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import { QuizSpecieService }  from './../shared/quiz-specie.service';



@Component({
    selector: 'birdid-select-species',
    templateUrl: 'app/select-species/select-species.component.html',
    styleUrls:  ['app/select-species/select-species.component.css']

})
export class SelectSpeciesComponent implements OnInit {
    title = "Select species";

    specieList = [];
    selectedSpecie;
    //displaySelectedSpecies = [];
    arrayOfSelectedSpecies = [];
    delSpecieId;
    delSpecieName;


    constructor(
        private _quizSpeciesService: QuizSpecieService,
        private _router: Router
    ){}

    ngOnInit() {
        this._quizSpeciesService.getSpecieList();
        this._quizSpeciesService.loadSpecieList();
        //console.log(this.specieList);
        this.getSpecieList();

        this.loadSpecieList();

    }

    selectSpecie() {
        //this.displaySelectedSpecies.push(this.selectedSpecie);
        this.arrayOfSelectedSpecies.push(this.selectedSpecie);
        // console.log(this.arrayOfSelectedSpecies);
    }

    getSpecieList() {
        //console.log("this._quizSpeciesService.getSpecieList(): ", this._quizSpeciesService.getSpecieList());
        this.specieList = this._quizSpeciesService.getSpecieList();
    }

    deleteSpecie(specie) {
       // let tempSpecieNames = [];
        let tempSpecieId = [];
        this.delSpecieId = specie;
       // this.delSpecieName = specie;
/*
        for (let i of Object.keys(this.displaySelectedSpecies)) {
            if (this.displaySelectedSpecies[i] != this.delSpecieName) {
                tempSpecieNames.push(this.displaySelectedSpecies[i]);
            }
        }
        this.displaySelectedSpecies = tempSpecieNames;
        console.log(this.displaySelectedSpecies, "Name array");
*/

        for (let j of Object.keys(this.arrayOfSelectedSpecies)) {
            if (this.arrayOfSelectedSpecies[j] != this.delSpecieId) {
                tempSpecieId.push(this.arrayOfSelectedSpecies[j]);
            }
        }
        this.arrayOfSelectedSpecies = tempSpecieId;
        console.log(this.arrayOfSelectedSpecies, "ID array");

    }

    postSpeciesId() {
        this._quizSpeciesService.setSelectedSpecie(this.arrayOfSelectedSpecies);
        this._router.navigate(["QuizMediaQuiz"]);
    }

    loadSpecieList() {
       // this.displaySelectedSpecies = this._quizSpeciesService.loadSpecieList();;
        this.arrayOfSelectedSpecies = this._quizSpeciesService.loadSpecieList();
        console.log(this.arrayOfSelectedSpecies, " Array of ID loaded from server");
        //console.log(this.displaySelectedSpecies, " Array of name loaded from server");

    }
}