const customerModel = require("./customer-model");
const schemas = require('../models/schemas');
const config = require('../config');
const excelToJson = require('convert-excel-to-json');

// save cutomer detail
const saveCustomerDetail = (req, res) => {
	if (schemas.validate(req.body, schemas.saveCustomerDetail)) {
		customerModel.saveCustomerDetail(req.body).then((resp) => {
			res.status(200).send({
				'message': 'succuess',
				'data': resp
			})
		}, (err) => {
            return res.status(500).send({
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
	customerModel.getCustomers().then((resp) => {
		res.status(200).send({
			'message': 'succuess',
			'data': resp
		})
	}, (err) => {
        return res.status(500).send({
            code: 2000,
            messageKey: err,
            data: {}
        });
     })
}

// delete customer
const deleteCustomer = (req, res) => {
	if(req.body._id) {
		customerModel.deleteCustomer(req.body._id).then((resp) => {
			res.status(200).send({
				'message': 'succuess',
				'data': resp
			})
		}, (err) => {
			return res.status(500).send({
				code: 2000,
				messageKey: err,
				data: {}
			});
		 })
	}
}

const excelToData = () => {
	const result = excelToJson({
		sourceFile: "C:/Users/ADMIN/Downloads/customer_t.xlsx"
	});

	if (result && result['ag-grid']) {
		const data = []
		for (let i = 1; i < result['ag-grid'].length; i++) {
			const configForOrder = config.get("customer");
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
		console.log(data)
		// orderModel.importData(data).then(res => {

		// }, error => {

		// })
	}

}

module.exports = {
	saveCustomerDetail: saveCustomerDetail,
	getCustomers: getCustomers,
	deleteCustomer: deleteCustomer,
	excelToData : excelToData
}