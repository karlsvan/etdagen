module.exports = (function(){
	'use strict';

	var gulp 		= require('gulp'),
		$ 			= require('../../plugins'),
		appConfig 	= require('../../../gulpfile');

	var imageFiles 			= $.path.join(appConfig.app, 'assets', 'images', '**/*'),
		imagesDistFolder 	= $.path.join(appConfig.dist, 'assets', 'images');

	/*
	*	@task: source.images
	*	@description:
	*		This task copies an compresses the images and puts them in dist/assets
	*/
	return function images(callback){
		$.del(imagesDistFolder,
			function then(){
			$.util.log('Copying and compressing images...');
			gulp.src(imageFiles)
				.pipe($.plumber())
				.pipe($.imagemin({progressive: true}))
				.pipe(gulp.dest(imagesDistFolder));
				callback(null);
		});
	}
})();