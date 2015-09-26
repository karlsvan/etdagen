'use strict';
var gulp 		= require('gulp'),
	$			= require('../../plugins'),
	config  	= require('../../config').injectConfig;
	
/*
*	@task: inject.angular
*	@description:
*		Inject references to the angular applications into index.ejs
*/
module.exports = function angular(callback){
	gulp.src(config.inputSource)
		.pipe($.plumber())
		.pipe($.inject(gulp.src(config.angularSourcePath, {read:false}), config.angularOpt))
		.pipe(gulp.dest(config.outputDestination));
		$.util.log('Angular files injected.');
		callback(null);
}