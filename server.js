const http = require("http");
const express = require('express');
const app = express();
const config = require("./config")
const router = require("./routes/index.js")
const bodyParser = require("body-parser");
app.set('port', config.get('server.port'))

// Enable Body Parser
app.use(bodyParser.json({
    limit : '100kb'
}))

router(app);
var server = http.createServer(app).listen(app.get('port'), function(){
	console.log(app.get('port'));
})