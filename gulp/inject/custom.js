module.exports = function(gulp, $, config){
	'use strict';

	var fileToInjectInto 	=   config.files.index,
		filesToInject 		= [ $.path.join(config.dirs.app, 'assets', 'styles', '**/*.css'),
								$.path.join(config.dirs.app, 'assets', 'scripts', '**/*.js') ],
		injectOptions 		= { relative: true, starttag: '<!-- custom:{{ext}} -->', endtag: '<!-- endcustom -->'};

	/*
	*	@task: inject.custom
	*	@description:
	*		This task will inject all css and js files in assets/ as references in index.ejs under the custom tag.
	*/
	return function custom(callback){
		gulp.src(fileToInjectInto)
			.pipe($.plumber())
			.pipe($.inject(gulp.src(filesToInject, {read:false}), injectOptions))
			.pipe(gulp.dest($.path.dirname(fileToInjectInto)));
			callback(null);
	};
};
