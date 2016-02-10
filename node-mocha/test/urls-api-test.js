'use strict';

var should = require('should');
var request = require('request-promise');
// allows to make HTTP request to some web server and returns a promise

var url = 'https://www.google.com';

// sets host to 127.0.0.1 if not set 
var host = process.env.HOST || '127.0.0.1';
var baseUrl = 'http://' + host + '/api/v1';

var shortPath;

describe('urls API', function() {
	it('should create a new short URL', function() {
		var options = {
			method: 'POST',
			url: baseUrl + '/urls',
			body: { url: url },
			json: true
		};
		return request(options)
			.then(function(body) {
				body.should.have.ownProperty('shortPath');
				body.shortPath.length.should.be.above(0);
				//console.log(body.shortPath);
				shortPath = body.shortPath;
			});	
	});
	it('should return full URL for short path', function() {
		var options = {
			method: 'GET',
			uri: baseUrl + '/urls/' + shortPath,
			json: true
		}
		
		return request(options)
			.then(function(body) {
				body.should.have.ownProperty('url');
				body.url.should.be.equal(url);
			});
	});
	it('should delete given a short path', function() {
		// write the test to do a DELETE of /urls/<short-path>
		// and verify the results
		var options = {
			method: 'DELETE',
			url: baseUrl + '/urls/' + shortPath,
			json: true
		};
		return request(options)
			.then(function(body) {
				body.should.have.ownProperty('message');
				body.message.should.be.equal('deleted');
			})
	})
	
});