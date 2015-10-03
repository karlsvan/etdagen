module.exports = function(gulp, $, appConfig){
	'use strict';
	
	var fileToInjectInto 	= appConfig.mainLessFile,
		filesToInject 		= {
			mixins: 	$.path.join(appConfig.app, 'assets', 'styles', 'mixins', '*.less'),
			components: $.path.join(appConfig.app, 'components', '**/*.less'),
			partials: 	$.path.join(appConfig.app, 'partials', '**/*.less')
		},
		injectOptions 		= {
			mixins: 	{ relative: true, starttag: '/* inject:mixins:{{ext}} */', endtag: '/* endinject */'},
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
			.pipe($.inject(gulp.src(filesToInject.mixins, {read: false}), injectOptions.mixins))
			.pipe($.inject(gulp.src(filesToInject.components, {read: false}), injectOptions.components))
			.pipe($.inject(gulp.src(filesToInject.partials, {read: false}), injectOptions.partials))
			.pipe(gulp.dest($.path.dirname(fileToInjectInto)));
			callback(null);
	}
}