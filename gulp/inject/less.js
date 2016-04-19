module.exports = function(gulp, $, config){
	'use strict';

	var fileToInjectInto 	= $.path.resolve('app', 'styles', 'main.less'),
		filesToInject 		= {
			mixins: 	$.path.join(config.dirs.app, 'assets', 'styles', 'mixins', '*.less'),
			components: $.path.join(config.dirs.app, 'components', '**/*.less'),
			partials: 	$.path.join(config.dirs.app, 'partials', '**/*.less')
		},
		injectOptions 		= {
			mixins: 	{ relative: true, starttag: '/* inject:mixins:{{ext}} */', endtag: '/* endinject */'},
			components: { relative: true, starttag: '/* inject:components:{{ext}} */', endtag: '/* endinject */'},
			partials: 	{ relative: true, starttag: '/* inject:partials:{{ext}} */', endtag: '/* endinject */'}
		};

	/*
	*	@task: inject.less
	*	@description:
	*		This task will inject all less files as references into main.less.
	*/
	return function less(callback){
		gulp.src(fileToInjectInto)
			.pipe($.plumber())
			.pipe($.inject(gulp.src(filesToInject.mixins, {read: false}), injectOptions.mixins))
			.pipe($.inject(gulp.src(filesToInject.components, {read: false}), injectOptions.components))
			.pipe($.inject(gulp.src(filesToInject.partials, {read: false}), injectOptions.partials))
			.pipe(gulp.dest($.path.dirname(fileToInjectInto)));
			callback(null);
	};
};
