module.exports = function(gulp, $, config){
	'use strict';

	var fileToConvert 		= $.path.join(config.dirs.app, 'assets', 'styles', 'main.less'),
		outputDestination 	= $.path.join(config.dirs.app, 'assets', 'styles', 'css'),
		autoprefixerOpt 	= { browsers:['last 2 versions'] };

	/*
	*	@task: style.less
	*	@description:
	*		This task will use the main.less file to generate main.css and autoprefix it
	*/
	return function less(callback){
		gulp.src(fileToConvert)
			.pipe($.plumber())
			.pipe($.sourcemaps.init())
				.pipe($.less())
				.pipe($.autoprefixer(autoprefixerOpt))
			.pipe($.sourcemaps.write('.'))
			.pipe(gulp.dest(outputDestination))
			.pipe($.browserSync.stream());
			callback(null);
	};
};
