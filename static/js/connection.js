var ReconnectingWebSocket = require('reconnecting-websocket');
var sharedb = require('sharedb/lib/client');
var {DocumentController} = require('./documentController');
var {ElementsController} = require('./elementsController');


// Expose a singleton WebSocket connection to ShareDB server
var socket = new ReconnectingWebSocket('ws://' + window.location.host);
var connection = new sharedb.Connection(socket);
var documentController = new DocumentController();
var elementsController = new ElementsController();

var gameDoc = connection.get(getCookie('game'), '0');
gameDoc.subscribe(makeMove);
gameDoc.on('op', makeMove);

function makeMove(){
    elementsController.rewriteMap(gameDoc.data);
}

function requestManager(input){

    var playerId = getCookie('id');
    var playerName = getCookie('playerName');
    
    if(input == 'loseSheep'){
        documentController.loseSheep(playerId, gameDoc);
    } else if(input == 'gainSheep'){
        documentController.gainSheep(playerId, gameDoc)
    } else if(input == 'goBackward'){
        documentController.goBackward(playerId, gameDoc);
    } else if(input == 'goForward'){
        documentController.goForward(playerId, gameDoc);
    } else if(input == 'throwDie'){
        documentController.throwDie(gameDoc);
    } else if(input == 'throwDice'){
        documentController.throwDice(playerId, gameDoc);
    } else if(input == 'selectedHigher'){
        documentController.selectedHigher(gameDoc);
    } else if(input == 'selectedLower'){
        documentController.selectedLower(gameDoc);
    } else if(input == 'drawCard'){
        documentController.drawCard(gameDoc);
    } else if(input == 'loseRelationsheep'){
        documentController.loseRelationSheep(playerId, gameDoc);
    } else if(input == 'getRelationsheep'){
        documentController.getRelationSheep(playerId, gameDoc);
    } else if(input == 'loseWorsheep'){
        documentController.loseWorSheep(playerId, gameDoc);
    } else if(input == 'getWorsheep'){
        documentController.getWorSheep(playerId, gameDoc);
    }
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

global.requestManager = requestManager

module.exports = connection