/*	========================================
*			Gulp configuration file
*	========================================
*
*/

var $ 		= require('./plugins'),
	root 	= $.path.resolve(__dirname, '..');

/*
*	application config
*/
var appConfig 	= module.exports.appConfig = {
	app:  $.path.join(root, 'app'),
	dist: $.path.join(root, 'server', 'dist')
}

/*
*	inject config
*/
module.exports.injectConfig = {
 	wiredepOptions: { overrides: { 'font-awesome': { 'main': [ 'css/font-awesome.css' ] } } },
	angularSourcePath: [ $.path.join(appConfig.app, 'app.js'),
						 $.path.join(appConfig.app, 'components', '**/*.js'),
						 // $.path.join(appConfig.app, 'services', '**/*.js'),
						 $.path.join(appConfig.app, 'partials', '**/*.js') ],
	angularOpt: { relative: true, starttag: '<!-- angular:{{ext}} -->', endtag: '<!-- endangular -->' },
	customSourcePath: [ $.path.join(appConfig.app, 'assets', 'styles', '**/*.css'),
						$.path.join(appConfig.app, 'assets', 'scripts', '**/*.js') ],
	customOpt: { relative: true, starttag: '<!-- custom:{{ext}} -->', endtag: '<!-- endcustom -->'},
	inputSource: $.path.join(appConfig.app, 'views', 'index.ejs'),
	outputDestination: $.path.join(appConfig.app, 'views'),
	lessSource: $.path.join(appConfig.app, 'assets', 'styles', 'main.less'),
	lessDestination: $.path.join(appConfig.app, 'assets', 'styles'),
	lessSourcePath: [ $.path.join(appConfig.app, 'components', '**/*.less'),
					  $.path.join(appConfig.app, 'partials', '**/*.less') ],
	lessOpt: { relative: true, starttag: '/* inject:components:{{ext}} */', endtag: '/* endinject */'},
}


/*
*	Configurations for serve
*/
module.exports.serveConfig = {
	lessSourcePath: [ $.path.join(appConfig.app, 'assets', 'styles', '**/*.less'),
					  $.path.join(appConfig.app, 'components', '**/*.less'),
					  $.path.join(appConfig.app, 'partials', '**/*.less') ],
	htmlSourcePath:   $.path.join(appConfig.app, '**/*.{html, ejs}'),
	nodemonWatchPath: [ $.path.join(root, 'server', '**/*'),
						$.path.join(root, '*.{json, js, md, ico}'),
						$.path.join(appConfig.app, '**/*.{html, ejs}') ]
}


/*
*	Configurations for source
*/
function fontPathFor(vendor){ return $.path.join(root, 'bower_components', vendor, 'fonts', '*.{eot,svg,ttf,woff,woff2}') }
module.exports.sourceConfig = {
	imagesSourcePath: 		[ $.path.join(appConfig.app, 'assets', 'images', '**/*') ],
	imagesDestination: 		  $.path.join(appConfig.dist, 'assets', 'images'),
	partialsSourcePath:		[ $.path.join(appConfig.app, 'partials', '**/*.html') ],
	partialsDestination:	  $.path.join(appConfig.dist, 'partials'),
	templatesSourcePath: 	[ $.path.join(appConfig.app, 'components', '**/*.tmpl.html') ],
	templatesDestination: 	  $.path.join(appConfig.dist, 'components'),
	fontsSourcePath: [fontPathFor('font-awesome')],
	fontsDestination: $.path.join(appConfig.dist, 'assets', 'fonts')
}


/*
*	Configurations for style
*/
module.exports.styleConfig = {
	inputSource: $.path.join(appConfig.app, 'assets', 'styles', 'main.less'),
	outputDestination: $.path.join(appConfig.app, 'assets', 'styles')
}


/*
*	Configurations for useref
*/
module.exports.userefConfig = {
	assets: $.useref.assets(),
	inputSource: $.path.join(appConfig.app, 'views', 'index.ejs'),
	outputDestination: $.path.join(appConfig.dist),
	autoprefixerOpt: { browsers: ['last 2 versions'] },
	outputFolders: [ $.path.join(appConfig.dist, 'js'),
					 $.path.join(appConfig.dist, 'css') ]
}