var path = require('path');
require('app-module-path').addPath(path.join(__dirname, './'));
// special lodash import with v3 aliases included
import { _ } from './lib/lodash';

// server itself
var koa = require('koa');
var app = koa();

// application configuration object
var config = require('config');

console.log(config);

// var router = require('server/api/api');
var favicon = require('koa-favi');

var initDb = require('server/db/db')(config.get('dbConfig').development, app);

//**************************** LOGGING ****************************//
// standard winston logger
var logger = require('server/core/logger').file('app.js');
// set up the koa logger if koaLog config option is set
if (config.get('logging')['koaLog']) {
	var koaLogger = require('koa-logger');
	app.use(koaLogger());
}
//*****************************************************************//

var webpackMiddleware = require('webpack-dev-middleware');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.babel.js');
var compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler, {
	publicPath: webpackConfig.output.publicPath
}));

app.use(require('koa-webpack-hot-middleware')(compiler));

//**************************** MIDDLEWARES ****************************//
// favicon
app.use(favicon(path.join(__dirname, 'client/favicon.ico')));

// test config
app.use(function* getConfig(next) {
	logger.fn('getConfig');
	var dbConfig = config.get('dbConfig').development;
	console.log(dbConfig);
	console.log('app.context.db');
	console.log('request href: ' + this.request.href);
	console.log(this.request.href);
	yield next;
});

/**
 * Connect to database
 */
app.use(initDb);

// TEST THAT DB WORKED
app.use(function* didDbInit(next) {
	logger.fn('didDbInit');
	if (_.get(app, 'context.db')) {
		console.log('db successfully initialized!');
	}
	yield next;
});

// get routes
// app.use(router.routes());

app.use(function* getHref(next) {
	logger.fn('getHref');
	console.log('request href: ' + this.request.href);
	console.log(this.request.href);
	yield next;
});

// TESTS
app.use(function* test1(next) {
	logger.fn('test1');
	console.log('1: start of gen fn');	//runs 1st
	yield next;
	console.log('1: end of gen fn');	//runs 7th
});

// TESTS
app.use(function *(next) {
	console.log('2: start of gen fn');	//runs 2nd
	yield next;
	console.log('2: end of gen fn');	//runs 6th
});

// TESTS
app.use(function *(next) {
	console.log('3: start of gen fn');	//runs 3rd
	yield next;
	console.log('3: end of gen fn');	//runs 5th
});

// TESTS - emit
// app.use(function *() {
// 	console.log('4: emitting hello world');	//runs 4th
// 	this.body = 'Hello World';
// });

app.use(require('koa-static')('./.build'));
//*********************************************************************//

app.listen(config.get('server').port);
