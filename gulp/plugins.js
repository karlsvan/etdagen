var $; //plugins variable
(function loadGulpPlugins(callback){
	$ = require('gulp-load-plugins')();
	callback();
})(function loadOtherPlugins(){
	$.del 			= require('del');
	$.wiredep 		= require('wiredep').stream;
	$.path 			= require('path');
	$.browserSync 	= require('browser-sync');
});

module.exports = $;