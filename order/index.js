const orderService = require("./order-service");
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var fs = require('fs');
module.exports = (app) => {
    app.use('/order/saveOrder', orderService.saveOrder)
    app.use('/order/getOrders', orderService.getOrders)
    app.use('/order/updateOrder', orderService.updateOrder)
    var upload = multer({dest:__dirname+'/../uploadFiles'})
    app.use('/order/upload',upload.single('fileUpload'),  function (req, res, next) {
        res.status(200).send({
			'data': {'filename': req.file.filename}
		})
        // req.file is the `avatar` file
        // req.body will hold the text fields, if there were any
      })
    app.get('/order/download', function(req,res){
        console.log(req.query.id);
        var file = fs.readFileSync(__dirname+'/../uploadFiles/'+req.query.id);
	  	res.writeHeader(200,{'Content-Type':'image/png'})
	  	res.end(file,'binary');
    })
}