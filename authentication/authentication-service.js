var passport  = require('passport');
var user = require('../models/user');
const schemas = require('../models/schemas');
const common = require('../utils/common');

module.exports = {}

// get is user login or not if login return user detail
var session = function(req, res){
	if(req.isAuthenticated()){
		return res.status(200).send({
			code:2000,
			data: req.user
		})
	} else{
		return res.status(200).send({
			code : 2002,
			data : {}
		});
	}
}

// login
var login =  function(req,res){
	passport.authenticate('local', function(error, auser){
		console.log('error'+auser)
		if(error){
			return res.status(400).send({
				code:400,
				data:{}
			})
		}
		if(auser == undefined){
			return res.status(400).send({
				code:400,
				data:{}
			})	

		}else{
			var ip = req.header['x-forwarded-for'] || req.connection.remoteAddress;
			user.login(auser.userName, auser.password, req.sessionID,ip).then(function(result){
				req.login(auser.userName, function(error){
					if(error) {
						return res.status(500).send({
							code:403,
							data:{}
						})			
					} else {
						return res.status(200).send({
							code : 2003,
							data : auser
						});
					}
					
				})
			})
		}	
	}, function(err){
			return res.status(400).send({
				code : 2004,
				data : {}
			})
		})(req, res)
}

// For logout
var logout = function(req, res) {
	if (req.isAuthenticated()) {
		user.logout(req.user.userName, req.sessionID).then(function(result) {
			delete result.userAgent;
			delete result.sessionId;
			req.logout();
			for ( var cookie in req.cookies) {
				res.clearCookie(cookie);
			}
			req.session.destroy();
			res.status(200).end();
		}, function(error) {
			res.status(500).send({
				code : 5000,
				data : {}
			});
		});
	} else {
		req.session.destroy();
		res.status(200).end();
	}

};

// insert user detail to db
var register = function(req, res) {
	if (req.isAuthenticated()) { 
		let data = req.body;
		data = common.sanitize(data, schemas.createUser);
		if (schemas.validate(data, schemas.createUser)) {
			user.regsiter(data).then(resp => {
				 res.status(200).send({
					code : 2003,
					data : resp
				});
			}, error =>{
				res.status(500).send({
					code : 5000,
					data : {}
				});
			})
		}
	} else {
		req.session.destroy();
		res.status(200).end();
	}
}
var geAllUser = function(req, res) {
	if (req.isAuthenticated()) { 
		user.getAllUser().then(resp => {
			res.status(200).send({
			   code : 2003,
			   data : resp
		   });
	   }, error =>{
		   res.status(500).send({
			   code : 5000,
			   data : {}
		   });
	   })
	} else {
		req.session.destroy();
		res.status(200).end();
	}
}

// for delete user
var deleteUser = function(req, res) {
	if (req.isAuthenticated()) { 
		user.deleteUser(req.body.id).then(resp => {
			res.status(200).send({
			   code : 2003,
			   data : resp
		   });
	   }, error =>{
		   res.status(500).send({
			   code : 5000,
			   data : {}
		   });
	   })
	} else {
		req.session.destroy();
		res.status(200).end();
	}
}

module.exports = {
	session:session,
	login:login,
	logout : logout,
	register: register,
	geAllUser: geAllUser,
	deleteUser: deleteUser
}