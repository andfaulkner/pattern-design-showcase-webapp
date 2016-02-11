require('./register-babel');
require('babel-register');

// fs.inotify.max_user_watches = 524288

var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var babelLoader = require('babel-loader');
var path = require('path');
var _ = require('lodash');
// var reactLoader = require('react-loader');
var webpack = require('webpack');

var webpackConfig = require('./config/webpack.json');

var node_modules = path.join(__dirname, 'node_modules');
var pathToReact = path.join(node_modules, 'react');
var pathToReactRouter = path.join(node_modules, 'react-router');

module.exports = {
	context: __dirname,
	entry: [
		'webpack-dev-server/client?http://localhost:3001',
		'webpack/hot/dev-server',
		path.join(__dirname, '/client/index.js')
	],

	output: {
		path: path.join(__dirname, '.build'),
		filename: 'app.js'
	},

	colors: true,

	resolve: {
		root: __dirname,
		modulesDirectories: ['node_modules'],
		extensions: ['', '.js', '.min.js', '.coffee', '.webpack.js', '.jsx']
	},

	bail: true,

	module: {
		loaders: [
			// load Babel - also, set up app's components to be able to hotswap
			{ test: /\.jsx?$/, 
				loaders: ['react-hot', 'babel'],
				include: [
					path.resolve(__dirname, 'client'),
					path.resolve(__dirname, 'client/components')
				],
				exclude: /(node_modules|bower_components)/ },
			// make react global
			{ test: pathToReact, loader: 'expose?React' },
			// render Dust templates. must have absolute path to views dir
			{ test: /\.dust$/, loader: 'dustjs-linkedin', query: { path: path.join(__dirname, 'client') }
	}],
		noParse: [pathToReact, pathToReactRouter]
	},

	plugins: [
		// new webpack.OldWatchingPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development')
			}
		}),
		new HtmlWebpackPlugin({
			title: 'FlowRight',
			template: path.join(__dirname, 'client/index.dust'),
			filename: 'index.html'
		}),
		new HtmlWebpackPlugin({
			title: 'Admin control panel',
			template: path.join(__dirname, 'client/admin.dust'),
			filename: 'admin.html'
		}),
		new webpack.ProgressPlugin(function handler(percentage, msg) {
			var curPercent = Math.round(Math.round((percentage + 0.00001) * 100) / 100 * 100);
			var curString = curPercent === 100
				? '\nCOMPILATION COMPLETE!'
				: msg + '::: percentage complete: ';
			console.log(_.padEnd(curString, 50) + curPercent + '%');
			if (curPercent === 100) {
				console.log('\n');
			}
		}),
		new webpack.ProvidePlugin({
			jquery: 'jQuery',
			$: 'jQuery',
			_: 'lodash',
			lodash: 'lodash'
		})
	],

	// watching is done by gulp, because webpack's watching is broken
	// watch: true,

	devServer: {
		host: 'localhost',
		port: webpackConfig.hotPort,
		stats: {
			exclude: webpackConfig.excludeFromStats
		}
	}
};
