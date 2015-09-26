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


// plugins
var gulp 		= require('gulp'),
	$			= require('./gulp/plugins'),
	serveConfig 	= require('./gulp/config').serveConfig;

// tasks from gulp/tasks/
var tasks = require('require-dir')('./gulp/tasks', {recurse: true});
for(var key in tasks){
	if(typeof tasks[key] === 'function'){ 
		gulp.task(key, tasks[key].preTasks, tasks[key]);
	}
	for(var skey in tasks[key]){
		gulp.task(key+':'+skey, tasks[key][skey].preTasks, tasks[key][skey]);
	}
}

// project tasks
gulp.task('inject:all', $.sequence('inject:bower', 'inject:angular', 'inject:less', 'inject:custom'));
gulp.task('source:all', $.sequence('source:client', 'source:fonts'));

gulp.task('serve', ['serve:browser-sync'], function(){
	gulp.watch(serveConfig.lessSourcePath, ['style:less'], $.browserSync.reload);
	gulp.watch(serveConfig.htmlSourcePath, $.browserSync.reload);
});

gulp.task('build', $.sequence('style:less', 'inject:all', 'useref', 'source:all'));

gulp.task('default', function(){
	for(var key in tasks){
		if(typeof tasks[key] === 'function'){
			$.util.log('task(\"'+key+'\", '+tasks[key].preTasks+', '+typeof tasks[key]+')');
		}
		for(var skey in tasks[key]){
			$.util.log('task(\"'+key+':'+skey+'\", '+tasks[key][skey].preTasks+', '+typeof tasks[key][skey]+')');
		}
	}
})