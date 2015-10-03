module.exports = function(gulp, $, appConfig){
	'use strict';

	var lessFiles 	= [ $.path.join(appConfig.app, 'assets', 'styles', '**/*.less'),
						$.path.join(appConfig.app, 'components', '**/*.less'),
						$.path.join(appConfig.app, 'partials', '**/*.less') ],
		htmlFiles 	= 	$.path.join(appConfig.app, '**/*.{html, ejs}');

	/*
	*	@task: serve.watch
	*	@description:
	*		This task watches files for changes when
	*		using gulp serve.
	*/
	return function watch(){
		gulp.watch(lessFiles, ['style:less']);
		gulp.watch(htmlFiles).on('change', $.browserSync.reload);
	}
}