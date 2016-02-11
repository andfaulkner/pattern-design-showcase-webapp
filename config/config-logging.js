import {envVars} from './environment-vars';

export const loggingOpts = {
	//  show all requests and responses going in and out in the terminal
	koaLog: envVars.koaLog,
	logLevel: envVars.logLevel,
	levelConfig: {
		levels: {
			silly: 0,
			trace: 1,
			debug: 2,
			info: 3,
			warn: 4,
			error: 5
		},
		colors: {
			silly: 'magenta',
			trace: 'cyan',
			debug: 'blue',
			info: 'green',
			warn: 'yellow',
			error: 'red'
		}
	}
}