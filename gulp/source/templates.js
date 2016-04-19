module.exports = function(gulp, $, config){
	'use strict';

	var templateFiles 				= $.path.join(config.dirs.app, 'components', '**/*.tmpl.html'),
		templatesDistFolder 	= $.path.join(config.dirs.dist, 'components');

	/*
	*	@task: source.templates
	*	@description:
	*		This task copies and minifies the templates and puts them in dist
	*/
	return function templates(callback){
		$.del(templatesDistFolder,
			function then(){
			$.util.log('Copying and minifying templates...');
			gulp.src(templateFiles)
				.pipe($.plumber())
				.pipe($.htmlmin())
				.pipe(gulp.dest(templatesDistFolder));
				callback(null);
		});
	};
};
