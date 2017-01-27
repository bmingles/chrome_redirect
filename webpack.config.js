// import { Configuration } from 'webpack';

// declare var module;
// declare var __dirname;

let path = require('path');

let config = {
	entry: {
		polyfills: './src/js/polyfills',
		background: './src/js/background/background.bootstrap',
		devtools: './src/js/devtools/devtools.bootstrap',
		request_panel: './src/js/request_panel/request_panel.bootstrap.ts'
	},
	resolve: {
		extensions: ['', '.ts', '.js']
	},
	// resolveLoader: {
	// 	root: path.join(__dirname, 'node_modules')
	// },
	module: {
		loaders: [
			{
				test: /.ts$/,
				loader: 'awesome-typescript-loader'
				// query: {
				// 	configFileName: './tsconfig.js‌​on'
				// }
			}
		],
	},
	output: {
		path: `./dist/js`,
		filename: '[name]/[name].js'
	}
	// externals: {
	// 	'angular': 'angular',
	// 	'angular-ui-router': 'angular-ui-router'
	// }
}

module.exports = config;