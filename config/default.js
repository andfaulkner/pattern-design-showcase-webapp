import {envVars} from './environment-vars';
import {loggingOpts} from './config-logging';
import {databaseOpts} from './config-database';
import {serverOpts} from './config-server';

module.exports = {
	envVars: envVars,
	environment: envVars.env,
	server: serverOpts,
	database: databaseOpts,
	logging: loggingOpts
};
