
class ElementsController {

    constructor(gameDoc, documentController){
        this.gameDoc = gameDoc;
        this.documentController = documentController;
    }

    rewriteMap(data){

        var blueTeamPlayers = [];
        var orangeTeamPlayers = [];

        data.players.forEach(player => {
            if(player.team == 'orange'){
                orangeTeamPlayers.push(player);
            } else if(player.team == 'blue') {
                blueTeamPlayers.push(player);
            }
        });

        if(data.buzzer != -1){
            document.getElementById('buzz').disabled = true;
        } else {
            document.getElementById('buzz').disabled = false;
        }

        /**
         * Add players into teams
         */
        var blueTeamDiv = document.getElementById('team-blue-players');
        blueTeamDiv.innerHTML = '';
        for(var i = 0; i < blueTeamPlayers.length; i++){
            var divPlayer = document.createElement('div');
            if(data.buzzer == blueTeamPlayers[i].id){
                divPlayer.setAttribute('class', 'col-2 playerDiv buzzed');
            } else {
                divPlayer.setAttribute('class', 'col-2 playerDiv');
            }            
            divPlayer.setAttribute('id', blueTeamPlayers[i].id);
            divPlayer.innerHTML = blueTeamPlayers[i].name;
            blueTeamDiv.appendChild(divPlayer);
        }

        var orangeTeamDiv = document.getElementById('team-orange-players');
        orangeTeamDiv.innerHTML = '';
        for(var i = 0; i < orangeTeamPlayers.length; i++){
            var divPlayer = document.createElement('div');
            if(data.buzzer == orangeTeamPlayers[i].id){
                divPlayer.setAttribute('class', 'col-2 playerDiv buzzed');
            } else {
                divPlayer.setAttribute('class', 'col-2 playerDiv');
            }
            divPlayer.setAttribute('id', orangeTeamPlayers[i].id);
            divPlayer.innerHTML = orangeTeamPlayers[i].name;
            orangeTeamDiv.appendChild(divPlayer);
        }

        var gameDoc = this.gameDoc;
        var documentController = this.documentController;

        console.log(data);

        var visibleAnswers = [];
        for(var j = 0; j < 8; j++){
            if(data.visibleAnswers[j] == 0){
                visibleAnswers.push(j);
            }
        }

        /**
         * Write hidden answers content
        */

        var questionTable = document.getElementById('question-table');
        questionTable.innerHTML = '';

        var tBody = document.createElement('tbody');
        
        // Create table row Question
        var tRowQuestion = document.createElement('tr');
        var tdQuetsion = document.createElement('td');
        tdQuetsion.setAttribute('colspan', '2');
        tdQuetsion.innerHTML = data.questions[data.turn].text;
        tRowQuestion.appendChild(tdQuetsion);

        // Create table rows for Answers
        // Answers 1 and 5
        var tRowAnswer1 = document.createElement('tr');
        var tDataAnswer1 = document.createElement('td');
        var tDataAnswer5 = document.createElement('td');
        if(visibleAnswers.includes(0)){
            tDataAnswer1.innerHTML = data.questions[data.turn].answers[0].text + " " + data.questions[data.turn].answers[0].points
        }
        if(visibleAnswers.includes(4)){
            tDataAnswer5.innerHTML = data.questions[data.turn].answers[4].text + " " + data.questions[data.turn].answers[4].points
        }
        tRowAnswer1.appendChild(tDataAnswer1);
        tRowAnswer1.appendChild(tDataAnswer5);

        // Answers 2 and 6
        var tRowAnswer2 = document.createElement('tr');
        var tDataAnswer2 = document.createElement('td');
        var tDataAnswer6 = document.createElement('td');
        if(visibleAnswers.includes(1)){
            tDataAnswer2.innerHTML = data.questions[data.turn].answers[1].text + " " + data.questions[data.turn].answers[1].points
        }
        if(visibleAnswers.includes(5)){
            tDataAnswer6.innerHTML = data.questions[data.turn].answers[5].text + " " + data.questions[data.turn].answers[5].points
        }
        tRowAnswer2.appendChild(tDataAnswer2);
        tRowAnswer2.appendChild(tDataAnswer6);

        // Answers 3 and 7
        var tRowAnswer3 = document.createElement('tr');
        var tDataAnswer3 = document.createElement('td');
        var tDataAnswer7 = document.createElement('td');

        if(visibleAnswers.includes(2)){
            tDataAnswer3.innerHTML = data.questions[data.turn].answers[2].text + " " + data.questions[data.turn].answers[2].points
        }
        if(visibleAnswers.includes(6)){
            tDataAnswer7.innerHTML = data.questions[data.turn].answers[6].text + " " + data.questions[data.turn].answers[6].points
        }
        
        tRowAnswer3.appendChild(tDataAnswer3);
        tRowAnswer3.appendChild(tDataAnswer7);
        
        // Answers 4 and 8
        var tRowAnswer4 = document.createElement('tr');
        var tDataAnswer4 = document.createElement('td');
        var tDataAnswer8 = document.createElement('td');
        
        if(visibleAnswers.includes(3)){
            tDataAnswer4.innerHTML = data.questions[data.turn].answers[3].text + " " + data.questions[data.turn].answers[3].points
        }
        if(visibleAnswers.includes(7)){
            tDataAnswer8.innerHTML = data.questions[data.turn].answers[7].text + " " + data.questions[data.turn].answers[7].points
        }
        
        tRowAnswer4.appendChild(tDataAnswer4);
        tRowAnswer4.appendChild(tDataAnswer8);

        // Append rows to body
        tBody.appendChild(tRowQuestion);
        tBody.appendChild(tRowAnswer1);
        tBody.appendChild(tRowAnswer2);
        tBody.appendChild(tRowAnswer3);
        tBody.appendChild(tRowAnswer4);

        // Append body to table
        questionTable.appendChild(tBody);



        /**
         * Hosts table answers content
         */

        var hQuestionTable = document.getElementById('host-question-table');
        hQuestionTable.innerHTML = '';

        var htBody = document.createElement('tbody');
        
        // Create table row Question
        var htRowQuestion = document.createElement('tr');
        var htdQuetsion = document.createElement('td');
        htdQuetsion.setAttribute('colspan', '2');
        htdQuetsion.innerHTML = data.questions[data.turn].text;
        htRowQuestion.appendChild(htdQuetsion);

        // Create table rows for Answers
        // Answers 1 and 5
        var htRowAnswer1 = document.createElement('tr');

        var htDataAnswer1 = document.createElement('td');
        var buttonAnswer1 = document.createElement('button');
        buttonAnswer1.innerHTML = 'Show answer';
        buttonAnswer1.addEventListener("click", function(){
            documentController.showAnswer(0, gameDoc);
        });
       
        var htDataAnswer5 = document.createElement('td');
        var buttonAnswer5 = document.createElement('button');
        buttonAnswer5.innerHTML = 'Show answer';
        buttonAnswer5.addEventListener("click", function(){
            documentController.showAnswer(4, gameDoc);
        });

        htDataAnswer1.innerHTML = data.questions[data.turn].answers[0].text + " " + data.questions[data.turn].answers[0].points
        htDataAnswer5.innerHTML = data.questions[data.turn].answers[4].text + " " + data.questions[data.turn].answers[4].points

        htDataAnswer1.appendChild(buttonAnswer1);
        htDataAnswer5.appendChild(buttonAnswer5);
        
        htRowAnswer1.appendChild(htDataAnswer1);
        htRowAnswer1.appendChild(htDataAnswer5);

        // Answers 2 and 6
        var htRowAnswer2 = document.createElement('tr');

        var htDataAnswer2 = document.createElement('td');
        var buttonAnswer2 = document.createElement('button');
        buttonAnswer2.innerHTML = 'Show answer';
        buttonAnswer2.addEventListener("click", function(){
            documentController.showAnswer(1, gameDoc);
        });

        var htDataAnswer6 = document.createElement('td');
        var buttonAnswer6 = document.createElement('button');
        buttonAnswer6.innerHTML = 'Show answer';
        buttonAnswer6.addEventListener("click", function(){
            documentController.showAnswer(5, gameDoc);
        });


        htDataAnswer2.innerHTML = data.questions[data.turn].answers[1].text + " " + data.questions[data.turn].answers[1].points
        htDataAnswer6.innerHTML = data.questions[data.turn].answers[5].text + " " + data.questions[data.turn].answers[5].points

        htDataAnswer2.appendChild(buttonAnswer2);
        htDataAnswer6.appendChild(buttonAnswer6);

        htRowAnswer2.appendChild(htDataAnswer2);
        htRowAnswer2.appendChild(htDataAnswer6);

        // Answers 3 and 7
        var htRowAnswer3 = document.createElement('tr');

        var htDataAnswer3 = document.createElement('td');
        var buttonAnswer3 = document.createElement('button');
        buttonAnswer3.innerHTML = 'Show answer';
        buttonAnswer3.addEventListener("click", function(){
            documentController.showAnswer(2, gameDoc);
        });

        var htDataAnswer7 = document.createElement('td');
        var buttonAnswer7 = document.createElement('button');
        buttonAnswer7.innerHTML = 'Show answer';
        buttonAnswer7.addEventListener("click", function(){
            documentController.showAnswer(6, gameDoc);
        });

        htDataAnswer3.innerHTML = data.questions[data.turn].answers[2].text + " " + data.questions[data.turn].answers[2].points
        htDataAnswer7.innerHTML = data.questions[data.turn].answers[6].text + " " + data.questions[data.turn].answers[6].points
        
        htDataAnswer3.appendChild(buttonAnswer3);
        htDataAnswer7.appendChild(buttonAnswer7);

        htRowAnswer3.appendChild(htDataAnswer3);
        htRowAnswer3.appendChild(htDataAnswer7);
        
        // Answers 4 and 8
        var htRowAnswer4 = document.createElement('tr');

        var htDataAnswer4 = document.createElement('td');
        var buttonAnswer4 = document.createElement('button');
        buttonAnswer4.innerHTML = 'Show answer';
        buttonAnswer4.addEventListener("click", function(){
            documentController.showAnswer(3, gameDoc);
        });

        var htDataAnswer8 = document.createElement('td');
        var buttonAnswer8 = document.createElement('button');
        buttonAnswer8.innerHTML = 'Show answer';
        buttonAnswer8.addEventListener("click", function(){
            documentController.showAnswer(7, gameDoc);
        });

        htDataAnswer4.innerHTML = data.questions[data.turn].answers[3].text + " " + data.questions[data.turn].answers[3].points
        htDataAnswer8.innerHTML = data.questions[data.turn].answers[7].text + " " + data.questions[data.turn].answers[7].points

        htDataAnswer4.appendChild(buttonAnswer4);
        htDataAnswer8.appendChild(buttonAnswer8);

        htRowAnswer4.appendChild(htDataAnswer4);
        htRowAnswer4.appendChild(htDataAnswer8);

        // Append rows to body
        htBody.appendChild(htRowQuestion);
        htBody.appendChild(htRowAnswer1);
        htBody.appendChild(htRowAnswer2);
        htBody.appendChild(htRowAnswer3);
        htBody.appendChild(htRowAnswer4);

        // Append body to table
        hQuestionTable.appendChild(htBody);
    
    }
}

module.exports = {ElementsController};