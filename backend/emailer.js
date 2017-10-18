var utils = require('./utils');
var config = require('./config');

var sg = require('@sendgrid/mail');
sg.setApiKey(process.env.SENDGRID_API_KEY);

send = function(to, subject, body) {
  var msg = {
    to: to,
    from: config.from_email,
    subject: subject,
    text: body
  };

  if (utils.is_prod()) {
    sg.send(msg).then(function() {
      console.log("Email sent to " + to);
    });
  } else {
    console.log('not sending email because we are currently in development mode');
    console.log('would have sent:', req);
  }
};


module.exports = {
  send: send
};
