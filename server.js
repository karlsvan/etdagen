'use strict';

// ========== App and Server dependencies ==========
var express		= require('express'),
	path		= require('path'),
	logger      = require('morgan'),
    bodyParser  = require('body-parser'),
	favicon		= require('serve-favicon'),
	mysql       = require('./server/mysql/mysql_functions.js'),
	cookieSession = require('cookie-session'),
	mail        = require('./server/config/mail.js'),
	User        = require('./server/config/user.js'),
	authRoutes  = require('./authRouter.js'),
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

// ========== App routes ==========
var api = express.Router();

app.get('/logout', function (req, res){
	res.clearCookie('user.sig');
	res.clearCookie('user');
	res.sendStatus(200);
	req.session = null;
	req.logout();
});

app.get('/user/:id', function (req,res) {
	User.getProfile(req.params.id, function(error,profile) {
		if (error) {console.log(error)}
		if (profile.filer){profile.filer = JSON.parse(profile.filer)}
		if (profile.cards){profile.cards = JSON.parse(profile.cards)}
		if (profile.tags){profile.tags = profile.tags.split(',')}
		res.status(200).send(profile);
	})
});

app.get('/tags', function (req,res) {
	mysql.getAllTags().then(function(tags) {
		res.status(200).send(tags);
	}, function(error) {
		console.log(error);
	});
});

app.post('/register',
	function (req,res) {
		if(req.user){
			//bruker er logget inn, oppdater
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

app.get('/search', function (req,res) {
	mysql.searchAll().then(function successCB(rows, fields){

	//tags are returned as comma separated string, convert to array:
	rows = rows.map(function(row,index,array) {
		if(row.tags) {
			row.tags = row.tags.split(',');
		}
		return row;
	});

	res.send(rows);
},function errorCB(err) {
	res.status(500).send(err);
});
});

app.post('/forgot', function (req,res) {
	User.findOne({email:req.body.text}, function(error,user) {
		if (error) {
			console.log(error);
			res.status(500).send(error);
		} else if (user){
			console.log('id: '+user.id);
			User.updatePass(user.id, function(error,newPass) {
				if (error) {
					console.log(error);
				} else {
					mail.passwordMail(user.email, newPass, function(error,info) {
						if (error) {console.log(error);}
						else {
							res.status(200).send('success');
						}
						
					})

				}
			});
		} else {
			res.sendStatus(404);
		}
	})
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

api.get('/companies', function (req,res) {
	mysql.getCompanies().then(function(compObj) {
		delete compObj.password;
		delete compObj.salt;
		res.json(compObj);
	},function(error) {
		console.log(error);
	})
})

api.get('/company', function (req,res){
	//var comp = mysql.get.company();
	var c = {
		nome: 'Texasconductors',
		status: 'cash'
	};
	res.json(c);
});
app.all('/:path', function (req, res){ res.redirect('/#'+path); });
app.use(passport.initialize());
app.use(passport.session());
app.use('/api',api);
app.use('/auth',authRoutes);
module.exports.app = app;
