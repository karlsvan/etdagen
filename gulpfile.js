'use strict';

var gulp 		= require('gulp'),
	path		= require('path');

var $ = (function(plugins){
	// All 'gulp-*' and 'gulp.*' from package.json will be
	// placed in the @plugins variable camelcased.
	// Plugins without 'gulp' must be explicitly added under.
	plugins.browserSync = require('browser-sync').create();
	plugins.del = require('del');
	plugins.wiredep = require('wiredep').stream;
	plugins.path = require('path');
	return plugins;
})(require('gulp-load-plugins')());

var config = module.exports = {
	port: process.env.PORT || 4000,
	tasks: {
		delimiter: ':'
	},
	dirs: {
		root: path.resolve(__dirname),
		server: path.resolve(__dirname, 'server'),
			bin: path.resolve(__dirname, 'server', 'bin'),

		// TODO: Put assets into src->fonts,images,assets instead of app->assets
		src: path.resolve(__dirname, 'src'),
			images: path.resolve(__dirname, 'src', 'images'),
			videos: path.resolve(__dirname, 'src', 'videos'),
		// End TODO

		dist: path.resolve(__dirname, 'dist'),
		app: path.resolve(__dirname, 'app'),
			components: path.resolve(__dirname, 'app', 'components'),
			partials: path.resolve(__dirname, 'app', 'partials'),
			services: path.resolve(__dirname, 'app', 'services'),

		// TODO: Create folder for temporary files
		tmp: path.resolve(__dirname, '.tmp'),
		// End TODO

		gulp: path.resolve(__dirname, 'gulp')
	},
	files: {
		gulpfile: path.resolve(__dirname, 'gulpfile.js'),
		package: path.resolve(__dirname, 'package.json'),
		bower: path.resolve(__dirname, 'bower.json'),
		app: path.resolve(__dirname, 'app', 'app.js'),
		index: path.resolve(__dirname, 'app', 'index.ejs'),
		server: path.resolve(__dirname, 'server', 'server.js')
	}
};

/**
 * Import all gulp tasks placed in ./gulp/
 * @param  {Object} obj - object of the tasks from require-dir
 * @param  {String} name - string for the taskname
 */
(function createGulpTasks(obj, name){
	name = (name)?name:'';
	for(var i in obj){
		if(obj.hasOwnProperty(i)){
			switch (typeof obj[i]) {
				case 'object':
					createGulpTasks(obj[i], (!name)?i:config.tasks.delimiter+i);
					break;
				case 'function':
					gulp.task((!name)?i:name+config.tasks.delimiter+i, obj[i]['preTasks'], obj[i](gulp, $, config));
					break;
				default:
					console.log(obj[i],' is of type ', typeof obj[i]);
			}
		}
	}
})(require('require-dir')(config.dirs.gulp, {recurse: true}));

/*var appConfig = module.exports = {
	root: 	$.path.resolve(__dirname),
	app:  	$.path.resolve(__dirname, 'app'),
	dist: 	$.path.resolve(__dirname, 'server', 'dist'),

	indexFile: 		$.path.resolve(__dirname, 'app', 'index.ejs'),
	mainLessFile: 	$.path.resolve(__dirname, 'app', 'assets', 'styles', 'main.less')
};

var tasks = require('require-dir')('./gulp/tasks', {recurse: true});
for(var key in tasks){
	if(typeof tasks[key] === 'function'){
		gulp.task(key, tasks[key].preTasks, tasks[key](gulp, $, appConfig));
	}
	for(var skey in tasks[key]){
		gulp.task(key+':'+skey, tasks[key][skey].preTasks, tasks[key][skey](gulp, $, appConfig));
	}
}*/


/*
*	Gulp major tasks
*/
gulp.task('inject:all', $.sequence('inject:bower', 'inject:annotate', 'inject:angular', 'inject:custom', 'inject:less'));
gulp.task('source:all', ['source:images', 'source:partials', 'source:templates', 'source:fonts', 'source:angular']);



/*
*	Gulp project tasks
*/
gulp.task('serve', $.sequence('inject:all', 'serve:browser-sync', 'serve:watch'));
gulp.task('build', $.sequence('style:less', 'inject:all', 'useref', 'source:all'));

gulp.task('default', function(){
	$.util.log('No default gulp task defined. See gulpfile for other tasks.');
});
