var express     = require('express');
var json        = require('JSON');
var router      = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

router.get('/', function(req, res, next) {  
	MongoClient.connect("mongodb://localhost:27017/iotdb", function(err, db) {
	if(!err) {
            var apps  = db.collection('applications');
	    apps.find().count(function(err, data){
			if(data){  
				
				var jsonstr_nRec = json.stringify(data);
				console.log("Number os users "+jsonstr_nRec)  	
				res.write("Number of users: "+jsonstr_nRec+"\n");
		    	}	
		    });
	    apps.find({},{_id:1,owner:1}).toArray(function(err,data){
	    if(err){
		    console.log('Error: getgateways/id error in reading collection:gateways_types')
		   }
	    if(data){
		    console.log(json.stringify(data));
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