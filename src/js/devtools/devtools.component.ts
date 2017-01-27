import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'devtools',
	template: '<div></div>'
})
export class Devtools implements OnInit {
	ngOnInit(): void {
		chrome.devtools.panels.create(
			"Redirect Configuration",
			"hammer.png",
			"request_panel.html",
			function (panel) {
				console.log('request panel.');
			});
	}
}