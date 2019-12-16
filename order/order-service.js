const orderModel = require("./order-model");
const schemas = require('../models/schemas');
const common = require('../utils/common');
const formidable = require('formidable');

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
	
	data = common.sanitize(data, schemas.saveOrder);
	console.log(data);
	if (schemas.validate(data, schemas.saveOrder)) {
		if(data._id) {
			orderModel.updateOrder(data).then((resp) => {
				res.status(200).send({
					'message': 'succuess',
					'data': resp
				})
			}, (error) => {
				return res.status(200).send({
					code: 2000,
					messageKey: err,
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
const updateFile = (req,res) => {
    res.write('File uploaded');
		res.end();
  
} 
module.exports = {
	saveOrder: saveOrder,
	getOrders: getOrders,
	updateOrder: updateOrder,
	updateFile: updateFile
}