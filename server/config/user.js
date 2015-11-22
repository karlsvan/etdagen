var db 				 = require('../mysql/mysql_functions'), 
	auth             = require('passport-local-authenticate');

module.exports = {
	//function User() {}

	findOrCreate: function (obj,callback) {
		if (obj.facebookId) {
			var userSearch = {facebookId:obj.facebookId};
		} else if (obj.googleId) {
			var userSearch = {googleID:obj.googleId};
		}
			db.get.user(userSearch ,function (error, rows){
				if(!rows) {
					db.get.adduser(obj,function(error, rows) {
						if(error){
							console.log(error);
						} else {
							callback(null,rows);
						}
					})
				} else {
					callback(error,rows);
				}
			});
		},

	findOne: function (obj,callback){
		db.get.user(obj, function (error, user) {
			if(!user){
				//bruker finnes ikke
				console.log('fant ikke bruker');
				callback(error,user);
			} else {
				//console.log('user: '+JSON.stringify(user));
				callback(error, user);
			}
		})
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
			db.get.adduser(userobj,function(error,noe) {
				callback(error,noe);
			})
		});
		

	},
	
	update: function(obj,callback) {

	}
}