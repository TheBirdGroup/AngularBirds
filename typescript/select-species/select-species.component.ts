import { Component, EventEmitter, Input, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';



@Component({
    selector: 'birdid-select-species',
    templateUrl: 'app/select-species/select-species.component.html',
    styleUrls:  [''],

    directives: [

    ],
    providers: [

    ],
    outputs: ['']
})
export class SelectSpeciesComponent implements OnInit {
    title = "Select species";

    constructor(
        private _router: Router
    ){}

    ngOnInit() {

    }
}



