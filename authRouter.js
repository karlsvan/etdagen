'use strict';

var express   = require('express'),
	auth      = express.Router(),
	passport  = require('passport');require('./server/config/passport.js')(passport);

auth.post('/login',
	passport.authenticate('local', { failureFlash: false }),
	function (req,res) {
		req.sessionOptions.maxAge = 2*24*60*60*1000;
		res.redirect('/#/user/profile');
	});

auth.get('/facebook',
	passport.authenticate('facebook',{ scope: 'email'}));

auth.get('/facebook/callback',
	passport.authenticate('facebook', { failureRedirect: '/#/login' }),
	function (req, res) {
		// Successful authentication, redirect home.
		req.sessionOptions.maxAge = 2*24*60*60*1000;
		res.redirect('/#/user/profile');
	});

auth.get('/feide',
	passport.authenticate('feideconnect'));

auth.get('/feide/callback',
	passport.authenticate('feideconnect', { failureRedirect: '/#/login' }),
	function (req, res) {
		// Successful authentication, redirect home.
		req.sessionOptions.maxAge = 2*24*60*60*1000;
		res.redirect('/#/user/profile');
	});

auth.get('/google',
	passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/userinfo.email' }));

auth.get('/google/callback',
	passport.authenticate('google', { failureRedirect: '/login' }),
	function (req, res) {
		// Successful authentication, redirect home.
		req.sessionOptions.maxAge = 2*24*60*60*1000;
		res.redirect('/#/user/profile');
	});

auth.get('/ntnu/callback', function (req) {
	console.log('req: '+JSON.stringify(req.query));
	var sso = new SSOclient(req.query.data, req.query.sign, null, 'etdagentest');
	if (sso.oklogin()) {
		console.log('init session here');
	} else {
		console.log('hmm?: '+ sso.getReason());
	}
});

module.exports = auth;
