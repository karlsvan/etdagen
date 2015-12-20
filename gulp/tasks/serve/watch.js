module.exports = function(gulp, $, appConfig){
	'use strict';

	var lessFiles 	= [ $.path.join(appConfig.app, 'assets', 'styles', '**/*.less'),
						$.path.join(appConfig.app, 'components', '**/*.less'),
						$.path.join(appConfig.app, 'partials', '**/*.less') ],
		htmlFiles 	= 	$.path.join(appConfig.app, '**/*.{html, ejs}');

	/*
	*	@task: serve.watch
	*	@description:
	*		This task watches all less files in assets/styles/, components/ and partials/
	*		and all html and ejs files for changes and reloads the browser-sync plugin
	*		when a change occurs.
	*/
	return function watch(){
		gulp.watch(lessFiles, ['style:less']);
		gulp.watch(htmlFiles).on('change', $.browserSync.reload);
	};
};
