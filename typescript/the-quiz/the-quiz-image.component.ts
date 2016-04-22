import { Component, EventEmitter, OnInit, ViewChild, AfterViewInit, ElementRef }       from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';

import { QuizSettingsService }  from './../shared/quiz-settings.service';

@Component({
	selector: 'birdid-the-quiz-image',
	templateUrl: 'app/the-quiz/the-quiz-image.component.html',
	styleUrls:  ['app/the-quiz/the-quiz-image.component.css'],
	directives: [

	],
	providers: [
	  HTTP_PROVIDERS
	],
	inputs: ['mediaID:usingMediaID'], //using ALIAS
})


export class TheQuizImageComponent implements OnInit{
	title = 'Birdid Quiz TheQuizComponent!';

	imageURLStart = "https://hembstudios.no/birdid/IDprogram/getMedia.php?mediaID=";
	extraSiteID;

    mediaID = 0;

	zoomFactor = 2;
	zoomPointX = 0;
	zoomPointY = 0;

	canvasSizeX = 700;
	canvasSizeY = 700;

	rectColor:string = "#FF0000";
	context:CanvasRenderingContext2D;
  	@ViewChild("myCanvas") myCanvas;
	@ViewChild("myImage") myImage;

	imageLoaded = false;
	mouseOnImage = false;


	constructor(
		private _quizSettingsService: QuizSettingsService,
		private _element: ElementRef){}

	ngOnInit() {

		let quizSettings = this._quizSettingsService.getQuizSettings();
		let siteID = quizSettings[0].siteID;

		this.extraSiteID = "&siteID="+siteID;

	}

	ngAfterViewInit() {

		//console.log("hallo");
		let canvas = this.myCanvas.nativeElement;
    	this.context = canvas.getContext("2d")

		var ctx = this.context;


		//console.log("this.myImage: ", this.myImage.nativeElement);
		//ctx.drawImage(this.myImage.nativeElement, 10, 10);

		const tmpImage = new Image();
		tmpImage.src = "http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg";


		this.myImage.nativeElement.onload = () => {
			this.imageLoaded = true;
			this.updateImage();
		};

	}

	updateImage(){

		var ctx = this.context;

		//ctx.clear();
    	ctx.save();


		if(this.imageLoaded){



			if(this.mouseOnImage){
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

		var ctx = this.context;

		let offLeft = ctx.canvas.offsetLeft;
		let offTop = ctx.canvas.offsetTop;


		// console.log("hehe1223", event);
		this.zoomPointX = event.layerX - offLeft; //temp fix
		this.zoomPointY = event.layerY - offTop;

		// console.log(this.zoomPointX);
		// console.log(this.zoomPointY);

		this.updateImage();


	}

	mouseLeaveCanvas(event){

		console.log("bye");
		this.mouseOnImage = false;
		this.updateImage();


	}

	mouseEnterCanvas(event){

		console.log("welcome");
		this.mouseOnImage = true;
		this.updateImage();


	}


}
