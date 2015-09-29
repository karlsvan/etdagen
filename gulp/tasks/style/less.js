module.exports = (function(){
	'use strict';

	var gulp 		= require('gulp'),
		$			= require('../../plugins'),
		appConfig  	= require('../../../gulpfile');

	var fileToConvert 	= $.path.join(appConfig.app, 'assets', 'styles', 'main.less'),
		autoprefix 		= true;
		
	/*
	*	@task: style.less
	*	@description:
	*		Convert main.less into main.css
	*/
	return function less(callback){
		gulp.src(fileToConvert)
			.pipe($.plumber())
			.pipe($.less())
			.pipe($.if(autoprefix, $.autoprefixer()))
			.pipe(gulp.dest($.path.dirname(fileToConvert)));
		callback(null);
	}
})();