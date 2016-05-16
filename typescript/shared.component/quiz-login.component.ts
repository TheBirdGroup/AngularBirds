import { Component }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import {QuizLoginService} from '../shared/quiz-login.service';

@Component({
	selector: 'birdid-quiz-login',
	templateUrl: 'app/shared.component/login.component.html',
    styleUrls:  ['app/shared.component/login.component.css'],

    directives: [

	],
	providers: [
        QuizLoginService // maybe not depends where the login should be accessed from

	],
})

export class QuizLoginComponent {
    title = 'Login or Register!';
    mail;
    password;
	autoLogin;
	statusMessage="";
	confirmPassword;
	action;
	showLogin:boolean=false;
	showRegister: boolean = false;

    constructor(
		private _quizLoginService: QuizLoginService


	){}


    onLogin(form){
        this.mail = form.value.mail;
        this.password = form.value.password;
		this.autoLogin = form.value.autoLogin;
		this.action="login";
        this._quizLoginService.Login(this.mail,this.password,this.autoLogin,this.action)
		.subscribe((response)=>(this.responseFromLogin(response)));
    }

	responseFromLogin(response){
		if (response.status==true){
			this.statusMessage= 'Login Successful';
		}else{
		//this.statusMessage = response.status;  this is the error you are getting from the server
		// 											i had problems displaying it
		this.statusMessage = 'Wrong mail/password, please try again';
		}
	}


	onRegister(form){
		this.mail = form.value.mail;
        this.password = form.value.password;
		this.autoLogin=form.value.autoLogin;
		this.action="reg";
		this._quizLoginService.Login(this.mail,this.password,this.autoLogin,this.action)
		.subscribe((response)=>(this.responseFromRegister(response)));
	}

	responseFromRegister(response){
		if (response.status==true){
			this.statusMessage= 'Registering Successful please go to your inbox to confirm your email';
		}else{

		this.statusMessage = 'Something went wrong, please try again';
		}
	}

	loginBTN(){
		this.showLogin=!this.showLogin
	}

	registerBTN(){
		this.showRegister=!this.showRegister
	}

}