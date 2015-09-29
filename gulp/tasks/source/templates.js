module.exports = (function(){
	'use strict';

	var gulp 		= require('gulp'),
		$ 			= require('../../plugins'),
		appConfig 	= require('../../../gulpfile');

	var templateFiles 				= $.path.join(appConfig.app, 'components', '**/*.tmpl.html'),
		templatesDistFolder 	= $.path.join(appConfig.dist, 'components');

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
				.pipe($.minifyHtml())
				.pipe(gulp.dest(templatesDistFolder));
				callback(null);
		});
	}
})();