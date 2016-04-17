var express     = require('express');
var json        = require('JSON');
var router      = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

router.get('/:app', function(req, res, next) {
    var app_id = req.params.app
    var out=""
    console.log("Requested app_id "+app_id);   
	MongoClient.connect("mongodb://localhost:27017/iotdb", function(err, db) {
	if(!err) {
            var app_users  = db.collection('applicationusers');
	    app_users.find({app_id:app_id}).count(function(err, data){
			if(data){  
				
				var jsonstr_nRec = json.stringify(data);
				console.log("Number os users "+jsonstr_nRec)  	
				res.write("Number of users: "+jsonstr_nRec+"\n");
		    	}	
		    });
            app_users.find({app_id:app_id},{name:1,_id:0}).toArray(function(err,data){
	    if(err){
		    console.log('Error: getgateways/id error in reading collection:gateways_types')
		   }
	    if(data){
		    res.write(json.stringify(data));  
		}
		else{
		        console.log('NO-DATA: gateway type not found')
		    }
	    });
	}    
    });
});

module.exports = router;
