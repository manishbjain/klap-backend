const Validator = require('jsonschema').Validator
const _validator = new Validator();

const schemas = () => {

}

schemas.packingDetailsForDC = {
    'id': '/packingDetailsForDC',
    'type':'object',
    'properties': {
        'labels': {
            'type': 'number',
            'required': false
        }, 
        'sheets': {
            'type': 'number',
            'required': false
        },
        'sheetInfo': {
            'type': 'string',
            'required': false
        }, 
        'noOfpackets': {
            'type': 'number',
            'required': false
        },
        'dateOfPacking': {
            'type': 'string',
            'required': false
        },
        'qtyForSend': {
            'type': 'number',
            'required': false
        }
    }
}

// schema of order despatch Detail
schemas.orderDespatchDetail = {
    'id': '/orderDespatchDetail',
    'type':'object',
    'properties': {
        'dcID': {
            'type': 'string',
            'required': false
        }, 
        'dcDate':{
			'type': 'string',
			'required': false
        },
        'partyName':{
            'type': 'string',
			'required': false
        },
        'itemName': {
            'type': 'string',
			'required': false
        },
        'itemSize': {
            'type': 'string',
			'required': false
        },
        'deliveryLocation':{
			'type': 'string',
			'required': false
        },
        'packingDetailForDC': {
            'type': 'array',
            'items':{
				'$ref':'/packingDetailsForDC'
			},
			'required': false
        },
        'locationId': {
            'type': 'string',
			'required': false
        },
        'totalLables': {
            'type': 'number',
			'required': false
        },
        'imageDC': {
            'type': 'string',
			'required': false
        }
    }
}

// schema of order delivery detail
schemas.orderDeliveryDetails = {
     'id': '/orderDeliveryDetails',
     'type':'object',
     'properties': { 
        'quantity':{
			'type': 'number',
			'required': false
        },
        'locationId':{
			'type': 'string',
			'required': false
        },
        'comments': {
            'type': 'string',
            'required': false
        }
    }    
}
schemas.packingDetailForDc = {
    'id': '/packingDetailForDc',
    'type': ['object', 'null'],
    'properties': {
        'lsInfo': {
            'type': 'string',
			'required': false
        },
        'qtyForSend': {
            'type': 'number',
			'required': false
        }
    }
}
schemas.packingDetails = {
    'id': '/packingDetails',
    'type': ['Array'],
    'properties': {
        'pOrderId': {
            'type': 'string',
			'required': false
        },
        'pItemDes': {
            'type': 'string',
			'required': false
        },
        'ptotalQty': {
            'type': 'number',
			'required': false
        },
        'packingDetailForDc': {
            'type': 'array',
            'items':{
				'$ref':'/packingDetailForDc'
			},
			'required': false
        }
    }
}

schemas.saveDespatch = {
    'id': '/saveDespatch',
    'type': ['object', 'null'],
    'properties': {
        '_id': {
            'type': 'string',
			'required': false
        },
        'dcID': {
			'type': 'string',
			'required': false
        },
        'dcDate': {
			'type': 'string',
			'required': false
        },
        'pcustomerId': {
			'type': 'string',
			'required': false
        },
        'packingDetails': {
            'type': 'array',
        '$ref':'/packingDetails',
			'required': false
        },
        'dLocation': {
			'type': 'string',
			'required': false
        },
        'nOfCartons': {
			'type': 'number',
			'required': false
        },
        'cartonId': {
			'type': 'string',
			'required': false
        },
        'pDesStatus': {
			'type': 'string',
			'required': false
        },
        'pDesDate': {
			'type': 'string',
			'required': false
        },
        'pDelStatus': {
			'type': 'string',
			'required': false
        },
        'pSlip': {
			'type': 'string',
			'required': false
        }
    }
}

// schema for save order detail
schemas.saveOrder = {
    'id': '/saveOrder',
    'type': ['object', 'null'],
    'properties': {
        '_id': {
            'type': 'string',
			'required': false
        },
        'orderId': {
			'type': 'string',
			'required': false
        },
        'orderDate': {
			'type': 'string',
			'required': false
        },
        'customerId': {
			'type': 'string',
			'required': false
        },
        'createdBy': {
            'type': 'string',
			'required': false
        },
        'dcIds': {
            'type': 'array',
			'required': false
        },
        'slipIds': {
            'type': 'array',
			'required': false
        },
        'salesPerson': {
            'type': 'string',
			'required': false
        },
        'createdBy': {
            'type': 'string',
			'required': false
        },
        'changes': {
            'type': 'string',
			'required': false
        },
        'oldOrderId': {
            'type': 'string',
			'required': false
        },
        'itemCategory': {
            'type': 'string',
			'required': false
        },
        'itemDescription': {
            'type': 'string',
			'required': false
        },
        'quantity': {
            'type': 'number',
			'required': false
        },
        'quantityUnits': {
            'type': 'string',
			'required': false
        },
        'sizeRef': {
            'type': 'string',
			'required': false
        },
        'sizeL': {
            'type': 'number',
			'required': false
        },
        'sizeB': {
            'type': 'number',
			'required': false
        },
        'sizeH': {
            'type': 'number',
			'required': false
        },
        'sizeUnit': {
            'type': 'string',
			'required': false
        },
        'designRef': {
            'type': 'string',
			'required': false
        },
        'designDes': {
            'type': 'string',
			'required': false
        },
        'colourRef': {
            'type': 'string',
			'required': false
        },
        'colourDes': {
            'type': 'string',
			'required': false
        },
        'partyRef': {
            'type': 'array',
			'required': false
        },
        'isHardCopy': {
            'type': 'boolean',
			'required': false
        },
        'isProductSamples': {
            'type': 'boolean',
			'required': false
        },
        'moreInfo': {
            'type': 'string',
			'required': false
        },
        'material': {
            'type': 'string',
			'required': false
        },
        'lamination': {
            'type': 'string',
			'required': false
        },
        'coating': {
            'type': 'string',
			'required': false
        },
        'emboss': {
            'type': 'string',
			'required': false
        },
        'foil': {
            'type': 'string',
			'required': false
        },
        'rEmboss': {
            'type': 'string',
			'required': false
        },
        'ledger': {
            'type': 'string',
			'required': false
        },
        'bilType': {
            'type': 'string',
			'required': false
        },
        'price': {
            'type': 'number',
			'required': false
        },
        'comments': {
            'type': 'string',
			'required': false
        },
        'deliveryDetails': {
            'type': 'array',
            'items':{
				'$ref':'/orderDeliveryDetails'
			},
			'required': false
        },
        'stage': {
            'type': 'string',
			'required': false
        },
        'process': {
            'type': 'string',
			'required': false
        },
        'vendor': {
            'type': 'string',
			'required': false
        },
        'date': {
            'type': 'string',
			'required': false
        },
        'jobId': {
            'type': 'string',
			'required': false
        },
        'jobName': {
            'type': 'string',
			'required': false
        },
        'jobDate': {
            'type': 'string',
			'required': false
        },
        'finalImg': {
            'type': 'string',
			'required': false
        },
        'jobType': {
            'type': 'string',
			'required': false
        },
        'jobImg': {
            'type': 'string',
			'required': false
        },
        'finalSizeL': {
            'type': 'number',
			'required': false
        },
        'finalSizeB': {
            'type': 'number',
			'required': false
        },
        'finalSizeH': {
            'type': 'number',
			'required': false
        },
        'finalUnit': {
            'type': 'string',
			'required': false
        },
        'finalMaterial': {
            'type': 'string',
			'required': false
        },
        'finalLamination': {
            'type': 'string',
			'required': false
        },
        'finalCoating': {
            'type': 'string',
			'required': false
        },
        'finalEmboss': {
            'type': 'string',
			'required': false
        },
        'finalFoil': {
            'type': 'string',
			'required': false
        },
        'finalREmboss': {
            'type': 'string',
			'required': false
        },
        'displayMaterial': {
            'type': 'string',
			'required': false
        },
        'displayLamination': {
            'type': 'string',
			'required': false
        },
        'displayCoating': {
            'type': 'string',
			'required': false
        },
        'displayEmboss': {
            'type': 'string',
			'required': false
        },
        'displayFoil': {
            'type': 'string',
			'required': false
        },
        'displayREmboss': {
            'type': 'string',
			'required': false
        },
        'noOfBlocks': {
            'type': 'number',
			'required': false
        },
        'noOfUps': {
            'type': 'number',
			'required': false
        },
        'nofOfSheets': {
            'type': 'number',
			'required': false
        },
        'totalQty': {
            'type': 'number',
			'required': false
        },
        'packing': {
            'type': 'array',
            'items':{
				'$ref':'/orderPackingDetail'
			},
			'required': false
        },
        'packingAddInfo': {
            'type': 'string',
            'required': false
        },
        'despatch': {
            'type': 'array',
            'items':{
				'$ref':'/orderDespatchDetail'
			},
			'required': false
        },
        'pPrinter': {
            'type': 'string',
			'required': false
        },
        'productionDate': {
            'type': 'string',
			'required': false
        },
        'productionQty': {
            'type': 'string',
			'required': false
        },
        'productionWastage': {
            'type': 'string',
			'required': false
        },
        'pDesErr': {
            'type': 'string',
			'required': false
        },
        'customerLedger': {
            'type': 'string',
			'required': false
        },
        'reference1': {
            'type': 'string',
			'required': false
        },
        'reference2': {
            'type': 'string',
			'required': false
        },
        'reference3': {
            'type': 'string',
			'required': false
        },
        'reference4': {
            'type': 'string',
			'required': false
        },
        'finalImage': {
            'type': 'string',
			'required': false
        },
        'jobImage': {
            'type': 'string',
			'required': false
        }
    }   
}

// schema for order packing detail
schemas.orderPackingDetail = {
    'id': '/orderPackingDetail',
    'type':'object',
    'properties': { 
        'dateOfPacking':{
			'type': 'string',
			'required': false
        },
        'noOfpackets': {
            'type': 'number',
			'required': false
        },
        'sheets': {
            'type': 'number',
			'required': false
        },
        'labels': {
            'type': 'number',
			'required': false
        },
        'looseSheets': {
            'type': 'number',
			'required': false
        },
        'totalLabels': {
            'type': 'number',
			'required': false
        }
    }
}

// schema for customer ledger
schemas.customerLedger = {
    'id': "/customerLedger",
    'type':'object',
    'properties': {
        'id': {
            'type': 'string',
            'required': false
        },
        'name': {
            'type': 'string',
            'required': false
        },
        'address': {
            'type': 'string',
            'required': false
        },
        'pincode': {
            'type': 'string',
            'required': false
        },
        'city': {
            'type': 'string',
            'required': false
        },
        'state': {
            'type': 'string',
            'required': false
        },
        'country': {
            'type': 'string',
            'required': false
        },
        'gstin': {
            'type': 'string',
            'required': false
        }

    }
}

// schema for customer delivery locations
schemas.customerDeliveryLocations = {
    'id' : "/customerDeliveryLocations",
    'type': 'object',
    'properties': {
        'id': {
            'type': 'string',
            'required': false
        },
        'locationName': {
            'type': 'string',
            'required': false,
        },
        'doorNo': {
            'type': 'string',
            'required': false
        },
        'streetName': {
            'type': 'string',
            'required': false
        },
        'city': {
            'type': 'string',
            'required': false
        },
        'state': {
            'type': 'string',
            'required': false
        },
        'shippingMark': {
            'type': 'string',
            'required': false
        },
        'contactNumber': {
            'type': 'string',
            'required': false
        },
        'comments': {
            'type': 'string',
            'required': false
        }
    }
}
schemas.createUser = {
    'id': "/createUser",
    "type": "object",
    "properties" : {
        "_id": {
            'type': 'string',
			'required': false
        },
        "userName": {
            'type': 'string',
			'required': true
        },
        "password": {
            'type': 'string',
			'required': true
        },
        "permission": {
            'type': 'string',
			'required': true
        }
    } 
}

schemas.customerContact = {
    'id':"/customerContact",
    'type': "object",
    "properties": {
        'id': {
            'type': 'string',
			'required': false
        },
        'contactNumber': {
            'type': 'string',
			'required': false
        },
        'contactPerson': {
            'type': 'string',
			'required': false
        },
        'email': {
            'type': 'string',
			'required': false
        }
    }
}

// schema for save customer detail
schemas.saveCustomerDetail = {
    'id':"/saveCustomerDetail",
    'type':'object',
    'properties': { 
        '_id': {
            'type': 'string',
			'required': false
        },
        'customerName':{
			'type': 'string',
			'required': false
        },
        'city': {
            'type': 'string',
            'required': false
        },
        'contact': {
            'type': 'array', 
            'items':{
				'$ref':'/customerContact'
            },
            'required': false
        },
        'ledgers': {
            'type': 'array', 
            'items':{
				'$ref':'/customerLedger'
            },
            'required': false
        },
        'deliveryLocations': {
            'type': 'array',
            'items': {
                '$ref':'customerDeliveryLocations'
            },
            'required': false
        }
    }
}
_validator.addSchema(schemas.customerContact, '/customerContact'); 
_validator.addSchema(schemas.orderPackingDetail, '/orderPackingDetail');
_validator.addSchema(schemas.orderDespatchDetail, '/orderDespatchDetail');
_validator.addSchema(schemas.orderDeliveryDetails, '/orderDeliveryDetails');
_validator.addSchema(schemas.customerLedger,'/customerLedger');
_validator.addSchema(schemas.customerDeliveryLocations,'/cutomerDeliveryLocations');
_validator.addSchema(schemas.packingDetailsForDC,'/packingDetailsForDC');
_validator.addSchema(schemas.packingDetailForDc,'/packingDetailForDc');
_validator.addSchema(schemas.packingDetails,'/packingDetails');

schemas.validate = (obj, schema) => {
    const errors = _validator.validate(obj,schema).errors;
    console.log(errors);
    return errors.length <= 0 ? true : false;
}
module.exports = schemas;