'use strict';

// ========== App and Server dependencies ==========
var express		= require('express'),
	path		= require('path'),
	logger      = require('morgan'),
    bodyParser  = require('body-parser'),
	favicon		= require('serve-favicon'),
	mysql       = require('./server/mysql/mysql_functions.js'),
	cookieSession = require('cookie-session'),
	cookieParser = require('cookie-parser'), 
	mail        = require('./server/config/mail.js'),
	User        = require('./server/config/user.js'),
	SSOclient   = require('./server/config/SSOclient.js'),
	passport    = require('passport');require('./server/config/passport.js')(passport);

// ========== Initialize and setup express app ==========
var app 	= express();
var env		= app.get('env') || 'development';
var appConfig = require('./gulpfile');

// Support ejs templating for views
app.set('view engine', 'ejs');

// Set views path and serve static files
if(env === 'development'){
	app.set('views', path.resolve(appConfig.app));
	app.use(express.static(path.resolve(appConfig.app)));
	app.use('/bower_components', express.static(path.resolve(__dirname, 'bower_components')));
}
else if (env === 'production') {
	app.set('views', appConfig.dist);
	app.use(express.static(appConfig.dist));
}
else app.error('Node environment is invalid.');

app.use(favicon(path.resolve(__dirname, 'favicon.ico')));


// Log requests
app.use(logger('dev'));
// Support parsing of json- and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieSession({ 
	name: 'user',
	secret: 'GlennThaBaws',
    cookie: {
    	maxage: 2*24*60*60*1000
  	}
}));

app.get('/', function (req ,res){
	res.render('index', {title: 'E&T-dagen', year: 2016});
});

app.use(passport.initialize());
app.use(passport.session());

// ========== App routes ==========
var api = express.Router();

app.get('/auth/facebook',
  passport.authenticate('facebook',{ scope: 'email'}));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/#/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    	req.sessionOptions.maxAge = 2*24*60*60*1000;
		res.redirect('/#/user/profile');
  });

app.get('/auth/google',
  passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/userinfo.email' }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    req.sessionOptions.maxAge = 2*24*60*60*1000;
	res.redirect('/#/user/profile');
	});

app.get('/auth/ntnu/callback', function (req, res) {
	console.log('req: '+JSON.stringify(req.query));
	var sso = new SSOclient(req.query.data, req.query.sign, null, 'etdagentest');
	if (sso.oklogin()) {
		console.log('FYTTEHÆLVETE');
	} else {
		console.log('hmm: '+ sso.getReason());

	}

})

app.post('/login',
	passport.authenticate('local', { failureFlash: false }),
	function (req, res) {
		req.sessionOptions.maxAge = 2*24*60*60*1000;
    	res.redirect('/#/register/'+req.user.username);
  });

app.get('/logout', function (req, res){
	res.clearCookie('user.sig');
	res.sendStatus(200);
	req.session = null;
	req.logout();
});

app.post('/register',
	function (req,res) {
		if(req.user){
			//bruker finnes, oppdater
			User.update(req.body, function(error, info) {
				if(error) {
					console.log(error);
				} else {
					console.log(info);
				}
			});
		} else {
			User.adduser(req.body, function(error,info) {
				if (error) {
					console.log('error: '+error);
				} else {
					res.status(200).send(info);
				}
			});
			//passport.authenticate('local', { failureRedirect: '/login' },
  			//function(req, res) {
    		//	res.redirect('/#/');
  			//});
		}
	});

app.post('/contact', function (req,res) {
	mail.sendMail(req.body, function(error, info){
		if(error){
			res.status(500).send(error)
		} else {
			res.status(200).send(info);
		}
	});
});

app.post('/search', function (req,res) {
	mysql.searchAll(req.body.text,['fornavn','etternavn','email']).then(function successCB(rows, fields){
	res.send(rows);
},function errorCB(err) {
	res.status(500).send(err);
});
});

api.get('/news', function (req,res){
	var news = mysql.get.news(function (error, rows, fields) {
		res.jsonp(rows);
	});
});

api.get('/user', function (req,res){
	if(req.user) {
		var obj = req.user;
		delete obj.password;
		delete obj.salt;
		res.json(obj);
	} else {
		res.sendStatus(403);
	}
});

api.get('/company', function (req,res){
	//var comp = mysql.get.company();
	var c = {
		nome: 'Texasconductors',
		status: 'cash'
	};
	res.json(c);
});
app.all('/:path', function (req, res){ res.redirect('/#'+path); });

app.use('/api',api);
module.exports.app = app;
