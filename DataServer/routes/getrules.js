var express     = require('express');
var json        = require('JSON');
var router      = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

router.get('/:app', function(req, res, next) { 
	 var app_id = req.params.app 
	MongoClient.connect("mongodb://localhost:27017/iotdb", function(err, db) {
	if(!err) {
            var rules  = db.collection('rules');
	    rules.find({app_id:app_id}).count(function(err, data){
			if(data){  
				
				var jsonstr_nRec = json.stringify(data);
				console.log("Number of rules "+jsonstr_nRec)  	
				res.write("Number of rules: "+jsonstr_nRec+"\n");
		    	}	
		    });
	    rules.find({app_id:app_id},{_id:0,name:1}).toArray(function(err,data){
	    if(err){
		    console.log('Error: getgateways/id error in reading collection:gateways_types')
		   }
	    if(data){
		    console.log(json.stringify(data));
	
		    res.json(json.stringify(data));  
		}
		else{
		        console.log('NO-DATA: gateway type not found')
		    }
	    });
	}    
    });
});

module.exports = router;
