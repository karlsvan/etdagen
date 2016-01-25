'use strict';

var db       = require('../mysql/mysql_functions.js'),
	crypto   = require('crypto'),
	auth     = require('passport-local-authenticate');

module.exports = {
	findOrCreate: function (obj,callback) {
		var userSearch = {email:obj.email};
		if (obj.facebookId) {
			userSearch.facebookId = obj.facebookId;
		} else if (obj.googleId) {
			userSearch.googleID = obj.googleId;
		} else if (obj.feideId) {
			userSearch.feideId = obj.feideId;
		}
		db.findUsers(userSearch).then(function successCB(rows1){
				obj.status = 'student';
				if(rows1.length === 0) {
					db.addUser(obj).then(function successCB(rows2) {
						db.findUsers({id:rows2.insertId}).then(function successCB(rows3) {
							callback(null,rows3[0]);
						}, function errorCB(error) { callback(error,null); });
					},function errorCB (error){ callback(error,null); });
				} else if(rows1.length === 1) {
					var userUpdate = {};
					if (obj.facebookId) {
						userUpdate.facebookId = obj.facebookId;
					} else if (obj.googleId) {
						userUpdate.googleID = obj.googleId;
					} else if (obj.feideId) {
						userUpdate.feideId = obj.feideId;
					}
					db.updateUser(rows1[0].id,userUpdate).then(function successCB(rows2) {
						db.findUsers({id:rows2.insertId}).then(function successCB(rows3) {
							if(rows3.length == 0){
								callback(null,rows1[0]);
							} else {
								callback(null,rows3[0]);
							}
							callback(null,rows[0]);
						}, function errorCB(error) { callback(error,null); });
					});
				} else {
					callback('En bruker med denne email adressen eksisterer allerede. Vennlist logg in med denne brukeren og knytt sammen kontoene i instillinger',null);
				}
			}, function errorCB(error) { callback(error,null); }
		);
	},

	findOne: function (obj,callback){
		db.findUsers(obj).then(function successCB(rows) {
			if (rows.length === 0) {
				callback(null,null);
			} else {
				db.updateUser(rows[0].id,{status:'student'});
				callback(null,rows[0]);
			}
		}, function errorCB(error) {
			callback(error,null);
		});
	},

	adduser: function(userobj,callback) {
		userobj.status='student';
		//console.log(JSON.stringify(userobj));
		db.findUsers({email:userobj.email}).then(function successCB(rows) {
			if(rows.length == 0) {
				db.addUser(userobj).then(function successCB(rows) {
					callback(null,userobj.email);
				},function errorCB(error) {
					callback(error,null);
				});
			} else {
				callback('Bruker eksisterer',null)
			}
		})
	},

	update: function(id,obj,callback) {
		db.updateUser(id,obj).then(function(rows) {
			console.log(JSON.stringify(rows));
			callback(null,rows[0]);
		}, function(error) {
			console.log(error);
			callback(error,null);
		});
	},

	updatePass: function(id,callback) {
		var newPass='',userobj={};
		crypto.randomBytes(9, function(ex, buf) {
			newPass = buf.toString('base64');
			//console.log('pass: '+newPass+'  length: '+newPass.length);

			auth.hash(newPass, function(err, hashed) {
				userobj.password = hashed.hash; // Hashed password
				userobj.salt = hashed.salt; // Salt

				db.updateUser(id,userobj).then(function(rows) {
					callback(null,newPass);
				}, function(error) {
					console.log(error);
					callback(error,null);
				});

			});

		});

	},

	getProfile: function(id,callback) {
		db.getProfile(id).then(function(rows) {
			callback(null,rows[0]);
		}, function(error) {
			callback(error,null);
		});
	},
	merge: function(user) {
		var conflict = {};
		for(var key in user.connect) {
			if (user.connect[key] == user[key]){
				delete user.connect[key];
			}
		}
		return user;
	},

	addFile: function(id,file,cb) {
		db.getFiles(id).then(function(rows) {
			if(rows[0].filer) {var filer = JSON.parse(rows[0].filer)} else {var filer = []}
			filer.push(file);
			filer = JSON.stringify(filer);
			db.saveFiles(id,filer).then(function() {
				cb(null);
			}, function (error) {
				cb(error);
			})
		})
		
	},

	deleteFile: function(id,index,cb) {
		db.getFiles(id).then(function(rows) {
			var filer = JSON.parse(rows[0].filer);
			filer.splice(index,1);
			filer = JSON.stringify(filer);
			db.saveFiles(id,filer).then(function() {
				cb(null);
			}, function (error) {
				cb(error);
			})
		})
	},

	setPass: function(cred,cb) {
		var userobj = {};
		db.findUsers({id:cred.id}).then(function successCB(rows) {
			if (rows.length === 0) {
				cb('User not found');
			} else {
				var user = rows[0];
				//gamle passord var kortere
				if (!user.password) {
					auth.hash(cred.new, function(err, hashed) {
						if (err)
							cb(err);
						userobj.password = hashed.hash; // Hashed password
						userobj.salt = hashed.salt; // Salt
						console.log('yo')
						db.updateUser(cred.id,userobj).then(function(rows) {
							cb(null);
						}, function(error) {
							console.log(error);
							cb(error);
						});

					});
				} else if(user.password.length < 64) {
					var sha1 = crypto.createHash('sha1');
					sha1.update(cred.old+user.salt);
					if (user.password != sha1.digest('hex')) {
						cb('Wrong password');
					} else {
						auth.hash(cred.new, function(err, hashed) {
							if (err)
								cb(err);
							userobj.password = hashed.hash; // Hashed password
							userobj.salt = hashed.salt; // Salt
							db.updateUser(cred.id,userobj).then(function(rows) {
								cb(null);
							}, function(error) {
								console.log(error);
								cb(error);
							});

						});
					}
				} else if (user.password.length == 64){
					//nye passord er lengde 64 i hex
					auth.verify(cred.old,{hash:user.password,salt:user.salt},function(error,verified){
						if (error)
							cb(err);
						if(verified){
							auth.hash(cred.new, function(error, hashed) {
								if (error)
									cb(err);
								userobj.password = hashed.hash; // Hashed password
								userobj.salt = hashed.salt; // Salt
								db.updateUser(cred.id,userobj).then(function(rows) {
									cb(null);
								}, function(error) {
									console.log(error);
									cb(error);
								});

							});
						} else {
							cb('Wrong password');
						}
					});
				}
			}
		}, function errorCB(error) {
			cb(error);
		});
	},

	saveProfile: function(user,cb){
		var profilValues = [], brukerVaules = [], brukerObj = {}, profilObj = {};
		var brukerColumns = ['id','fornavn','etternavn','tlf','email','facebookId','googleId','feideId','adresse','utgangsaar','linje','bilde','fodselsdato'];
		var profilColumns = ['bio','filer','cards'];
		brukerColumns.forEach(function(elem,index,arr){
			if(typeof user[elem] === 'object') {
				brukerVaules.push(JSON.stringify(user[elem]));
				brukerObj[elem] = JSON.stringify(user[elem]);
			} else {
				brukerVaules.push(user[elem]);
				brukerObj[elem] = user[elem];
			}
		});
		profilColumns.forEach(function(elem,index,arr){
			if(typeof user[elem] === 'object') {
				profilValues.push(JSON.stringify(user[elem]));
				profilObj[elem] = JSON.stringify(user[elem]);
			} else {
				profilValues.push(user[elem]);
				profilObj[elem] = user[elem];
			}
		});
		profilColumns.unshift('bruker_id');
		profilValues.unshift(user.id);
		profilObj.bruker_id = user.id

		db.saveProfile(brukerColumns,brukerVaules,brukerObj,profilColumns,profilValues,profilObj,user.tags).then(function(rows) {
			//console.log(JSON.stringify(rows));
			cb(null)
		},function(error) {
			cb(error)
		})
	}

};
