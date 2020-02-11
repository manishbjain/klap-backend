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
	console.log(data);
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
		} else {
			// res.status(200).send({
			// 	'message': 'succuess',
			// 	'data': []
			// })
		}
	} else {
		res.status(500).send({
			'message': 'missing Data',
			'data': {}
		})
	}

}

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
const updateFile = (req, res) => {
	res.write('File uploaded');
	res.end();
}
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

const excelToData = (req, res) => {
	const type = req.body.type;
	let path; 
	console.log(req.body);
	if (type === 'dc') {
		path = "C:/Users/ADMIN/Downloads/despatch_t.xlsx"
	} else if(type === 'slip') {
		path = "C:/Users/ADMIN/Downloads/slip_t.xlsx"
	} else {
		path = '/home/asrar.memon/Downloads/order.xlsx';
	}
	console.log(path);
	const result = excelToJson({
		sourceFile: path
	});

	if (result && result['ag-grid']) {
		const data = []
		for (let i = 1; i < result['ag-grid'].length; i++) {
			const configForOrder = config.get(type);
			for (var key in configForOrder) {
				if (typeof configForOrder[key] !== 'string') {
					for (var childobj of configForOrder[key]) {
						for (var childKey in childobj) {
							childobj[childKey] = result['ag-grid'][i][childobj[childKey].toUpperCase()]
						}
					}
				} else {
					configForOrder[key] = result['ag-grid'][i][configForOrder[key].toUpperCase()]
				}
			}
			data.push(configForOrder)
			// console.log(result['ag-grid'][i]);
			// console.log(config.get("order"));
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
	updateFile: updateFile,
	deleteOrders: deleteOrders,
	saveDespatch: saveDespatch,
	getDespatch: getDespatch,
	deleteDespatch: deleteDespatch,
	saveSlip: saveSlip,
	getSlip: getSlip,
	deleteSlip: deleteSlip,
	excelToData: excelToData
}