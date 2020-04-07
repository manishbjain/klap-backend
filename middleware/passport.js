module.exports = function (app) {
	// Passport is Express-compatible authentication middleware for Node.js.
	var passport = require('passport');
	// Before authenticating requests, the strategy (or strategies) used by an application must be configured
	var localStrategy = require('passport-local').Strategy;

	var user = require('../models/user');

	// passport init function
	app.use(passport.initialize());
	app.use(passport.session());

	// localStrategy use userName and password when user is login
	var strategy = new localStrategy({
		usernameField : 'userName',
		passwordField : 'password'
	}, function(userName, password, next){
		user.authenticate(userName, password).then(function(auser){
			next(null,auser)
		}, function(err){
			next(null, false)
		})
	})

	// after login device request is valid
	passport.use(strategy);

	// if fail return null
	passport.serializeUser(function(userName,next){
		next(null, userName)
	})

	// if user found req handle with user detail for next function can use a user detail
	passport.deserializeUser(function(userName,next){
		user.findOne(userName).then(function(auser){
			next(null, auser);
		}, function(error){
			next(null, false);
		})
	})

}