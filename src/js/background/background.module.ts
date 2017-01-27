import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Background } from './background.component';
import { AppService } from '../shared/app_service';

@NgModule({
	declarations: [
		Background
	],
	imports: [
		BrowserModule,
		CommonModule
	],
	providers: [
		AppService
	],
	bootstrap: [Background]
})
export class BackgroundModule {
}