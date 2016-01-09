'use strict';

// ========== Query middleware dependencies ==========
// The query middleware needs:
// pool 	: A mysql connection pool
// logMysql : A boolean value for logging
var pool 	= require('./mysql_pool'),
	mysql   = require('mysql'),
	q       = require('q'),
	logMysql= require('../config/database').mysql.options.log;


// ========== Middleware function ==========
// The Query function queries the database with <sql> and calls the callback function with the arguments of the resulting query(error, rows, fields).
function Query(sql, inserts){
	var defered = q.defer();
	pool.getConnection(function(connectionError, connection){
		if(connectionError){ defered.reject(connectionError); }
		else{
			connection.query(sql, inserts, function(error, rows, fields){
				connection.release();
				if(error){ defered.reject(error); }
				else { defered.resolve(rows, fields); }
			});
		}
	});
	return defered.promise;
}

function append(){
	var sql = '';
	var args=[].slice.apply(arguments);
	args.forEach(function(arg){
		sql += pool.escape(arg);
	});
	return sql;
}

// ========== Exports ==========
module.exports = {
	findUsers: function (specs){
		//var sql = specs ? append('SELECT * FROM bruker WHERE ?', specs) : append('SELECT * FROM bruker');
		//console.log('sql: '+sql);
		return new Query('SELECT * FROM bruker WHERE ?',specs);
	},

	addUser: function (user){
		if(!user) return q.defer().reject(new Error('No user specified in function addUser')).promise;
		else {
			var keys = [], values = [];
			for(var key in user) {
				keys.push(key);
				values.push(user[key]);
			}
			var inserts = [keys,values];
			var sql = 'INSERT INTO bruker (??) VALUES (?);';
			return new Query(sql,inserts);
		}
	},

	searchAll: function(text,coll){
		var sql = 'SELECT id, fornavn, etternavn, email, bilde FROM bruker WHERE MATCH (??) AGAINST (?);';
		var inserts = [coll,text];
		return new Query(sql,inserts);
	},

	updateUser: function(id, inserts) {
		var sql = 'UPDATE bruker SET ? WHERE id='+id;
		//console.log('sql: '+mysql.format(sql, inserts));
		return new Query(sql,inserts);
	},

	getProfile: function(id) {
		console.log('id: '+id);
		var sql = 'SELECT * FROM profil WHERE bruker_id='+id;
		return new Query(sql);
	}
};
