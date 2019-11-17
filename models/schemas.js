const Validator = require('jsonschema').Validator
const _validator = new Validator();

const schemas = () => {

}

// schema of order despatch Detail
schemas.orderDespatchDetail = {
    'id': '/orderDespatchDetail',
    'type':'object',
    'properties': { 
        'dcDate':{
			'type': 'string',
			'required': false
        },
        'deliveryLocation':{
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
        'totalLables': {
            'type': 'number',
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
        }
    }    
}

// schema for save order detail
schemas.saveOrder = {
    'id': '/saveOrder',
    'type': ['object', 'null'],
    'properties': {
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
        'salesPerson': {
            'type': 'string',
			'required': false
        },
        'createdBy': {
            'type': 'string',
			'required': false
        },
        'changes': {
            'type': 'number',
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
            'type': 'number',
			'required': false
        },
        'isProductSamples': {
            'type': 'number',
			'required': false
        },
        'moreInfo': {
            'type': 'string',
			'required': false
        },
        'material': {
            'type': 'number',
			'required': false
        },
        'lamination': {
            'type': 'number',
			'required': false
        },
        'coating': {
            'type': 'number',
			'required': false
        },
        'emboss': {
            'type': 'number',
			'required': false
        },
        'foil': {
            'type': 'number',
			'required': false
        },
        'rEmboss': {
            'type': 'number',
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
            'type': 'number',
			'required': false
        },
        'process': {
            'type': 'number',
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
        'jobDate': {
            'type': 'string',
			'required': false
        },
        'finalImg': {
            'type': 'string',
			'required': false
        },
        'jobType': {
            'type': 'number',
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
            'type': 'number',
			'required': false
        },
        'finalMaterial': {
            'type': 'number',
			'required': false
        },
        'finalLamination': {
            'type': 'number',
			'required': false
        },
        'finalCoating': {
            'type': 'number',
			'required': false
        },
        'finalEmboss': {
            'type': 'number',
			'required': false
        },
        'finalFoil': {
            'type': 'number',
			'required': false
        },
        'finalREmboss': {
            'type': 'number',
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
        'despatch': {
            'type': 'array',
            'items':{
				'$ref':'/orderDespatchDetail'
			},
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
            'required': true
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
            'required': true
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
        'Comments': {
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
        'customerName':{
			'type': 'string',
			'required': false
        },
        'city': {
            'type': 'string',
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

_validator.addSchema(schemas.orderPackingDetail, '/orderPackingDetail');
_validator.addSchema(schemas.orderDespatchDetail, '/orderDespatchDetail');
_validator.addSchema(schemas.orderDeliveryDetails, '/orderDeliveryDetails');
_validator.addSchema(schemas.customerLedger,'/customerLedger');
_validator.addSchema(schemas.customerDeliveryLocations,'/cutomerDeliveryLocations');
schemas.validate = (obj, schema) => {
    const errors = _validator.validate(obj,schema).errors;
	return errors.length <= 0 ? true : false;
}
module.exports = schemas;