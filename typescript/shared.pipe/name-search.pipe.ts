import { Pipe, PipeTransform } from "angular2/core"

@Pipe({
	name: 'nameSearch'
})
export class NameSearchPipe implements PipeTransform{

	returnArray;

	transform(value: string, args:any){

		this.returnArray = [];
		let compaareString:string = args;
		//compaareString = compaareString.toLowerCase();

		for (let id of Object.keys(value)) {

			let name:string = value[id].name;
			//name = name.toLowerCase();

			if(name.indexOf(compaareString) >= 0){

				this.returnArray.push(value[id]);
				console.log('Stuff name: ', name);
				console.log('Stuff comp: ', compaareString)

			}

		}

		console.log("PIPE1: ", value);
		console.log("PIPE2: ", args);
		console.log("PIPE3: ", this.returnArray);

		return this.returnArray;

	}

}
