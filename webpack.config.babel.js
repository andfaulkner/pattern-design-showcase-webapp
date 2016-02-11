// require('./register-babel');
// require('babel-register');

// fs.inotify.max_user_watches = 524288
var logger = require('server/core/logger').file('webpack.config.babel.js');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var babelLoader = require('babel-loader');
var path = require('path');
var _ = require('lodash');
// var reactLoader = require('react-loader');
var webpack = require('webpack');

var webpackConfig = require('./config/webpack.json').webpack;

var node_modules = path.join(__dirname, 'node_modules');
var pathToReact = path.join(node_modules, 'react');
var pathToReactRouter = path.join(node_modules, 'react-router');

// calculate the percentage complete the build is - output formatted number
function calcProgress(percentage) {
	return Math.round(Math.round((percentage + 0.00001) * 100) / 100 * 100);
}

logger.info('all imports successful, declaring webpack config for export');

module.exports = {

	// ******************** I/O, FILE & DIR LOCATIONS ******************** 
	context: __dirname,
	entry: [
		'webpack-hot-middleware/client?http://localhost:3001',
		path.join(__dirname, '/client/main.js')
	],
	output: {
		path: path.join(__dirname, '.build'),
		filename: 'index.js'
	},
	resolve: {
		root: __dirname,
		modulesDirectories: ['node_modules'],
		extensions: ['', '.js', '.min.js', '.coffee', '.webpack.js', '.jsx'],
		alias: {
			react: pathToReact
		}
	},

	// ******************** LOADERS - COMPILATION ******************** 
	module: {
		loaders: [
			// load Babel - also, set up app's components to be able to hotswap
			{ test: /\.jsx?$/, 
				loaders: ['babel?cacheDirectory=true'],
				include: [path.resolve(__dirname, 'client'), path.resolve(__dirname, 'client/components')],
				exclude: /(node_modules|bower_components)/ },
			// make react global
			// render Dust templates. must have absolute path to views dir
			{test: /\.dust$/, loader: 'dustjs-linkedin', query: { path: path.join(__dirname, 'client')}},
			{test: pathToReact, loader: 'expose?React'},
			{test: /ReactRouter(\.min)?\.js$/, loader: 'imports?React=react'}
		],
		noParse: [pathToReact, pathToReactRouter]
	},

	plugins: [
		// ******************** Webpack config plugins ******************** 
		// new webpack.OldWatchingPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(), //to prevent hot loader autoreload if code has errs
		// global values
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development')
			}
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		// progress bar
		new webpack.ProgressPlugin(function handler(percentage, msg) {
			var curPercent = calcProgress(percentage);
			var curString = curPercent === 100
				? '\nCOMPILATION COMPLETE!'
				: msg + '::: percentage complete: ';
			console.log(_.padEnd(curString, 50) + curPercent + '%');
			if (curPercent === 100) {
				console.log('\n');
			}
		}),

		// ******************** Insert content plugins (render html, add libs) ******************** 
		new HtmlWebpackPlugin({
			title: 'FlowRight',
			template: path.join(__dirname, 'client/index.html'),
			filename: 'index.html',
			inject: 'body'
			// js: 'index.js'
		}),
		// new HtmlWebpackPlugin({
		// 	title: 'Admin control panel',
		// 	template: path.join(__dirname, 'client/admin.dust'),
		// 	filename: 'admin.html'
		// }),
		new webpack.ProvidePlugin({
			jquery: 'jquery',
			$: 'jquery',
			_: 'lodash',
			lodash: 'lodash'
		})
	],

	// ******************** WEBPACK DEV TOOLS ******************** 
	colors: true,
	// watch: true,		// watching is done by gulp, because webpack's watching is broken
	bail: true,
	debug: true,
	devServer: {
		contentBase: path.join(__dirname, '.build'),
		host: 'localhost',
		port: webpackConfig.hotPort,
		// hot: true,
		inline: true,
		progress: true,
		historyApiFallback: true,
		stats: {
			exclude: webpackConfig.excludeFromStats
		}
	}
};
