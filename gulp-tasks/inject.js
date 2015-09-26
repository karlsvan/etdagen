module.exports = function(gulp, $, appConfig){
	'use strict';

	/*
	*	Configurations for inject
	*/
	var config = {
	 	wiredepOptions: { overrides: { 'font-awesome': { 'main': [ 'css/font-awesome.css' ] } } },
		angularSourcePath: [ $.path(appConfig.app, 'app.js'),
							 $.path(appConfig.app, 'components', '**/*.js'),
							 // $.path(appConfig.app, 'services', '**/*.js'),
							 $.path(appConfig.app, 'partials', '**/*.js') ],
		angularOpt: { relative: true, starttag: '<!-- angular:{{ext}} -->', endtag: '<!-- endangular -->' },
		customSourcePath: [ $.path(appConfig.app, 'assets', 'styles', '**/*.css'),
							$.path(appConfig.app, 'assets', 'scripts', '**/*.js') ],
		customOpt: { relative: true, starttag: '<!-- custom:{{ext}} -->', endtag: '<!-- endcustom -->'},
		inputSource: $.path(appConfig.app, 'views', 'index.ejs'),
		outputDestination: $.path(appConfig.app, 'views'),
		lessSource: $.path(appConfig.app, 'assets', 'styles', 'main.less'),
		lessSourcePath: [ $.path(appConfig.app, 'components', '**/*.less'),
						  $.path(appConfig.app, 'partials', '**/*.less') ],
		lessOpt: { relative: true, starttag: '/* inject:components:{{ext}} */', endtag: '/* endinject */'},
		lessDestination: $.path(appConfig.app, 'assets', 'styles')
	}

	/*
	*	@task: inject.bower
	*	@description:
	*		Inject references to bower dependencies into index.ejs
	*/
	function bower(callback){
		gulp.src(injectConfig.inputSource)
			.pipe($.plumber())
			.pipe($.wiredep(config.wiredepOptions))
			.pipe(gulp.dest(config.outputDestination));
			$.util.log('Bower files injected.');
			callback(null);
	}
	
	/*
	*	@task: inject.angular
	*	@description:
	*		Inject references to the angular applications into index.ejs
	*/
	function angular(callback){
		gulp.src(config.inputSource)
			.pipe($.plumber())
			.pipe($.inject(gulp.src(config.angularSourcePath, {read:false}), config.angularOpt))
			.pipe(gulp.dest(config.outputDestination));
			$.util.log('Angular files injected.');
			callback(null);
	}


	/*
	*	@task: inject.custom
	*	@description:
	*		Inject references to custom assets into index.ejs
	*/
	function custom(callback){
		gulp.src(config.inputSource)
			.pipe($.plumber())
			.pipe($.inject(gulp.src(config.customSourcePath, {read:false}), config.customOpt))
			.pipe(gulp.dest(config.outputDestination));
			$.util.log('Custom files injected.');
			callback(null);
	}

	/*
	*	@task: inject.less
	*	@description:
	*		Inject references to less files into main.less
	*/
	function less(callback){
		gulp.src(config.lessSource)
			.pipe($.plumber())
			.pipe($.inject(gulp.src(config.lessSourcePath), config.lessOpt))
			.pipe(gulp.dest(config.lessDestination));
			$.util.log('Less files injected');
			callback(null);
	}

	return {
		config: config,
		bower: bower,
		angualr: angular,
		custom: custom,
		less: less
	}
}
