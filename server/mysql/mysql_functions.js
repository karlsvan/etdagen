'use strict';

// ========== Query middleware dependencies ==========
// The query middleware needs:
// pool 	: A mysql connection pool
// logMysql : A boolean value for logging
var pool 		= require('./mysql_pool')
	, logMysql 	= require('../config/database').mysql.options.log;


// ========== Middleware function ==========
// The Query function queries the database with <sql> and calls the callback function with the arguments of the resulting query(error, rows, fields).
function Query(sql, callback){
	var log = arguments[2] || logMysql;
	pool.getConnection(function (connectionError, connection) {
		if(connectionError){ if(log){ console.log('Unable to connect to database:\n' + connectionError); }
			callback(connectionError, null, null);
		}
		else { //pool will console.log when connection is established
			connection.query(sql, function (error, rows, fields) {
				connection.release();
				if(error){ if(log){ console.log('Unable to query database: \n' + error); }
					callback(error, null, null);
				} else { if(log){ console.log('Query successful'); }
					callback(null, rows, fields);
				}
			});
		}
	});
}


// ========== Exports ==========
// 
module.exports.get = {

	news: function(callback){
		Query('SELECT * FROM nyheter', function (error, rows, fields){  
		callback (error, rows, fields);
		});
	},

	user: function(userobj, callback){
		var sql = 'SELECT * FROM bruker WHERE ';
		for(var key in userobj){
			//console.log(key + ' | ' + userobj[key]);
			sql += key + '=' + userobj[key] + ' AND ';
		}
		sql = sql.substring(0, sql.length-4); // get rid of last AND (or space if no more keys)
		sql += 'LIMIT 2;';
		// resulting sql: 'SELECT * FROM brukere WHERE [{key}={userobj.key},] LIMIT 2'
		//console.log('sql: '+ sql);
		Query(sql, function (error, rows, fields){
			if(error){ callback(error); }
			else {
				if(rows.length>1){ callback(new Error('Database dublicates')); }
				else if(rows.length<1){ callback(null, null); }
				else {
					callback(null, rows[0]);
				}
			}
		});
	},

	adduser: function(userobj, callback){
		var sql = 'INSERT INTO bruker (';
		for(var key in userobj) {
			sql += key + ", ";
		}
		sql = sql.substring(0, sql.length-2);
		sql += ") VALUES ("
		for(var key in userobj) {
			sql += "'" + userobj[key] + "',";
		}
		sql = sql.substring(0, sql.length-1);
		sql += ");"
		Query(sql, function (error, rows, fields){
			if(error){ callback(error); }
			else {
				if(rows){
				console.log('sucsess!?');
				}
				callback(null,rows[0]);
			}
		})
		console.log('sql: '+ sql);
	},

	company: function(callback){
		var sql = 'SELECT * FROM bedrift';
		Query(sql, function (error, rows, fields){ callback(error)});
	}
};





