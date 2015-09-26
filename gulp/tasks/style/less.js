'use strict';
var gulp 		= require('gulp'),
	$			= require('../../plugins'),
	config  	= require('../../config').styleConfig;
	
/*
*	@task: style.less
*	@description:
*		Convert main.less into main.css
*/
module.exports = function less(callback){
	gulp.src(config.inputSource)
		.pipe($.plumber())
		.pipe($.less())
		.pipe($.autoprefixer())
		.pipe(gulp.dest(config.outputDestination));
	callback(null);
}