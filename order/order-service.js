const orderModel = require("./order-model");
const schemas = require('../models/schemas');

// call model to save order
const saveOrder = (req, res) => {
	if (schemas.validate(req.body, schemas.saveOrder)) {
		orderModel.saveOrder(req.body).then(function (resp) {
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
	if (schemas.validate(req.body, schemas.saveOrder)) { 
		orderModel.updateOrder(req.body).then((resp) => {
			res.status(500).send({
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
		res.status(500).send({
			'message': 'missing Data',
			'data': {}
		})
	}
	
}

module.exports = {
	saveOrder: saveOrder,
	getOrders: getOrders,
	updateOrder: updateOrder
}