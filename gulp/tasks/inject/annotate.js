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
	*		This task will inject dependencies into angular related functions
	*/
	return function annotate(callback){
		for(var i=0; i<filesToBeAnnotated.length; i++){
			gulp.src(filesToBeAnnotated[i])
				.pipe($.ngAnnotate(annotateOptions[i]))
				.pipe(gulp.dest(annotatedDist[i]));
		}
		callback(null);
	}
}