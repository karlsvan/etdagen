module.exports = function(gulp, $, config){
	'use strict';

	var lessFiles 	= [ $.path.join(config.dirs.app, 'assets', 'styles', '**/*.less'),
						$.path.join(config.dirs.app, 'components', '**/*.less'),
						$.path.join(config.dirs.app, 'partials', '**/*.less') ],
		htmlFiles 	= 	$.path.join(config.dirs.app, '**/*.{html, ejs}');

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
