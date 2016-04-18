var express     = require('express');
var json        = require('JSON');
var router      = express.Router();
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose')
var ObjectId = require('mongodb').ObjectId;

router.get('/', function(req, res, next) {

	MongoClient.connect("mongodb://localhost:27017/iotdb", function(err, db) {
		if(!err) {
            var collection  = db.collection('gatewaytypes');
            collection.find().toArray(function(err,data){
                if(err){
                    console.log('ERROR: getGateways error in reading colleciton')
                }
                if(data){
                    //res.writeHead(200, {'Content-Type':'application/text; charset=utf8'});
                    res.write(json.stringify(data))
                    res.send();
                }
                else{
                    console.log('NO-DATA: Gateway types not found')
                }
            });
        }

    });
});


router.get('/:type', function(req, res, next) {
    var gateway_type = req.params.type
    var out=""
    console.log("Requested gateway "+gateway_type);   
	MongoClient.connect("mongodb://localhost:27017/iotdb", function(err, db) {
	if(!err) {
            var gateway_types  = db.collection('gatewaytypes');
            gateway_types.find({name:gateway_type},{_id:1}).limit(1).next(function(err,data){
	    if(err){
		    console.log('Error: getgateways/id error in reading collection:gateways_types')
		   }
	    if(data){
		    var jsonstr_data = json.stringify(data);
		    var json_data = json.parse(jsonstr_data);
		    var gateways  = db.collection('gateways');
		    gateways.find({gateway_type_id:json_data._id}).count(function(err, data){
			if(data){  
				
				var jsonstr_nRec = json.stringify(data);  	
				//res.write("Number of records: "+data+"\n");
		    	}	
		    });
		    gateways.find({gateway_type_id:json_data._id}).toArray(function(err, data){
		        if(err){
		            console.log('Error: getgateways/id error in reading collection:gateways')
		        }
		       if(data){
		           res.write(json.stringify(data))
		           res.send();
		        }
		        else{
		            console.log('NO-DATA: gateway type not found')
		        }
		    });
		}
		else{
		        console.log('NO-DATA: gateway type not found')
		    }
	    });
	}    
    });
});

router.get('/:type/metadata', function(req, res, next) {
    var gateway_type = req.params.type
    var out=""
    console.log("Requested gateway "+gateway_type);   
	MongoClient.connect("mongodb://localhost:27017/iotdb", function(err, db) {
	if(!err) {
            var gateway_types  = db.collection('gatewaytypes');
            gateway_types.find({name:gateway_type},{_id:1}).limit(1).next(function(err,data){
	    if(err){
		    console.log('Error: getgateways/id error in reading collection:gateways_types')
		   }
	    if(data){
		    var jsonstr_data = json.stringify(data);
		    var json_data = json.parse(jsonstr_data);
		    console.log(json_data._id);
		    var gateways  = db.collection('gateways');
		   //res.writeHead(200, {'Content-Type':'application/text; charset=utf8'});
		    gateways.find({gateway_type_id:json_data._id}).count(function(err, data){
			if(data){  
				
				var jsonstr_nRec = json.stringify(data);  	
				res.write("Number of records: "+data+"\n");
		    	}	
		    });
		    gateways.find({gateway_type_id:json_data._id},{meta_data:1,_id:0}).toArray(function(err, data){
		        if(err){
		            console.log('Error: getgateways/id error in reading collection:gateways')
		        }
		       if(data){
		           res.write(json.stringify(data))
		           res.send();
		        }
		        else{
		            console.log('NO-DATA: gateway type not found')
		        }
		    });
		}
		else{
		        console.log('NO-DATA: gateway type not found')
		    }
	    });
	}    
    });
});

router.get('/:type/sensor_data', function(req, res, next) {
    var gateway_type = req.params.type
    var out=""
    console.log("Requested gateway "+gateway_type);   
	MongoClient.connect("mongodb://localhost:27017/iotdb", function(err, db) {
	if(!err) {
            var gateway_types  = db.collection('gatewaytypes');
            gateway_types.find({name:gateway_type},{_id:1}).limit(1).next(function(err,data){
	    if(err){
		    console.log('Error: getgateways/id error in reading collection:gateways_types')
		   }
	    if(data){
		    var jsonstr_data = json.stringify(data);
		    var json_data = json.parse(jsonstr_data);
		    console.log(json_data._id);
		    var gateways  = db.collection('gateways');
		   //res.writeHead(200, {'Content-Type':'application/text; charset=utf8'});
		     gateways.find({gateway_type_id:json_data._id}).count(function(err, data){
			if(data){  
				
				var jsonstr_nRec = json.stringify(data);  	
				res.write("Number of records: "+data+"\n");
		    	}	
		    });
		    gateways.find({gateway_type_id:json_data._id},{_id:0,sensor_data:1}).toArray(function(err, data){
		        if(err){
		            console.log('Error: getgateways/id error in reading collection:gateways')
		        }
		       if(data){
		           res.write(json.stringify(data))
		           res.send();
		        }
		        else{
		            console.log('NO-DATA: gateway type not found')
		        }
		    });
		}
		else{
		        console.log('NO-DATA: gateway type not found')
		    }
	    });
	}    
    });
});

router.get('/:type/static_fields', function(req, res, next) {
    var gateway_type = req.params.type
    var out=""
    console.log("Requested gateway "+gateway_type);   
	MongoClient.connect("mongodb://localhost:27017/iotdb", function(err, db) {
	if(!err) {
            var gateway_types  = db.collection('gatewaytypes');
            gateway_types.find({name:gateway_type},{_id:1}).limit(1).next(function(err,data){
	    if(err){
		    console.log('Error: getgateways/id error in reading collection:gateways_types')
		   }
	    if(data){
		    var jsonstr_data = json.stringify(data);
		    var json_data = json.parse(jsonstr_data);
		    console.log(json_data._id);
		    var gateways  = db.collection('gateways');
		   //res.writeHead(200, {'Content-Type':'application/text; charset=utf8'});
		     gateways.find({gateway_type_id:json_data._id}).count(function(err, data){
			if(data){  
				
				var jsonstr_nRec = json.stringify(data);  	
				res.write("Number of records: "+data+"\n");
		    	}	
		    });
		    gateways.find({gateway_type_id:json_data._id},{_id:0,static_data:1}).toArray(function(err, data){
		        if(err){
		            console.log('Error: getgateways/id error in reading collection:gateways')
		        }
		       if(data){
		           res.write(json.stringify(data))
		           res.send();
		        }
		        else{
		            console.log('NO-DATA: gateway type not found')
		        }
		    });
		}
		else{
		        console.log('NO-DATA: gateway type not found')
		    }
	    });
	}    
    });
});

module.exports = router;
