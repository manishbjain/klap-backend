const db = require('../utils/mongo-db')
const config = require('../config');

// save order detail
const saveOrder = (data) => {
    return new Promise((resolved, reject) =>{
        db.addDocuments(config.get("mongodb.database.db.collection.orderDetail"), data).then((resp) => {
            resolved(resp.insertedIds)
		}, (err) => {
            reject(err);
            console.log(err)
			deffered.reject(err);
		});
    })
}

// get 
const getOrders = (data) => {
    return new Promise((resolved, reject) =>{
        db.getDocument(config.get("mongodb.database.db.collection.orderDetail"), {}).then((resp)  => {
            resolved(resp)
		}, (err) => {
            reject(err);
            console.log(err)
			deffered.reject(err);
		});
    })
}

module.exports = {
    saveOrder: saveOrder,
    getOrders: getOrders
}