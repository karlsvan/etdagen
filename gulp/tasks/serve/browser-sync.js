'use strict';

var $ = require('../../plugins');
	
/*
*	@task: serve.browserSync
*	@description:
*		Use browser-sync to serve the frontend
*/
module.exports = function browserSync(callback){
	var port = process.env.PORT || 3000;
	$.browserSync({
		proxy: 'localhost:' + port,
		port: 5000,
		notify: true
	});
	callback(null);
}

module.exports.preTasks = ['serve:nodemon']