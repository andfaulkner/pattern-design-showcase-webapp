var path = require('path');
var favicon = require('koa-favi');
import { _ } from '../lib/lodash'; // special lodash import with lodash v3's aliases re-included

var logger = require('./core/logger').file('server/middlewares.js');

// application configuration object
var config = require('config');

// var router = require('server/api/api');

export function middlewares(app) {

	var initDb = require('./db/db')(config.get('database').development, app);

	// favicon
	app.use(favicon(path.join(__dirname, '..', 'client/favicon.ico')));

	// test config
	app.use(function* getConfig(next) {
		logger.fn('getConfig');
		var dbConfig = config.get('database').development;
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

	return app;
}
