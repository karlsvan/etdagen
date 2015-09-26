module.exports = function(gulp, $, appConfig){
	'use strict';

	/*
	*	Configurations for style
	*/
	var config = {
		inputSource: $.path(appConfig.app, 'assets', 'styles', 'main.less'),
		outputDestination: $.path(appConfig.app, 'assets', 'styles')
	}

	/*
	*	@task: style.less
	*	@description:
	*		Convert main.less into main.css
	*/
	function less(callback){
		gulp.src(config.inputSource)
			.pipe($.plumber())
			.pipe($.less())
			.pipe($.autoprefixer())
			.pipe(gulp.dest(config.outputDestination));
		callback(null);
	}

	return {
		config: config,
		less: less
	}
}