import { Injectable, OnInit, EventEmitter } from 'angular2/core';
import { Http, Headers } from 'angular2/http';
import { Router } from 'angular2/router';

import { LocalStorageService }  from './../shared/local-storage.service';
import { QuizSettingsService }  from './../shared/quiz-settings.service';

import 'rxjs/Rx';
//import {constants} from './../constants';


@Injectable()
export class QuizAuthenticationService{

    dataLoadedEventEmiter = new EventEmitter<boolean>();
    siteID = 1;
	langID = 2;

    //if logged in
    authenticated = false;


    constructor(
        private _http: Http,
        private _localStorageService: LocalStorageService,
        private _quizSettingsService: QuizSettingsService){}

    initialize(siteID, langID){

		this.siteID = siteID;
		this.langID = langID;

		setTimeout(() => {
			this.attemtAutologin();
		}, 0);

		return this.dataLoadedEventEmiter;

	}

    getAuthenticated(){
        return this.authenticated;
    }
    setAuthenticated(authenticated){
        this.authenticated = authenticated;
    }


    //login and registering
    authenticate(mail, password, autoLogin, action){

        autoLogin = true;

        let theMail = mail;
        let thePassword = password;
        // if (autoLogin == null){
        //     autoLogin = false;
        // }

        let theAction = action;

        let body = "email=" + theMail;
        body += "&password=" + thePassword;
        body += "&autologin=" + autoLogin;

        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post('https://hembstudios.no/birdid/bird/loginControlAJAX.php?action='+theAction+"&langID="+this.langID, body,{headers: headers})
            .map(response => response.json());

    }

    storeAutoLogin(response){

        if(response.autologinID != null && response.autologinID != undefined){
            this._localStorageService.set("authentication_autologinID", response.autologinID);
            this._localStorageService.set("authentication_autologinValue", response.autologinValue);
        }

    }

	removeAutoLogin(){
		this._localStorageService.remove("authentication_autologinID");
		this._localStorageService.remove("authentication_autologinValue");
	}

    //can have token without beein logged inn
    setAuthenticationToken(token){
        this._quizSettingsService.setAuthenticationToken(token);
    }

    attemtAutologin(){

        let body = "autologinTokenID=" + this._localStorageService.get("authentication_autologinID");
        body += "&autologinTokenValue=" + this._localStorageService.get("authentication_autologinValue");

        let theAction = 'autoLogin';
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        this._http.post('https://hembstudios.no/birdid/bird/loginControlAJAX.php?action='+theAction+"&langID="+this.langID, body,{headers: headers})
            .map(response => response.json())
            .subscribe(
	            data => {
	                this.onAutologinResponce(data)
					this.dataLoadedEventEmiter.emit(true);
	            },
	            error => {
					console.error("attemtAutologin ERROR! ", error);
					this.dataLoadedEventEmiter.emit(false);
				}
	        );



    }

    onAutologinResponce(response){

        console.log("response: ", response);
        if(response.status){
            //autologin success!
            console.log("You have been automaticly logged inn!");
            this.authenticated = true;
        }
        this.setAuthenticationToken(response.sessionID);


    }






}
