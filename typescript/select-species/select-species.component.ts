import { Component, EventEmitter, Input, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import { QuizSpecieService }  from './../shared/quiz-specie.service';
import {QuizSettingsService} from "../shared/quiz-settings.service";
import { QuizTranslationService }  from './../shared/quiz-translation.service';



@Component({
    selector: 'birdid-select-species',
    templateUrl: 'app/select-species/select-species.component.html',
    styleUrls:  ['app/select-species/select-species.component.css']

})
export class SelectSpeciesComponent implements OnInit {
    //translation variables
    titleTranslation;
    selectedSpeciesTranslation;
    startQuizTranslation;
    resetSelectedTranslation;


    specieList = [];
    selectedSpecie;
    arrayOfSelectedSpecies = [];
    delSpecieId;
    delSpecieName;

    constructor(
        private _quizSpeciesService: QuizSpecieService,
        private _router: Router,
        private _quizTranslationService: QuizTranslationService
    ){}

    ngOnInit() {
        //translations
        this.titleTranslation = this._quizTranslationService.getTranslationByID(248);
        this.selectedSpeciesTranslation = this._quizTranslationService.getTranslationByID(241);
        this.startQuizTranslation = this._quizTranslationService.getTranslationByID(149);
        this.resetSelectedTranslation = this._quizTranslationService.getTranslationByID(60);

        this._quizSpeciesService.getSpecieList();
        this._quizSpeciesService.loadSpecieList();
        this.getSpecieList();

        this.loadSpecieList();
    }

    selectSpecie() {
        if(this.isSpecieInList(this.selectedSpecie.id) != true){
            this.arrayOfSelectedSpecies.push(this.selectedSpecie)
        }else{
            alert("This specie has already been added!");
        }
    }

    isSpecieInList(id: number){
        for (let i of Object.keys(this.arrayOfSelectedSpecies)) {
            if (id == this.arrayOfSelectedSpecies[i].id) {
                return true;
            }
        }
        return false;
    }

    getSpecieList() {
        this.specieList = this._quizSpeciesService.getSpecieList();
    }

    deleteSpecie(specie) {
        let tempSpecieId = [];
        this.delSpecieId = specie;

        for (let j of Object.keys(this.arrayOfSelectedSpecies)) {
            if (this.arrayOfSelectedSpecies[j] != this.delSpecieId) {
                tempSpecieId.push(this.arrayOfSelectedSpecies[j]);
            }
        }
        this.arrayOfSelectedSpecies = tempSpecieId;
    }

    postSpeciesId() {
        this._quizSpeciesService.setSelectedSpecie(this.arrayOfSelectedSpecies);
        this._router.navigate(["QuizMediaQuiz"]);
    }

    loadSpecieList() {
        this.arrayOfSelectedSpecies = this._quizSpeciesService.loadSpecieList();
        console.log(this.arrayOfSelectedSpecies, " Array of ID loaded from server");

    }

    resetSpecieList(){
        this._quizSpeciesService.clearSelectedSpecies();
        this.arrayOfSelectedSpecies = [];
    }

}
