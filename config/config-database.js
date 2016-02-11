
var dbClient = 'postgres';

var databaseOpts = {
	development: {
		client: dbClient,
		connection: {
			host: 'localhost',
			port: 5432,
			user: 'postgres',
			database: 'pattern_design',
			charset: 'utf8'
		}
	}
};

module.exports = databaseOpts;
