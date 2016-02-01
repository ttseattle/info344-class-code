'use strict';

var express = require('express');
var morgan = require('morgan');				// module for logging
var bodyParser = require('body-parser');
var session = require('express-session');	// allows user sessions, even though HTTPD is stateless protocol
var RedisStore = require('connect-redis')(session);		// provides connection with redis db 
var passport = require('passport');			/* framework node uses for authentication - 
takes care of boiler plate stuff for authentication, but delegates authentication to 1 or 
more strategies, where strategy = how to authenticate user */
var GitHubStrategy = require('passport-github').Strategy;

var ghConfig = require('./secret/oauth-github.json');	// load json file into an object
ghConfig.callbackURL = 'http://localhost:8080/signin/github/callback';

var ghStrategy = new GitHubStrategy(ghConfig, 
	function(accessToken, refreshToken, profile, done) {	
	// function will be invoked once successfully authorize on GitHub and returned to website
		console.log('Authentication Successful!');
		console.dir(profile);	// pretty print of what the object is
		done(null, profile);	// first arg = error, second arg = user object
	});

var cookieSigSecret = process.env.COOKIE_SIG_SECRET;	// read environment variable and look for one called COOKIE_SIG_SECRET
if (!cookieSigSecret) {
	console.error('Please set COOKIE_SIG_SECRET');
	process.exit(1);	// exit code indicating something went wrong
}
// a browser cookie is a piece of info sent to the server every time a request is made
// response header called cookie, browser holds on, andevery successive request will send same cookie back

var app = express();
app.use(morgan('dev'));	// request logging
app.use(bodyParser.json());	// parse JSON request bodies
// drop cookie called session id which is the key that will be put into the redis db
// key is the only thing passed back and forth, but the value assoc. with can be anything we want
// we can put stuff like user ids and other user info, because data doesn't go back and forth, only key
app.use(session({	// a function that takes an object, with properties such as secret
	secret: cookieSigSecret,	// used to create secret key, never want to put into public repo
	resave: false,				// without passing false, generates warning messages
	saveUninitialized: false,
	store: new RedisStore()
}));

// can add as many strategies as you want!
passport.use(ghStrategy);
passport.serializeUser(function(user, done) {	// called at start o
	done(null, user);	// serializes entire user into session store
});
passport.deserializeUser(function(user, done) {	/* called at start of every single user, 
so should be as efficient as possible ~ better to just deserialize user id instead of 
whole user */
	done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

app.get('/signin/github', passport.authenticate('github'));	// tells wants to authenticate using the github strategy
app.get('/signin/github/callback', passport.authenticate('github'), 
	function (req, res) {
		res.redirect('/secure.html');	// successful authentication -> redirect back to secure.html, static file already created
	});
app.get('/signout', function(req, res) {	// sign out people with sessions going on
	req.logout();
	res.redirect('/');	
});

app.use(express.static(__dirname + '/static/public'));

// want to prevent unauthenticated users from seeing!
app.use(function(req, res, next) {
	// middleware function has opportunity call next depending on whether user is authenticated
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect('/');
	}
});

app.use(express.static(__dirname + '/static/secure'));

app.listen(80, function() {
	console.log('Server is listening...');
})