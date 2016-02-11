var knexModule = require('knex');
var logger = require('server/core/logger').file('db.js');

/**
 * CONNECT TO A DATABASE (postgres)
 *
 * @param  {Object} options  setup properties for db
 * @param  {Object} app  		 koa server itself
 */
module.exports = function(options, app) {
	return function* bookshelfInit(next) {
		logger.fn('bookshelfInit');
		var knex = knexModule(options);
		var bookshelf = require('bookshelf')(knex);
		var User = bookshelf.Model.extend({
			tableName: 'users'
		});
		app.context.db = bookshelf;
		yield next;
	};
};
