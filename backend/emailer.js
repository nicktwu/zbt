var utils = require('./utils');
var config = require('./config');

var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var helper = require('sendgrid').mail;

send = function(to, subject, body) {
  var fromEmail = new helper.Email(config.from_email);
  var toEmail = new helper.Email(to);
  var content = new helper.Content('text/plain', body);
  var mail = new helper.Mail(fromEmail, subject, toEmail, content);
  var req = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  });

  if (utils.is_prod()) {
    sg.API(req, function(err, res) {
      if (err) {
        console.log('error: ', err);
        return err;
      }
    });
  } else {
    console.log('not sending email because we are currently in development mode');
    console.log('would have sent:', req);
  }
};

module.exports = {
  send: send,
};
