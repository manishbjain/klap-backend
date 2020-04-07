var session = require('express-session'); // server-side session storage
var MongoDBStore = require('connect-mongo')(session);
var config = require('../config');

module.exports = function(app){
	// when request come create doc with time after that auto delete once time out 
	var store = new MongoDBStore({
		url: config.get('mongodb.host') + config.get('mongodb.database.session'),
		ttl : config.get('server.session.maxAge')
	})
	// configration
	app.use(new session({
		path : config.get('server.session.path'),
		secret : 'secret',
		httpOnly : config.get('server.session.httpOnly'),
		proxy : config.get('server.session.proxy'),
		rolling : config.get('server.session.rolling'),
		store : store,
		resave : true,
		saveUninitialized : config.get('server.session.saveUninitialized')
    }))
}