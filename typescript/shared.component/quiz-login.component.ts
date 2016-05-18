import { Component }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import { QuizAuthenticationService } from '../shared/quiz-authentication.service';

@Component({
	selector: 'birdid-quiz-login',
	templateUrl: 'app/shared.component/login.component.html',
    styleUrls:  ['app/shared.component/login.component.css'],

    directives: [

	],
	providers: [

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
		private _quizAuthenticationService: QuizAuthenticationService


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

        this._quizAuthenticationService.authenticate(this.mail,this.password,this.autoLogin,this.action)
			.subscribe((response)=>(this.onResponseFromAuthentication(response)));

    }

	onResponseFromAuthentication(response){

		//login
		if (response.status && this.action=="login"){
			this.statusMessage = 'Login Successful';
			this.success=true;
			this.error = false;

			this._quizAuthenticationService.setAuthenticated(true);
			this._quizAuthenticationService.setAuthenticationToken(response.sessionID);
			this._quizAuthenticationService.storeAutoLogin(response);

		}else{
			if(!response.status && this.action == "login"){
				this.statusMessageError = 'Wrong mail/password, please try again';
				this.error=true;
				this.success=false;
			}
		}

		if(response.status && this.action == "reg"){
			this.statusMessage= 'Registering Successful please go to your inbox to confirm your email';
			this.success=true;
			this.error = false;

			this._quizAuthenticationService.setAuthenticated(true);
			this._quizAuthenticationService.setAuthenticationToken(response.sessionID);
			this._quizAuthenticationService.storeAutoLogin(response);

		}else{
			if(!response.status && this.action == "reg"){
				this.statusMessageError = 'Something went wrong, please try again';
				this.error=true;
				this.success=false;
			}
		}

	}

	loginBTN(){
		this.showLogin = !this.showLogin;
		this.action="login";
		this.actionText="Login";


	}

	registerBTN(){
		this.showLogin = !this.showLogin;
		this.action = "reg";
		this.actionText = "Register"

	}

}
