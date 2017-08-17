const Telegraf 		= require('telegraf');
const request 		= require('request');
const schedule 		= require('node-schedule');

const token 		= process.env.BOTSEY_TOKEN;
const app 		= new Telegraf(token);
const bitcoinURL 	= "https://www.zebapi.com/api/v1/market/ticker/btc/inr";
const chatId		= "@bitcoin_value";

var rule = new schedule.RecurrenceRule();
rule.hour = new schedule.Range(0, 23, 1); //Every hour

schedule.scheduleJob(rule, function() {
    request(bitcoinURL, function(error, response, body){
        const message = JSON.parse(body).buy;
        const notifyTelegramURL = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${message}`;
        request(notifyTelegramURL, function(error, response, body){ });
    });
});

app.hears('hi', (ctx) => ctx.reply("I dont do hi's brother! :D"));

app.startPolling();
