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
	//console.log('sql: '+sql);
	var defered = q.defer();
	pool.getConnection(function(connectionError, connection){
		if(connectionError){ defered.reject(connectionError); }
		else{
			connection.query(sql, inserts, function(error, rows, fields){
				//console.log(JSON.stringify(rows[0]))
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
		var inserts = [];
		var sql = 'SELECT * FROM bruker WHERE ';
		for(var key in specs) {
			sql = sql + mysql.escapeId(key)+'='+mysql.escape(specs[key])+' OR ';
		}
		sql = sql.slice(0,-4);
		return new Query(sql,inserts);
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

	searchAll: function(){
		var sql = 'SELECT bruker.id, bruker.fornavn, bruker.etternavn, bruker.email, bruker.bilde, bruker.status, GROUP_CONCAT(tags.navn) AS tags FROM bruker LEFT JOIN bruker_tags ON bruker_tags.bruker_id = bruker.id LEFT JOIN tags ON tags.id = bruker_tags.tag_id GROUP BY bruker.id ORDER BY bruker.fornavn, bruker.etternavn';
		//var inserts = [coll,text];
		return new Query(sql);
	},

	updateUser: function(id, inserts) {
		var sql = 'UPDATE bruker SET ? WHERE id='+id;
		return new Query(sql,inserts);
	},

	getProfile: function(id) {
		var sql = 'SELECT '
		+'bruker.id, '
		+'bruker.fornavn, '
		+'bruker.etternavn, '
		+'bruker.tlf, '
		+'bruker.email, '
		+'bruker.facebookId, '
		+'bruker.googleId, '
		+'bruker.feideId, '
		+'bruker.adresse, '
		+'bruker.utgangsaar, '
		+'bruker.linje, '
		+'bruker.status, '
		+'bruker.bilde, '
		+'bruker.fodselsdato, '
		+'profil.bio, '
		+'profil.filer, '
		+'profil.cards, '
		+'GROUP_CONCAT(tags.navn) AS tags '
		+'FROM bruker LEFT JOIN profil ON bruker.id = profil.bruker_id LEFT JOIN bruker_tags ON bruker.id = bruker_tags.bruker_id LEFT JOIN tags ON bruker_tags.tag_id = tags.id WHERE bruker.id='+id;
		//console.log(sql);
		return new Query(sql);
	},

	getFiles: function(id) {
		var sql = 'SELECT filer FROM profil WHERE bruker_id='+id;
		return new Query(sql);
	},

	searchByTag: function(tag) {
		var sql = 'SELECT bruker.fornavn, bruker.etternavn, bruker.bilde, tags.navn AS tag_navn FROM bruker LEFT JOIN bruker_tags ON bruker.id = bruker_tags.bruker_id LEFT JOIN tags ON bruker_tags.tag_id = tags.id WHERE tags.navn="'+tag+'";';
		return new Query(sql);
	},

	getAllTags: function() {
		var sql = 'SELECT navn FROM tags;';
		//console.log(sql);
		return new Query(sql);
	},

	addTag: function(name) {
		var sql = 'INSERT INTO tags navn VALUES "'+name+'";'
	},

	getCompanies: function() {
		var sql = 'SELECT * from bruker WHERE status="bedriftadmin";';
		return new Query(sql);
	},

	saveFiles: function(id,file) {
		var sql = 'INSERT INTO profil (bruker_id, filer) VALUES (?) ON DUPLICATE KEY UPDATE filer = ?;';
		var inserts = [[id,file],file];
		return new Query(sql,inserts);
	},

	saveProfile: function(userC,userV,userO,profilC,profilV,profilO,tags){
		var userSql = 'INSERT INTO bruker (??) VALUES (?) ON DUPLICATE KEY UPDATE ?; '
		var userInserts = [userC,userV,userO];
		userSql = mysql.format(userSql,userInserts);
		//console.log('userSql: '+userSql);
		var profilSql = 'INSERT INTO profil (??) VALUES (?) ON DUPLICATE KEY UPDATE ?; '
		var profilInserts = [profilC,profilV,profilO];
		profilSql = mysql.format(profilSql,profilInserts);
		//console.log('profilSql: '+profilSql);
		var tagSql = '';
		if (tags) {
			tags.forEach(function(elem,index,arr){
				tagSql = tagSql + 'INSERT INTO tags (navn) VALUES ("'+elem+'") ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id); '+
				'INSERT INTO bruker_tags (bruker_id,tag_id) VALUES ('+userO.id+',LAST_INSERT_ID()) ON DUPLICATE KEY UPDATE bruker_id=bruker_id ;'
			})
		}
		//console.log('tagSql: '+tagSql);

		var sql = userSql + profilSql +tagSql;

		return new Query(sql);
	}


};
