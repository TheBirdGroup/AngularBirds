export class QuizQuestion {

	rigthAswers: string[][];
	choices: string[][];

	constructor(){

	}

	//TODO  return false if aswer is already in list
	addRightAnswer(id, name, latin){

		this.addChoice(id, name, latin);
	}
	addChoice(id, name, latin){

	}

	//TODO remove duplicates
	prosessData(){


	}

	checkIfAnserIsCorrect(id){

		return true;

	}



}
