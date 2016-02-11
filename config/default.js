import {envVars} from './environment-vars';
import {loggingOpts} from './config-logging';
import {databaseOpts} from './config-database';

module.exports = {

	environment: envVars.env,

	server: {
		port: 3000
	},

	dbConfig: databaseOpts,

	logging: loggingOpts
};