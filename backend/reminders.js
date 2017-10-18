/**
 * Created by nwu on 10/18/17.
 */
var Midnight = require('./models/midnights');
var emailer = require('./emailer');

remindMidnights = function() {
  var today = new Date();
  var firstDay = new Date(today.getFullYear(), today.getMonth(),today.getDate());
  var lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 1);
  Midnight.Midnight.find({date: {$gte: firstDay, $lte: lastDay}}, function(err, docs) {
    if (err) {
      console.log("Reminder sending failed.");
      console.log(err);
    } else {
      console.log("Found " + String(docs.length) + " docs")
      for (var i = 0; i < docs.length; i++) {
        var doc = docs[i];
        console.log("Reminding " + doc.zebe + " about " + doc.task + ".");
        const addr = "nwu" + "@mit.edu";
        const subj = "[ZBTodo Reminder] Midnight Tonight";
        const body = "You have " + doc.task + " tonight";
        emailer.send(addr, subj, body);
      }
    }
  });
};

module.exports = {
  remindMidnights: remindMidnights
};