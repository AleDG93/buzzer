var file = require('./result.json');
var http = require('http');
var ShareDB = require('sharedb');
var WebSocket = require('ws');
var WebSocketJSONStream = require('@teamwork/websocket-json-stream');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var {Player} = require('./entities/player');
var {Team} = require('./entities/team');
var {Question} = require('./entities/question');
var {Answer} = require('./entities/answer');

var listOfQuestion = [];
file.questions.forEach(q => {
    var listOfAnswers = []
    for(var i = 0; i < q.answers.length; i++){
        var ans = new Answer(i, q.answers[i].text, q.answers[i].points)
        listOfAnswers.push(ans);
    }
    var newQuestion = new Question(q.text, listOfAnswers);
    listOfQuestion.push(newQuestion);
})

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
    var gameName = 'newgame';
    var playerName = '';
    var teamName = '';

    if(req.body['teamName'] && req.body['playerName']){
        teamName = req.body['teamName']
        playerName = req.body['playerName']
    } else {
        teamName = req.cookies('teamName');
        playerName = req.cookies('playerName');
    }

    connection.createFetchQuery(gameName, {}, {}, function(err, results) {
        if (err) {
            throw err;
        }
        if (results.length === 0){
            var doc = connection.get(gameName, '0');
            var newPlayer = new Player(0, playerName, teamName);
            
            /*
            var teamOrange = new Team('orange', [], 0, 0);
            var teamBlue = new Team('blue', [], 0, 0);
            if(teamName == 'orange'){
                teamOrange.players.push(newPlayer);
            } else {
                teamBlue.players.push(newPlayer);
            }
            */
            var teamOrange = new Team('orange',0, 0);
            var teamBlue = new Team('blue', 0, 0);
            var game = {
                "players": [newPlayer],
                "teamOrange": [teamOrange],
                "teamBlue": [teamBlue],
                "questions": listOfQuestion,
                "visibleAnswers": [-1,-1,-1,-1,-1,-1,-1,-1],
                "buzzer": -1,
                "turn": 0
            }
            doc.create(game);
            res.cookie('teamName', teamName);
            res.cookie('playerName', playerName);
            res.cookie('id', 0);
            res.render('pages/game');

        }  else {

            var doc = connection.get(gameName, '0');
            var wasRefresh = false;
            doc.data.players.forEach(player => {
                if(player.name == playerName){
                    wasRefresh = true;
                    res.cookie('teamName', player.team);
                    res.cookie('playerName', playerName);
                    res.cookie('id', player.id);
                }
            });
            if(!wasRefresh){
                var id = results[0].data.players.length;
                var newPlayer = new Player(id, playerName, teamName);
                doc.submitOp([{p:['players', results[0].data.players.length], li: newPlayer}]);
                res.cookie('teamName', teamName);
                res.cookie('playerName', playerName);
                res.cookie('id', id);
            }
            res.render('pages/game')    
        }
    });
});



