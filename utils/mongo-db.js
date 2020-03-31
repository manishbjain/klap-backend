var q = require('q')
var mongoClient = require('./mongo-db-connection')
var mongodb = require('mongodb');
var ObjectID = require('mongodb').ObjectID;

// get document from mongo Db
var getDocument = function (tableName, docToSearch, fieldName) {
	var deffered = q.defer()
	if (fieldName == undefined) {
		fieldName = {}
	}
	mongoClient.connect().then(function (connect) {
		connect.collection(tableName).find(docToSearch, fieldName).toArray(function (err, resp) {

			if (!err) {
				deffered.resolve(resp);
			} else {
				console.log(err)
				deffered.reject(err);
			}
		})
	})
	return deffered.promise;
}

// insert document to mongo Db
var addDocuments = function (tableName, userdata) {
	var deffered = q.defer()
	if (!Array.isArray(userdata)) {
		userdata = [userdata];
	}
	mongoClient.connect().then(function (connect) {
		connect.collection(tableName).insertMany(userdata).then(function (res) {
			deffered.resolve(res)
		}, function (error) {
			console.log(error);
			deffered.reject(error);
		})
	})
	return deffered.promise;
}

// modify document to mongo Db
var modifyDocument = function (tableName, uniqueReference, docstoUpdate) {
	var deffered = q.defer();
	mongoClient.connect().then(function (connection) {
		try {
			console.log(uniqueReference);
			connection.collection(tableName).replaceOne(uniqueReference, docstoUpdate).then(function (resp) {
				deffered.resolve(resp);
			}, function (err) {
				console.log(err);
				deffered.reject(err);
			});
		} catch (ex) {
			console.log(ex.stack);
		}
	}, function (error) {
		deffered.reject(error);
	});
	return deffered.promise;
}

// insert document to mongo Db
var modifyProperty = function (tableName, uniqueReferace, propertyTobeSet) {

	try {
		var deffered = q.defer()

		mongoClient.connect().then(function (connect) {
			connect.collection(tableName).updateOne(uniqueReferace, {
				$set: propertyTobeSet
			}).then(function (resp) {
				deffered.resolve(resp);
			}, function (err) {
				console.log(err);
				deffered.reject(err);
			})
		})
	}
	catch (e) {
		console.log(e);
	}
	return deffered.promise;
}
var deleteDocument = function (tableName, uniqueReferace) {
	try {
		var deffered = q.defer()

		mongoClient.connect().then(function (connect) {
			connect.collection(tableName).deleteOne({ _id: new mongodb.ObjectID(uniqueReferace) }).then(function (resp) {
				deffered.resolve(resp);
			}, function (err) {
				console.log(err);
				deffered.reject(err);
			})
		})
	}
	catch (e) {
		console.log(e);
	}
	return deffered.promise;
}

var generateUUID = () => {
	return new ObjectID();

}
module.exports = {
	getDocument: getDocument,
	addDocuments: addDocuments,
	deleteDocument: deleteDocument,
	modifyProperty: modifyProperty,
	modifyDocument: modifyDocument,
	generateUUID: generateUUID
}