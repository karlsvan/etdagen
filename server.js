'use strict';

// ========== App and Server dependencies ==========
var express		= require('express'),
	path		= require('path'),
	logger      = require('morgan'),
    bodyParser  = require('body-parser');

// ========== Initialize and setup express app ==========
var app 	= express();
var env		= app.get('env') || 'development';

// Support ejs templating for views
app.set('view engine', 'ejs');

// Set views path and serve static files
if(env === 'development'){
	app.set('views', path.resolve(__dirname, 'client', 'views'));
	app.use(express.static(path.resolve(__dirname, 'client')));
	app.use('/bower_components', express.static(path.resolve(__dirname, 'bower_components')));
}
else if (env === 'production') {
	app.set('views', path.resolve(__dirname, 'server', 'dist'));
	app.use(express.static(path.resolve(__dirname, 'server/dist')));
}
else app.error('Node environment is invalid.');




// In development, requests will be logged
app.use(logger('dev'));
// Support parsing of json- and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// ========== App routes ==========
app.get('/', function (req ,res){
	res.render('index', {title: 'E&T-dagen', year: 2016});
});
app.all('/:path', function (req, res){ res.redirect('/#'+path); })

module.exports.app = app;
