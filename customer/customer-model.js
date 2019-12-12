const db = require('../utils/mongo-db')
const config = require('../config')
const common = require('../utils/common');

// save customer Detail
const saveCustomerDetail = (data) => {
    return new Promise((resolved, reject) =>{
        console.log(data._id);
        if(!data._id) {
            db.addDocuments(config.get('mongodb.database.db.collection.customer'), data).then((resp) => {
                resolved(resp.insertedIds)
            }, (error)=> {
                reject(error)
            })
        } else {
            if(data.ledgers && data.ledgers.length > 0) {
                let i = 0;
                for (let ledger of data.ledgers) {
                    if(Object.keys(ledger).length > 0) {
                        ledger.id = data._id + '_' + i;
                    }
                    i++;
                }
            }
            if(data.deliveryLocations && data.deliveryLocations.length > 0) {
                let i = 0;
                for (let deliveryLocation of data.deliveryLocations) {
                    if(Object.keys(deliveryLocation).length > 0 && !deliveryLocation.id) {
                        deliveryLocation.id = data._id + '_' + i;
                    }
                    i++;
                }
            }
            if(data.contact && data.contact.length > 0) {
                let i = 0;
                for (let contact of data.contact) {
                    if(Object.keys(contact).length > 0 && !contact.id) {
                        contact.id = data._id + '_' + i;
                    }
                    i++;
                }
            }
            console.log(data);
            const filterData = {};
            filterData._id = common.convertToObjectID(data._id);
            data._id = filterData._id;
            db.modifyDocument(config.get('mongodb.database.db.collection.customer'),filterData, data).then((resp) => {
                resolved(resp.insertedIds)
            }, (error)=> {
                console.
                reject(error)
            })
        }
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