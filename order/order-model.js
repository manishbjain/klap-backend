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
            if(!data.createdBy) {
                data.createdBy = userName;
            }
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
        const filterData = {};
        filterData._id = common.convertToObjectID(id);
        db.getDocument(config.get("mongodb.database.db.collection.orderDetail"), filterData).then((resp)  => {
            if (resp && resp.length > 0) {
                const data = resp[0];
                data.isDeleted = true;
                db.modifyDocument(config.get("mongodb.database.db.collection.orderDetail"), filterData, data).then((orderDetail) => {
                    console.log('1111');
                    resolved(true);  
                },
                (err) =>{
                    console.log('111122');
                    reject(err);
                }) 
            } else {
                reject(false);
            } 
		}, (err) => {
            reject(err);
            console.log(err)
			deffered.reject(err);
		});

        //  db.deleteDocument(config.get("mongodb.database.db.collection.orderDetail"), id).then((resp) => {
        //     resolved(resp)
        //  }, (error) => {
        //     resolved(error)
        //  })

    })
}

const addDCOrder = (orderIds, dcId) => {
    if(orderIds && orderIds.length > 0) {
        let id = orderIds.pop()
        const filterData = {};
        filterData._id = common.convertToObjectID(id);
        db.getDocument(config.get("mongodb.database.db.collection.orderDetail"), filterData).then((resp)  => {
            if (resp && resp.length > 0) {
                const data = resp[0];
                if(data.dcIds && data.dcIds.length > 0) {
                    console.log(data.dcIds);
                    console.log(data.dcIds.indexOf(dcId.toString()))
                    console.log(dcId);
                    if(data.dcIds.indexOf(dcId.toString()) === -1) {
                        let idx = dcId.toString()
                        data.dcIds.push(idx)
                    }
                } else {
                    let idx = dcId.toString()
                    data.dcIds = [idx];
                }
                
                db.modifyDocument(config.get("mongodb.database.db.collection.orderDetail"), filterData, data).then((orderDetail) => {
                    addDCOrder(orderIds, dcId)
                    // resolved(true);  
                },
                (err) =>{
                    reject(err);
                }) 
            } else {
                reject(false);
            }
        })    
    } else {
        resolved(true);
    }
}

const saveDespatch = (data, userName) => {
    return new Promise((resolved, reject) =>{
        const filterData = {};
        if(data._id) {
            filterData._id = common.convertToObjectID(data._id);
            data._id = filterData._id;
            if(!data.createdBy) {
                data.createdBy = userName;
            }
            db.modifyDocument(config.get("mongodb.database.db.collection.despatchDetail"), filterData, data).then((orderDetail) => {
                // const orders = []
                // for (const obj of data.packingDetails) {
                //     if(obj.pOrderId) {
                //         orders.push(obj.pOrderId)
                //     }
                //   }
                // addDCOrder(orders, data._id)
                resolved(true);  
            },
            (err) =>{
                reject(err);
            })
        } else {
            data.createdBy = userName;
            db.addDocuments(config.get("mongodb.database.db.collection.despatchDetail"), data).then((resp) => {  
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
const getDespatch = (data) => {
    return new Promise((resolved, reject) =>{
        console.log(config.get("mongodb.database.db.collection.despatchDetail"))
        db.getDocument(config.get("mongodb.database.db.collection.despatchDetail"), {}).then((resp)  => {
            console.log(resp);
            resolved(resp)
		}, (err) => {
            reject(err);
            console.log(err)
			deffered.reject(err);
		});
    })
}
const deleteDespatch = (id) => {
    return new Promise((resolved, reject) =>{
        db.deleteDocument(config.get('mongodb.database.db.collection.despatchDetail'), id).then((resp) => {
            resolved(resp)
        }, (error)=> {
            reject(error)
        })
    })
}


const saveSlip = (data, userName) => {
    return new Promise((resolved, reject) =>{
        const filterData = {};
        if(data._id) {
            filterData._id = common.convertToObjectID(data._id);
            data._id = filterData._id;
            if(!data.createdBy) {
                data.createdBy = userName;
            }
            db.modifyDocument(config.get("mongodb.database.db.collection.slipDetail"), filterData, data).then((orderDetail) => {
                // const orders = []
                // for (const obj of data.packingDetails) {
                //     if(obj.pOrderId) {
                //         orders.push(obj.pOrderId)
                //     }
                //   }
                // addDCOrder(orders, data._id)
                resolved(true);  
            },
            (err) =>{
                reject(err);
            })
        } else {
            data.createdBy = userName;
            db.addDocuments(config.get("mongodb.database.db.collection.slipDetail"), data).then((resp) => {  
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
const getSlip = (data) => {
    return new Promise((resolved, reject) =>{
        db.getDocument(config.get("mongodb.database.db.collection.slipDetail"), {}).then((resp)  => {
            console.log(resp);
            resolved(resp)
		}, (err) => {
            reject(err);
            console.log(err)
			deffered.reject(err);
		});
    })
}
const deleteSlip = (id) => {
    return new Promise((resolved, reject) =>{
        db.deleteDocument(config.get('mongodb.database.db.collection.slipDetail'), id).then((resp) => {
            resolved(resp)
        }, (error)=> {
            reject(error)
        })
    })
}
module.exports = {
    saveOrder: saveOrder,
    getOrders: getOrders,
    updateOrder: updateOrder,
    deleteOrders: deleteOrders,
    saveDespatch: saveDespatch,
    getDespatch: getDespatch,
    deleteDespatch: deleteDespatch,
    saveSlip: saveSlip,
	getSlip: getSlip,
	deleteSlip: deleteSlip
}