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
	if(req.body._id) {
		orderModel.deleteOrders(req.body._id).then((resp)=> {
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
const updateFile = (req,res) => {
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
	if(req.body._id) {
		orderModel.deleteDespatch(req.body._id).then((resp)=> {
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
module.exports = {
	saveOrder: saveOrder,
	getOrders: getOrders,
	updateOrder: updateOrder,
	updateFile: updateFile,
	deleteOrders: deleteOrders,
	saveDespatch: saveDespatch,
	getDespatch: getDespatch,
	deleteDespatch: deleteDespatch
}