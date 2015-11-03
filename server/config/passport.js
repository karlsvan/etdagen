'use strict';

// ========== Passport dependencies ==========
// Passport uses the mysql_functions to query the database and different strategies for authentication.
var db 				 = require('../mysql/mysql_functions'), 
	LocalStrategy	 = require('passport-local').Strategy,
	FacebookStrategy = require('passport-facebook').Strategy,
	auth             = require('passport-local-authenticate'),
	sha              = require('./sha1.js');

module.exports = function (passport){

	// serializeUser function desides what will be stored in session (req.session.passport.user)
	passport.serializeUser(function (user, done){
		done(null, user.id);
	});

	// deserializeUser function takes the serialized user and finds the matching user in the database. User object is attached to req.user.
	passport.deserializeUser(function (id, done){
		db.get.user({id: id}, function (error, user){
			done(error, user);
		});
	});

	var passportStrategyOptions = {
		usernameField: 'username', 	// might use 'email'
		passwordField: 'password',
		passReqToCallback: false	// might use true
	}
	function User() {}
	User.prototype.findOrCreate = function(obj, callback) {
			db.get.user({facebookId:obj.facebookId} ,function (error, rows){
				if(!rows) {
					db.get.adduser(obj,function(error, rows) {
						if(error){
							console.log(error);
						} else {
							callback(null,rows);
						}
					})
					//console.log('make user');
				} else {
					callback(error,rows);
				}
			});
		};

	User.prototype.findOne = function(obj, callback) {
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
	};



	// ========== Passport strategies ==========
	// ET-login : Login with the ET-user
	passport.use(new LocalStrategy(
	  function(username, password, done) {
	  	var Usr = new User();
	    Usr.findOne({ username: username }, function (err, user) {
	      if (err) { return done(err); }
	      if (!user) { 
	      	//fant ikke bruker, bør gi beskjed
	      	return done(null, false); 
	      } else{
	      		if (user.id < 500) {
				    if (user.password != sha.sha1(password+user.salt) ) { 
				      	console.log('FAIL!!!');
				      	return done(null, false); 
				    }
				    console.log('SUCSESS§§');
				    return done(null, user);
				} else {
					//ny crypto kommer
				}
		  }
	    });
	  }
	));


	passport.use(new FacebookStrategy({
    clientID: '449983121860985',
    clientSecret: '592186645310e89533f50f3afa1b7535',
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    enableProof: false,
    profileFields: ['id', 'name', 'emails']
  },
  function(accessToken, refreshToken, profile, done) {
  	var Usr = new User();
    Usr.findOrCreate({ facebookId: profile.id,fornavn: profile.name.givenName,etternavn:profile.name.familyName,email: profile.emails[0].value }, function (err, user) {
    	return done(err, user);
    });

  }
));
};


// mysql_functions.getUser({username: username}, function(result){
// 	if(result.error){ return done(result.error); }
// 	else{
// 		if(result.rows.length > 1){ return done('Fatal error. Dublicates exist in the database.'); }
// 		else if(result.rows.length < 1){ return done(null, false, {message: 'Username or password is incorrect.'}); }
// 		else { // Found user
// 			if(result.rows[0].password !== password){ return done(null, false, {message: 'Username or password is incorrect.'}); }
// 			else{ // correct login info
// 				return done(null, user);
// 			}
// 		}
// 	}
// });