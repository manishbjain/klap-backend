var helmet = require('helmet');
module.exports = (app) => {
    app.use(helmet.frameguard())
    app.use(helmet.hidePoweredBy());
    // app.use(helmet.cacheControl())
    // app.use(helmet.csp())
    app.use(helmet.xssFilter())
    // app.use(helmet.contentTypeOptions());
    require('./session-mongo')(app);
    require('./passport')(app);
  //  require('./csrf')(app);
    
}