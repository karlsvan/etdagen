/*	==================================================
*					Gulpfile
*	==================================================
*	@plugins:
*		see package.json under dev-dependencies 
*		for available plugins.
*	@tasks:
*		see gulp-tasks/ for available tasks
*/

/*
*	Configurations for the gulpfile
*	- 'gulp' is the general gulp-plugin
*	- '$' is all other plugins(see package.json)
*	- 'appConfig' is general configurations for gulp tasks
*/
var gulp = require('gulp'), $;
(function loadGulpPlugins(callback){
	$ = require('gulp-load-plugins')();
	callback();
})(function loadOtherPlugins(){
	$.del 			= require('del');
	$.wiredep 		= require('wiredep').stream;
	$.path 			= require('path').resolve;
	$.browserSync 	= require('browser-sync');
});

var appConfig = module.exports.appConfig = {
	app:  $.path(__dirname, 'app'),
	dist: $.path(__dirname, 'server', 'dist')
}


/*
*	Gulp tasks imported from gulp-tasks/
*	- 'getTask' is a helper-function for importing
*	- the variables are the exports from gulp-tasks/
*/
function getTask(task){ return require( $.path(__dirname, 'gulp-tasks', task) )(gulp, $, appConfig); }
var inject 		= getTask('inject.js'),
	serve 		= getTask('serve.js'),
	source 		= getTask('source.js'),
	style 		= getTask('style.js'),
	useref 		= getTask('useref.js');


/*
*	Partial gulp tasks
*/
// tasks for injecting references
gulp.task('inject:all', $.sequence('inject:bower', 'inject:angular', 'inject:less', 'inject:custom'));
gulp.task('inject:bower', inject.bower);
gulp.task('inject:angular', inject.angular);
gulp.task('inject:custom', inject.custom);
gulp.task('inject:less', inject.less);

// task for concatinating and minifying of references
gulp.task('useref', useref.useref);

// tasks for copying and minifying to dist
gulp.task('source:all', $.sequence('source:client', 'source:fonts'));
gulp.task('source:client', source.client);
gulp.task('source:fonts', source.fonts);

//task for converting main.less to main.css
gulp.task('style:less', style.less);

// tasks for serving in development
gulp.task('browser-sync', ['nodemon'], serve.browserSync);
gulp.task('nodemon', serve.nodemon);




/*
*	Main gulp tasks
*/

gulp.task('serve', ['browser-sync'], function(){
	gulp.watch(serve.config.lessSourcePath, ['style:less'], $.browserSync.reload);
	gulp.watch(serve.config.htmlSourcePath, $.browserSync.reload);
});

gulp.task('build', $.sequence('style:less', 'inject:all', 'useref', 'source:client'));
