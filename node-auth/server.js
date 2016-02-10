'use strict';

var express = require('express');
<<<<<<< HEAD
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
=======
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

//load GitHubStratey configuration
//this contains the clientID and clientSecret values
var ghConfig = require('./secret/oauth-github.json');
//add the callback URL, which can be relative (i.e., no domain)
ghConfig.callbackURL = '/signin/github/callback';

//create the GitHub authentication strategy
var ghStrategy = new GitHubStrategy(ghConfig, 
    function(accessToken, refreshToken, profile, done) {
        //this function is called after the user has
        //authenticated and GitHub has returned to our server
        //`profile` contains the full profile info
        //at this point you would probably want to create
        //or update a corresponding user account in your
        //database, as the `id` property on the profile
        //will be local to GitHub, and may conflict with
        //IDs from other OAuth providers you may support
        console.log('Authentication Successful!');
        console.dir(profile);
        done(null, profile);
    });
    
//load the cookie signature secret
//this is used to digitally sign the cookie so that
//express can tell if it was tampered with on the client

//read this from an environment variable
//set the environment variable using the command
//  $ export COOKIE_SIG_SECRET="my secret value"
//and then start the server
var cookieSigSecret = process.env.COOKIE_SIG_SECRET;
if (!cookieSigSecret) {
    console.error('Please set COOKIE_SIG_SECRET');
    process.exit(1);
}

var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

//add session support to the application
//and tell it to store session data in our
//local Redis database (you can also pass)
//a {host: host-name} object to the RedisStore()
//constructor to use a different host 
app.use(session({
    secret: cookieSigSecret,
    resave: false,
    saveUninitialized: false,
    store: new RedisStore()
}));

//tell passport to use the GitHub strategy
//you can use as many strategies as you want
//to support multiple ways to authenticate
passport.use(ghStrategy);

//provide a function to serialize the user
//this allows you to save only part of the user object
//for example, just the unique ID value
//for details see https://info344.ischool.uw.edu/course/tutorials/passport
passport.serializeUser(function(user, done) {
    done(null, user); 
});
passport.deserializeUser(function(user, done) {
    done(null, user); 
});

app.use(passport.initialize()); //add authentication to the app
app.use(passport.session());    //add session support to the app

//GET of /signin/github triggers authentication using the GitHub strategy 
app.get('/signin/github', passport.authenticate('github'));

//and GitHub redirects back to /signin/github/callback after authentication
//the passport.authenticate('github') receives the response from GitHub
//and processes it, and then our middleware function redirects to
//the /secure.html page
app.get('/signin/github/callback', passport.authenticate('github'), 
    function(req, res) {
        res.redirect('/secure.html'); 
    });    
    
//GET of /signout should end the session and redirect
//back to the home page
app.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/'); 
});

//tell express to serve static files from the /static/public
//subdirectory (any user can see these)
app.use(express.static(__dirname + '/static/public'));

//add a middleware function to verify that the user is
//authenticated: if so, continue processing; if not,
//redirect back to the home page
app.use(function(req, res, next) {
    //TODO: add code to check req.isAuthenticated()
    next();
});

//tell express to serve static files from the /static/secure
//subdirectory as well, but since this middleware function
//is added after the check above, express will never call it
//if the function above doesn't call next()
app.use(express.static(__dirname + '/static/secure'));

//start the server
app.listen(80, function() {
    console.log('server is listening...');
});
>>>>>>> dd127347d12c8bb16a0f6d7fa4d2cd6133701c08
