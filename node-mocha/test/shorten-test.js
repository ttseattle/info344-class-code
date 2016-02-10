'use strict';

// module that allows to do cool natural-language-like assertion testing
var should = require('should');
// load up module we just created 
var shorten = require('../lib/shorten');

// BDD (Behavioral Driven Design): write tests first meeting requirements 
describe('shorten module', function() {
	it('should encode an id to a path', function() {
		var enc = shorten.encode(99999);
		should.exist(enc);
		enc.length.should.be.above(0);
	});
	
	it('should decode a path back to the same id', function() {
		var id = 99999;
		shorten.decode(shorten.encode(id)).should.equal(id);
	})
});
