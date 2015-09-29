module.exports = (function(){
	'use strict';

	var gulp 		= require('gulp'),
		$			= require('../../plugins'),
		appConfig  	= require('../../../gulpfile');
	
	var fileToInjectInto 	= appConfig.mainLessFile,
		filesToInject 		= {
			components: $.path.join(appConfig.app, 'components', '**/*.less'),
			partials: 	$.path.join(appConfig.app, 'partials', '**/*.less')
		},
		injectOptions 		= {
			components: { relative: true, starttag: '/* inject:components:{{ext}} */', endtag: '/* endinject */'},
			partials: 	{ relative: true, starttag: '/* inject:partials:{{ext}} */', endtag: '/* endinject */'}
		};

	/*
	*	@task: inject.less
	*	@description:
	*		Inject references to less files into main.less
	*/
	return function less(callback){
		gulp.src(fileToInjectInto)
			.pipe($.plumber())
			.pipe($.inject(gulp.src(filesToInject.components, {read: false}), injectOptions.components))
			.pipe($.inject(gulp.src(filesToInject.partials, {read: false}), injectOptions.partials))
			.pipe(gulp.dest($.path.dirname(fileToInjectInto)));
			$.util.log('Less files injected');
			callback(null);
	}
})();