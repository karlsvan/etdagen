var path		= require('path'),
	User        = require('./user.js'),
    fs          = require('fs');

var maxSize = 5000000;

module.exports = function(req, file, cb) {
	console.log('file: '+JSON.stringify(file));
	console.log('req: '+JSON.stringify(req.body));
	var totSize = 0;
	var directory = path.resolve(__dirname, '../../filer/'+req.user.id);
	fs.readdir(directory,function(err, files) {
		if (err) {
			console.log(err);
			if(err.code =='ENOENT'){
				fs.mkdirSync(directory)
			} else {
				throw err;
			}
		}
		if(files && files.length > 0) {
			files.forEach(function(elem,index,arr){
				fs.stat(directory+'/'+elem,function(err,stats) {
					if(err)
						throw err
					totSize = totSize + stats.size;
					if (index == arr.length-1) {
						totSize = totSize+parseInt(req.body.size);
						if (totSize < maxSize) {
							//console.log('totSize: '+totSize);
							User.addFile(req.user.id,{name:file.originalname,size:req.body.size},function(error) {
								if (error)
									console.log(err);
								cb(null, true);
							})
							
						} else {
							//console.log('totSizee: '+totSize);
							cb(null, false);
						}
					}
				});
			})
		} else {
			if(req.body.size < maxSize) {
				User.addFile(req.user.id,{name:file.originalname,size:req.body.size},function(error) {
					if (error)
						console.log(err);
					cb(null, true)
				})
			} else {
				cb(null, false)
			}
		}
	});
}