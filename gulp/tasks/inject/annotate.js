module.exports = function(gulp, $, appConfig){
	'use strict';

	var filesToBeAnnotated 	= [ $.path.join(appConfig.app, 'app.js'),
								$.path.join(appConfig.app, 'components', '**/*.js'),
								$.path.join(appConfig.app, 'partials', '**/*.js'),
								$.path.join(appConfig.app, 'services', '**/*.js') ],
		annotateOptions 	= { remove:true, add:true, single_quotes:true },
		annotatedDist 		= [ $.path.join(appConfig.app),
								$.path.join(appConfig.app, 'components'),
								$.path.join(appConfig.app, 'partials'),
								$.path.join(appConfig.app, 'services') ];

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
