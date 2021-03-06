'use strict';

// ========== App and Server dependencies ==========
var express		= require('express'),
	path		= require('path'),
	logger      = require('morgan'),
    bodyParser  = require('body-parser'),
	favicon		= require('serve-favicon'),
	mysql       = require('./mysql/mysql_functions.js'),
	cookieSession = require('cookie-session'),
	mail        = require('./config/mail.js'),
	User        = require('./config/user.js'),
	fileFilter  = require('./config/fileFilter.js'),
	authRoutes  = require('./authRouter.js'),
	multer      = require('multer'),
	fs          = require('fs'),
	passport    = require('passport');require('./config/passport.js')(passport);

// ========== Initialize and setup express app ==========
var app 	= express();
var env		= app.get('env') || 'development';
var config = require('../gulpfile');

//for file upload:
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  	var filepath = path.resolve(__dirname, 'filer/'+req.user.id);
  	filepath = filepath.toString();
    cb(null, filepath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage, fileFilter: fileFilter });


// Support ejs templating for views
app.set('view engine', 'ejs');

// Set views path and serve static files
if(env === 'development'){
	app.set('views', config.dirs.app);
	app.use(express.static(config.dirs.app));
	app.use('/bower_components', express.static(path.resolve('bower_components')));
}
else if (env === 'production') {
	app.set('views', config.dirs.dist);
	app.use(express.static(config.dirs.dist));
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
		if (error) { console.log(error); }
		if (profile.adresse){ profile.adresse = JSON.parse(profile.adresse); }
		if (profile.filer){ profile.filer = JSON.parse(profile.filer); }
		if (profile.cards){ profile.cards = JSON.parse(profile.cards); }
		if (profile.tags){ profile.tags = profile.tags.split(','); }
		res.status(200).send(profile);
	});
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
		User.adduser(req.body, function(error,email) {
			if (error) {
				res.status(500).send(error);
			} else {
				res.status(200).send(email);
			}
		});
	});

app.post('/setPass',function (req,res) {
	User.setPass(req.body,function(error) {
		if (error){
			res.status(500).send(error);
		} else {
			res.sendStatus(200);
		}
	});
});

app.post('/saveSettings', function (req, res) {
	User.saveProfile(req.body, function(error) {
		if (error) throw error;
		res.sendStatus(200);
	});
});

app.post('/contact', function (req,res) {
	mail.sendMail(req.body, function(error, info){
		if(error){
			res.status(500).send(error);
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


app.get('/filer/:userid/:filename',function (req,res) {
	res.download(path.resolve(__dirname, 'filer', req.params.userid, req.params.filename));

});

app.post('/forgot', function (req,res) {
	console.log('email: '+JSON.stringify(req.body));
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

					});

				}
			});
		} else {
			res.sendStatus(404);
		}
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

api.get('/companies', function (req,res) {
	mysql.getCompanies().then(function(compObj) {
		delete compObj.password;
		delete compObj.salt;
		res.json(compObj);
	},function(error) {
		console.log(error);
	});
});

app.use(passport.initialize());
app.use(passport.session());

app.post('/upload',upload.single('file'),function (req,res) {
	if (req.file) {
		res.sendStatus(200);
	} else {
		res.sendStatus(500);
	}
});

app.post('/deleteFile', function (req, res) {
	fs.unlink(path.resolve(__dirname, 'filer',req.user.id.toString(),req.body.name),function() {
		User.deleteFile(req.user.id,req.body.index,function(error) {
			res.sendStatus(200);
		});
	});
});

app.all('/:path', function (req, res){ res.redirect('/#'+path); });

app.use('/api',api);
app.use('/auth',authRoutes);
module.exports.app = app;
