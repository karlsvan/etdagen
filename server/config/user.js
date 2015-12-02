var db 				 = require('../mysql/mysql_functions.js'),
	q				 = require('q'),
	auth             = require('passport-local-authenticate');

module.exports = {

	findOrCreate: function (obj,callback) {
		if (obj.facebookId) {
			var userSearch = {facebookId:obj.facebookId};
		} else if (obj.googleId) {
			var userSearch = {googleID:obj.googleId};
		}
		db.findUsers(userSearch).then(function successCB(rows, fields){
				if(rows.length == 0) {
					db.addUser(obj).then(function successCB(rows, fields) {
						callback(null,rows[0]);
					},function errorCB (error){
						callback(error,null);
					})
				} else {
					callback(null,rows[0]);
				}
			}, function errorCB() {
					callback(error,null);
			}
		);
	},

	findOne: function (obj,callback){
		db.findUsers(obj).then(function successCB(rows,fields) {
			if (rows.length == 0) {
				//fant ikke bruker
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
		}
		auth.hash(obj.password.$modelValue, function(err, hashed) {
			userobj.password = hashed.hash; // Hashed password
			userobj.salt = hashed.salt; // Salt
			db.adduser(userobj).then(function successCB(rows,fields) {
				callback(rows[0]);
			},function errorCB(error) {
				callback(error);
			})
		});
		

	},
	
	update: function(obj,callback) {

	}
}