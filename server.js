
const http = require("http");
const express = require('express');
var compression = require('compression')

const app = express();
const config = require("./config")
const router = require("./routes/index")
const middleware = require("./middleware/index")
const bodyParser = require("body-parser");
app.set('port', config.get('server.port'))

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://klaperp-e72e9.firebaseapp.com');

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
app.use(compression())

// Enable request body parsing
app.use(bodyParser.urlencoded({
    extended : true,
    limit : '100kb'
}));

// Enable Body Parser
app.use(bodyParser.json({
    limit : '100kb'
}))

app.options('*', function(req, res) {
    res.status(200).end();
});
middleware(app)
router(app);
var server = http.createServer(app).listen(process.env.PORT || 3010, function(){
	console.log(app.get('port'));
})