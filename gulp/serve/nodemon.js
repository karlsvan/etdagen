module.exports = function(gulp, $, config){
	'use strict';

	var BROWSER_SYNC_RELOAD_DELAY = 500;

	// return function nodemon(callback){
	// 	startNodemon('development');
	// 	callback();
	// };

	return function startNodemon(callback){
		var initialized = false;
		$.nodemon({
			script: $.path.resolve('server', 'bin', 'www'),
			env: {'NODE_ENV': 'development'},
			ext: 'js',
			watch: [
				$.path.join(config.dirs.server, '**', '*')
			]
		})
		.on('start', function(){
			if (!initialized) {
				callback();
				initialized = true;
			}
		})
		.on('restart', function(){
			setTimeout(function () {
				$.browserSync.reload({ stream: false });
			}, BROWSER_SYNC_RELOAD_DELAY);
		});
	};
};
