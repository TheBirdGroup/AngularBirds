export class QuizQuestion {

	private rightAnswers = [];
	private choices = [];

	private mediaIds = [];
	private mediaSources = [];
	private extraInfoes = [];

	constructor(){

	}

	//TODO  return false if aswer is already in list
	addRightAnswer(id, name, latin){

		this.rightAnswers.push({'id': id, 'name': name, 'latin': latin});
		this.addChoice(id, name, latin);

	}
	addChoice(id, name, latin){

		this.choices.push({'id': id, 'name': name, 'latin': latin});

	}

	addMediaSource(mediaUrl){

		this.mediaSources.push({'mediaUrl': mediaUrl});

	}

	addExtraInfo(text){

		this.extraInfoes.push({'extraInfo': text});

	}

	addMediaId(id){

		this.mediaIds.push({'id': id});

	}

	getMediaIds(){

		return this.mediaIds;

	}

	//returns as one string of all extra infoes
	getExtraInfo():string{

		let returnString =  " ";

		for (let currentID of Object.keys(this.extraInfoes)) {
			if(this.extraInfoes[currentID].text.length > 0){
				returnString += this.extraInfoes[currentID].text + ",";
			}
		}

		if(returnString.length == 0){
			return ""
		}else{
			return returnString.substring(0, returnString.length-1);;
		}

	}

	getMediaSourses(){

		return this.mediaSources;

	}

	getChoices(){

		return this.choices;

	}

	getRigthAnsers(){

		return this.rightAnswers;

	}

	//TODO remove duplicates
	prosessData(){

		this.choices = this.shuffle(this.choices);

	}

	checkIfAnserIsCorrect(id){


		for (let currentRightAnsID of Object.keys(this.rightAnswers)) {
			if(id == this.rightAnswers[currentRightAnsID].id){
				return true;
			}


		}

		return false;

	}

	//http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        }

        return array;
    }



}
