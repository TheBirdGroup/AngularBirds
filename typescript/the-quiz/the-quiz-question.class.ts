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

	//TODO remove duplicates
	prosessData(){



	}

	checkIfAnserIsCorrect(id){

		for (let currentChoiceID of Object.keys(this.choices)) {
			for (let currentRightAnsID of Object.keys(this.rightAnswers)) {
				if(this.choices[currentChoiceID].id == this.rightAnswers[currentRightAnsID].id){
					return true;
				}
			}

		}

		return false;

	}



}
