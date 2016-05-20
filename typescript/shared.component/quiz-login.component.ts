import { Component, OnInit }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import { QuizAuthenticationService } from '../shared/quiz-authentication.service';
import { QuizTranslationService }  from './../shared/quiz-translation.service';

@Component({
	selector: 'birdid-quiz-login',
	templateUrl: 'app/shared.component/login.component.html',
    styleUrls:  ['app/shared.component/login.component.css'],

    directives: [

	],
	providers: [

	],
})

export class QuizLoginComponent implements OnInit{
	//translation variables
	login;
	loginFailed;
	register;
	regSuccessfull;
	loginSuccessfull;
	email;
	passwordd;
	somethingWrong;

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
		private _quizAuthenticationService: QuizAuthenticationService,
		private _quizTranslationService: QuizTranslationService


	){}

	ngOnInit(){
		this.login = this._quizTranslationService.getTranslationByID(425);
		this.register = this._quizTranslationService.getTranslationByID(18);
		this.loginSuccessfull = this._quizTranslationService.getTranslationByID(419);
		this.email = this._quizTranslationService.getTranslationByID(187);
		this.passwordd = this._quizTranslationService.getTranslationByID(428);
		this.somethingWrong = this._quizTranslationService.getTranslationByID(39);
		this.regSuccessfull = this._quizTranslationService.getTranslationByID(420);
		this.loginFailed = this._quizTranslationService.getTranslationByID(495);

		this.actionText = this.login;
	}


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
			this.statusMessage = this.loginSuccessfull;
			this.success=true;
			this.error = false;

			this._quizAuthenticationService.setAuthenticated(true);
			this._quizAuthenticationService.setAuthenticationToken(response.sessionID);
			this._quizAuthenticationService.storeAutoLogin(response);

		}else{
			if(!response.status && this.action == "login"){
				this.statusMessageError = response.statusTextClean;
				this.error=true;
				this.success=false;
			}
		}

		if(response.status && this.action == "reg"){
			this.statusMessage = this.regSuccessfull;
			this.success=true;
			this.error = false;

			this._quizAuthenticationService.setAuthenticated(true);
			this._quizAuthenticationService.setAuthenticationToken(response.sessionID);
			this._quizAuthenticationService.storeAutoLogin(response);

		}else{
			if(!response.status && this.action == "reg"){
				this.statusMessageError = response.statusTextClean;
				this.error=true;
				this.success=false;
			}
		}

	}

	loginBTN(){
		this.showLogin = !this.showLogin;
		this.action="login";
		
		this.statusMessage="";
		this.statusMessageError="";

		this.checkActionType();
	}

	registerBTN(){
		this.showLogin = !this.showLogin;
		this.action = "reg";
		
		this.statusMessage="";
		this.statusMessageError="";

		this.checkActionType();
	}

	checkActionType(){
		if(this.action == "login"){
			this.actionText = this.login;

		}else{
			this.actionText = this.register;
		}
	}

}
