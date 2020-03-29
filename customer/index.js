const customerService = require("./customer-service");

module.exports = (app) => {
    //save customer
    app.use('/customer/saveCustomer', customerService.saveCustomerDetail)
    // get customer list
    app.use('/customer/getCustomer', customerService.getCustomers)
    // delete customer object from db
    app.use('/customer/deleteCustomer', customerService.deleteCustomer)
    // get data from xls and put into a db
    app.use('/customer/customerexcelToData', customerService.excelToData);
}