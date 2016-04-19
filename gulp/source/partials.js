module.exports = function(gulp, $, config){
	'use strict';

	var partialFiles        = $.path.join(config.dirs.app, 'partials', '**/*.html'),
		partialsDistFolder  = $.path.join(config.dirs.dist, 'partials'),
		htmlminOptions      = {collapseWhitespace: true, removeComments: true};

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
				.pipe($.htmlmin(htmlminOptions))
				.pipe(gulp.dest(partialsDistFolder));
				callback(null);
		});
	};
};
