// // chrome.webNavigation.onCompleted.addListener(function(details) {
// // 	alert('test');
// // });

// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
// 	console.log(message.data);
//     return true;
// });

// // chrome.webRequest.onBeforeRequest.addListener(
// // 	function (details) {
// // 		// if(details.url === 'https://scheduling.kidsministryteam.com/styles/site.min.css') {
// // 		// 	console.log(details);
// // 		// 	return {
// // 		// 		redirectUrl: 'data:text/css;charset=utf-8,' + encodeURIComponent('body { background: green; }')
// // 		// 	};
// // 		// }
// // 		console.log('request:', details.url, details);
// // 	},
// // 	{ urls: ["<all_urls>"] },
// // 	['blocking']);

// // chrome.webRequest.onHeadersReceived.addListener(
// // 	function (details) {
// // 		//if(details.url === 'https://scheduling.kidsministryteam.com/styles/site.min.css') {
// // 			console.log('complete:', details.url, details);
// // 		//}
// // 	},
// // 	{ urls: ["<all_urls>"] });