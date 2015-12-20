module.exports = function(gulp, $, appConfig){
	'use strict';

	var fileToInjectInto 	= appConfig.indexFile,
		wiredepOptions 		= {
			overrides: {
				'font-awesome': { 'main': [ 'css/font-awesome.css' ] },
				'angular-material': { 'main': [ 'angular-material.js', 'angular-material.css' ] }
			}
		};

	/*
	*	@task: inject.bower
	*	@description:
	*		This task will inject all bower dependencies as references into index.ejs inside the bower tag.
	*/
	return function bower(callback){
		gulp.src(fileToInjectInto)
			.pipe($.plumber())
			.pipe($.wiredep(wiredepOptions))
			.pipe(gulp.dest($.path.dirname(fileToInjectInto)));
			callback(null);
	};
};
