'use strict';

// ========== Passport dependencies ==========
// Passport uses the mysql_functions to query the database and different strategies for authentication.
var db 				 = require('../mysql/mysql_functions'), 
	LocalStrategy	 = require('passport-local').Strategy,
	FacebookStrategy = require('passport-facebook').Strategy,
	GoogleStrategy 	 = require('passport-google-oauth').OAuth2Strategy,
	auth             = require('passport-local-authenticate'),
	User             = require('./user.js'),
	crypto           = require('crypto');

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
	    User.findOne({email:username}, function (err, user, msg) {
	      if (err) { return done(err); }
	      if (!user) { 
	      	return done(null, false); 
	      } else {
	      		if (user.id < 500) {
	      			var sha1 = crypto.createHash('sha1');
	      			sha1.update(password+user.salt);
      				if (user.password != sha1.digest('hex')) { 
			      		return done(null, false); 
			    	} else {
			    		return done(null, user);
			    	}
	      		
				} else {
					auth.verify(password,{hash:user.password,salt:user.salt},function(err,verified){
						if(verified){
							return done(null, user);
						} else {
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
    		console.log('error: '+ err);
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
    	console.log('yo: '+user);
      	return done(err, user);
    });
  }
));
};
