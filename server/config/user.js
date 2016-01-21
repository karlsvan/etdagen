'use strict';

var db       = require('../mysql/mysql_functions.js'),
	crypto   = require('crypto'),
	auth     = require('passport-local-authenticate');

module.exports = {
	findOrCreate: function (obj,callback) {
		var userSearch;
		if (obj.facebookId) {
			userSearch = {facebookId:obj.facebookId};
		} else if (obj.googleId) {
			userSearch = {googleID:obj.googleId};
		} else if (obj.feideId) {
			userSearch = {feideId:obj.feideId};
		}
		db.findUsers(userSearch).then(function successCB(rows){
				if(rows.length === 0) {
					db.addUser(obj).then(function successCB(rows) {
						db.findUsers({id:rows.insertId}).then(function successCB(rows) {
							callback(null,rows[0]);
						}, function errorCB(error) { callback(error,null); });
					},function errorCB (error){ callback(error,null); });
				} else { callback(null,rows[0]); }
			}, function errorCB(error) { callback(error,null); }
		);
	},

	findOne: function (obj,callback){
		db.findUsers(obj).then(function successCB(rows) {
			if (rows.length === 0) {
				callback(null,null);
			} else {
				callback(null,rows[0]);
			}
		}, function errorCB(error) {
			callback(error,null);
		});
	},

	//User.prototype.adduser = function(obj, callback) {
	adduser: function(obj,callback){
		var userobj = {
			fornavn: obj.fornavn.$modelValue,
			etternavn: obj.etternavn.$modelValue,
			tlf: obj.tlf.$modelValue,
			email: obj.email.$modelValue,
			status: 'soker',
			inaktiv:'',
			password:'',
			username:obj.username.$modelValue,
			salt:'',
			adresse:'',
			nasjonalitet:'',
			utgangsaar: obj.utgangsaar.$modelValue,
			linje: obj.linje.$modelValue,
			fodselsdato: obj.fodselsdato.$modelValue
		};

		auth.hash(obj.password.$modelValue, function(err, hashed) {
			userobj.password = hashed.hash; // Hashed password
			userobj.salt = hashed.salt; // Salt
			db.adduser(userobj).then(function successCB(rows) {
				callback(rows[0]);
			},function errorCB(error) {
				callback(error);
			});
		});
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
			console.log('pass: '+newPass+'  length: '+newPass.length);

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

	saveFile: function(id,file,cb) {
		db.saveFile(id,file).then(function() {
			cb(null);
		}, function (error) {
			cb(error);
		})
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
