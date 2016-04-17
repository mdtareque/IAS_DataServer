var express = require('express');
var router  = express.Router();

var apis = {

   "/endpoints" : "returns list of all rest endpoint",
   "/endpoints/pretty" : "returns list of all rest endpoint in tabular format",
   "/getSensor/:sensor_type" : "return complete sensor data (sensor_type, sensor_data, sensor_actions) for given sensor type",
   "/getSensor/:sensor_type/actions" : "return sensor_actions for given sensor type",
   "/getgateways" : "return all gateway type names",
   "/getgateways/:gateway_type" : "return all gateway type instances",
   "/getgateways/:gateway_type/:metdata" : "return metadata of gatewaytype for given gateway_type ",
   "/getgateways/:gateway_type/:static_fields" : "return static_fileds of gatewaytype for given gateway_type ",
   "/getgateways/:gateway_type/:sensor_ddata" : "return sensor_data of gatewaytype for given gateway_type ",
   "/getendusers/:appid" : "return all the users for given appId ",
   "/getUser/:app_Id/:gateway_Id" : "return the username using gateway (gateway_Id) in app app_id",
   "/getApps" : "returns all appIds with owners",
   "/getRules/:app_id" : "return rules for given app_id"
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send(apis)
});
router.get('/pretty', function(req, res, next) {
    var out = "<table border=1><thead><tr><th>Endpoint URI</th><th>Description</th></thead>"
    for (var i in apis) {
        console.log("i is"+i)
        console.log("i is"+apis[i])
        out += "<tr><td>" + i + "</td><td>" + apis[i] +"</td></tr>"


    }
    out += "</table>"
     
    res.send(out)
});

module.exports = router;
