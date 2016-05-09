
export class QuizQuestion {

	private rightAnswers = [];
	private choices = [];
	private selectedChoices = [];
	private allowMultibleSelect = false;

	private mediaIds = [];
	private mediaSources = [];
	private extraInfoes = [];


	constructor(allowMultibleSelect){

		this.allowMultibleSelect = allowMultibleSelect;

	}

	//TODO  return false if aswer is already in list
	addRightAnswer(id, name, latin){

		this.rightAnswers.push({'id': id, 'name': name, 'latin': latin});
		this.addChoice(id, name, latin);

	}
	addChoice(id, name, latin){

		this.choices.push({'id': id, 'name': name, 'latin': latin});

	}

	//what the user have selected. Only adds if not in array (retuns false if in array)
	addSelectedChoice(id){


		//selecting i don't knoq clears all selections
		if(id < 0){
			this.removeAllSelectedChoices();
			return true;
		}


		for (let currentID of Object.keys(this.selectedChoices)) {
			if(this.selectedChoices[currentID].id == id){
				return false;
			}
		}

		if(this.allowMultibleSelect){
			this.selectedChoices.push({'id': id, 'name': ''});
		}else{
			//only one allowed in normal quiz:
			this.removeAllSelectedChoices();
			this.selectedChoices.push({'id': id, 'name': ''});
		}

		return true;

	}

	//what the user have selected
	getSelectedChoice(){

		return this.selectedChoices;

	}

	choiceIsSelected(id){

		//if i don't know AND no other choice is selected return true
		if(id < 0 && this.selectedChoices.length == 0){
			//this.selectedChoices.push({'id': -1});
			return true;
		}

		for (let currentID of Object.keys(this.selectedChoices)) {
			if(this.selectedChoices[currentID].id == id){
				return true;
			}
		}
		return false;
	}

	//what the user have selected. True if deleted, false if not
	removeSelectedChoice(id){

		//can't remove i don't know
		if(id < 0){
			return false;
		}

		let index:number = -1;
		for (let currentID of Object.keys(this.selectedChoices)) {
			if(this.selectedChoices[currentID].id == id){
				index = Number(currentID);
			}
		}

		if (index > -1) {
		    this.selectedChoices.splice(index, 1);
			return true;
		}else{
			return false;
		}

	}

	removeAllSelectedChoices(){
		this.selectedChoices.splice(0);
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

	//returns as one string of all media ids
	getStringMediaIds(){

		let returnString =  " ";

		for (let currentID of Object.keys(this.mediaIds)) {

			returnString += this.mediaIds[currentID].id + ", ";

		}

		if(returnString.length == 0){
			return ""
		}else{
			return returnString.substring(0, returnString.length-2);;
		}

	}


	//returns as one string of all extra infoes
	getExtraInfo():string{

		let returnString =  " ";

		for (let currentID of Object.keys(this.extraInfoes)) {
			if(this.extraInfoes[currentID].extraInfo.length > 0){
				returnString += this.extraInfoes[currentID].extraInfo + ", ";
			}
		}

		if(returnString.length == 0){
			return ""
		}else{
			return returnString.substring(0, returnString.length-2);;
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

	private elementAlreadyInArray(array, id){

		for (let currentID of Object.keys(array)) {

			if(id == array[currentID].id){
				return true;
			}

		}

		return false;

	}

	prosessData(){

		let tempArray = [];

		//only selecting one of each
		for (let currentChoiceID of Object.keys(this.choices)) {

			if(!this.elementAlreadyInArray(tempArray, this.choices[currentChoiceID].id)){
				tempArray.push(this.choices[currentChoiceID]);
			}

		}
		this.choices = tempArray;

		this.choices = this.shuffle(this.choices);
		this.addChoice(-1, "I don't know", "I don't know");

	}

	//using internal selected choices list
	getScoreForSelectedAnswers(){
		return this.scoreForMultibleAnswers(this.selectedChoices);
	}

	//returns score
	scoreForMultibleAnswers(arrayOfSpecieAlternatives:number[]):number{

		let score:number = 0;

		for (let currentID of Object.keys(arrayOfSpecieAlternatives)) {

			if(this.checkIfAnserIsCorrect(arrayOfSpecieAlternatives[currentID].id)){
				score ++;
			}else{
				score --;
			}

		}

		return score;

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
	removeWrongAlternative(){
		let check = false;
		let j = 0;


			while (check == false) {
				if(this.rightAnswers.length != this.choices.length){
					if (this.checkIfAnserIsCorrect(this.choices[j].id) == false) {
						this.choices.splice(j, 1);
						check = true;
					}else{
						j++;
					}
				}else{
					check = true;
				}
			}

	}
	getFirstLetters(numbLetters){

		return this.rightAnswers[0].name.substring(0,numbLetters);

	}



}
