import { Component }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import {QuizLoginService} from '../login/quiz-login.service';

@Component({
	selector: 'birdid-quiz-login',
	templateUrl: 'app/login/login.component.html',
    styleUrls:  ['app/login/login.component.css'],

    directives: [

	],
	providers: [
        QuizLoginService // maybe not depends where the login should be accessed from

	],
})

export class QuizLoginComponent {
    title = 'Login or Register';
    mail;
    password;
	autoLogin;
	statusMessage="";
	confirmPassword;


    constructor(
		private _quizLoginService: QuizLoginService


	){}


    onLogin(form){
        this.mail = form.value.mail
        //console.log(this.mail);
        this.password = form.value.password
        //console.log(this.password);
		this.autoLogin = form.value.autoLogin
		//console.log(this.autologin);
        this._quizLoginService.Login(this.mail,this.password,this.autoLogin)
		.subscribe((response)=>(this.callback(response)));

    }
	callback(response){
		if (response.status==true){
			this.statusMessage= 'Login Successful';
		}else{
		//this.statusMessage = response.status;  this is the error you are getting from the server
		// 											i had problems displaying it
		this.statusMessage = 'Wrong mail/password, please try again';
		}
		console.log(this.statusMessage)


	}


	/*onRegister(form){
		this.mail = form.value.mail
        console.log(this.mail);
        this.password = form.value.password
        console.log(this.password);
		this.confirmPassword = form.value.confirmPassword
		console.log(this.confirmPassword);
		/*this._quizLoginService.Register(this.mail,this.password,this.autoLogin)
		.subscribe((response)=>(this.callback(response)));*/

	//}



}
