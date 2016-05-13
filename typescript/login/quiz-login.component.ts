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
    title = 'this is loging';
    mail;
    password;

    constructor(
		private _quizLoginService: QuizLoginService


	){}


    onLogin(form){
        this.mail = form.value.mail
        //console.log(this.mail);
        this.password = form.value.password
        //console.log(this.password);
        this._quizLoginService.Login(this.mail,this.password)
    }

    

}
