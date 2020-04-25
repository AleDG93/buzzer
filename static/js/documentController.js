var {Player} = require('../../entities/player');
var {Team} = require('../../entities/team');
var file = require('../../questions.json');

class DocumentController {


    buzz(playerId, gameDocument){
        var buzzedId = parseInt(playerId) + 1;
        gameDocument.submitOp([{p:['buzzer'], na: buzzedId}]);
    }


    resetBuzz(gameDocument){
        var buzzer = (parseInt(gameDocument.data.buzzer) + 1) * (-1);
        gameDocument.submitOp([{p:['buzzer'], na: buzzer}]);
    }

    addPoints(team, points, gameDocument){
        if(team == 'orange'){
            var newPoints = gameDocument.data.teamOrange.points + points;
            var newTeamOrange = new Team(gameDocument.data.teamOrange.name, newPoints, gameDocument.data.teamOrange.errors);
            gameDocument.submitOp([{p:['teamOrange', 0], ld: gameDocument.data.teamOrange[0], li: newTeamOrange}]);  
        } else {
            var newPoints = gameDocument.data.teamBlue.points + points;
            var teamBlue = new Team(gameDocument.data.teamBlue.name, newPoints, gameDocument.data.teamBlue.errors);
            gameDocument.submitOp([{p:['teamBlue', 0], ld: gameDocument.data.teamBlue[0], li: newTeamBlue}]);  
        }
    }

    addError(team, gameDocument){
        if(team == 'orange'){
            var newErrors = gameDocument.data.teamOrange.errors + 1;
            var newTeamOrange = new Team(gameDocument.data.teamOrange.name, gameDocument.data.teamOrange.points, newErrors);
            gameDocument.submitOp([{p:['teamOrange', 0], ld: gameDocument.data.teamOrange[0], li: newTeamOrange}]);  
        } else {
            var newErrors = gameDocument.data.teamBlue.errors + 1;
            var teamBlue = new Team(gameDocument.data.teamBlue.name, gameDocument.data.teamBlue.points, newErrors);
            gameDocument.submitOp([{p:['teamBlue', 0], ld: gameDocument.data.teamBlue[0], li: newTeamBlue}]);  
        }

    }

    resetError(team, gameDocument){
        if(team == 'orange'){
            var newTeamOrange = new Team(gameDocument.data.teamOrange.name, gameDocument.data.teamOrange.points, 0);
            gameDocument.submitOp([{p:['teamOrange', 0], ld: gameDocument.data.teamOrange[0], li: newTeamOrange}]);  
        } else {
            var teamBlue = new Team(gameDocument.data.teamBlue.name, gameDocument.data.teamBlue.points, 0);
            gameDocument.submitOp([{p:['teamBlue', 0], ld: gameDocument.data.teamBlue[0], li: newTeamBlue}]);  
        }
    }

    nextQuestion(gameDocument){
        for(var i = 0; i < 8; i++){
            // Replace values in visible answers with -1
            gameDocument.submitOp([{p:['visibleAnswers', i], ld: gameDocument.data.visibleAnswers[i], li: -1}])
        }
        gameDocument.submitOp([{p:['turn'], na: 1}]);
    }

    showAnswer(answerId, gameDocument){
        gameDocument.submitOp([{p:['visibleAnswers', answerId], na: 1}]);
    }


    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }
}

module.exports = {DocumentController}