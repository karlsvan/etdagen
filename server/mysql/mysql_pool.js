'use strict';

// ========== Mysql dependencies ==========
// Vendor dependencies and configurations.
var mysql 			= require('mysql');

var mysql_config 	= [require('../config/database').mysql.connection_vars, 
					   require('../config/database').mysql.connection_opt]
	, logMysql		= require('../config/database').mysql.options.log;


// ========== Mysql connection pool ==========
// Populate the poolConfig with options from the config file and create a mysql connection pool with the configurations from poolConfig
var poolConfig = {};
mysql_config.forEach(function(elem){
	for(var key in elem){
		poolConfig[key] = elem[key];
	}
});

var pool = mysql.createPool(poolConfig);



// ========== Pool events ==========
// Log events if logMysql is true.
if(logMysql){
	pool.on('connection', function (connection){
		console.log('Connection established (thread ' + connection.threadId + ')');
	});
};


module.exports = pool;

