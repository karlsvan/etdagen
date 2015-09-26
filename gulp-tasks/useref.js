module.exports = function(gulp, $, appConfig){
	'use strict';

	/*
	*	Configurations for useref
	*/
	var config = {
		assets: $.useref.assets(),
		inputSource: $.path(appConfig.app, 'views', 'index.ejs'),
		outputDestination: $.path(appConfig.dist),
		autoprefixerOpt: { browsers: ['last 2 versions'] },
		outputFolders: [ $.path(appConfig.dist, 'js'),
						 $.path(appConfig.dist, 'css') ]
	}

	/*	
	*	@task: useref
	*	@description:
	*		Use references in index.ejs to get files, concat and copy to dist
	*/
	function useref(callback){
		del(config.outputFolders, function (){
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

	return {
		config: config,
		useref: useref
	}
}