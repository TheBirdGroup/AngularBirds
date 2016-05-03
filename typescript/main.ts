///<reference path="../node_modules/angular2/typings/browser.d.ts"/>

import { enableProdMode }       from 'angular2/core';
import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app.component'

//enableProdMode();
bootstrap(AppComponent).catch((err:any) => console.error(err));

//https://angular.io/docs/ts/latest/tutorial/toh-pt5.html
