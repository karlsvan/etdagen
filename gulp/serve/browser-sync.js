module.exports = function(gulp, plugins, config){
	'use strict';

	if(plugins.browserSync.active) { return; }

	return function browserSync(done){
		plugins.browserSync.init({
			notify: true,
			logPrefix: 'BrowserSync',
			proxy: 'localhost:'+ config.port, // Proxy from nodemon
			//port: 5000, // Set port to proxy the app to
			files: [
				plugins.path.join(config.dirs.app, '**', '*.+(js|html|ejs)')
			]
		});
		done(null);
	};
};

module.exports.preTasks = ['serve:nodemon'];
