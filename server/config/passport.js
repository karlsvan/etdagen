'use strict';

// ========== Passport dependencies ==========
// Passport uses the mysql_functions to query the database and different strategies for authentication.
var //db                = require('../mysql/mysql_functions'),
	LocalStrategy     = require('passport-local').Strategy,
	FacebookStrategy  = require('passport-facebook').Strategy,
	GoogleStrategy    = require('passport-google-oauth').OAuth2Strategy,
	FeideStrategy     = require('passport-feideconnect-oauth2').Strategy,
	auth              = require('passport-local-authenticate'),
	User              = require('./user.js'),
	crypto            = require('crypto');

module.exports = function (passport){
	// serializeUser function desides what will be stored in session (req.session.passport.user)
	passport.serializeUser(function (user, done){
		//console.log('serz: '+JSON.stringify(user));
		if (user.connect) {
			done(null,{id:user.id,connect: user.connect})
		} else{
			done(null, user.id);
		}
	});

	// deserializeUser function takes the serialized user and finds the matching user in the database. User object is attached to req.user.
	passport.deserializeUser(function (serializedUser, done){
		if (serializedUser.connect) {
			User.findOne({id:serializedUser.id}, function (error, user){
				user.connect = serializedUser.connect;
				done(error, user);
			});
		} else {
			User.findOne({id:serializedUser}, function (error, user){
				done(error, user);
			});
		}
	});

	var passportStrategyOptions = {
		usernameField: 'username', 	// might use 'email'
		passwordField: 'password',
		passReqToCallback: false	// might use true
	};


	// ========== Passport strategies ==========
	// ET-login : Login with the ET-user
	passport.use(new LocalStrategy(
		function(username, password, done) {
			User.findOne({email:username}, function (err, user, msg) {
				if (err) { return done(err); }
				if (!user) {
					return done(null, false);
				} else {
					if (user.password.length < 64) {
						var sha1 = crypto.createHash('sha1');
						sha1.update(password+user.salt);
						if (user.password != sha1.digest('hex')) {
							return done(null, false);
						} else {
							return done(null, user);
						}
					} else {
						//husk keylen i passport-local-authenticate skal være 32
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

	passport.use(new FeideStrategy({
		clientID: '4525efbc-5c83-4362-b20a-ac46a3a78993',
		clientSecret: '6eff9820-fc3e-46d1-a76d-bad845a68196',
		callbackURL: "/auth/feide/callback",
		passReqToCallback: true
	},
	function(req, accessToken, refreshToken, profile, done){
		var namearr = profile.displayName.split(' ');
		profile.familyName = namearr.pop();
		profile.givenName = namearr.join(' ');
		var profil = {
			feideId: profile.id,
			fornavn: profile.givenName,
			etternavn:profile.familyName,
			email: profile.emails[0],
			bilde: profile.photos[0]
		}
		if (req.user) {
			req.user.connect = profil;
			req.user = User.merge(req.user);
			return done(null,req.user);
		} else {
			User.findOrCreate(profil, function (err, user) {
				return done(err, user);
			});
		}
	}));


	passport.use(new FacebookStrategy({
		clientID: '449983121860985',
		clientSecret: '592186645310e89533f50f3afa1b7535',
		callbackURL: "/auth/facebook/callback",
		enableProof: true,
		passReqToCallback: true,
		profileFields: ['id', 'name', 'emails','picture.type(large)']
	}, function(req, accessToken, refreshToken, profile, done) {
		var profil = {
				facebookId: profile.id,
				fornavn: profile.name.givenName,
				etternavn:profile.name.familyName,
				email: profile.emails[0].value,
				bilde: profile.photos[0].value
			}
		if (req.user) {
			req.user.connect = profil;
			req.user = User.merge(req.user);
			return done(null,req.user);
		} else {
			User.findOrCreate(profil, function (err, user) {
					return done(err, user);
			});
		}
	}));

	passport.use(new GoogleStrategy({
		clientID: '735968634827-2v36mg1s3njskrhqjo87b8v8nij3n1ob.apps.googleusercontent.com',
		clientSecret: 'YTFSfXRL_C9diN0vEkYRDePE',
		passReqToCallback: true,
		callbackURL: "/auth/google/callback"
	}, function(req, accessToken, refreshToken, profile, done) {
		//vi vil ha størrelse på bildet 200x200px
		profile.photos[0].value = profile.photos[0].value.replace('sz=50','sz=200');
		var profil = {
				googleId: profile.id,
				fornavn: profile.name.givenName,
				etternavn:profile.name.familyName,
				email: profile.emails[0].value,
				bilde: profile.photos[0].value
			}
		if (req.user) {
			req.user.connect = profil;
			req.user = User.merge(req.user);
			return done(null,req.user);
		} else {
			User.findOrCreate(profil, function (err, user) {
				return done(err, user);
			});
		}
	}));
};
