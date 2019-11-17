const db = require('../utils/mongo-db')
const config = require('../config')

// save customer Detail
const saveCustomerDetail = (data) => {
    return new Promise((resolved, reject) =>{
        db.addDocuments(config.get('mongodb.database.db.collection.customer'), data).then((resp) => {
            resolved(resp.insertedIds)
        }, (error)=> {
            reject(error)
        })
    })
}

// get customer Detail
const getCustomers = (data) => {
    return new Promise((resolved, reject) =>{
        db.getDocument(config.get('mongodb.database.db.collection.customer')).then((resp) => {
            resolved(resp)
        }, (error)=> {
            reject(error)
        })
    })
}

module.exports = {
    saveCustomerDetail: saveCustomerDetail,
    getCustomers: getCustomers
}