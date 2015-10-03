module.exports = function(gulp, $, appConfig){
	'use strict';
	
	var servePort = 5000,
		proxyHost = 'localhost';

	/*
	*	@task: serve.browserSync
	*	@description:
	*		Use browser-sync to serve the frontend
	*/
	return function browserSync(callback){
		var port = process.env.PORT || 3000;
		$.browserSync.init({
			proxy: proxyHost + ':' + port,
			port: servePort,
			notify: true
		});
		callback(null);
	}
}

module.exports.preTasks = ['serve:nodemon'];