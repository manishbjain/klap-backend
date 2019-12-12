module.exports = (app) => {
    require("../authentication/index")(app);
    require("../order/index")(app);
    require("../customer/index")(app);
}