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
        console.log(points)
        if(team == 'orange'){
            var newPoints = parseInt(gameDocument.data.teamOrange[0].points) + parseInt(points);
            var newTeamOrange = new Team(gameDocument.data.teamOrange[0].name, newPoints, gameDocument.data.teamOrange[0].errors);  
            gameDocument.submitOp([{p:['teamOrange', 0], ld: gameDocument.data.teamOrange[0], li: newTeamOrange}]);  
        } else {
            var newPoints = parseInt(gameDocument.data.teamBlue[0].points) + parseInt(points);
            console.log(gameDocument.data.teamBlue[0].points)
            var newTeamBlue = new Team(gameDocument.data.teamBlue[0].name, newPoints, gameDocument.data.teamBlue[0].errors);
            console.log(newPoints)
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