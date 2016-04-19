module.exports = function(gulp, $, config){
	'use strict';

	var appFile 	= $.path.join(config.dirs.app, 'app.js'),
		distFolder 	= config.dirs.dist;

	/*
	*	@task: source.angular
	*	@description:
	*		This task minifies the app.js and puts it into dist
	*/
	return function angular(callback){
		gulp.src(appFile)
			.pipe($.plumber())
			.pipe($.sourcemaps.init())
			.pipe($.uglify())
			.pipe($.sourcemaps.write('.'))
			.pipe(gulp.dest(distFolder));
			callback(null);
	};
};
