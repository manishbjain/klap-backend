var csrf = require('csurf');
var user = require('../models/user');

	
module.exports = function(app){
	app.use(function(req,res,next){
		if(req.method.toLowerCase()==='post' && req.header('x-xsrf-token') === undefined){
			res.status(403).send({
				code:4006,
				data: {}
			})
		} else {
			next();
		}
	})
	app.use(csrf());
	app.use(function (req, res, next) {
        var token = req.csrfToken();
        console.log(token);
		// for web and mobile application
		res.header('XSRF-TOKEN', token);

		if (req.method.toLowerCase() === 'get' && req.url != '/download/Image') {
			console.log(req.header.toString());
			if (req.isAuthenticated() && (req.header('x-xsrf-token') == undefined)) {
				// Something went wrong
				user.logout(req.user.userName).then(function (status) {
					req.logout();
					for (var cookie in req.cookies) {
						res.clearCookie(cookie);
					}
					req.session.destroy();
					res.status(200).end();
				}, function (error) {
					res.status(500).send({
						code: 5000,
						data: {}
					});
				});
			} else {
				next();
			}
		} else {
			next();
		}
	});
	app.use(function (error, req, res, next) {
		if (error.code !== 'EBADCSRFTOKEN') {
			return next(error);
		}
		res.status(403).send({
			code: 4005,
			data: {}
		});
	});
}