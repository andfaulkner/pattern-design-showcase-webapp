var router = require('koa-router')();
var logger = require('server/core/logger').file('server/api/api.js');

router
	.get('/', function* baseRoute(/*next*/) {
		console.log(this.name);
		logger.fn('baseRoute');
		console.log('base route!');
		this.body = 'hello base route!';
	});

router
	.get('/admin', function* slashAdminRoute(/*next*/) {
		logger.fn('slashAdminRoute');
		console.log('admin!');
		this.body = 'hello admin!';
	});

module.exports = router;
