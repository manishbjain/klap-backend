const db = require('../utils/mongo-db')
const config = require('../config');
const common = require('../utils/common');
// save order detail
const saveOrder = (data, userName) => {
    return new Promise((resolved, reject) =>{
        const filterData = {};
        if(data._id) {
            filterData._id = common.convertToObjectID(data._id);
            data._id = filterData._id;
            db.modifyDocument(config.get("mongodb.database.db.collection.orderDetail"), filterData, data).then((orderDetail) => {
                resolved(true);  
            },
            (err) =>{
                reject(err);
            })
        } else {
            data.createdBy = userName;
            db.addDocuments(config.get("mongodb.database.db.collection.orderDetail"), data).then((resp) => {
                resolved(resp.insertedIds)
            }, (err) => {
                reject(err);
                console.log(err)
                deffered.reject(err);
            });
        }
        
    })
}

// get 
const getOrders = (data) => {
    return new Promise((resolved, reject) =>{
        console.log(config.get("mongodb.database.db.collection.orderDetail"))
        db.getDocument(config.get("mongodb.database.db.collection.orderDetail"), {}).then((resp)  => {
            resolved(resp)
		}, (err) => {
            reject(err);
            console.log(err)
			deffered.reject(err);
		});
    })
}

// to update order
const updateOrder = (data) => {
    return new Promise((resolved, reject) => {
        
    })
}

const deleteOrders = (id) => {
    return new Promise((resolved, reject) => {
         db.deleteDocument(config.get("mongodb.database.db.collection.orderDetail"), id).then((resp) => {
            resolved(resp)
         }, (error) => {
            resolved(error)
         })

    })
}

module.exports = {
    saveOrder: saveOrder,
    getOrders: getOrders,
    updateOrder: updateOrder,
    deleteOrders: deleteOrders
}