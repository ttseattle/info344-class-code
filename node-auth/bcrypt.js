'use strict';

var bluebird = require('bluebird');		// for promises on top of bcrypt
var bcrypt = bluebird.promisifyAll(require('bcrypt'));

var password = process.argv[2];
var rounds = 10;

if (process.argv.length >= 4) {
	rounds = parseInt(process.argv[3]);
	if (isNaN(rounds) || rounds <= 0) {
		console.error('Number of rounds must be a positive integer!');
		process.exit(1);
	}
}

console.log("Hashing '%s' with %d rounds of bcrypt...", password, rounds);
console.time('duration');

bcrypt.hashAsync(password, rounds).then(function(hash) {
	console.timeEnd('duration');
	console.log(hash);
	
	return [hash, bcrypt.compareAsync(password, hash)];	// made possible by bluebird
}).spread(function(hash, isSame) {
	console.log("Comparing hash against '%s': %j", password, isSame);
	password += 'x';
	return [hash, bcrypt.compareAsync(password, hash)];
}).spread(function(hash, isSame) {
	console.log("Comparing hash against '%s': %j", password, isSame);
}).catch(function(err) {
	console.error(err);
	process.exit(1);
});

// output hash is always 60 characters
// salting slows algorithm down - want to make as slow as you can get away with to help prevent hackers
// slow down by increasing number of rounds