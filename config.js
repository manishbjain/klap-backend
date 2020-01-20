const convict = require('convict');
var config = new convict({
	env: {
		doc: 'The applicaton environment.',
		format: ['production'],
		default: 'production',
		env: 'NODE_ENV',
		arg: 'env'
	},
	server : {
		port : {
			doc: 'HTTP port to bind',
			format: 'port',
			default: 3010,
			env: 'PORT'
		},
		enableHttpLogging: {
			doc: 'Enable HTTP Logging',
			format: Boolean,
			default: true
		},
		enableRequestLoggin: {
			doc: 'Enable Request Logging',
			format: Boolean,
			default: true
		},
		enableCompression : {
			doc: 'Compression',
			format: Boolean,
			default: true
		},
		enableStatic : {
			doc: 'static',
			format: Boolean,
			default: true
		},
		security: {
			enableXframe: {
				doc: 'Enable Iframe protection',
				format: Boolean,
				default: true
			},
			enableHidePoweredBy: {
				doc: 'Hide X powered by Header',
				format: Boolean,
				default: true
			},
			enableNoCaching: {
				doc: 'Enable No caching',
				format: Boolean,
				default: false
			},
			enableCSP: {
				doc: 'Enable CSP policy',
				format: Boolean,
				default: false
			},
			enableHSTS: {
				doc: 'Enable HSTS',
				format: Boolean,
				default: false
			},
			enableXssFilter: {
				doc: 'Enable XSS filter protection',
				format: Boolean,
				default: true
			},
			enableForceContentType: {
				doc: 'Enable force content type',
				format: Boolean,
				default: false
			},
			enableCORS: {
				doc: 'Enable CORS',
				format: Boolean,
				default: true
			}
		},
		CORS: {
			allowedHosts: {
				doc: 'Allowed Host for CORS',
				format: Array,
				default: ['http://localhost:3000']
			},
			allowedMethods: {
				doc: 'Allowed HTTP Methods for CORS',
				format: String,
				default: 'GET,POST,OPTIONS'
			},
			allowedHeaders: {
				doc: 'Allowed HTTP Headers for CORS',
				format: String,
				default: 'accept, x-xsrf-token,Content-type'
			},
			exposedHeaders: {
				doc: 'Exposed HTTP Headers for CORS',
				format: String,
				default: 'XSRF-TOKEN'
			}
		},
		session: {
			sidname: {
				doc: 'Name of a session',
				format: String,
				default: 'connect.sid'
			},
			path: {
				doc: 'Path of a session',
				format: String,
				default: '/'
			},
			httpOnly: {
				doc: 'httpOnly cookie',
				format: Boolean,
				default: true
			},
			secure: { // should be set to true when using https
				doc: 'Http security of a session',
				format: Boolean,
				default: false
			},
			maxAge: {
				doc: 'Maximum age of a session',
				format: Number,
				default: 24 * 60 * 60 * 1000 // one day
			},
			proxy: { // should set to true when using https and reverse proxy
				// like HAproxy
				doc: 'Http proxy',
				format: Boolean,
				default: false
			},
			rolling: { // should set to true when want to have sliding window
				// session
				doc: 'For sliding window of a session',
				format: Boolean,
				default: false
			},
			saveUninitialized : {
				doc: 'For sliding window of a session',
				format: Boolean,
				default: true
			}
		},
		bodyParser: {
			limit: {
				doc: 'maximum request body size',
				format: String,
				default: '100kb'
			}
		}
	},
	logger: {
		httpLogFormat: {
			doc: 'HTTP log format',
			format: String,
			default: ':remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms ":referrer" ":user-agent"'
		},
		httpLogFileName: {
			doc: 'HTTP log File name',
			format: String,
			default: 'http.log'
		},
		logFileName: {
			doc: 'Log File name',
			format: String,
			default: 'logs.log'
		},
		exceptionLogFileName: {
			doc: 'Exception log File name',
			format: String,
			default: 'exceptions.log'
		},
		logFileSize: {
			doc: 'logs File Max File size',
			format: Number,
			default: 5242880
		},
		path: {
			doc: 'path for log fils',
			format: String,
			default: __dirname
		}
	},
	mongodb: {
		host: {
			doc: 'MongoDB Hostname',
			format: String,
			default: 'mongodb://AsrarMemon:Asrar123@ds253398.mlab.com:53398/',
		},
		database: {
			db: {
				name: {
					doc: 'Database Name',
					format: String,
					default: 'klap-database',
				},
				collection: {
					customer: {
						doc: 'customer Collection Name',
						format: String,
						default: 'customer',
					},
					orderDetail: {
						doc: 'orderDetail Collection Name',
						format: String,
						default: 'order_details',
					},
					despatchDetail: {
						doc: 'despatch Collection Name',
						format: String,
						default: 'despatch_details'
					},
					slipDetail: {
						doc: 'slip Collection Name',
						format: String,
						default: 'slip_details'
					},
					user: {
						doc: 'userDetail Collection Name',
						format: String,
						default: 'user',
					}
				}
			},
			session: {
				doc: 'Session Database Name',
				format: String,
				default: 'klap-database',
			}
		},
		defaultDatabase: {
			doc: 'Database Name',
			format: String,
			default: 'klap-database',
		}
	},
	order: {"orderId":"a","orderDate":"b","customerId":"c","customerName":"d","customerCity":"e","createdBy":"f","changes":"g","oldOrderId":"h","itemCategory":"i","itemDescription":"j","quantity":"k","quantityUnits":"l","sizeRef":"m","size":"n","designRef":"o","colourRef":"p","isHardCopy":"q","isProductSamples":"r","moreInfo":"s","displayMaterial":"t","displayLamination":"u","displayCoating":"v","displayEmboss":"w","displayFoil":"x","displayREmboss":"y","customerLedger":"z","bilType":"aa","price":"ab","deliveryDetails":[{"deliveryQuantity":"ac","locationId":"ad","comments":"ae"},{"deliveryQuantity":"af","locationId":"ag","comments":"ah"},{"deliveryQuantity":"ai","locationId":"aj","comments":"ak"}],"stage":"al","process":"am","vendor":"an","date":"ao","jobId":"ap","jobDate":"aq","jobName":"ar","jobType":"as","moreInformation":"at","finalSizeL":"au","finalSizeB":"av","finalSizeH":"aw","finalUnit":"ax","finalMaterial":"ay","finalLamination":"az","finalCoating":"ba","finalEmboss":"bb","finalFoil":"bc","finalREmboss":"bd","noOfBlocks":"be","noOfUps":"bf","nofOfSheets":"bg","totalQty":"bh","packing":[{"dateOfPacking":"bi","noOfpackets":"bj","sheets":"bk","labels":"bl","totalLabels":"bm"},{"dateOfPacking":"bn","noOfpackets":"bo","sheets":"bp","labels":"bq","totalLabels":"br"},{"dateOfPacking":"bs","noOfpackets":"bt","sheets":"bu","labels":"bv","totalLabels":"bw"},{"dateOfPacking":"bx","noOfpackets":"by","sheets":"bz","labels":"ca","totalLabels":"cb"},{"dateOfPacking":"cc","noOfpackets":"cd","sheets":"ce","labels":"cf","totalLabels":"cg"},{"dateOfPacking":"ch","noOfpackets":"ci","sheets":"cj","labels":"ck","totalLabels":"cl"}],"pPrinter":"cm","productionDate":"cn","productionQty":"co","productionWastage":"cp","pDesErr":"cq"},
	customer: {
		"cId": "a",
		"customerName": "b",
		"city": "c",
		"contact": [
		  {
			"contactPerson": "d",
			"contactNumber": "e",
			"email": "f"
		  },
		  {
			"contactPerson": "g",
			"contactNumber": "h",
			"email": "i"
		  }
		],
		"deliveryLocations": [
		  {
			"locationName": "j",
			"doorNo": "k",
			"streetName": "l",
			"city": "m",
			"state": "n",
			"shippingMark": "o",
			"contactNumber": "p",
			"comments": "q"
		  },
		  {
			"locationName": "r",
			"doorNo": "s",
			"streetName": "t",
			"city": "u",
			"state": "v",
			"shippingMark": "w",
			"contactNumber": "x",
			"comments": "y"
		  },
		  {
			"locationName": "z",
			"doorNo": "aa",
			"streetName": "ab",
			"city": "ac",
			"state": "ad",
			"shippingMark": "ae",
			"contactNumber": "af",
			"comments": "ag"
		  }
		],
		"ledgers": [
		  {
			"billingName": "ah",
			"address": "ai",
			"pincode": "aj",
			"city": "ak",
			"state": "al",
			"country": "am",
			"gstin": "an"
		  },
		  {
			"billingName": "ao",
			"address": "ap",
			"pincode": "aq",
			"city": "ar",
			"state": "as",
			"country": "at",
			"gstin": "au"
		  },
		  {
			"billingName": "av",
			"address": "aw",
			"pincode": "ax",
			"city": "ay",
			"state": "az",
			"country": "ba",
			"gstin": "bb"
		  }
		]
	  },
	  dc: {
		"dcId": "b",
		"dcDate": "c",
		"pcustomerId": "d",
		"packingDetails": [
		  {
			"pOrderId": "e",
			"pItemDes": "f",
			"ptotalQty": "g",
			"pPackingDetail": "h"
		  },
		  {
			"pOrderId": "i",
			"pItemDes": "j",
			"ptotalQty": "k",
			"pPackingDetail": "l"
		  },
		  {
			"pOrderId": "m",
			"pItemDes": "n",
			"ptotalQty": "o",
			"pPackingDetail": "p"
		  }
		],
		"dLocation": "q",
		"pContact": "r",
		"psMark": "s",
		"nOfCartons": "t",
		"cartonId": "u",
		"pDesStatus": "v",
		"pDesDate": "w",
		"pDelStatus": "x",
		"pSlip": "y"
	  },
	  slip: {
		"slDate": "a",
		"slId": "b",
		"slCustomerId": "c",
		"ordersForSlip": [
		  {
			"slOrderId": "d",
			"slItemDes": "e",
			"slItemQty": "f",
			"slPrice": "g",
			"slAmount": "h",
			"slDcIds": "i",
			"slDcDates": "j",
			"slInvoice": "k",
			"slTaxAmount": "l",
			"slCartons": "m"
		  },
		  {
			"slOrderId": "n",
			"slItemDes": "o",
			"slItemQty": "p",
			"slPrice": "q",
			"slAmount": "r",
			"slDcIds": "s",
			"slDcDates": "t",
			"slInvoice": "u",
			"slTaxAmount": "v",
			"slCartons": "w"
		  },
		  {
			"slOrderId": "x",
			"slItemDes": "y",
			"slItemQty": "z",
			"slPrice": "aa",
			"slAmount": "ab",
			"slDcIds": "ac",
			"slDcDates": "ad",
			"slInvoice": "ae",
			"slTaxAmount": "af",
			"slCartons": "ag"
		  }
		],
		"slTax": "ah",
		"slFreight": "ai",
		"slOthers": "aj",
		"slTrans": "ak",
		"slTotal": "al",
		"slComment": "am"
	  }
})

// config.loadFile('./config-' + config.get('env') + '.json');
// config.set('logger.httpLogFileName', config.get('logger.path')+'/logs/' + config.get('logger.httpLogFileName'));
// config.set('logger.logFileName', config.get('logger.path')+'/logs/' + config.get('logger.logFileName'));
// config.set('logger.exceptionLogFileName', config.get('logger.path')+'/logs/'+ config.get('logger.exceptionLogFileName'));

// validate
config.validate();
module.exports = config;