'use strict';

// middlewares
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var dbConfig = require('./secret/config-maria.json');
var bluebird = require('bluebird');

// creates a pool which inits 10 connections by default 
var connPool = bluebird.promisifyAll(mysql.createPool(dbConfig));	

var storiesApi = require('./controllers/stories-api');
var Story = require('./models/story.js').Model(connPool);	

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/static'));

app.use('/api/v1', storiesApi.Router(Story));

app.listen(80, function() {
	console.log('server is listening...');
});