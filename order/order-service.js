const orderModel = require("./order-model");
const schemas = require('../models/schemas');

const saveOrder = (req, res) => {
	if (schemas.validate(req.body, schemas.saveOrder)) {
		orderModel.saveOrder(req.body).then(function (resp) {
			res.status(500).send({
				'message': 'succuess',
				'data': resp
			})
		}, function (err) { })
	} else {
		res.status(500).send({
			'message': 'missing Data',
			'data': {}
		})
	}
}

const getOrders = (req, res) => {

	orderModel.getOrders().then(function (resp) {
		res.status(500).send({
			'message': 'succuess',
			'data': resp
		})
	}, function (err) { })
}

module.exports = {
	saveOrder: saveOrder,
	getOrders: getOrders
}