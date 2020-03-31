// var MongoClient = require('mongodb').MongoClient;
const  mongoose =  require('mongoose');

var q =require('q');
var config = require('../config');

var mongoClientDB = [];

var url = config.get('mongodb.host')+config.get('mongodb.database.db.name')

// connect to database and store instat to local
var connect = function(ConnectionString){
	var deffered = q.defer();
	if(ConnectionString != undefined){
		url = ConnectionString.host+ ConnectionString.database
	}
	if(ConnectionString != undefined && mongoClientDB[ConnectionString.database]) {
		deffered.resolve(mongoClientDB[ConnectionString.database])
	}
	else if(ConnectionString === undefined && mongoClientDB[config.get('mongodb.database.db.name')]) {
		deffered.resolve(mongoClientDB[config.get('mongodb.database.db.name')])
	} else {
		console.log(url);
		mongoose.connect(url, {   useNewUrlParser: true,
			useUnifiedTopology: true}, (err, db) => {
				if(err){
					defferd.reject(err)
				} else{
							mongoClientDB[config.get('mongodb.database.db.name')] = db;
							deffered.resolve(mongoClientDB[config.get('mongodb.database.db.name')]);
				}
		})
	}
	return deffered.promise;
}

module.exports = {
	connect: connect
};