// ==================================================
//					Gulpfile
// ==================================================

// Dependencies. See package.json for available plugins

var	del 			= require('del'),
	wiredep			= require('wiredep').stream,
	path			= require('path').resolve;

var gulp 			= require('gulp'),
	plugins			= require('gulp-load-plugins')();


/*	---------------------------------------------------------------------------
*	@Task: inject:all
*	@description:
*		This task will inject bower, angular and custom dependency-referances
*		into index.ejs between the "<!-- {name}:{ext} -->" and "<!-- end{name} -->".
*		It uses gulp-plumber to handle errors during the piping. It uses
*		gulp-wiredep to inject references from bower_components and gulp-inject
*		to inject references from the angular app and other custom styles
*		or scripts.
*/
var injectConfig = {
 	wiredepOptions: {
		overrides: {
			'bootstrap': {
			  'main': [
			    'dist/js/bootstrap.js',
			    'dist/css/bootstrap.css'
			  ]
			},
			'font-awesome': {
			    'main': [
			        'css/font-awesome.css'
			    ]
			}
		}
	},
	anguarSourcePath: [ path(__dirname, 'client', 'scripts', '**/*.js') ],
	angularOpt: { relative: true, starttag: '<!-- angular:{{ext}} -->', endtag: '<!-- endangular -->' },
	customSourcePath: [ path(__dirname, 'client', 'styles', '**/*.css') ],
	customOpt: { relative: true, starttag: '<!-- custom:{{ext}} -->', endtag: '<!-- endcustom -->'},
	inputSource: path(__dirname, 'client', 'views', 'index.ejs'),
	outputDestination: path(__dirname, 'client', 'views')
}

gulp.task('inject', function(callback){
	gulp.src(injectConfig.inputSource)
		// Use plumber
		.pipe(plugins.plumber())
		// Inject references (no need to read data here)
		.pipe(wiredep(injectConfig.wiredepOptions))
		.pipe(plugins.inject(gulp.src(injectConfig.anguarSourcePath, {read:false}), injectConfig.angularOpt))
		.pipe(plugins.inject(gulp.src(injectConfig.customSourcePath, {read:false}), injectConfig.customOpt))
		.pipe(gulp.dest(injectConfig.outputDestination));
		plugins.util.log('All files injected.');
		callback(null);
});




/*	---------------------------------------------------------------------------
*	@Task: source:client
*	@description:
*		This task will copy necessary project files(partials, templates and
*		images), minify them and put them in the dist directory. It uses
*		sourcemaps to
*/
var sourceConfig = {
	partialsSourcePath: 	[ path(__dirname, 'client', 'partials', '*.html') ],
	partialsDestination: 	  path(__dirname, 'server', 'dist', 'partials'),
	templatesSourcePath: 	[ path(__dirname, 'client', 'templates', '*.html') ],
	templatesDestination: 	  path(__dirname, 'server', 'dist', 'templates'),
	imagesSourcePath: 		[ path(__dirname, 'client', 'images', '**/*') ],
	imagesDestination: 		  path(__dirname, 'server', 'dist', 'images')
}

gulp.task('source:client', function (callback){
	// Delete current folders from dist
	del([sourceConfig.partialsDestination, sourceConfig.templatesDestination, sourceConfig.imagesDestination], function (){
		plugins.util.log('partials, templates and images in dist/ deleted. Copying files...');
		// Copy partials
		gulp.src(sourceConfig.partialsSourcePath)
			.pipe(plugins.plumber())
			.pipe(plugins.minifyHtml())
			.pipe(gulp.dest(sourceConfig.partialsDestination))

		// Copy templates
		gulp.src(sourceConfig.templatesSourcePath)
			.pipe(plugins.plumber())
			.pipe(plugins.minifyHtml())
			.pipe(gulp.dest(sourceConfig.templatesDestination))

		// Copy images
		gulp.src(sourceConfig.imagesSourcePath)
			.pipe(plugins.plumber())
			.pipe(plugins.imagemin({progressive: true}))
			.pipe(gulp.dest(sourceConfig.imagesDestination))

		callback(null);
	}, function (error){ callback(error); })

});




/*	---------------------------------------------------------------------------
*	@Task: source:fonts
*	@description:
*		This task will copy all fonts from the bower_components, compress them
*		and move them to the dist directory.
*/
function fontPathFor(vendor){ return path(__dirname, 'bower_components', vendor, 'fonts', '*.{eot,svg,ttf,woff,woff2}') }

var fontsConfig = {
	fontsSourcePath: [fontPathFor('font-awesome'), fontPathFor('bootstrap'), fontPathFor('bootstrap-material-design')],
	fontsDestination: path(__dirname, 'server', 'dist', 'fonts')
}
// Copy fonts from bower_components to dist
gulp.task('source:fonts', function(callback){
	// Delete current folder from dist
	del([fontsConfig.fontsDestination], function (){
		plugins.util.log('dist/fonts deleted. Copying fonts...');
		// Copy fonts from bower_components
		gulp.src(fontsConfig.fontsSourcePath)
			.pipe(gulp.dest(fontsConfig.fontsDestination))
		callback(null);
	}, function (error){ callback(error); })
});




/*	---------------------------------------------------------------------------
*	@Task: source:all
*	@description:
*		This task combines the source:client and the source:fonts tasks
*/
gulp.task('source:all', ['source:client', 'source:fonts'], function (callback){
	plugins.util.log('All files sourced to dist');
	callback(null);
});




/*	---------------------------------------------------------------------------
*	@Task: useref
*	@description:
*		This task will use the references in index.ejs. It copies the files
*		referenced, concatinates them by group and places the copies in the
*		dist directory. A copy of index.ejs with new references will also be
*		placed in the dist directory. It also uses sourcemaps for the styles
*		and scripts.
*/
var userefConfig = {
	assets: plugins.useref.assets(),
	inputSource: path(__dirname, 'client','views', 'index.ejs'),
	outputDestination: path(__dirname, 'server', 'dist'),
	autoprefixerOpt: { browsers: ['last 2 versions'] },
	outputFolders: [ path(__dirname, 'server', 'dist', 'js'),
					 path(__dirname, 'server', 'dist', 'css') ]
}

gulp.task('useref', function(callback){
	del(userefConfig.outputFolders, function (){
		plugins.util.log('Building assets...');
		gulp.src(userefConfig.inputSource)
			.pipe(plugins.plumber())
			.pipe(userefConfig.assets)
				.pipe(plugins.sourcemaps.init())
				// If CSS-file, use autoprefixer and minify
				.pipe(plugins.if('*.css', plugins.autoprefixer(userefConfig.autoprefixerOpt)))
				.pipe(plugins.if('*.css', plugins.minifyCss()))
				// If JS-file, uglify
				.pipe(plugins.if('*.js', plugins.uglify()))
				.pipe(plugins.sourcemaps.write('.'))
			.pipe(userefConfig.assets.restore())
			.pipe(plugins.useref())
			.pipe(gulp.dest(userefConfig.outputDestination));
			callback(null);
	}, function (error){ callback(error); })
});




/*	---------------------------------------------------------------------------
*	@Task: less
*	@description:
*		This task will convert main.less (all .less files) into main.css.
*/
var lessConfig = {
	inputSource: path(__dirname, 'client', 'styles', 'less', 'main.less'),
	outputDestination: path(__dirname, 'client', 'styles')
}
gulp.task('less', function(callback){
	gulp.src(lessConfig.inputSource)
		.pipe(plugins.plumber())
		.pipe(plugins.less())
		.pipe(gulp.dest(lessConfig.outputDestination));
	callback(null);
});




/*	---------------------------------------------------------------------------
*	@Task: build
*	@description
*		This task will build the project in the dist folder. Note that source:fonts
*		is not in the build task.
*/
gulp.task('build', plugins.sequence('less', 'inject', 'useref', 'source:client'));


gulp.task('default', function (){
	plugins.util.log('tasks: build, less, inject, useref, source:{all, fonts, client}');
});
