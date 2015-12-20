module.exports = function(gulp, $, appConfig){
	'use strict';

	var filesToWatch 	= [ $.path.join(appConfig.root, 'server', '**/*'),
							$.path.join(appConfig.root, '*.{json, js, md, ico}') ];

	/*
	*	@task: serve.nodemon
	*	@description:
	*		This task uses the nodemon plugin to serve up backend calls for the site.
	*/
	return function nodemon(callback){
		var initialized = false;
		$.nodemon({
			script: './server/bin/www',
			ext: 'html ejs less css js',
			watch: filesToWatch,
			env: { 'NODE_ENV': 'development' }
		}).on('start', function(){
			if(!initialized){
				initialized = true;
				callback(null);
			}
		}).on('restart', function (){
			console.log('server restarted');
			setTimeout(function () {
				$.browserSync.reload({ stream: false });
			}, 1000);
		});
	};
};
