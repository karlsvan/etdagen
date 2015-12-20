module.exports = function(gulp, $, appConfig){
	'use strict';

	var partialFiles 		= $.path.join(appConfig.app, 'partials', '**/*.html'),
		partialsDistFolder 	= $.path.join(appConfig.dist, 'partials');

	/*
	*	@task: source.partials
	*	@description:
	*		This task copies and minifies the partials and puts them in dist
	*/
	return function partials(callback){
		$.del(partialsDistFolder,
			function then(){
			$.util.log('Copying and minifying partials...');
			gulp.src(partialFiles)
				.pipe($.plumber())
				.pipe($.minifyHtml())
				.pipe(gulp.dest(partialsDistFolder));
				callback(null);
		});
	};
};
