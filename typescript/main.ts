///<reference path="../typings/browser.d.ts"/>

import { enableProdMode }       from '@angular/core';
import { bootstrap }    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component'

//enableProdMode();
bootstrap(AppComponent).catch((err:any) => console.error(err));

//https://angular.io/docs/ts/latest/tutorial/toh-pt5.html
