/*
*	Gulpfile
*
*	Available tasks:
*	del 				:	Delete files
*	gulp 				:	The streaming build system
*	gulp-autoprefixer	:	Prefix CSS
*	gulp-concat			:	Concatinate files
*	gulp-filter			:	Filter files
*	gulp-if 			:	Use if-statement
*	gulp-imagemin		:	Minifies images
*	gulp-inject			:	Inject dependencies into files
*	gulp-less			:	Compile LESS to CSS
*	gulp-load-plugins	:	Automatically load gulp plugins
*	gulp-minify-css		:	Minifies CSS
*	gulp-minify-html	:	Minifies HTML
*	gulp-sequence		:	Run tasks in sequence
*	gulp-uglify			:	Minifies JS
*	gulp-useref			:	Concatinates references in a file to partial files
*	gulp-watch			:	Watches for changes in files
*	wiredep				:	Inject bower dependencies into files
*/

// ========== Gulp dependencies ==========
var	del 			= require('del'),
	wiredep			= require('wiredep').stream,
	path			= require('path').resolve;

var gulp 			= require('gulp'),
	plugins			= require('gulp-load-plugins')({
		pattern: ['gulp-*'],
		scope: ['devDependencies']
	});

// ========== Gulp config ==========
//var env = process.env.NODE_ENV || 'development';
var root = path(__dirname),
	client = path(root, 'client'),
	server = path(root, 'server');

var wiredepOptions = {
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
}

// ========== Gulp minor tasks ==========

// Inject bower dependencies into index.ejs
gulp.task('inject:bower', function(){
	return gulp.src(path(client,'views', 'index.ejs'))
		.pipe(wiredep(wiredepOptions))
		.pipe(gulp.dest(path(client, 'views')));
});

// Inject angular clientApp into index.ejs
gulp.task('inject:angular', function(){
	return gulp.src(path(client,'views', 'index.ejs'))
		.pipe(plugins.inject(
			gulp.src([path(client, 'scripts', '**/*.js')], {read:false}),
			{
				relative: true,
				starttag: '<!-- angular:{{ext}} -->',
				endtag: '<!-- endangular -->'
			}
		))
		.pipe(gulp.dest(path(client, 'views')));
});

// Inject custom styles (and scripts) into index.ejs
gulp.task('inject:custom', function(){
	return gulp.src(path(client,'views', 'index.ejs'))
		.pipe(plugins.inject(
			gulp.src([path(client, 'styles', '**/*.css')], {read:false}),
			{
				relative: true,
				starttag: '<!-- custom:{{ext}} -->',
				endtag: '<!-- endcustom -->'
			}
		))
		.pipe(gulp.dest(path(client, 'views')));
});

// Copy and minify the partials to dist
gulp.task('source:partials', function(){
	return gulp.src(path(client, 'partials', '*.html'))
		.pipe(plugins.minifyHtml())
		.pipe(gulp.dest(path(server, 'dist', 'partials')));
});

// Copy and minify the templates to dist
gulp.task('source:templates', function(){
	return gulp.src(path(client, 'templates', '*.html'))
		.pipe(plugins.minifyHtml())
		.pipe(gulp.dest(path(server, 'dist', 'templates')));
});

// Copy and minify images to dist
gulp.task('source:images', function(){
	return gulp.src(path(client, 'images', '**/*'))
		.pipe(plugins.imagemin({progressive: true}))
		.pipe(gulp.dest(path(server, 'dist', 'images')));
});

// Copy fonts from bower_components to dist
gulp.task('source:fonts', function(){
	return gulp.src(['./bower_components/font-awesome/fonts/*.{eot,svg,ttf,woff,woff2}',
					 './bower_components/bootstrap/fonts/*.{eot,svg,ttf,woff,woff2}',
					 './bower_components/bootstrap-material-design/fonts/*.{eot,svg,ttf,woff,woff2}'])
		.pipe(gulp.dest(path(server, 'dist', 'fonts')));
});

// Delete all files in dist
gulp.task('clean:dist', function(){
	del(path(server, 'dist', '*'));
});

// ========== Gulp major tasks ==========

// Inject dependencies into index.ejs
gulp.task('inject', plugins.sequence('inject:bower', 'inject:angular', 'inject:custom'));

// Concat and minify dependencies in index.ejs and copy to dist
gulp.task('useref', function(){
	var assets = plugins.useref.assets();
	return gulp.src(path(client,'views', 'index.ejs'))
		.pipe(assets)
		.pipe(plugins.if('*.css', plugins.minifyCss()))
		.pipe(plugins.if('*.js', plugins.uglify()))
		.pipe(assets.restore())
		.pipe(plugins.useref())
		.pipe(gulp.dest(path(server, 'dist')));
});

// Convert main.less into main.css
gulp.task('less', function(){
	return gulp.src(path(client, 'styles', 'less', 'main.less'))
		.pipe(plugins.less())
		.pipe(plugins.autoprefixer({ browsers: ['last 2 version'] }))
		.pipe(gulp.dest(path(client, 'styles')));
});

// Copy and minify sources from client to dist
gulp.task('source', plugins.sequence('source:fonts', 'source:images', 'source:partials', 'source:templates'));

// ========== Gulp watchers ==========

// gulp.task('watch:styles', function(){
// 	gulp.watch(path(client, 'styles', 'less', '**/*.less'), ['less']);
// });

// ****************************************
// ========== Gulp Project tasks ==========
// ****************************************

/*	@task: build
*	@description
*		Delete all files/folders in the dist directory, compile less files into css,
*		inject all dependencies into index.ejs in client folder and use useref to
*		fetch, concat and build files into the dist directory. Then import (and minify)
*		partials, templates, fonts and images to dist directory.
*/
gulp.task('build', plugins.sequence('clean:dist', 'less', 'inject', 'useref', 'source'));


gulp.task('default', function (){
	console.log('dirname is ');
});
