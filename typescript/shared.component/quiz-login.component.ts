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
	loginTranslation;
	loginFailedTranslation;
	registerTranslation;
	regSuccessfullTranslation;
	loginSuccessfullTranslation;
	emailTranslation;
	passworddTranslation;
	somethingWrongTranslation;

    email;
    password;
	autoLogin;
	statusMessage="";
	statusMessageError="";
	confirmPassword;
	action;
	showAuthenticationForm:boolean=false;
	//showRegister: boolean = false;
	success:boolean;
	error:boolean;
	actionText;

	displayInputPassword = true;

    constructor(
		private _quizAuthenticationService: QuizAuthenticationService,
		private _quizTranslationService: QuizTranslationService


	){}

	ngOnInit(){
		this.loginTranslation = this._quizTranslationService.getTranslationByID(425);
		this.registerTranslation = this._quizTranslationService.getTranslationByID(18);
		this.loginSuccessfullTranslation = this._quizTranslationService.getTranslationByID(419);
		this.emailTranslation = this._quizTranslationService.getTranslationByID(187);
		this.passworddTranslation = this._quizTranslationService.getTranslationByID(428);
		this.somethingWrongTranslation = this._quizTranslationService.getTranslationByID(39);
		this.regSuccessfullTranslation = this._quizTranslationService.getTranslationByID(420);
		this.loginFailedTranslation = this._quizTranslationService.getTranslationByID(495);

		this.actionText = this.loginTranslation;
	}


    onLogin(form){
        this.email = form.value.email;
        this.password = form.value.password;
		this.autoLogin = form.value.autoLogin;
		this.action;
		this.success=false;
		this.error=false;
		this.statusMessage="";
		this.statusMessageError="";

        this._quizAuthenticationService.authenticate(this.email,this.password,this.autoLogin,this.action)
			.subscribe((response)=>(this.onResponseFromAuthentication(response)));

    }

	onResponseFromAuthentication(response){

		this.statusMessage="";
		this.statusMessageError="";

		//login
		if (response.status && this.action=="login"){
			this.statusMessage = this.loginSuccessfullTranslation;
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
			this.statusMessage = this.regSuccessfullTranslation;
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

		if(response.status && this.action == "resetPass"){
			this.statusMessage = "reset password link sendt successfully";
			this.success=true;
			this.error = false;

			this._quizAuthenticationService.setAuthenticated(false);
			this._quizAuthenticationService.setAuthenticationToken(response.sessionID);
			this._quizAuthenticationService.removeAutoLogin();

		}else{
			if(!response.status && this.action == "reg"){
				this.statusMessageError = response.statusTextClean;
				this.error=true;
				this.success=false;
			}
		}

		if(response.status && this.action == "logout"){
			this.statusMessage = "logout successfull";
			this.success = true;
			this.error = false;
			this._quizAuthenticationService.setAuthenticated(false);
			this._quizAuthenticationService.setAuthenticationToken(response.sessionID);
			this._quizAuthenticationService.removeAutoLogin();
		}else{
			if(!response.status && this.action == "logout"){
				this.statusMessageError = "error login out";
				console.log("response: ",response);
				this.error=true;
				this.success=false;
			}
		}


	}

	loginBTN(){
		if(this.action == "login"){
			this.showAuthenticationForm = !this.showAuthenticationForm;
		}else{
			this.showAuthenticationForm = true;
		}
		this.displayInputPassword = true
		this.action="login";

		this.statusMessage="";
		this.statusMessageError="";

		this.checkActionType();
	}

	registerBTN(){
		if(this.action == "reg"){
			this.showAuthenticationForm = !this.showAuthenticationForm;
		}else{
			this.showAuthenticationForm = true;
		}
		this.displayInputPassword = true
		this.action = "reg";

		this.statusMessage="";
		this.statusMessageError="";

		this.checkActionType();
	}

	logoutBTN(){

		this.showAuthenticationForm = false;
		this.action="logout";

		this.statusMessage="";
		this.statusMessageError="";

		this.email = "";
        this.password = "";
		this.autoLogin = "";
		this.action;
		this.success=false;
		this.error=false;
		this.statusMessage="";
		this.statusMessageError="";

        this._quizAuthenticationService.authenticate(this.email,this.password,this.autoLogin,this.action)
			.subscribe((response)=>(this.onResponseFromAuthentication(response)));

	}

	forgotPasswordBTN(){
		if(this.action == "resetPass"){
			this.showAuthenticationForm = !this.showAuthenticationForm;
		}else{
			this.showAuthenticationForm = true;
		}
		this.displayInputPassword = false
		this.action = "resetPass";

		this.statusMessage="";
		this.statusMessageError="";

		this.checkActionType();
	}

	checkActionType(){
		if(this.action == "login"){
			this.actionText = this.loginTranslation;

		}else if(this.action == "resetPass"){
			this.actionText = "Reset password";
		}else{
			this.actionText = this.registerTranslation;
		}
	}

}
