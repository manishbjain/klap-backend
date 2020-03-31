var helmet = require('helmet');
module.exports = (app) => {
    app.use(helmet.frameguard())
    app.use(helmet.hidePoweredBy());
    app.use(helmet.xssFilter())
    require('./session-mongo')(app);
    require('./passport')(app);
    
}