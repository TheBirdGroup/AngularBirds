import { Injectable, OnInit, EventEmitter } from '@angular/core';

//credit to https://github.com/rrgarciach/angular2-local-storage

@Injectable()
export class LocalStorageService{

	private localStorage:any;

	constructor(){



	}

	public initialize(useSessionStorage = false){

		if (!localStorage || !sessionStorage) {
            throw new Error('Local Storage not supported!');
        }

		if(sessionStorage){
			this.localStorage = sessionStorage;
		}else{
			this.localStorage = localStorage;
		}


	}

	public set(key:string, value:string):void {
        this.localStorage[key] = value;
    }

    public get(key:string):string {
        return this.localStorage[key] || false;
    }

    public setObject(key:string, value:any):void {
        this.localStorage[key] = JSON.stringify(value);
    }

    public getObject(key:string):any {
        return JSON.parse(this.localStorage[key] || '{}');
    }

    public remove(key:string):any {
        this.localStorage.removeItem(key);
    }

}
