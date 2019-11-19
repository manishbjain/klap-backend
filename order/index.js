const orderService = require("./order-service");

module.exports = (app) => {
    app.use('/order/saveOrder', orderService.saveOrder)
    app.use('/order/getOrders', orderService.getOrders)
    app.use('/order/updateOrder', orderService.updateOrder)
}