module.exports = (function(){
	'use strict';

	var gulp 		= require('gulp'),
		$			= require('../../plugins'),
		appConfig 	= require('../../../gulpfile');

	var fileToInjectInto 	=   appConfig.indexFile,
		filesToInject 		= [ $.path.join(appConfig.app, 'components', '**/*.js'),
								$.path.join(appConfig.app, 'partials', '**/*.js') ],
		injectOptions 		= { relative: true, starttag: '<!-- angular:{{ext}} -->', endtag: '<!-- endangular -->' };

	/*
	*	@task: inject.angular
	*	@description:
	*		Inject references to the angular applications into index.ejs
	*/
	return function angular(callback){
		gulp.src(fileToInjectInto)
			.pipe($.plumber())
			.pipe($.inject(gulp.src(filesToInject, {read:false}), injectOptions))
			.pipe(gulp.dest($.path.dirname(fileToInjectInto)));
			$.util.log('Angular files injected.');
			callback(null);
	}
})();