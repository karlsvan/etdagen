module.exports = function(gulp, $, appConfig){
	'use strict';

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
			callback(null);
	}
}