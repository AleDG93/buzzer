var http = require('http');
var ShareDB = require('sharedb');
var WebSocket = require('ws');
var WebSocketJSONStream = require('@teamwork/websocket-json-stream');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var {Player} = require('./entities/player');

// Start shareDB
var share = new ShareDB();

var app = express();

app.set('views', path.join(__dirname, 'views'));

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(path.posix.join(__dirname, 'static')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

// Create a web server to serve files and listen to WebSocket connections
var server = http.createServer(app);
server.listen(8080);

// Connect any incoming WebSocket connection to ShareDB
var wss = new WebSocket.Server({server: server});
wss.on('connection', function(ws) {
    var stream = new WebSocketJSONStream(ws);
    share.listen(stream);
});


// index page 
app.get('/', function(req, res) {

    res.render('pages/homepage');
});


// Create initial documents
var connection = share.connect();
app.post('/game', function(req, res){
    
    var gameName = '';
    var playerName = '';

    if(req.body['game'] && req.body['playerName']){
        gameName = req.body['game']
        playerName = req.body['playerName']
    } else {
        gameName = req.cookies('game');
        playerName = req.cookies('playerName');
    }

    connection.createFetchQuery(gameName, {}, {}, function(err, results) {
        if (err) {
            throw err;
        }
        if (results.length === 0){
            var doc = connection.get(gameName, '0');
            var newPlayer = new Player(0, playerName, 10, 0, [], 0, false);
            var heaven = new Heaven(0,0, new Array(12).fill(0));
            var game = {
                "turn": 0,
                "players": [newPlayer],
                "cards": [],
                "button": 0,
                "prevDice": 0,
                "heaven": [heaven]
            }
            doc.create(game);
            res.cookie('game', gameName);
            res.cookie('playerName', playerName);
            res.cookie('id', 0);
            res.render('pages/game')
        }  else {
            var doc = connection.get(gameName, '0');
            var wasRefresh = false;
            doc.data.players.forEach(player => {
                if(player.name == playerName){
                    wasRefresh = true;
                }
            });
            if(!wasRefresh){
                var id = results[0].data.players.length;
                var newPlayer = new Player(id, playerName, 10, 0, [], 0, false);
                doc.submitOp([{p:['players', results[0].data.players.length], li: newPlayer}]);
                res.cookie('game', gameName);
                res.cookie('playerName', playerName);
                res.cookie('id', id);
    
            }
            res.render('pages/game')    
        }
    });
});



