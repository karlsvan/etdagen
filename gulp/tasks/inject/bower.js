module.exports = (function(){
	'use strict';

	var gulp 		= require('gulp'),
		$			= require('../../plugins'),
		appConfig 	= require('../../../gulpfile');

	var fileToInjectInto 	= appConfig.indexFile,
		wiredepOptions 		= { overrides: { 'font-awesome': { 'main': [ 'css/font-awesome.css' ] } } };
		
	/*
	*	@task: inject.bower
	*	@description:
	*		Inject references to bower dependencies into index.ejs
	*/
	return function bower(callback){
		gulp.src(fileToInjectInto)
			.pipe($.plumber())
			.pipe($.wiredep(wiredepOptions))
			.pipe(gulp.dest($.path.dirname(fileToInjectInto)));
			$.util.log('Bower files injected.');
			callback(null);
	}
})();