//supports single and multible playback. Interfaces does not distiguage
export class QuizSoundplayer {

	private mediaUrls = [];
	private mediaObjects = [];
	private volume = 1;
	private numLoaded = 0;

	private playing:boolean = false;

	private longestAudioIndex = 0;
	private longestDuration = 0;
	private currentDurationLongest = 0;
	private allAudioLoaded = false;
	private autoplay = false;
	private autoLoop = false;

	private thisDestroy = false;

	private mediaStartPath = ""

	//private callbackFunction;
	private parentRef;

	constructor(autoplay, autoLoop, parentRef){
		this.autoplay = autoplay;
		this.autoLoop = autoLoop;
		this.parentRef = parentRef;
	}

	//stop and dereference object/class
	destroy(){

		this.thisDestroy = true;
		this.pause();

		setTimeout(() => {
			this.parentRef = null;
		}, 0);


	}

	//array of JSON objects with .mediaUrl
	addMediaUrls (){

	}

	//load array of media
	loadMedia(mediaStartPath, mediaUrls){

		this.mediaStartPath = mediaStartPath;
		this.mediaUrls = mediaUrls;

		//load all:
		for (let currentID of Object.keys(this.mediaUrls)) {

			let audio = new Audio();
			audio.src  = this.mediaStartPath + this.mediaUrls[currentID].mediaUrl;
			audio.load();
			audio.addEventListener("loadeddata", (event)=>{
				this.oneAudioLoadDone(event);
			});

			this.mediaObjects.push(audio);

		}

	}

	//called for each audiolement done loading
	private oneAudioLoadDone(event){

		this.numLoaded ++;
		//all loaded
		if(this.mediaObjects.length == this.numLoaded){

			this.longestDuration = -1;

			//finds the track with the longest duration and uses that lather as 'master'
			for (let currentID of Object.keys(this.mediaObjects)) {
				if(this.mediaObjects[currentID].duration > this.longestDuration){
					this.longestDuration = this.mediaObjects[currentID].duration;
					this.longestAudioIndex = Number(currentID);
				}
			}

			this.allAudioLoaded = true;
			//console.log("longestDuration ", this.longestDuration, " this.longestAudioIndex ",this.longestAudioIndex);
			this.allMediaLoaded();

		}

	}

	//called when all audio is loaded
	private allMediaLoaded(){

		//update progressbar using ugly refrence calling
		this.mediaObjects[this.longestAudioIndex].addEventListener("timeupdate", (event)=>{

			if(!this.thisDestroy){
				this.parentRef.setCurrentAndTotalTime(this.mediaObjects[this.longestAudioIndex].currentTime, this.mediaObjects[this.longestAudioIndex].duration);
			}

		});

		//loop for my baby
		this.mediaObjects[this.longestAudioIndex].addEventListener("ended", (event)=>{

			if(this.autoLoop){
				this.play();
			}

		});

		//autoplaying when loading
		if(this.autoplay){
			this.play();
		}
	}

	isAllMediaLoaded(){
		return this.allAudioLoaded;
	}

	//play on all elements
	play(){

		for (let currentID of Object.keys(this.mediaObjects)) {
			this.mediaObjects[currentID].play();
		}
		this.playing = true;

	}

	//pause on all elements
	pause(){

		for (let currentID of Object.keys(this.mediaObjects)) {
			this.mediaObjects[currentID].pause();
		}
		this.playing = false;

	}

	isPlaying(){
		return this.playing;
	}

	//changing volume, using non abselut values
	setVolume(volumeChange){

		this.volume += volumeChange;
		this.volume = Math.floor(this.volume);

		if(this.volume  < 0){
			this.volume = 0;
		}
		if(this.volume  > 1){
			this.volume = 1;
		}
		console.log("this.volume: ", this.volume);

		this.updateVolumelevels();


	}

	getVolume(){
		return this.volume;
	}

	//seekt to percent of total time of max lenth object
	seek(percent){

		if(percent < 0 || percent > 1){
			//throw new Error("Seek out of range with value "+percent);
			return false;
		}

		for (let currentID of Object.keys(this.mediaObjects)) {
			this.mediaObjects[currentID].currentTime = this.mediaObjects[this.longestAudioIndex].duration * percent;
		}

		return true;

	}

	//avually updating all audio elements
	private updateVolumelevels(){

		for (let currentID of Object.keys(this.mediaObjects)) {
			this.mediaObjects[currentID].volume  = this.volume;
		}

	}



}
