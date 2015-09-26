module.exports = function(gulp, $, appConfig){
	'use strict';

	/*
	*	Configurations for source
	*/
	var config = {
		imagesSourcePath: 		[ $.path(appConfig.app, 'assets', 'images', '**/*') ],
		imagesDestination: 		  $.path(appConfig.dist, 'assets', 'images'),
		partialsSourcePath:		[ $.path(appConfig.app, 'partials', '**/*.html') ],
		partialsDestination:	  $.path(appConfig.dist, 'partials'),
		templatesSourcePath: 	[ $.path(appConfig.app, 'components', '**/*.tmpl.html') ],
		templatesDestination: 	  $.path(appConfig.dist, 'components'),
		fontsSourcePath: [fontPathFor('font-awesome')],
		fontsDestination: $.path(appConfig.dist, 'assets', 'fonts')
	}

	/*
	*	@task: source.client
	*	@description:
	*		Copy and minify files from the client to dist
	*/
	function client(callback){
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

	/*
	*	@task: source.fonts
	*	@description:
	*		Copy fonts from bower dependencies to dist
	*/
	function fontPathFor(vendor){ return $.path(__dirname, 'bower_components', vendor, 'fonts', '*.{eot,svg,ttf,woff,woff2}') }

	function fonts(callback){
		// Delete current folder from dist
		$.del([config.fontsDestination], 
			function success(){
				$.util.log('dist/fonts deleted. Copying fonts...');
				// Copy fonts from bower_components
				gulp.src(config.fontsSourcePath)
					.pipe(gulp.dest(config.fontsDestination))
				callback(null);
			},
			function failure(error){ callback(error); })
	}

	return {
		config: config,
		client: client,
		fonts: fonts
	}
}