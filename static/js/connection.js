var ReconnectingWebSocket = require('reconnecting-websocket');
var sharedb = require('sharedb/lib/client');
var {DocumentController} = require('./documentController');
var {ElementsController} = require('./elementsController');


// Expose a singleton WebSocket connection to ShareDB server
var socket = new ReconnectingWebSocket('ws://' + window.location.host);
var connection = new sharedb.Connection(socket);
let documentController = new DocumentController();

var gameDoc = connection.get('newgame', '0');
gameDoc.subscribe(makeMove);
gameDoc.on('op', makeMove);

var elementsController = new ElementsController(gameDoc, documentController);


function makeMove(){
    elementsController.rewriteMap(gameDoc.data);
}

function requestManager(input){

    var playerId = getCookie('id');
//    var playerName = getCookie('playerName');
    
    if(input == 'buzz'){
        documentController.buzz(playerId, gameDoc);
    } else if(input == 'resetBuzz'){
        documentController.resetBuzz(gameDoc)
//    } else if(input == 'addPoints'){
//        documentController.addPoints(team, points, gameDoc);
    } else if(input == 'nextQuestion'){
        documentController.nextQuestion(gameDoc);
    }
}

function showAnswer(answerId){
    console.log(answerId);
    documentController.showAnswer(gameDoc);
}

function addPoints(team, points){
    documentController.addPoints(team, points, gameDoc)
}


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

global.requestManager = requestManager;
global.showAnswer = showAnswer;
global.addPoints = addPoints;

module.exports = connection;