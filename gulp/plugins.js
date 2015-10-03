module.exports = (function(){
	'use strict';

	/*
	*	@description
	*		This task loads all plugins and puts them in a variable
	*/
	return (function(plugins){
		plugins.del 			= require('del');
		plugins.wiredep 		= require('wiredep').stream;
		plugins.path 			= require('path');
		plugins.browserSync 	= require('browser-sync').create();
		return plugins;
	})(require('gulp-load-plugins')());
})();