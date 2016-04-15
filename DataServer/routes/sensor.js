var express     = require('express');
var json        = require('JSON');
var router      = express.Router();
var MongoClient = require('mongodb').MongoClient;

router.get('/:id', function(req, res, next) {
    var sensor_type = req.params.id
    var out=""

	MongoClient.connect("mongodb://localhost:27017/iotdb", function(err, db) {
		if(!err) {
            var collection  = db.collection('sensors');
            collection.find({sensor_type:sensor_type}).limit(1).next(function(err,data){
                if(err){
                    console.log('ERROR: getsensor error in reading colleciton')
                }
                if(data){
                    //res.writeHead(200, {'Content-Type':'application/text; charset=utf8'});
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

router.get('/:id/actions', function(req, res, next) {
    var sensor_type = req.params.id
    var out=""

	MongoClient.connect("mongodb://localhost:27017/iotdb", function(err, db) {
		if(!err) {
            var collection  = db.collection('sensors');
            collection.find({sensor_type:sensor_type}).limit(1).next(function(err,data){
                if(err){
                    console.log('ERROR: getsensor error in reading colleciton')
                }
                if(data){
                    //res.writeHead(200, {'Content-Type':'application/text; charset=utf8'});
                    res.write(json.stringify(data.sensor_actions))
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
