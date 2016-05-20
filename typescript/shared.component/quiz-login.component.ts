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

    mail;
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
		this.showAuthenticationForm = !this.showAuthenticationForm;
		this.action="login";

		this.statusMessage="";
		this.statusMessageError="";

		this.checkActionType();
	}

	registerBTN(){
		this.showAuthenticationForm = !this.showAuthenticationForm;
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

		this.mail = "";
        this.password = "";
		this.autoLogin = "";
		this.action;
		this.success=false;
		this.error=false;
		this.statusMessage="";
		this.statusMessageError="";

        this._quizAuthenticationService.authenticate(this.mail,this.password,this.autoLogin,this.action)
			.subscribe((response)=>(this.onResponseFromAuthentication(response)));

	}

	checkActionType(){
		if(this.action == "login"){
			this.actionText = this.loginTranslation;

		}else{
			this.actionText = this.registerTranslation;
		}
	}

}
