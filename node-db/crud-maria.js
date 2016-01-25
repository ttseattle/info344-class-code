// CRUD: create read update delete 
'use strict';

var mysql = require('mysql');		
// package listed in json files, connects programs to MySQL or MariaDB
// will enhance using js promises 

// a library that can takes all functions and turns them into promises 
var bluebird = require('bluebird');
// another package installed in json files

// load connection info
var dbConfig = require('./secret/config-maria.json');		
// don't want to embed passwords on github, so put in secret files
// require will load any json files or js module 
// .. means directory above, . means the current directory 

// create a connection to the "news" database
//var conn = mysql.createConnection(dbConfig);
var conn = bluebird.promisifyAll(mysql.createConnection(dbConfig));

// id of newly inserted row
var id;

/*
// no support for promises built in 
conn.query('select * from stories;', function(err, rows) {
	if (err) {
		console.error(err);
	} else {
		console.log('%d rows returned', rows.length);
		rows.forEach(function(row) {
			console.log(row);
		});
	}
	conn.end();
});
*/

function logRow(row) {
	console.log(row);	
}

function logRows(rows) {
	rows.forEach(logRow);
}

// bluebird takes callback functions and makes them return promisies
// user param injection --> specifiy array of values that will get matched up with those ?'s
conn.queryAsync('insert into stories (url) values (?)', ['http://google.com'])
	.then(function(results) {
		id = results.insertId;
		console.log('row inserted, new id = %s', id);
		return conn.queryAsync('select * from stories where id=?', [id]);		
	}).then(logRows).then(function() {
		return conn.queryAsync('update stories set votes=votes+1 where id=?', [id]);
	}).then(function(results) {
		console.log('%d rows affected', results.affectedRows);	
		return conn.queryAsync('select * from stories where id=?', [id]);
	}).then(logRows).then(function() {
		return conn.queryAsync('delete from stories where id=?', [id]);
	}).then(function(results) {
		console.log('%d rows affected', results.affectedRows);
	}).catch(function(err) {
		console.error(err);
	}).then(function() {
		conn.end();		// without, won't end script and return to command prompt
	});