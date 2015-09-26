'use strict';
var gulp 		= require('gulp'),
	$			= require('../../plugins'),
	config  	= require('../../config').sourceConfig;
	
/*
*	@task: source.fonts
*	@description:
*		Copy fonts from bower dependencies to dist
*/
module.exports = function fonts(callback){
	// Delete current folder from dist
	$.del([config.fontsDestination], 
		function success(){
			$.util.log('dist/fonts deleted. Copying fonts...');
			// Copy fonts from bower_components
			gulp.src(config.fontsSourcePath)
				.pipe(gulp.dest(config.fontsDestination))
			callback(null);
		},
		function failure(error){ callback(error); })
}