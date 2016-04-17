var express     = require('express');
var json        = require('JSON');
var router      = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

router.get('/:app/:gateway', function(req, res, next) {
    var app_id = req.params.app
    var gateway_id = req.params.gateway;
    var out=""
    console.log("Requested app_id "+app_id);
    console.log("Requested gateway_id "+gateway_id);   
	MongoClient.connect("mongodb://localhost:27017/iotdb", function(err, db) {
	if(!err) {
            var reg_gateways  = db.collection('registergateways');

	    reg_gateways.find({app_id:app_id},{gateways:1,app_id:1,_id:0}).toArray(function(err,data){
	    if(err){
		    console.log('Error: getgateways/id error in reading collection:registergateways')
		   }
	    if(data){
		    var jsonstr_data = json.stringify(data);
		    var gateways = json.parse(jsonstr_data);
		    //var gateways  = json_data.gateways
		    var app_ids = [];
		    var gatewaysary = [];
		    var len = gateways.length
		    for(var i=0;i<len;i++){
			var gatewayjson = json.stringify(gateways[i]);
			var  gateway = json.parse(gatewayjson);
			gatewaysjson = json.stringify(gateway.gateways);	
			var  gatewaysary = json.parse(gatewaysjson);			
			var l = gatewaysary.length
			for (var j=0;j<l;j++){
				if(gateway_id===gatewaysary[i]){
					app_ids.push(gateway.app_id);
					break;
				}
			}
		    }
		    console.log("App ids "+app_ids) 
		    var app_users  = db.collection('applicationusers');
		    app_users.find({app_id:{$in:app_ids}},{name:1,_id:0}).toArray(function(err,data){
		    if(err){
			    console.log('Error: getgateways/id error in reading collection:applicationusers')
			   }
		    if(data){
			    console.log("Names "+json.stringify(data))
			    res.write(json.stringify(data));  
			}
			else{
				console.log('NO-DATA: gateway type not found')
			    }
		    }) 
			}
			else{
				console.log('NO-DATA: gatewayid not found')
			    }
		});
	}    
    });
});

module.exports = router;
