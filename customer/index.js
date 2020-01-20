const customerService = require("./customer-service");

module.exports = (app) => {
    app.use('/customer/saveCustomer', customerService.saveCustomerDetail)
    app.use('/customer/getCustomer', customerService.getCustomers)
    app.use('/customer/deleteCustomer', customerService.deleteCustomer)

    app.use('/customer/customerexcelToData', customerService.excelToData);
}