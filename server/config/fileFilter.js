'use strict';
var path		= require('path'),
	User        = require('./user.js'),
    fs          = require('fs');

var maxSize = 5000000;

module.exports = function(req, file, cb) {
	var totSize = 0;
	var isPic, existingImg;
	var directory = path.resolve(__dirname, '../../filer/'+req.user.id);
	var filesFolder = path.resolve(__dirname, '../../filer');
	if(!fs.existsSync(filesFolder)) fs.mkdirSync(filesFolder);

	if(file.originalname.split('.').shift() == 'userAvatar') isPic = true;

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
					if(err)	throw err;
					totSize = totSize + stats.size;
					if(isPic && elem.split('.').shift() == 'userAvatar') {
						totSize -= stats.size;
						existingImg = elem;
					}
					if (index == arr.length-1) {
						totSize = totSize+parseInt(req.body.size);
						if (totSize < maxSize) {
							if(existingImg) fs.unlink(path.resolve(__dirname, '../../filer', req.user.id.toString(), existingImg));
							User.addFile(req.user.id,{name:file.originalname,size:req.body.size},function(error) {
								if (error)
									console.log(err);
								cb(null, true);
							});

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
