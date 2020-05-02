const TelegramBot = require('node-telegram-bot-api');
const http = require('http');
var axios = require('axios');
const Token = '1218237910:AAFymUW_WCuVbnNz2vNTZJuyeQdIl_L87Bg';
const api = 'c0630dc3103fe2afdaeb35347a06d72841721049ef3c7aae850e7b121aa32be6';
var uri = 'https://apiv2.apifootball.com/';
var header = { 'X-Auth-Token': api };


const bot = new TelegramBot(Token,
    {
        polling: true
    });


/*bot.on('message', (msg) =>
{
    var Hi="ciao";
    if(msg.text.toString().toLowerCase().indexOf(Hi)===0)
    {
        bot.sendMessage(msg.chat.id, "Ciao mondo!");
    }
})*/

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome");
});

bot.onText(/\/match/, (msg, match) => {


    axios.get(uri + '?action=' + 'get_countries' + '&APIkey=' + api)
        .then(function (response) {
            // handle success
            if (response.length != 0) {
                console.log(response);
            }

        })
});

bot.onText(/\/player/, (msg, match) => {

    var giocatorenome = match.input.split(" ")[1];
    var giocatorecognome = match.input.split(" ")[2];
    axios.get(uri + '?action=' + 'get_players&player_name=' + giocatorenome + " " + giocatorecognome + '&APIkey=' + api)
        .then(function (response) {
            // handle success
            if (response.length != 0) {
                console.log(response.data);
                for(var i=0; i<response.data.length; i++)
                {
                    bot.sendMessage(msg.chat.id, "nome: "+ response.data[i].player_name + "\n" + response.data[i].player_number);    
                }
                
            }

        })
});


bot.on("polling_error", function (err) {
    console.log(err);
});

//test