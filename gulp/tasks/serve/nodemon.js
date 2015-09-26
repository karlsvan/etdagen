'use strict';
var	$			= require('../../plugins'),
	config  	= require('../../config').serveConfig;
	
/*
*	@task: serve.nodemon
*	@description:
*		Use nodemon to serve the backend
*/
module.exports = function nodemon(callback){
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