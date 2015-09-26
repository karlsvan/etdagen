'use strict';
var gulp 		= require('gulp'),
	$			= require('../../plugins'),
	config  	= require('../../config').injectConfig;
	
/*
*	@task: inject.less
*	@description:
*		Inject references to less files into main.less
*/
module.exports = function less(callback){
	gulp.src(config.lessSource)
		.pipe($.plumber())
		.pipe($.inject(gulp.src(config.lessSourcePath), config.lessOpt))
		.pipe(gulp.dest(config.lessDestination));
		$.util.log('Less files injected');
		callback(null);
}