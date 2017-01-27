import { ApplicationRef, Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface IRequestData {
	isEnabled: boolean;
	url: string;
	dataUri: string;
}

export interface IRequestView extends IRequestData {
	content: SafeUrl;
}

export interface IRequestMap {
	[url: string]: IRequestData;
}

@Injectable()
export class AppService {
	private _requestsSubject: Subject<IRequestData>;
	private _requestMapSubject: BehaviorSubject<IRequestMap>;
	private _requests: Observable<Array<IRequestView>>;

	constructor(
		private _applicationRef: ApplicationRef,
		private _domSanitizer: DomSanitizer) {

		this._initializeObservables();
	}

	private _initializeObservables(): void {
		this._requestsSubject = new Subject<IRequestData>();
		this._requestMapSubject = new BehaviorSubject<IRequestMap>(undefined);

		this._requestsSubject
			// accumulate url data into a hash
			.scan((map, data) => {
				if (data) {
					map[data.url] = data;
				}
				return map;
			}, {} as IRequestMap)
			.subscribe(requestMap => this._requestMapSubject.next(requestMap));

		this._requests = this._requestMapSubject
			// map hash to array of request views
			.map(requestMap => {
				return Object.keys(requestMap).map<IRequestView>(key => {
					let data = requestMap[key];
					return {
						isEnabled: data.isEnabled,
						url: data.url,
						dataUri: data.dataUri,
						content: this._domSanitizer.bypassSecurityTrustUrl(data.dataUri)
					};
				});
			});
	}

	/**
	 * Capture requests and save them to local storage.
	 */
	public initializeDevtools(): void {
		const dataUriMap = {
			html: 'text/html',
			css: 'text/css',
			js: 'text/javascript'
		};

		for (let key in localStorage) {
			let data = this.loadData(key);
			this._requestsSubject.next(data);
		}

		// this._applicationRef.tick();

		chrome.devtools.network.onRequestFinished.addListener((entry) => {
			let url: string = (<any>entry).request.url;
			let match = url.match(/\.([^\.\/]+)$/);
			let ext = match && match[1] || 'html';
			let mimeType = dataUriMap[ext] || 'text/plain';

			entry.getContent(content => {
				let data: IRequestData = {
					url: url,
					isEnabled: false,
					dataUri: `data:${mimeType};base64,${btoa(content)}`
				};

				this.saveData(data);

				this._applicationRef.tick();
			});
		});
	}

	public saveData(data: IRequestData): void {
		data = {
			isEnabled: data.isEnabled,
			url: data.url,
			dataUri: data.dataUri
		};

		localStorage.setItem(
			data.url,
			JSON.stringify(data));

		this._requestsSubject.next(data);
	}

	public loadData(url: string): IRequestData {
		let dataStr = localStorage.getItem(url);
		if (dataStr) {
			let data: IRequestData = JSON.parse(dataStr);
			return data;
		}
	}

	public clearCache(): void {
		localStorage.clear();
	}

	public initializeBackground(): void {
		chrome.webRequest.onBeforeRequest.addListener(
			(details) => {
				// if(details.url === 'https://scheduling.kidsministryteam.com/styles/site.min.css') {
				// 	console.log(details);
				// 	return {
				// 		redirectUrl: 'data:text/css;charset=utf-8,' + encodeURIComponent('body { background: green; }')
				// 	};
				// }
				console.log('request:' + details.url);

				let data: IRequestData = this.loadData(details.url);
				if (data && data.isEnabled) {
					return {
						redirectUrl: data.dataUri
					};
				}
			},
			{ urls: ["<all_urls>"] },
			['blocking']);
	}

	public consoleLog(value): void {
		chrome.devtools.inspectedWindow.eval(`console.log(${JSON.stringify(value)});`);
	}

	public get requests(): Observable<Array<IRequestView>> {
		return this._requests;
	}
}