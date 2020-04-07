var csrf = require('csurf');
var user = require('../models/user');

	
module.exports = function(app){
	// check post requet must have x-xsrf-token if not return error
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

	// if request have token init csrf for validation
	app.use(csrf());

	// if token is valid then send respose with new generated toket
	app.use(function (req, res, next) {
        var token = req.csrfToken();
		// for web and mobile application
		res.header('XSRF-TOKEN', token);

		// for get reuest
		if (req.method.toLowerCase() === 'get' && req.url != '/download/Image') {
			if (req.isAuthenticated() && (req.header('x-xsrf-token') == undefined)) {
				// req is valid but not found x-xsrf-token logut the user
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

	// if error in validation reject then request
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