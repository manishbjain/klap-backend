const orderService = require("./order-service");
var multer  = require('multer')
var fs = require('fs');
module.exports = (app) => {
    // save order information
    app.use('/order/saveOrder', orderService.saveOrder)
    // get order information
    app.use('/order/getOrders', orderService.getOrders)
    // delete order information
    app.use('/order/deleteOrders', orderService.deleteOrders)
    // update
    app.use('/order/updateOrder', orderService.updateOrder)
    // save dc
    app.use('/order/saveDespatch', orderService.saveDespatch)
    // get all dc list
    app.use('/order/getDespatch', orderService.getDespatch)
    // delete dc
    app.use('/order/deleteDespatch', orderService.deleteDespatch)
    // save slip
    app.use('/order/saveSlip', orderService.saveSlip)
    // get slip list
    app.use('/order/getSlip', orderService.getSlip)
    // delete slip
    app.use('/order/deleteSlip', orderService.deleteSlip)
    // data  get from xsl and put into db
    app.use('/order/orderexcelToData', orderService.excelToData);

    // file upload
    var upload = multer({dest:__dirname+'/../uploadFiles'})
    app.use('/order/upload',upload.single('fileUpload'),  function (req, res, next) {
        res.status(200).send({
			'data': {'filename': req.file.filename}
		})
        // req.file is the `avatar` file
        // req.body will hold the text fields, if there were any
      })
    // file download
    app.get('/order/download', function(req,res){
        var file = fs.readFileSync(__dirname+'/../uploadFiles/'+req.query.id);
	  	res.writeHeader(200,{'Content-Type':'image/png'})
	  	res.end(file,'binary');
    })
}