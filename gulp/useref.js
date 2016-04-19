module.exports = function(gulp, $, config){
	'use strict';

	var fileWithReferences 	= config.files.index,
		autoprefixerOptions = { browsers: ['last 2 versions'] },
		distFolder 			= config.dirs.dist,
		outputDestinations 	= [ $.path.join(config.dirs.dist, 'assets', 'js'),
								$.path.join(config.dirs.dist, 'assets', 'css') ];

	/*
	*	@task: useref
	*	@description:
	*		Thiss task will use references in index.ejs to get files, concat and copy to dist.
	*/
	return function useref(callback){
		var assets = $.useref.assets();
		$.del(outputDestinations,
			function then(){
			gulp.src(fileWithReferences)
				.pipe($.plumber())
				.pipe(assets)
				.pipe($.sourcemaps.init())
				// If CSS-file, use autoprefixer and minify
				.pipe($.if('*.css', $.autoprefixer(autoprefixerOptions)))
				.pipe($.if('*.css', $.cssnano()))
				// If JS-file, uglify
				.pipe($.if('*.js', $.uglify()))
				.pipe($.sourcemaps.write('.'))
				.pipe(assets.restore())
				.pipe($.useref())
				.pipe(gulp.dest(distFolder));
				callback(null);
		});
	};
};
