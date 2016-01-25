'use strict';

var Promise = require('promise');

add2(1);

function add2(num) {
	return new Promise(function(resolve, reject) {
		console.log(num);
		resolve(num);
	}).then(function() {
		num = num + 1;
		console.log(num);
	}).then(function() {
		num = num + 1;
		console.log(num);
	});
}

var http = require('http');

function get(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual request stuff
    http.get(url, function(res) {
        var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function() {
            resolve(body);
        });
    }).on('error', function(err) {
        reject(err);
    });
  });
}


function getMovie(movieId) {
	var url = 'http://www.omdbapi.com/?i=' + movieId + '&plot=short&r=json';
	get(url).then(function(response) {
		console.log("Success!", JSON.parse(response));
	}, function(error) {
		console.error("Failed!", error);
	});
}

function getMovieTitle(movieId) {
	var url = 'http://www.omdbapi.com/?i=' + movieId + '&plot=short&r=json';
	return new Promise(function(resolve, reject) {
		get(url).then(function(response) {
			console.log(JSON.parse(response).Title);
			resolve(JSON.parse(response).Title);
		}, function(error) {
			console.error("Failed!", error);
		});
	})
}

function getThreeMovies(id1, id2, id3) {
	getMovieTitle(id1).then(function() {
		getMovieTitle(id2)
	}).then(function() {
		getMovieTitle(id3);
	}).catch(function(error) {
		console.error("Failed!", error);
	})
}

function getThreeMoviesConcurrently(id1, id2, id3) {
	var p1 = getMovieTitle(id1);
	var p2 = getMovieTitle(id2);
	var p3 = getMovieTitle(id3);
	Promise.all([p1, p2, p3]);
}

//getMovie('tt0120737');
//getMovieTitle('tt0120737');

//getThreeMovies('tt0120737', 'tt0120737', 'tt0120737');
getThreeMoviesConcurrently('tt0120737', 'tt0120737', 'tt0120737');