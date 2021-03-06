import { Component, EventEmitter, OnInit, ViewChild, AfterViewInit, ElementRef, OnChanges }       from '@angular/core';
import { Http, HTTP_PROVIDERS } from '@angular/http';

import { QuizSettingsService }  from './../shared/quiz-settings.service';

import { QuizQuestion }  from './../shared.class/the-quiz-question.class';

@Component({
	selector: 'birdid-the-quiz-image',
	templateUrl: 'app/the-quiz/the-quiz-image.component.html',
	styleUrls:  ['app/the-quiz/the-quiz-image.component.css'],
	directives: [

	],
	providers: [
	  HTTP_PROVIDERS
	],
	inputs: ['specieQuestionObject', 'zoomEnabled'], //using ALIAS
})


export class TheQuizImageComponent implements OnInit, OnChanges{
	title = 'Birdid Quiz TheQuizComponent!';

	imageURLStart = "https://hembstudios.no/birdid/IDprogram/getMedia.php?";
	imageUrlParms = "";
	extraSiteID;

	specieQuestionObject:QuizQuestion;
	zoomEnabled = true;

    mediaID = 0;
	mediaURL = "";
	accessCode = "";
	siteID = 4;

	zoomFactor = 2;
	zoomPointX = 0;
	zoomPointY = 0;

	canvasSizeX = 700;
	canvasSizeY = 700;

	rectColor:string = "#FF0000";
	context:CanvasRenderingContext2D;
  	@ViewChild("myCanvas") myCanvas;
	@ViewChild("stretchBar") stretchBar;
	@ViewChild("myImage") myImage;

	imageLoaded = false;
	mouseOnImage = false;

	quizSettings;

	constructor(
		private _quizSettingsService: QuizSettingsService,
		private _element: ElementRef){}

	ngOnInit() {

		let quizSettings = this._quizSettingsService.getQuizSettings();
		this.siteID = quizSettings[0].siteID;




		this.extraSiteID = "&siteID="+this.siteID;

	}

	ngOnChanges(){

		let quizSettings = this._quizSettingsService.getQuizSettings();
		this.siteID = quizSettings[0].siteID;

		this.mediaID = this.specieQuestionObject.getMediaIds()[0].id;
		this.mediaURL = this.specieQuestionObject.getMediaSourses()[0].mediaUrl;
		this.setupImageURL();

	}

	setupImageURL(){

		let quizSettings = this._quizSettingsService.getQuizSettings();
		let siteID = quizSettings[0].siteID;

		if(this._quizSettingsService.isBeginnerQuiz()){

			this.imageURLStart = "https://hembstudios.no/birdid/";
			if(siteID == 1){
				this.imageURLStart += "bird/db_media/beginnerImage/";
			}else if(siteID == 2){
				this.imageURLStart += "mammal/db_media/beginnerImage/";
			}else if(siteID == 3){
				this.imageURLStart += "track/db_media/beginnerImage/";
			}
			this.imageUrlParms = this.mediaURL;

		}else if(quizSettings[0].formalTestQuiz){

			//anything but a
			this.accessCode = quizSettings[0].formalTestAccessCode;
			//console.log(" quizSettings[0]: ",  quizSettings[0]);
			this.imageUrlParms = "accessCode="+this.accessCode+"&mediaToken="+this.mediaURL;

		}else{

			this.imageUrlParms = "mediaID="+this.mediaID+"&siteID="+this.siteID;

		}

	}

	ngAfterViewInit() {

		//console.log("hallo");
		let canvas = this.myCanvas.nativeElement;
    	this.context = canvas.getContext("2d");

		var ctx = this.context;


		//console.log("this.myImage: ", this.myImage.nativeElement);
		//ctx.drawImage(this.myImage.nativeElement, 10, 10);



		this.myImage.nativeElement.onload = () => {
			this.imageLoaded = true;

			this.resizeImageCanvas();

		};

	}

	resizeImageCanvas(){

		if(this.imageLoaded){

			this.myCanvas.nativeElement.width = this.myImage.nativeElement.width;
			this.myCanvas.nativeElement.height = this.myImage.nativeElement.height;
			this.canvasSizeX = this.myImage.nativeElement.width;
			this.canvasSizeY = this.myImage.nativeElement.height;

			let stretcSizeX = this.stretchBar.nativeElement.clientWidth;
			//console.log("this.canvasSizeX > stretcSizeX>: ", this.canvasSizeX, "|", stretcSizeX);
			if(this.canvasSizeX > stretcSizeX){

				let ScaleDiff = stretcSizeX / this.canvasSizeX;

				//console.log("yeah:", ScaleDiff);

				this.myCanvas.nativeElement.width = this.myImage.nativeElement.width * ScaleDiff;
				this.myCanvas.nativeElement.height = this.myImage.nativeElement.height * ScaleDiff;
				this.canvasSizeX = this.myImage.nativeElement.width * ScaleDiff;
				this.canvasSizeY = this.myImage.nativeElement.height * ScaleDiff;

			}

			this.updateImage();

		}

	}

	updateImage(){

		var ctx = this.context;

		//ctx.clear();
    	ctx.save();


		if(this.imageLoaded){



			if(this.mouseOnImage && this.zoomEnabled){
				ctx.scale(this.zoomFactor, this.zoomFactor);
				//ctx.drawImage(this.myImage.nativeElement, -this.zoomPointX/this.zoomFactor, -this.zoomPointY/this.zoomFactor, 500, 500);
				ctx.drawImage(this.myImage.nativeElement, -this.zoomPointX/2, -this.zoomPointY/2, this.canvasSizeX, this.canvasSizeY);
			}else{
				ctx.drawImage(this.myImage.nativeElement, 0, 0, this.canvasSizeX, this.canvasSizeY);
			}



		}

		ctx.restore();


	}

	mouseMoveCanvas(event){

		if(!this.zoomEnabled){
			return;
		}

		var ctx = this.context;

		let offLeft = ctx.canvas.offsetLeft;
		let offTop = ctx.canvas.offsetTop;

		//WORK ON PROGRESS
		// let element = this.myCanvas.nativeElement;
		//
		// var top = 0, left = 0;
	    // do {
	    //     top += element.offsetTop  || 0;
	    //     left += element.offsetLeft || 0;
	    //     element = element.offsetParent;
	    // } while(element);
		//
		// console.log("mose moove: ", top, "|",left);
		//
		// offLeft = left;
		// offTop = top;

		// console.log("hehe1223", event);
		this.zoomPointX = event.layerX - offLeft; //temp fix
		this.zoomPointY = event.layerY - offTop;

		// console.log(this.zoomPointX);
		// console.log(this.zoomPointY);

		this.updateImage();


	}

	mouseLeaveCanvas(event){

		if(!this.zoomEnabled){
			return;
		}

		//console.log("bye");
		this.mouseOnImage = false;
		this.updateImage();


	}

	mouseEnterCanvas(event){

		if(!this.zoomEnabled){
			return;
		}

		//console.log("welcome");
		this.mouseOnImage = true;
		this.updateImage();


	}

	mouseClickCanvas(event){

		if(!this.zoomEnabled){
			return;
		}

		if(this.mouseOnImage){
			this.mouseOnImage = false;
			this.updateImage();
		}else if(!this.mouseOnImage){
			this.mouseOnImage = true;
			this.updateImage();
		}
	}


}
