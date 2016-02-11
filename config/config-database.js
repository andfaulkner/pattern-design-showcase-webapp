
var dbClient = 'postgres';

export const databaseOpts = {
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