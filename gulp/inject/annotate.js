module.exports = function(gulp, $, config){
	'use strict';

	var filesToBeAnnotated 	= [ config.files.app,
								$.path.join(config.dirs.components, '**/*.js'),
								$.path.join(config.dirs.partials, '**/*.js'),
								$.path.join(config.dirs.services, '**/*.js') ],
		annotateOptions 	= { remove:true, add:true, 'single_quotes':true },
		annotatedDist 		= [ config.dirs.app,
								config.dirs.components,
								config.dirs.partials,
								config.dirs.services ];

	/*
	*	@task: inject:annotate
	*	@description:
	*		This task will atomatically inject dependencies into functions in all js
	*		files inside components/, partials/ and services/ and the app.js file.
	*		Make sure the comment ngInject comment is present in the files.
	*/
	return function annotate(callback){
		for(var i=0; i<filesToBeAnnotated.length; i++){
			gulp.src(filesToBeAnnotated[i])
				.pipe($.ngAnnotate(annotateOptions))
				.pipe(gulp.dest(annotatedDist[i]));
		}
		callback(null);
	};
};
