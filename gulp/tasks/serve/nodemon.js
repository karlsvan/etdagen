module.exports = (function(){
	'use strict';
	
	var	$ 			= require('../../plugins'),
		appConfig 	= require('../../../gulpfile');
	
	var filesToWatch 	= [ $.path.join(appConfig.root, 'server', '**/*'),
							$.path.join(appConfig.root, '*.{json, js, md, ico}'),
							$.path.join(appConfig.app, '**/*.{html, ejs}') ];

	/*
	*	@task: serve.nodemon
	*	@description:
	*		Use nodemon to serve the backend
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
	}
})();