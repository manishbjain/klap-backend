const orderModel = require("./order-model");
const schemas = require('../models/schemas');
const common = require('../utils/common');
const formidable = require('formidable');
const excelToJson = require('convert-excel-to-json');
const config = require('../config');

// call model to save order
const saveOrder = (req, res) => {
	if (schemas.validate(req.body, schemas.saveOrder)) {

		orderModel.saveOrder(req.body, req.user.userName).then(function (resp) {
			res.status(200).send({
				'message': 'succuess',
				'data': resp
			})
		}, function (err) {
			return res.status(200).send({
				code: 2000,
				messageKey: err,
				data: {}
			});
		})
	} else {
		res.status(500).send({
			'message': 'missing Data',
			'data': {}
		})
	}
}

// call model to get order
const getOrders = (req, res) => {

	orderModel.getOrders().then(function (resp) {
		res.status(200).send({
			'message': 'succuess',
			'data': resp
		})
	}, function (err) {
		return res.status(200).send({
			code: 2000,
			messageKey: err,
			data: {}
		});
	})
}

// to update order call model
const updateOrder = (req, res) => {
	let data = req.body;
	if (schemas.validate(data, schemas.saveOrder)) {
		if (data._id) {
			orderModel.updateOrder(data).then((resp) => {
				res.status(200).send({
					'message': 'succuess',
					'data': resp
				})
			}, (error) => {
				return res.status(200).send({
					code: 2000,
					messageKey: error,
					data: {}
				});
			})
		}
	} else {
		res.status(500).send({
			'message': 'missing Data',
			'data': {}
		})
	}

}

// for delete order
const deleteOrders = (req, res) => {
	if (req.body._id) {
		orderModel.deleteOrders(req.body._id).then((resp) => {
			return res.status(200).send({
				code: 2000,
				data: resp
			});
		}, (error) => {
			return res.status(200).send({
				code: 2000,
				messageKey: error,
				data: {}
			});
		})
	} else {
		res.status(500).send({
			'message': 'missing Data',
			'data': {}
		})
	}
}

// save dc to db and first validate given schema
const saveDespatch = (req, res) => {
	const data = req.body;

	if (schemas.validate(data, schemas.saveDespatch)) {

		orderModel.saveDespatch(req.body).then(function (resp) {
			res.status(200).send({
				'message': 'succuess',
				'data': resp
			})
		}, function (err) {
			return res.status(200).send({
				code: 2000,
				messageKey: err,
				data: {}
			});
		})
	} else {
		res.status(500).send({
			'message': 'missing Data',
			'data': {}
		})
	}
}

// call model to get order
const getDespatch = (req, res) => {

	orderModel.getDespatch().then(function (resp) {
		res.status(200).send({
			'message': 'succuess',
			'data': resp
		})
	}, function (err) {
		return res.status(200).send({
			code: 2000,
			messageKey: err,
			data: {}
		});
	})
}

// delete dc for given id
const deleteDespatch = (req, res) => {
	if (req.body._id) {
		orderModel.deleteDespatch(req.body._id).then((resp) => {
			return res.status(200).send({
				code: 2000,
				data: resp
			});
		}, (error) => {
			return res.status(200).send({
				code: 2000,
				messageKey: error,
				data: {}
			});
		})
	} else {
		res.status(500).send({
			'message': 'missing Data',
			'data': {}
		})
	}
}

// save slip 
const saveSlip = (req, res) => {
	if (schemas.validate(req.body, schemas.saveSlip)) {

		orderModel.saveSlip(req.body, req.user.userName).then(function (resp) {
			res.status(200).send({
				'message': 'succuess',
				'data': resp
			})
		}, function (err) {
			return res.status(200).send({
				code: 2000,
				messageKey: err,
				data: {}
			});
		})
	} else {
		res.status(500).send({
			'message': 'missing Data',
			'data': {}
		})
	}
}

// call model to get order
const getSlip = (req, res) => {

	orderModel.getSlip().then(function (resp) {
		res.status(200).send({
			'message': 'succuess',
			'data': resp
		})
	}, function (err) {
		return res.status(200).send({
			code: 2000,
			messageKey: err,
			data: {}
		});
	})
}

// for delete slip
const deleteSlip = (req, res) => {
	if (req.body._id) {
		orderModel.deleteSlip(req.body._id).then((resp) => {
			return res.status(200).send({
				code: 2000,
				data: resp
			});
		}, (error) => {
			return res.status(200).send({
				code: 2000,
				messageKey: error,
				data: {}
			});
		})
	} else {
		res.status(500).send({
			'message': 'missing Data',
			'data': {}
		})
	}
}

// type checker like some filelds is number so transfer string to number
const typeChecker = (key, value) => {
	if(key === 'oldOrderId' || key == 'productionQty' || key == 'productionWastage') {
		if(value) {
			return value.toString();
		} else {
			return '';
		}
	}
	if(key === 'finalSizeH') {
		if(value) {
			return  parseInt(value);
		} else {
			return undefined;
		}
		
	}
	if(key === 'isHardCopy') {
		if(value) {
			return  true;
		} else {
			return false;
		}
	}

	if(key === 'isProductSamples') {
		if(value) {
			return  true;
		} else {
			return false;
		}
	}

	if(!value || value === null) {
		return undefined;
	} else {
		return value;
	}
}

// read data from excel based on type and convert into json
const excelToData = (req, res) => {
	const type = req.body.type;
	let path; 
	
	if (type === 'dc') {
		path = "C:/Users/ADMIN/Downloads/despatch_t.xlsx"
	} else if(type === 'slip') {
		path = "C:/Users/ADMIN/Downloads/slip_t.xlsx"
	} else {
		path = '/home/asrar.memon/Downloads/order-1.xlsx';
	}
	const result = excelToJson({
		sourceFile: path
	});

	if (result && result['Sheet1']) {
		const data = []
		for (let i = 1; i < result['Sheet1'].length; i++) {
			const configForOrder = config.get(type);
			for (var key in configForOrder) {
				if (typeof configForOrder[key] !== 'string') {
					for (var childobj of configForOrder[key]) {
						for (var childKey in childobj) {
							childobj[childKey] = typeChecker(childKey, result['Sheet1'][i][childobj[childKey].toUpperCase()])
							if(childobj[childKey] === undefined) {
								delete childobj[childKey];
							}
						}
					}
				} else {
					configForOrder[key] = typeChecker(key, result['Sheet1'][i][configForOrder[key].toUpperCase()])
					if(configForOrder[key] === undefined) {
						delete configForOrder[key]
					}
				}
			}
			data.push(configForOrder)
		}
		if(type === 'order') {
			orderModel.importData(data).then(res => {

			}, error => {
	
			})
		} else if(type === 'slip') {
			console.log(JSON.stringify(data));
		} else {
			orderModel.importDC(data).then(res => {

			}, error => {

			})
		}
	}

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
	excelToData: excelToData
}