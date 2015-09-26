module.exports = function(gulp, $, appConfig){
	'use strict';

	/*
	*	Configurations for serve
	*/
	var config = {
		lessSourcePath: [ $.path(appConfig.app, 'assets', 'styles', '**/*.less'),
						  $.path(appConfig.app, 'components', '**/*.less'),
						  $.path(appConfig.app, 'partials', '**/*.less') ],
		htmlSourcePath:   $.path(appConfig.app, '**/*.{html, ejs}'),
		nodemonWatchPath: [ $.path(__dirname, 'server', '**/*'),
							$.path(__dirname, '*.{json, js, md, ico}'),
							$.path(appConfig.app, '**/*.{html, ejs}') ]
	}


	/*
	*	@task: serve.browserSync
	*	@description:
	*		Use browser-sync to serve the frontend
	*/
	function browserSync(callback){
		var port = process.env.PORT || 3000;
		$.browserSync({
			proxy: 'localhost:' + port,
			port: 5000,
			notify: true
		});
		callback(null);
	}


	/*
	*	@task: serve.nodemon
	*	@description:
	*		Use nodemon to serve the backend
	*/
	function nodemon(callback){
		var initialized = false;
		$.nodemon({
			script: './server/bin/www',
			ext: 'html ejs less css js',
			watch: config.nodemonWatchPath,
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
	}

	return {
		config: config,
		browserSync: browserSync,
		nodemon: nodemon
	}

}