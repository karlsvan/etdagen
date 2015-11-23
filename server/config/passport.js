'use strict';

// ========== Passport dependencies ==========
// Passport uses the mysql_functions to query the database and different strategies for authentication.
var db 				 = require('../mysql/mysql_functions'), 
	LocalStrategy	 = require('passport-local').Strategy,
	FacebookStrategy = require('passport-facebook').Strategy,
	GoogleStrategy 	 = require('passport-google-oauth').OAuth2Strategy,
	auth             = require('passport-local-authenticate'),
	User             = require('./user.js'),
	sha              = require('./sha1.js');

module.exports = function (passport){

	// serializeUser function desides what will be stored in session (req.session.passport.user)
	passport.serializeUser(function (user, done){
		done(null, user.id);
	});

	// deserializeUser function takes the serialized user and finds the matching user in the database. User object is attached to req.user.
	passport.deserializeUser(function (id, done){
		User.findOne({id:id}, function (error, user){
			done(error, user);
		});
	});

	var passportStrategyOptions = {
		usernameField: 'username', 	// might use 'email'
		passwordField: 'password',
		passReqToCallback: false	// might use true
	}
	



	// ========== Passport strategies ==========
	// ET-login : Login with the ET-user
	passport.use(new LocalStrategy(
	  function(username, password, done) {
	  	//var Usr = new User();
	  	if (username.indexOf('@') > -1){
	  		var userSearch = {email:username};
	  	} else {
	  		var userSearch = {username:username}
	  	}
	    User.findOne(userSearch, function (err, user) {
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
					auth.verify(password,{hash:user.password,salt:user.salt},function(err,verified){
						if(verified){
							console.log('SUCSESS§§');
							return done(null, user);
						} else {
							console.log('FAIL!!');
				      		return done(null, false);
						}
					});
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
    User.findOrCreate({ facebookId: profile.id,fornavn: profile.name.givenName,etternavn:profile.name.familyName,email: profile.emails[0].value }, function (err, user) {
    	return done(err, user);
    });

  }
));


	passport.use(new GoogleStrategy({
    clientID: '735968634827-2v36mg1s3njskrhqjo87b8v8nij3n1ob.apps.googleusercontent.com',
    clientSecret: 'YTFSfXRL_C9diN0vEkYRDePE',
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id,fornavn: profile.name.givenName,etternavn:profile.name.familyName,email: profile.emails[0].value }, function (err, user) {
      	return done(err, user);
    });
  }
));
};
//{ googleId: profile.id,fornavn: profile.name.givenName,etternavn:profile.name.familyName,email: profile.emails[0].value }
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