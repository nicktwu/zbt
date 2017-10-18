var utils = require('./utils');
var config = require('./config');

var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

send = function(to, subject, body) {
  var msg = new sg.Email();
  msg.addTo(to);
  msg.setFrom(config.from_email);
  msg.setSubject(subject);
  msg.setHtml(body);

  if (utils.is_prod()) {
    sg.send(msg);
  } else {
    console.log('not sending email because we are currently in development mode');
    console.log('would have sent:', req);
  }
};


module.exports = {
  send: send
};
