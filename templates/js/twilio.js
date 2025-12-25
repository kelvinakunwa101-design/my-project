const twilo = require('twilio');

const accountSid = 'your_account_sid';
const authToken = 'your_auth_token';
const client = twilo(accountSid, authToken);

const sendSMS = (to, message) => {
  client.message
    .create({
      body: message,
      from: 'your_twilio_phone_number',
      to: to
    })      
    .then((message) => console.log(message.sid));
};

Module.exports = { sendSMS };