import { Injectable } from 'angular2/core';
import { Http, Headers } from 'angular2/http';
import { Router } from 'angular2/router';

import 'rxjs/Rx';
//import {constants} from './../constants';


@Injectable()
export class QuizLoginService{

constructor(private _http: Http){}


    Login(mail,password){
        let theMail = mail;
        let thePassword = password;
        console.log(theMail,thePassword);

/*
the post request should be done on this : https://hembstudios.no/birdid/bird/loginControlAJAX.php
    */
    }

}
