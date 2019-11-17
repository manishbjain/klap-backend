module.exports = (app) => {
    require("../order/index")(app);
    require("../customer/index")(app);
}