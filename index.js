const cron = require('node-cron');

const config = require('./config.js');
const accountSid = config.ACCOUNT_SID;
const authToken =  config.AUTH_TOKEN;
const client = require('twilio') (accountSid, authToken);

const messages = require('./messages');
const currentMessage = 0;


function sendMessage(){
    client.messages
    .create({
        body: messages[currentMessage],
        from: config.MY_NUMBER,
        to:config.PHONE_NUMBER
    })
    .then (message => {
        currentMessage++;
        sendMessage();
        console.log('Message sent!')
    });
}


cron.schedule('0 * * * *', () => {
    console.log('run every hour')
});