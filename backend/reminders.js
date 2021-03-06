/**
 * Created by nwu on 10/18/17.
 */
var Midnight = require('./models/midnights');
var emailer = require('./emailer');

remindMidnights = function(callback) {
  console.log('hi');
  var today = new Date();
  var firstDay = new Date(today.getFullYear(), today.getMonth(),today.getDate());
  Midnight.Midnight.find({date: firstDay}).cursor()
    .on('data', function(doc) {
      console.log("Reminding " + doc.zebe + " about " + doc.task + ".");
      const addr = doc.zebe + "@mit.edu";
      const subj = "[ZBTodo Reminder] Midnight Tonight: " + today.toISOString().substring(0, 10);
      const body = "You have " + doc.task + " tonight";
      emailer.send(addr, subj, body);
      console.log("Finished sending " + doc._id);
    })
    .on('error', function(err){
      console.log("Reminder sending failed.");
      console.log(err);
    }).on('end', callback);
};

module.exports = {
  remindMidnights: remindMidnights
};