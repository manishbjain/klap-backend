var service = require('./authentication-service')
module.exports = function(app){
	// session request
	app.get('/auth/session', service.session)

	// login request
	app.post('/auth/login', service.login)

	// Logout request
	app.post('/auth/logout', service.logout);

	// registration user
	app.post('/auth/register', service.register);
}