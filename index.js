const cron = require('node-cron');

const config = require('./config.js');
const accountSid = config.ACCOUNT_SID;
const authToken =  config.AUTH_TOKEN;
const client = require('twilio') (accountSid, authToken);

const messages = require('./messages');
var currentMessage = 0;


function sendMessage(){
    client.messages
    .create({
        body: messages[currentMessage],
        from: config.MY_NUMBER,
        to:config.PHONE_NUMBER
    })
    .then (message => {
        currentMessage++;
        console.log(message)
    });
}

cron.schedule('* * * * *', () => {
    sendMessage();
    console.log('Message sent!')
});