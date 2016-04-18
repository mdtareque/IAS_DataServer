var express     = require('express');
var json        = require('JSON');
var router      = express.Router();
var MongoClient = require('mongodb').MongoClient;

router.get('/:access', function(req, res, next) {
    var access_token  = req.params.access

	MongoClient.connect("mongodb://localhost:27017/iotdb", function(err, db) {
		if(!err) {
            var collection  = db.collection('notifications');
            collection.find({access_token:access_token},{access_token:1,message:1,_id:0}).toArray(function(err,data){
                if(err){
                    console.log('ERROR: notification error in reading colleciton')
                }
                if(data){
                    //res.writeHead(200, {'Content-Type':'application/text; charset=utf8'});
                    res.write(json.stringify(data))
                    res.send();
                }
                else{
                    console.log('NO-DATA: access token not found')
                }
            });
        }

    });
});

module.exports = router;
