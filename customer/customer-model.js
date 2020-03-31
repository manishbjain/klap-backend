const db = require('../utils/mongo-db')
const config = require('../config')
const common = require('../utils/common');

// save customer Detail
const saveCustomerDetail = (data, isExcelImport) => {
    return new Promise((resolved, reject) =>{
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
            const filterData = {};
            filterData._id = common.convertToObjectID(data._id);
            data._id = filterData._id;
            if(isExcelImport === true) {
                db.addDocuments(config.get('mongodb.database.db.collection.customer'), data).then((resp) => {
                    resolved(resp.insertedIds)
                }, (error)=> {
                    console.log(error);
                    reject(error)
                })
            } else {
                db.modifyDocument(config.get('mongodb.database.db.collection.customer'),filterData, data).then((resp) => {
                    resolved(resp.insertedIds)
                }, (error)=> {
                    console.log(error);
                    reject(error)
                })
            }
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

// for delete customer
const deleteCustomer = (id) => {
    return new Promise((resolved, reject) =>{
        db.deleteDocument(config.get('mongodb.database.db.collection.customer'), id).then((resp) => {
            resolved(resp)
        }, (error)=> {
            reject(error)
        })
    })
}

// import customer xsl into data base
const excelImport = (data) => {
    return new Promise((resolved, reject) => {
        if (data && data.length > 0) {
            const uuid = db.generateUUID();
            const  customer =  data.pop();
            customer._id = uuid;
            saveCustomerDetail(customer, true).then(res => {
                excelImport(data).then((res) => {
                    resolved(true)
                }, (error) => {
                    resolved(true)
                })
            }, error => {
                excelImport(data).then((res) => {
                    resolved(true)
                }, (error) => {
                    resolved(true)        
                })
            });
        } else {
            resolved(true)
        }
        
    })
}

module.exports = {
    saveCustomerDetail: saveCustomerDetail,
    getCustomers: getCustomers,
    deleteCustomer: deleteCustomer,
    excelImport: excelImport
}