'use strict';

// ========== App and Server dependencies ==========
var express		= require('express'),
	path		= require('path'),
	logger      = require('morgan'),
    bodyParser  = require('body-parser'),
	favicon		= require('serve-favicon'),
	mysql       = require('./server/mysql/mysql_functions.js');
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



// ========== App routes ==========
var api = express.Router();
app.get('/', function (req ,res){
	res.render('index', {title: 'E&T-dagen', year: 2016});
});

api.get('/news', function (req,res){
	var news = mysql.get.news(function (error, rows, fields) {
		res.json(rows);
	});
	
})

api.get('/user', function (req,res){
	var user = mysql.get.user(null ,function (error, rows, fields){
		console.log('yo...' + JSON.stringify(rows));
		res.json(rows);
	});	
})

api.get('/company', function (req,res){
	//var comp = mysql.get.company();
	var c = {
		nome: 'Texasconductors',
		status: 'cash'
	}
	res.json(c);
})

app.all('/:path', function (req, res){ res.redirect('/#'+path); });
app.use('/api',api);
module.exports.app = app;
