'use strict';

// isolated from server.js
var express = require('express')
var request = require('request');
var cheerio = require('cheerio');

// returns a new express router that contains all the routes required to 
// get stories
module.exports.Router = function(Story) {
	var router = express.Router();	// returns another exrpess router 
	
	router.get('/stories', function(req, res, next) {
		// return all stories from the database
		// res.json([]);
		Story.getAll().then(function(rows) {
			res.json(rows);
		}).catch(next);		// catch(function(err) { next(err); })
	});
	
	router.post('/stories', function(req, res, next) {
		// insert a new story into the database and 
		// return the data with default values applied
		// res.json({});
		request.get(req.body.url, function(err, response, body) {
			if (err) {
				req.body.title = req.body.url;
			} else {
				var $ = cheerio.load(body);
				req.body.title = $('head title').text();
			}
			
			Story.insert(req.body).then(function(row) {	// gives you back single object row that represents row
				res.json(row);	// .then(res.json) doesn't work because Promise spec doesn't allow 
			}).catch(next);
		});
	});
	
	router.post('/stories/:id/votes', function(req, res, next) {
		// upvote the story and return the full story
		// with current number of votes
		// res.json({});
		// id = :id; :foo -> req.params.foo
		Story.upVote(req.params.id).then(function(row) {
			res.json(row);
		}).catch(next);
	});
	
	return router;
}; 