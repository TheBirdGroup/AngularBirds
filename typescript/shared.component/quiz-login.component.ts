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
	statusMessageError="";
	confirmPassword;
	action;
	showLogin:boolean=false;
	//showRegister: boolean = false;
	success:boolean;
	error:boolean;
	actionText;


    constructor(
		private _quizLoginService: QuizLoginService


	){}


    onLogin(form){
        this.mail = form.value.mail;
        this.password = form.value.password;
		this.autoLogin = form.value.autoLogin;
		this.action;
		this.success=false;
		this.error=false;
		this.statusMessage="";
		this.statusMessageError="";
		this.actionText="";

        this._quizLoginService.Login(this.mail,this.password,this.autoLogin,this.action)
			.subscribe((response)=>(this.responseFromLogin(response)));

    }

	responseFromLogin(response){
		if (response.status==true && this.action=="login"){
			this.statusMessage= 'Login Successful';
			this.success=true;
			this.error = false;
		}else{
			if(response.status==false && this.action=="login"){
				this.statusMessageError = 'Wrong mail/password, please try again';
				this.error=true;
				this.success=false;
			}
		}
		if(response.status==true && this.action=="reg"){
			this.statusMessage= 'Registering Successful please go to your inbox to confirm your email';
			this.success=true;
			this.error = false;
		}else{
			if(response.status==false && this.action=="reg"){
				this.statusMessageError = 'Something went wrong, please try again';
				this.error=true;
				this.success=false;
			}
		}

	}

/*
	onRegister(form){
		this.mail = form.value.mail;
        this.password = form.value.password;
		this.autoLogin=form.value.autoLogin;
		this.action;
		this._quizLoginService.Login(this.mail,this.password,this.autoLogin,this.action)
		.subscribe((response)=>(this.responseFromRegister(response)));
	}

	responseFromRegister(response){
		if (response.status==true){
			this.statusMessage= 'Registering Successful please go to your inbox to confirm your email';
			this.success=true;
		}else{

		this.statusMessageError = 'Something went wrong, please try again';
		this.error=true;
		}
	}*/

	loginBTN(){
		this.showLogin=!this.showLogin;
		this.action="login";
		this.actionText="Login";


	}

	registerBTN(){
		this.showLogin=!this.showLogin;
		this.action="reg";
		this.actionText="Register"

	}

}
