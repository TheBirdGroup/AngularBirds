import { Injectable } from 'angular2/core';
import { Http, Headers } from 'angular2/http';
import { Router } from 'angular2/router';

import 'rxjs/Rx';
//import {constants} from './../constants';


@Injectable()
export class QuizLoginService{

constructor(private _http: Http){}

    Login(mail,password,autoLogin,action){ // this is also for registering, the naming is horrible

        let theMail = mail;
        let thePassword = password;
        if (autoLogin == null){
            autoLogin = false;
        }else{
            let theAutoLogin = autoLogin;
        }

        let theAction = action;

        let body = "email=" + theMail;
        body += "&password=" + thePassword;
        body += "&autologin=" + autoLogin;

        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post('https://hembstudios.no/birdid/bird/loginControlAJAX.php?action='+theAction, body,{
            headers: headers
        }).map(response => response.json());
    }






}
