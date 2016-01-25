'use strict';

// library on top of mongo db which enforces schema; returns promises from its methods
var mongoose = require('mongoose');

var dbConfig = require('./secret/config-mongo.json');

var storySchema = new mongoose.Schema({	
	url: String, 	// every property can be an object
	votes: { type: Number, default: 0 },
	createdOn: { type: Date, default: Date.now }
});

var Story = mongoose.model('Story', storySchema);

// start connection to database asynchronously 
mongoose.connect(dbConfig.url);
mongoose.connection.on('error', function(err) {
	console.error(err);
});

var newStory = {
	url: 'http:/www.google.com'
};
var id;

// returns a promise directly
Story.create(newStory)
	.then(function(story) {
		id = story._id;
		console.log('inserted new story!');
		console.log(story);
	}).then(function() {	// do the READ
		/* returns not a promise, but a query object, a way for mongo to establish where, 
		sort conditions; thus must exec */
		return Story.findById(id).exec();
	}).then(function(story) {
		console.log('found story!');
		console.log(story);
		return Story.findByIdAndUpdate(id, { $inc: { votes: 1} }, { new: true });	
		/* increment the votes by 1 (-1 would decrement); inc is a mongo invention which allows
		for multi-user interactions, does atomically so everyone's votes get counted */
		// new: true gives us the new version of the object, AFTER the increment
	}).then(function(story) {	// do the UPDATE
		console.log('updated story!');
		console.log(story);
		return Story.findByIdAndRemove(id);
	}).then(function() {
		console.log('story deleted!');
	}).then(null, function(err) {	// same as catch, but catch is not supported in mongo
		console.error(err);
	}).then(function() {
		mongoose.connection.close();
	});

