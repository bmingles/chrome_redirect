import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Devtools } from './devtools.component';

@NgModule({
	declarations: [
		Devtools
	],
	imports: [
		BrowserModule
	],
	bootstrap: [Devtools]
})
export class DevtoolsModule {
}