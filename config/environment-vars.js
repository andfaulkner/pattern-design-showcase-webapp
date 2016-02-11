var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'; //can also be 'production'
var logLevel = process.env.LOG_LEVEL = process.env.LOG_LEVEL || 'info';
var koaLog = process.env.REQ_RES_LOG = process.env.REQ_RES_LOG || 'false';

var envVars = {
	env: env,
	logLevel: logLevel,
	koaLog: koaLog
};

module.exports = envVars;
