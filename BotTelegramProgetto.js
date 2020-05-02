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




bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome to FootballBot");
});


bot.onText(/\/giocatori/, (msg, team) => {
    var giocatori = [];
    var squadra = team.input.split(" ")[1];
    bot.sendMessage(msg.chat.id, "Elenco giocatori:");
    axios.get(uri + '?action=' + 'get_teams&league_id=148&APIkey=' + api)
        .then(function (response) {
            bot.sendMessage(msg.chat.id, "Elenco giocatori:");
            if (response.length != 0) {
                for (var i = 0; i < response.data.length; i++) {
                    if (response.data[i].team_name == squadra) {
                        for (var j = 0; j < response.data[i].players.length; j++) {
                            var giocatore = "Nome: " + response.data[i].players[j].player_name + "\nNumero: " + response.data[i].players[j].player_number + "\nNazione: " + response.data[i].players[j].player_country + "\nRuolo: " + response.data[i].players[j].player_type + "\nEtà: " + response.data[i].players[j].player_age + "\n\n";
                            giocatori.push(giocatore);
                        }
                    }

                    bot.sendMessage(msg.chat.id, giocatori.join("\n"));
                }

            }

        })
});

bot.onText(/\/allenatori/, (msg, team) => {

    var allenatori = [];
    var squadra = team.input.split(" ")[1];
    bot.sendMessage(msg.chat.id, "Elenco allenatori:");
    axios.get(uri + '?action=' + 'get_teams&league_id=148&APIkey=' + api)
        .then(function (response) {

            if (response.length != 0) {
                for (var i = 0; i < response.data.length; i++) {
                    if (response.data[i].team_name == squadra) {

                        for (var j = 0; j < response.data[i].coaches.length; j++) {
                            var allenatore = "Nome: " + response.data[i].coaches[j].coach_name + "\nNazione: " + response.data[i].coaches[j].coach_country + "\nEtà: " + response.data[i].coaches[j].coach_age + "\n\n";
                            allenatori.push(allenatore);
                        }
                    }
                    bot.sendMessage(msg.chat.id, allenatori.join("\n"));
                }

            }

        })
});


bot.onText(/\/event/, (msg, event) => {


    // var eventodiinizio= event.input.split()[];
    // var eventodifine = event.input.split()[];
    axios.get(uri + '?action=' + 'get_events&from=2019-04-01' + 'to=' + '&APIkey=' + api)
        .then(function (response) {
            // handle success
            if (response.length != 0) {
                console.log(response);
                bot.sendMessage(msg.chat.id, response.data.country_name);
            }

        })
});



bot.onText(/\/probabilita/, (msg, probabilita) => {


    // var eventodiinizio= event.input.split()[];
    // var eventodifine = event.input.split()[];
    axios.get(uri + '?action=' + 'get_odds&from=2019-04-02&to=2019-04-03' + '&APIkey=' + api)
        .then(function (response) {
            // handle success
            if (response.length != 0) {
                console.log(response);
                // bot.sendMessage(msg.chat.id, response.data);
            }

        })
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
                for (var i = 0; i < response.data.length; i++) {
                    bot.sendMessage(msg.chat.id, "nome: " + response.data[i].player_name + "\n" + response.data[i].player_number);
                }

            }

        })
});


bot.on("polling_error", function (err) {
    console.log(err);
});

