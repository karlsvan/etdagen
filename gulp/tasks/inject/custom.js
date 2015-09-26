'use strict';
var gulp 		= require('gulp'),
	$			= require('../../plugins'),
	config  	= require('../../config').injectConfig;
	
/*
*	@task: inject.custom
*	@description:
*		Inject references to custom assets into index.ejs
*/
module.exports = function custom(callback){
	gulp.src(config.inputSource)
		.pipe($.plumber())
		.pipe($.inject(gulp.src(config.customSourcePath, {read:false}), config.customOpt))
		.pipe(gulp.dest(config.outputDestination));
		$.util.log('Custom files injected.');
		callback(null);
}