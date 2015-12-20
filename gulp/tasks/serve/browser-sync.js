module.exports = function(gulp, $, appConfig){
	'use strict';

	var servePort = 5000,
		proxyHost = 'localhost';

	/*
	*	@task: serve.browserSync
	*	@description:
	*		This task will use the browser-sync plugin to serve up a local version of the site.
	*/
	return function browserSync(callback){
		var port = process.env.PORT || 3000;
		$.browserSync.init({
			proxy: proxyHost + ':' + port,
			port: servePort,
			notify: true
		});
		callback(null);
	};
};

module.exports.preTasks = ['serve:nodemon'];
