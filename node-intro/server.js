'use strict';

// require the express module
var express = require('express');
// require the morgan module
var morgan = require('morgan');
var bodyParser = require('body-parser');

// create a new express application 
var app = express();

// MIDDLEWARE FUNCTIONS: go down the chain 

// log requests
// req = request
// res = resource 
// next is a function that we will call in order for processing of the request to continue
/* app.use(function(req, res, next) {
	// log method and url 
	console.log('%s %s', req.method, req.url); // just like this, server seems to hang... 
	next(); // need to call this function to continue processing request 
});
*/

// morgan shows response code, how long it took to supply the response... 
app.use(morgan('dev'));

// parse JSON post bodies
app.use(bodyParser.json());

// server static files from /static
app.use(express.static(__dirname + '/static')); //__dirname in node that is always set to the full path of the script that was executed

/*
// call this function for GET on /
// whenever someone sends a get to the root resource
app.get('/', function(req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.send('Hello World!');
});

// call this funtion for GET on /time
app.get('/time', function(req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.send(new Date());	
});
*/

// api that returns users 
app.get('/api/v1/users', function(req, res) {
	var users = [
		{
			email: 'test@test.com',
			displayName: 'Test User'
		}
	];
	res.json(users);
});

// acept something from the client
// RESTful allows people to update 
app.post('/api/v1/users', function(req, res) {
	console.log(req.body);
	res.json({message: 'new user created updated'});
});

// listen for HTTP requests on port 1234 (start server)
// set the port to the same one you set your server to in the Vagrantfile 
app.listen(1234, function() {
	console.log('server is listening');
});