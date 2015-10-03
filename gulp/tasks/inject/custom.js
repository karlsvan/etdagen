module.exports = function(gulp, $, appConfig){
	'use strict';

	var fileToInjectInto 	=   appConfig.indexFile,
		filesToInject 		= [ $.path.join(appConfig.app, 'assets', 'styles', '**/*.css'),
								$.path.join(appConfig.app, 'assets', 'scripts', '**/*.js') ],
		injectOptions 		= { relative: true, starttag: '<!-- custom:{{ext}} -->', endtag: '<!-- endcustom -->'};
		
	/*
	*	@task: inject.custom
	*	@description:
	*		Inject references to custom assets into index.ejs
	*/
	return function custom(callback){
		gulp.src(fileToInjectInto)
			.pipe($.plumber())
			.pipe($.inject(gulp.src(filesToInject, {read:false}), injectOptions))
			.pipe(gulp.dest($.path.dirname(fileToInjectInto)));
			callback(null);
	}
}