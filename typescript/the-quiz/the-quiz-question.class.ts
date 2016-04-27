export class QuizQuestion {

	private rightAnswers = [];
	private choices = [];

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
