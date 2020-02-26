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
            if(!data.createdBy) {
                data.createdBy = userName;
            }
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
    return new Promise((resolved, reject) => {
        const filterData = {};
        filterData._id = common.convertToObjectID(id);
        db.getDocument(config.get("mongodb.database.db.collection.despatchDetail"), filterData).then((resp)  => {
            if (resp && resp.length > 0) {
                const data = resp[0];
                data.isDeleted = true;
                db.modifyDocument(config.get("mongodb.database.db.collection.despatchDetail"), filterData, data).then((orderDetail) => {
                    resolved(true);  
                },
                (err) =>{
                    reject(err);
                }) 
            } else {
                reject(false);
            } 
		}, (err) => {
            reject(err);
			deffered.reject(err);
		});
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
    return new Promise((resolved, reject) => {
        const filterData = {};
        filterData._id = common.convertToObjectID(id);
        db.getDocument(config.get("mongodb.database.db.collection.slipDetail"), filterData).then((resp)  => {
            if (resp && resp.length > 0) {
                const data = resp[0];
                data.isDeleted = true;
                db.modifyDocument(config.get("mongodb.database.db.collection.slipDetail"), filterData, data).then((orderDetail) => {
                    resolved(true);  
                },
                (err) =>{
                    reject(err);
                }) 
            } else {
                reject(false);
            } 
		}, (err) => {
            reject(err);
			deffered.reject(err);
		});
    })
}
const insetToDb = (orderData, customerData) => {
    return new Promise((resolved, reject) => {
        if(orderData) {
            const order = orderData.pop();
            if (order) {
                order.material = order.displayMaterial
                order.lamination = order.displayLamination
                order.coating = order.displayCoating
                order.emboss = order.displayEmboss
                order.foil = order.displayFoil
                order.rEmboss = order.displayREmboss

                if(order.size && order.size.indexOf('*') > -1) {
                    const sizeLBH = order.size.split('*');
                    order.sizeL = parseInt(sizeLBH[0]) ;
                    if(sizeLBH[1] && sizeLBH[1].indexOf(' ') > -1){
                        const sizeBUnit = sizeLBH[1].split(' ');
                        order.sizeB = parseInt(sizeBUnit[0])
                        order.sizeUnit = sizeBUnit[1]
                    } else {
                        order.sizeB = sizeLBH[1];
                    }
                    if(sizeLBH[2] && sizeLBH[2].indexOf(' ') > -1){
                        const sizeHUnit = sizeLBH[2].split(' ');
                        order.sizeH = parseInt(sizeHUnit[0])
                        order.sizeUnit = sizeHUnit[1]
                    } else if (sizeLBH[2]){
                        order.sizeH = sizeLBH[2];
                    }
                }

                const customer = customerData.find(obj =>  obj.cId === order.customerId);
                if(customer) {
                    order.customerId = customer._id.toString();
                    for(const location of order.deliveryDetails) {
                        const selectdLocation = customer.deliveryLocations.find(dLocation => dLocation.locationName === location.locationId)
                        if (selectdLocation) {
                            location.locationId = selectdLocation.id;
                        }
                    }

                    const selectdLedgers = customer.ledgers.find(dLocation => dLocation.name === order.customerLedger)
                        if (selectdLedgers) {
                            order.customerLedger = selectdLedgers.id;
                        }
                }
                saveOrder(order, customerData).then(res => {
                    insetToDb(orderData, customerData)
                }, error => {

                })
            } else {
                resolved(true)
            }
        } else {
            resolved(true)
        }
        
    })
    
}

const importData = (data) => {
    return new Promise((resolved, reject) => {
        db.getDocument(config.get('mongodb.database.db.collection.customer')).then((resp) => {
            insetToDb(data, resp);
        }, (error)=> {
            reject(error)
        })
    });
}

const importDcToDb = (data, customers, orders) => {
    return new Promise((resolved, reject) => {
        if(data && data.length > 0) {
            const dc = data.pop();
            if (dc.pcustomerId) {
                const customerId = dc.pcustomerId.split('/')[0];
                const selectedCustomer = customers.find(customer => customer.cId == customerId);
                if (selectedCustomer) {
                    dc.pcustomerId = selectedCustomer._id;
                }
                if (customers.deliveryLocations && customers.deliveryLocations.length > 0) {
                    customers.deliveryLocations.find(loc => loc.locationName === dc.dLocation)
                }
                if (dc.packingDetails && dc.packingDetails.length > 0) {
                    for (const packages of dc.packingDetails) {
                        if (packages.pOrderId) {
                            const selectedOrder = orders.find(order => order.orderId == packages.pOrderId);
                            if (selectedOrder) {
                                packages.pOrderId = selectedOrder._id;
                            }
                        }
                        if(packages.pPackingDetail) {
                            const packInfo = packages.pPackingDetail.split(',');
                            if (packInfo && packInfo.length > 0) {
                                packages.packingDetailForDc = [];
                                for (const qtySent of packInfo) {
                                    const index = qtySent.lastIndexOf('*')
                                    if(index > -1) {
                                       const sentP = qtySent.substring(index + 1);
                                       const lsInfo = qtySent.substring(0, index - 1);
                                       packages.packingDetailForDc.push({qtyForSend: sentP, lsInfo: lsInfo})
                                    }
                                }

                            }
                        }
                        delete packages.pPackingDetail;
                    }
                }
                importDcToDb(data, customers, orders).then(res => {
                    resolved(true);
                }, error => {
                    resolved(true);
                });
            }
        } else {
            resolved(true);
        }
    })
}

const importDC = (data) => {
    return new Promise((resolved, reject) => {
        console.log('111111eeeeeeeeeeeee') 
        db.getDocument(config.get('mongodb.database.db.collection.customer')).then((customers) => {
            console.log(customers);
            db.getDocument(config.get('mongodb.database.db.collection.orderDetail')).then((orders) => {
                console.log('eeeeeeeeeeeee') 
                importDcToDb(data, customers, orders);
            }, (error) => {
                console.log(error) 
            })
            
        }, (error)=> {
            console.log(error) 
            reject(error)
        })
    });
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
    deleteSlip: deleteSlip,
    importData: importData,
    importDC: importDC
}