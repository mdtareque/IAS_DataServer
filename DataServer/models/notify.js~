//test2.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/iotdb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("connected to DB");
});


var notes = mongoose.Schema({
    access_token: 'string',
    note_string : 'string',
    //date : Date
    //avlbl : Boolean

});
var notifications = mongoose.model('notifications', notes);

//var mongoose = require('mongoose');
//Load all your models

mongoose.export = notifications
