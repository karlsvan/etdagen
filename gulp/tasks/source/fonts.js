module.exports = (function(){
	'use strict';

	var gulp 		= require('gulp'),
		$			= require('../../plugins'),
		appConfig  	= require('../../../gulpfile');

	var fontFiles 			= $.path.join(appConfig.root, 'bower_components', 'materialize', 'font', '**', '*.{eot,svg,ttf,woff,woff2}'),
		fontsFiles 			= $.path.join(appConfig.root, 'bower_components', 'font-awesome', 'fonts', '*.{eot,svg,ttf,woff,woff2}'),
		fontDistFolder 		= $.path.join(appConfig.dist, 'assets', 'font'),
		fontsDistFolder 	= $.path.join(appConfig.dist, 'assets', 'fonts');
		
	/*
	*	@task: source.fonts
	*	@description:
	*		This task copies fonts from bower_components and puts them in dist
	*/
	return function fonts(callback){
		$.del(fontsDistFolder,
			function then(){
			$.util.log('Copying fonts...');
			gulp.src(fontFiles)
				.pipe($.plumber())
				.pipe(gulp.dest(fontDistFolder));
			gulp.src(fontsFiles)
				.pipe($.plumber())
				.pipe(gulp.dest(fontsDistFolder));
				callback(null);
		});
	}
})();