import { Component } from '@angular/core';
import { AppService } from '../shared/app_service';
import { template } from './background.component.tpl';

@Component({
	selector: 'background',
	template
})
export class Background {
	constructor(private _appService: AppService) {
		this._appService.initializeBackground();
	}
}