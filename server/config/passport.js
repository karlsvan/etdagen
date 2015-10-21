'use strict';

// ========== Passport dependencies ==========
// Passport uses the mysql_functions to query the database and different strategies for authentication.
var db 				= require('../mysql/mysql_functions')
	, localStrategy	= require('passport-local').Strategy,
	FacebookStrategy = require('passport-facebook').Strategy;
	//User = require('./user.js');


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
			db.get.user(obj ,function (error, rows, fields){
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



	// ========== Passport strategies ==========
	// ET-login : Login with the ET-user
	passport.use('et-login', new localStrategy(passportStrategyOptions,	function (username, password, done){
		//---------- midlertidig -----------
		if(username === password){ return done(null, {username: username, password: password}); }
		else return done(null, false, {message: 'Incorrect username or password.'});
		//----------

		// attemt to find user
		// if no single user exists -> error
		// else log in user
		// mysql_functions.get.user({username: username}, function (error, user){
		// 	if(error){ done(error); }
		// 	else {
		// 		if(!user){ done(null, false, {message: 'Username or password is invalid'}); }
		// 		else {
		// 			done(null, user);
		// 		}
		// 	}
		// });
	}));



	passport.use('et-signup', new localStrategy(passportStrategyOptions, function (username, password, done){
		// attempt to find user
		// if user already exists -> error
		// else create new user and log in
	}));


	passport.use(new FacebookStrategy({
    clientID: '449983121860985',
    clientSecret: '592186645310e89533f50f3afa1b7535',
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    enableProof: false
  },
  function(accessToken, refreshToken, profile, done) {
  	console.log('face:..' + profile.id);
  	var Usr = new User();
    Usr.findOrCreate({ facebookId: profile.id }, function (err, user) {
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