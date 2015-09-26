'use strict';
var gulp 		= require('gulp'),
	$			= require('../plugins'),
	config  	= require('../config').userefConfig;
	
/*	
*	@task: useref
*	@description:
*		Use references in index.ejs to get files, concat and copy to dist
*/
module.exports = function useref(callback){
	$.del(config.outputFolders, function (){
		$.util.log('Building assets...');
		gulp.src(config.inputSource)
			.pipe($.plumber())
			.pipe(config.assets)
				.pipe($.sourcemaps.init())
				// If CSS-file, use autoprefixer and minify
				.pipe($.if('*.css', $.autoprefixer(config.autoprefixerOpt)))
				.pipe($.if('*.css', $.minifyCss()))
				// If JS-file, uglify
				.pipe($.if('*.js', $.uglify()))
				.pipe($.sourcemaps.write('.'))
			.pipe(config.assets.restore())
			.pipe($.useref())
			.pipe(gulp.dest(config.outputDestination));
			callback(null);
	}, function (error){ callback(error); })
}