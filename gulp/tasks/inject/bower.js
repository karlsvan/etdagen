'use strict';
var gulp 		= require('gulp'),
	$			= require('../../plugins'),
	config  	= require('../../config').injectConfig;
	
/*
*	@task: inject.bower
*	@description:
*		Inject references to bower dependencies into index.ejs
*/
module.exports = function bower(callback){
	gulp.src(config.inputSource)
		.pipe($.plumber())
		.pipe($.wiredep(config.wiredepOptions))
		.pipe(gulp.dest(config.outputDestination));
		$.util.log('Bower files injected.');
		callback(null);
}