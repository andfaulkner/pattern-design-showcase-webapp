console.log('hello!');

var knexModule = require('knex');
var logger = require('../core/logger').file('db.js');

/**
 * CONNECT TO A DATABASE (postgres)
 *
 * @param  {Object} options  setup properties for db
 * @param  {Object} app  		 koa server itself
 */
function dbSetup(options, app) {
	logger.fn('dbSetup');

	return function* bookshelfInit(next) {
		logger.fn('bookshelfInit');
		var knex = knexModule(options);
		var bookshelf = require('bookshelf')(knex);
		var User = bookshelf.Model.extend({
			tableName: 'users'
		});
		console.log(User); // TEMP to block linter
		app.context.db = bookshelf;
		yield next;
	};
}

module.exports = dbSetup;
