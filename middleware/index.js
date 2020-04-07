//Helmet helps you secure your Express apps by setting various HTTP headers
var helmet = require('helmet');

module.exports = (app) => {
    app.use(helmet.frameguard()) // frameguard to prevent clickjacking
    app.use(helmet.hidePoweredBy()); // hidePoweredBy to remove the X-Powered-By header
    app.use(helmet.xssFilter()) // xssFilter adds some small XSS protection
    require('./session-mongo')(app);
    require('./passport')(app);
    
}