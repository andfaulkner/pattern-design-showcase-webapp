//Fix root path referenced by require
require('rootpath')();
require('trace');
require('clarify');
require('colors');

var gulp = require('gulp');

//NODE MODULES & JS LIBRARIES
// var path    = require('path');
// var childProcess = require('child_process');
// var fs      = require('fs-extra');
var yargs   = require('yargs');
// var merge   = require('merge2');
// var _       = require('lodash');
// var del     = require('del');
// var async   = require('async');
// var tcpPortUsed = require('tcp-port-used');

require('shelljs/global');

var p = require('gulp-packages')(gulp, [
	'debug',                    // lists all files run thru it
	'dev',                      // Toggle html comments on & off
	'display-help',             // Display help file
	'dust',                     // Compile Dust templates
	'exit',                     // Force quit Gulp process
	'filter',                   // Filter out unwanted files from stream
	'if-else',                  // if-else statements mid-stream
	'newer',                    // Only push item through pipe if newer
	'plumber',                  // keep running if error occurs
	'print',                    // output errors to console
	'rename',                   // Rename files
	'replace',                  // find-and-replace text in files
	'rimraf',                   // remove files
	'sass',                     // compile scss and sass --> css
	'shell',                    // run shell commands with gulp
	'size',                     // output file size
	'stats',                    // provides stats on files passed thru stream
	'tap',                      // run function mid-stream
	'webpack'                   // compile webpack
]);

//UNPACKAGEABLE GULP PLUGINS
var gutil = require('gulp-util');
var lazypipe = require('lazypipe');
var runSequence = require('run-sequence');
// var livereload = require('gulp-livereload');
// var notify = require('gulp-notify');
// var wait = require('gulp-wait');

//------------------------------ CONSTANTS -------------------------------//
var SRC = {
	root: ['!./node_modules/**', './**'],
	client: 'client/**',
	clientJS: 'client/**/*.js',
	clientStatic: [
		'client/**',
		'!client/**/*.dust', '!client/**/*.jsx', '!client/**/*.js', '!client/js/**',
		'!./**/.eslintrc.js'
	]
};

var DEST = {
	root: '.build',
	clientStatic: '.build'
};
//------------------------------------------------------------------------//

//------------------ COMMAND LINE PARAMETER HANDLING ---------------------//
//Command line flags accepted by gulp
var cmds = ['test', 'production', 'stats', 'once'];

/**
 * Populate args object w/ command line args, setting each that was received to
  * true in the args object, & all others to false. Referenced by argument name.
  * @example args.production set to true if gulp launched w/ gulp --production.
  */
var args = (function populateArgs(argList, argObj){
	argList.forEach(function createArgObjFromArgArray(arg){
		argObj[arg] = yargs.argv[arg] === true;
	});
	return argObj;
}(cmds, {}));
//------------------------------------------------------------------------//

//------------------------------------------ UTILITIES -----------------------------------------//
/**
 * Output webpack errors when caught.
 */
var onError = function onError(err) {
	gutil.beep();
	console.log(gutil.colors.red.bgWhite('-----------------------------------'));
	console.log('ERROR OCCURRED');
	console.log(typeof err);
	console.log(gutil.colors.red.bgWhite(err.toString()));
	console.log(gutil.colors.red.bgWhite('-----------------------------------'));
	this.emit('restart');
	this.emit('end');
};
//----------------------------------------------------------------------------------------------//

//################################################################################
//#~~~~~~~~~~~~~~~~~~~~~~~~~~~ REUSABLE PIPE COMPONENTS ~~~~~~~~~~~~~~~~~~~~~~~~~~
//################################################################################
var catchErrors = lazypipe()
	.pipe(p.plumber, { errorHandler: onError });

var consoleTaskReport = lazypipe()
	.pipe(catchErrors)
	.pipe(p.print);

var newerThanRootIfNotProduction = lazypipe()
	.pipe(p.ifElse, !args.production, p.newer.bind(this, DEST.root));
//#################################################################################

//################################################################################
//#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ LIST ALL GULP TASKS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//################################################################################
gulp.task('get-tasks', function() {
	return process.nextTick(function() {
		console.log('\n_________ALL REGISTERED GULP TASKS_________');
		Object.keys(gulp.tasks).forEach(function(t) {
			return t === 'install' || t === 'uninstall'
				? null
				: console.log('-- ' + t.bgBlack.green);
		});
		console.log('___________________________________________\n');
	});
});
//#################################################################################

gulp.task('webpack', function webpackTask() {
	return gulp.src(SRC.clientJS)
		.pipe(consoleTaskReport())
		.pipe(newerThanRootIfNotProduction())
		.pipe(p.webpack(require('./webpack.config.babel.js')))
		.pipe(gulp.dest(DEST.root));
});

gulp.task('copy-static', function copyStaticTask(){
	return gulp.src(SRC.clientStatic)
		.pipe(consoleTaskReport())
		.pipe(newerThanRootIfNotProduction())
		.pipe(gulp.dest(DEST.clientStatic));
});

var rerunOnChange = function rerunOnChange() {
	gulp.watch(SRC.client, ['build']);
};

gulp.task('build', function(){ return runSequence('webpack', 'copy-static'); });

/**
 * Build the app
 */
gulp.task('default', ['build'], function(){
	return rerunOnChange();
});
