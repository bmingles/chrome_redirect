import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RequestPanel } from './request_panel.component';
import { AppService } from '../shared/app_service';

@NgModule({
	declarations: [
		RequestPanel
	],
	imports: [
		BrowserModule,
		CommonModule,
		FormsModule
	],
	providers: [
		AppService
	],
	bootstrap: [RequestPanel]
})
export class RequestPanelModule {
}