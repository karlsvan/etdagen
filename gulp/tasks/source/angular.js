module.exports = function(gulp, $, appConfig){
	'use strict';

	var appFile 	= $.path.join(appConfig.app, 'app.js'),
		distFolder 	= appConfig.dist;

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
