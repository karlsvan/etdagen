/*	==================================================
*					Gulpfile
*	==================================================
*	@plugins:
*		see package.json under dev-dependencies 
*		for available plugins.
*	@tasks:
*		see gulp-tasks/ for available tasks
*	@description:
*		This is the main file, which is executed when using gulp.
*		It loads all plugins, configurations and tasks from the
*		gulp/ folder. All tasks will be generated on the form:
*
*			gulp.task(<taskname>:<subtask>, <preTasks>, <taskfunc>);
*
*		If the task is located in a folder, it will be handled as
*		a subtask. Note that a subtask can not have subtasks. The
*		preTasks will be executed before the tasks called if they
*		exist. For preTasks use arrays or $.sequence like so:
*
*			module.exports.preTasks = [<task1>, <task2> ... ]
*				or
*			module.exports.preTasks = $.sequence(<task1>, <task2> ... )
*/

/*
*	Gulp plugins and app configurations
*/
var gulp 		= require('gulp'),
	$			= require('./gulp/plugins');

var appConfig = module.exports = {
	root: 	$.path.resolve(__dirname),
	app:  	$.path.resolve(__dirname, 'app'),
	dist: 	$.path.resolve(__dirname, 'server', 'dist'),

	indexFile: 		$.path.resolve(__dirname, 'app', 'index.ejs'),
	mainLessFile: 	$.path.resolve(__dirname, 'app', 'assets', 'styles', 'main.less')
};


/*
*	Gulp minor tasks
*/
var tasks = require('require-dir')('./gulp/tasks', {recurse: true});
for(var key in tasks){
	if(typeof tasks[key] === 'function'){
		gulp.task(key, tasks[key].preTasks, tasks[key](gulp, $, appConfig));
	}
	for(var skey in tasks[key]){
		gulp.task(key+':'+skey, tasks[key][skey].preTasks, tasks[key][skey](gulp, $, appConfig));
	}
}


/*
*	Gulp major tasks
*/
gulp.task('inject:all', $.sequence('inject:bower', 'inject:annotate', 'inject:angular', 'inject:custom', 'inject:less'));
gulp.task('source:all', ['source:images', 'source:partials', 'source:templates', 'source:fonts', 'source:angular']);



/*
*	Gulp project tasks
*/
gulp.task('serve', $.sequence('serve:browser-sync', 'serve:watch'));
gulp.task('build', $.sequence('style:less', 'inject:all', 'useref', 'source:all'));

gulp.task('default', function(){
	$.util.log('No default gulp task defined. See gulpfile for other tasks.');
});
