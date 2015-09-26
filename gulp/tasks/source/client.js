'use strict';
var gulp 		= require('gulp'),
	$			= require('../../plugins'),
	config  	= require('../../config').sourceConfig;
	
/*
*	@task: source.client
*	@description:
*		Copy and minify files from the client to dist
*/
module.exports = function client(callback){
	// Delete current folders from dist
	$.del([ config.partialsDestination, 
			config.templatesDestination,
			config.imagesDestination ],
		function success(){
			$.util.log('partials, templates and images in dist/ deleted. Copying files...');
			// Copy partials
			gulp.src(config.partialsSourcePath)
				.pipe($.plumber())
				.pipe($.minifyHtml())
				.pipe(gulp.dest(config.partialsDestination))

			// Copy templates
			gulp.src(config.templatesSourcePath)
				.pipe($.plumber())
				.pipe($.minifyHtml())
				.pipe(gulp.dest(config.templatesDestination))

			// Copy images
			gulp.src(config.imagesSourcePath)
				.pipe($.plumber())
				.pipe($.imagemin({progressive: true}))
				.pipe(gulp.dest(config.imagesDestination))

			callback(null);
		},
		function failure(error){ callback(error); })

}