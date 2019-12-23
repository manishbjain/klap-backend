var q = require('q')
var db = require('../utils/mongo-db');
var bcrypt =require('bcrypt-nodejs')
var config = require('../config')
const common = require('../utils/common');
var user = function(){

}

user.authenticate = function(username,password) {
	var deffered = q.defer();
	user.findOne(username, undefined).then(function(auser){

		if(auser.password == password){
			auser.verifiedPass = true
			deffered.resolve(auser)
		} else {
			auser.verifiedPass = false
			deffered.resolve(auser)
		}

	}, function(err){
		deffered.reject(err)
	})
	return deffered.promise;
}
user.findOne = function(userName, userNameWithLowerCase) {

	var deffered = q.defer();
	if (userNameWithLowerCase != undefined) {
		userName = userNameWithLowerCase;
	}
	var userQuery = {};

	userQuery.userName = userName; 
	db.getDocument(config.get('mongodb.database.db.collection.user'), userQuery).then(function(userDoc) {
		if (userDoc.length > 0) {
			deffered.resolve(userDoc[0]);
		} else {
			deffered.reject(null);
		}
	}, function(error) {
		if (_.isUndefined(userNameWithLowerCase)) {
			user.findOne(userName, userName.toLowerCase()).then(function(aUser) {
				deffered.resolve(aUser);
			}, function(error) {
				deffered.reject(error);
			});
		} else {
			deffered.reject(false);
		}
	});

	return deffered.promise;
};
user.regsiter = (userData) => {
	return new Promise((resolved, reject) =>{
		if(!userData._id) {
			db.addDocuments(config.get('mongodb.database.db.collection.user'), userData).then((userDoc) => { 
				resolved(userDoc.insertedIds)
			}, 
			(error) => {
				reject(error)
			})		
		} else {
			const filterData = {};
            filterData._id = common.convertToObjectID(userData._id);
            userData._id = filterData._id;
            db.modifyDocument(config.get('mongodb.database.db.collection.user'),filterData, userData).then((resp) => {
				console.log(resp)
                resolved(resp.insertedIds)
            }, (error)=> {
                console.log(error)
                reject(error)
            })
		}
		
	})
}
user.login = function(userName, password, sessionId, ip){
	var deffered = q.defer();
	var userQuery = {}
	var auser = {}
	userQuery.userName = userName;
	userQuery.password= password;
	
	db.getDocument(config.get('mongodb.database.db.collection.user'), userQuery).then(function(userDoc) {
		
		if(userDoc){
			auser = userDoc[0];
			deffered.resolve(auser);
		}else{

			deffered.reject(error)
		}
	}, function(err){
		deffered.reject(error);
	})
	return deffered.promise;
}
user.getAllUser = function() {
	var deffered = q.defer();
	db.getDocument(config.get('mongodb.database.db.collection.user'), {}).then(function(userDoc) { 
		deffered.resolve(userDoc);
	}, function(error) {
		deffered.reject(error);
	})
	return deffered.promise;
}
user.deleteUser = function(id) {
	var deffered = q.defer();
	db.deleteDocument(config.get('mongodb.database.db.collection.user'),id).then((resp) => {
		deffered.resolve(true)
	}, (error)=> {
		deffered.reject(error)
	})
	return deffered.promise;
}
user.logout = function(userName, sessionId){
	var deffered = q.defer();
	try{
		var userQuery = {};
		userQuery.userName = userName;
		db.getDocument(config.get('mongodb.database.db.collection.user'), userQuery).then(function(auser){
			if(auser.length > 0){
				auser = auser.pop();
			delete auser.sessionId;
			delete auser.ip;
			// Update user document
			db.modifyDocument(config.get('mongodb.database.db.collection.user'), userQuery, auser).then(function(status) {
				// To change PBX status offline as user gets logout from CRM
				deffered.resolve(status);
			}, function(error) {
				deffered.reject(error);
			});
			}else{
				logger.error("No Such User Document Exists With Username as: "+ userName);
			deffered.resolve(null)
			}
		}, function(err){})
	}catch(e){

	}
return deffered.promise;	
}
module.exports = user;