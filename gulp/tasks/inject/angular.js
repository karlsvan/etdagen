module.exports = function(gulp, $, appConfig){
	'use strict';

	var fileToInjectInto 	=   appConfig.indexFile,
		filesToInject 		= [ $.path.join(appConfig.app, 'components', '**/*.js'),
								$.path.join(appConfig.app, 'partials', '**/*.js'),
								$.path.join(appConfig.app, 'services', '**/*.js') ],
		injectOptions 		= { relative: true, starttag: '<!-- angular:{{ext}} -->', endtag: '<!-- endangular -->' };

	/*
	*	@task: inject.angular
	*	@description:
	*	This task will inject all js files under components/, partials/ and services/ as
	*	references into the file index.ejs inside the angular:js tag.
	*/
	return function angular(callback){
		gulp.src(fileToInjectInto)
			.pipe($.plumber())
			.pipe($.inject(gulp.src(filesToInject, {read:false}), injectOptions))
			.pipe(gulp.dest($.path.dirname(fileToInjectInto)));
			callback(null);
	};
};
