import { Component, OnInit } from '@angular/core';
import { AppService, IRequestView } from '../shared/app_service';
import { template } from './request_panel.component.tpl';

@Component({
	selector: 'request-panel',
	template
})
export class RequestPanel implements OnInit {
	constructor(private _appService: AppService) {
	}

	public requests: Array<IRequestView>;

	public ngOnInit(): void {
		this._appService.consoleLog('ngOnInit');
		//chrome.devtools.inspectedWindow.eval('console.log("ngOnInit");');
		this.requests = [];

		this._appService.initializeDevtools();
		this._appService.requests.subscribe(requests => {
			this.requests = requests;
			this._appService.consoleLog(requests);
		});

		// chrome.devtools.network.onRequestFinished.addListener((entry) => {
		// 	// chrome.devtools.inspectedWindow.eval(
		// 	// 	'console.log("Large image: " + unescape("' +
		// 	// 	escape(request.request.url) + '"))');

		// 	entry.getContent(content => {
		// 		chrome.devtools.inspectedWindow.eval('console.log("test");');
		// 		this.requests.push(content);
		// 		chrome.runtime.sendMessage({
		// 			type: "captureHAR",
		// 			data: { content }
		// 		});
		// 	});
		// });
	}

	public onChange(request: IRequestView): void {
		this._appService.saveData(request);
	}

	public onClearCache(): void {
		this.requests = [];
		this._appService.clearCache();
	}
}