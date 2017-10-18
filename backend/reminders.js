/**
 * Created by nwu on 10/18/17.
 */
var Midnight = require('./models/midnights');
var emailer = require('./emailer');

remindMidnights = function() {
  var today = new Date();
  var firstDay = new Date(today.getFullYear(), today.getMonth(),today.getDate());
  var lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 1);
  Midnight.Midnight.find({date: {$gte: firstDay, $lte: lastDay}}).cursor()
    .on('data', function(doc) {
      console.log("Reminding " + doc.zebe + " about " + doc.task + ".");
      const addr = "nwu" + "@mit.edu";
      const subj = "[ZBTodo Reminder] Midnight Tonight";
      const body = "You have " + doc.task + " tonight";
      emailer.send(addr, subj, body);
    })
    .on('error', function(err){
      console.log("Reminder sending failed.");
      console.log(err);
    });
};

module.exports = {
  remindMidnights: remindMidnights
};