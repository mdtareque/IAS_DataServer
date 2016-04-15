var express     = require('express');
var json        = require('JSON');
var router      = express.Router();
var MongoClient = require('mongodb').MongoClient;

router.get('/', function(req, res, next) {
    console.log('data is ' + req.query.data)
    var sensor_type = req.query.data
    var out=""

	MongoClient.connect("mongodb://localhost:27017/iotdb", function(err, db) {
		if(!err) {
            var collection  = db.collection('sensors');
            collection.find({sensor_type:sensor_type}).limit(1).next(function(err,data){
                if(err){
                    console.log('ERROR: getsensor error in reading colleciton')
                }
                if(data){
                    console.log(typeof data)
                    res.write(json.stringify(data))
                    res.send();
                }
                else{
                    console.log('NO-DATA: sensor type not found')
                }
            });
        }

    });
});

module.exports = router;
