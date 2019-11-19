const http = require("http");
const express = require('express');
const app = express();
const config = require("./config")
const router = require("./routes/index.js")
const bodyParser = require("body-parser");
app.set('port', config.get('server.port'))

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
// Enable Body Parser
app.use(bodyParser.json({
    limit : '100kb'
}))

router(app);
var server = http.createServer(app).listen(app.get('port'), function(){
	console.log(app.get('port'));
})