const orderModel = require("./customer-model");
const schemas = require('../models/schemas');

// save cutomer detail
const saveCustomerDetail = (req, res) => {
	if (schemas.validate(req.body, schemas.saveCustomerDetail)) {
		orderModel.saveCustomerDetail(req.body).then((resp) => {
			res.status(500).send({
				'message': 'succuess',
				'data': resp
			})
		}, (err) => {
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

// get cutomer detail
const getCustomers = (req, res) => {
	orderModel.getCustomers().then((resp) => {
		res.status(500).send({
			'message': 'succuess',
			'data': resp
		})
	}, (err) => {
        return res.status(200).send({
            code: 2000,
            messageKey: err,
            data: {}
        });
     })
}

module.exports = {
	saveCustomerDetail: saveCustomerDetail,
	getCustomers: getCustomers
}