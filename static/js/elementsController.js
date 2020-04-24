class ElementsController {


    drawCard(){

    }

    rewriteMap(data){

        

        /**
         * Roll and set results to die
         */
        this.rollDie(data.prevDice);
        /**
         * Apply changes to heaven dice and roll dice
         */
        if(data.heaven[0].die1 > 0){
            this.rollDice(data.heaven[0].die1, data.heaven[0].die2);
        }

        /**
         * Apply changes to cards text area
         */

        var cardTitle = document.getElementById('card-title');
        var cardDescription = document.getElementById('card-description');
 
        if(data.cards[0] != null){
            cardTitle.innerHTML = data.cards[0].title;
            cardDescription.innerHTML = data.cards[0].description;
        }
        /**
         * Apply change to "Higher" or "Lower"
         

        var higherButton = document.getElementById('higher-button');
        var lowerButton = document.getElementById('lower-button');
        if(data.button == 1){
            higherButton.setAttribute('class', 'btn btn-primary higher-lower');
            lowerButton.setAttribute('class', 'btn btn-outline-secondary higher-lower');
        } else if(data.button == 0){
            higherButton.setAttribute('class', 'btn btn-outline-secondary higher-lower');
            lowerButton.setAttribute('class', 'btn btn-primary higher-lower');
        }
        */

        /**
         * Apply changes to the map
         */

        var mapDiv = document.getElementById('map-div');
        mapDiv.innerHTML = '';
        var colspan = Math.floor(12 / data.players.length);
        
        data.players.forEach(player => {
            
            var colDiv = document.createElement('div');
            colDiv.setAttribute('class', 'col-' + colspan);
            colDiv.setAttribute('id', player.id);

            // Create icons row
            var iconRow = document.createElement('div');
            iconRow.setAttribute('class', 'row icon-row');

            if(data.heaven[0].players[player.id] > 0){
                var h4heaven = document.createElement('label');
                h4heaven.setAttribute('class', 'label-player');
                h4heaven.innerHTML = data.heaven[0].players[player.id];
                iconRow.appendChild(h4heaven);
            }

            var heartImg = document.createElement('img');
            heartImg.setAttribute('src', '/images/heart.png');
            heartImg.setAttribute('class', 'icon-image');

            heartImg.style.visibility = "hidden";

            var worsheepImg = document.createElement('img');
            worsheepImg.setAttribute('src', '/images/worsheep.png');
            worsheepImg.setAttribute('class', 'icon-image');
            worsheepImg.style.visibility = "hidden";
            
            player.gadget.forEach(el => {
                if(el == 'relation'){
                    heartImg.style.visibility = "visible";
                } else if (el == 'worsheep') {
                    worsheepImg.style.visibility = "visible";
                }
            })

            // Append images to iconRow
            iconRow.appendChild(heartImg);
            iconRow.appendChild(worsheepImg);

            // Append icon row to colDiv
            colDiv.appendChild(iconRow);

            // Create first row with names
            var rowDiv1 = document.createElement('div');
            rowDiv1.setAttribute('class', 'row');
            // Create button
            var labelPlayer = document.createElement('label');
            labelPlayer.setAttribute('id', player.id);
            labelPlayer.setAttribute('class', 'label-player');
            labelPlayer.innerHTML = player.name;

            // Append button to first row
            rowDiv1.appendChild(labelPlayer);

            // Create second row with map
            var rowDiv2 = document.createElement('div');
            rowDiv2.setAttribute('class', 'row');
            
            // Create large dive
            var largDiv = document.createElement('div');
            largDiv.setAttribute('class', 'large-8 large-centered');

            // Create map wrapper
            var wrapperDiv = document.createElement('div');
            wrapperDiv.setAttribute('class', 'map-wrapper');
            if (player.position < 30){

                // Create normal map
                for(var i = 0; i < 10; i++){
                            

                    // Create player "pawn"
                    var circleDiv = document.createElement('div');
                    circleDiv.setAttribute('class', 'map-circle');
                    var mapText = document.createElement('h5');
                    mapText.setAttribute('class', 'map-text');
                    if(i == player.position % 10){
                        // Create sheep image
                        var sheepImg = document.createElement('img');
                        sheepImg.setAttribute('src', '/images/sheep.png')
                        sheepImg.setAttribute('class', 'sheep-image');
                        circleDiv.appendChild(sheepImg);
                        mapText.innerHTML = player.numOfSheep;
                    }
                    var verticalDiv = document.createElement('div');
                    verticalDiv.setAttribute('class', 'vertical-line');
                    if(player.position < 10){
                        verticalDiv.style.backgroundColor = '#FF4605';
                        circleDiv.style.backgroundColor = '#FF4605';
                    } else if(player.position >= 10 && player.position < 20){
                        verticalDiv.style.backgroundColor = '#70483C';
                        circleDiv.style.backgroundColor = '#70483C';
                    } else if(player.position >= 20 && player.position < 30){
                        verticalDiv.style.backgroundColor = '#00FFFF';
                        circleDiv.style.backgroundColor = '#00FFFF';
                    }
                    // Append player "pawn" to map wrapper
                    circleDiv.appendChild(mapText);
                    wrapperDiv.appendChild(circleDiv);
                    wrapperDiv.appendChild(verticalDiv);
                }
            } else {
            
                var hDiceButton = document.getElementById('heaven-roll');
                var hDice = document.getElementById('heaven-dice');
                hDiceButton.style.display = 'grid';
                hDice.style.display = 'grid';

                // Create heaven
                for(var i = 0; i < 5; i++){
                            

                    // Create player "pawn"
                    var circleDiv = document.createElement('div');
                    circleDiv.setAttribute('class', 'map-circle');
                    var mapText = document.createElement('h5');
                    mapText.setAttribute('class', 'map-text');

                    switch(i){
                        case 1:
                            circleDiv.setAttribute('data-tooltip', 'Odd or Even');
                            break;
                        case 2:
                            circleDiv.setAttribute('data-tooltip', '[5 | 8 | 11] or [3 | 6 | 9]');
                            break;
                        case 3:
                            circleDiv.setAttribute('data-tooltip', '[4 | 8 | 12] or [2 | 6 | 10]');
                            break;
                        case 4:
                            circleDiv.setAttribute('data-tooltip', '[7] or [double]');                  
                    }


                    if(i == player.position % 10){
                        // Create sheep image
                        var sheepImg = document.createElement('img');
                        sheepImg.setAttribute('src', '/images/sheep.png')
                        sheepImg.setAttribute('class', 'sheep-image');
                        circleDiv.appendChild(sheepImg);
                        mapText.innerHTML = player.numOfSheep;
                    }
                    var verticalDiv = document.createElement('div');
                    verticalDiv.setAttribute('class', 'vertical-line');

                    verticalDiv.style.background = 'radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%),radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)';
                    circleDiv.style.background = 'radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%),radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)';

                    // Append player "pawn" to map wrapper
                    circleDiv.appendChild(mapText);
                    wrapperDiv.appendChild(circleDiv);
                    if(i!==4){
                        wrapperDiv.appendChild(verticalDiv);
                    }
                }
            }

            // Create vertical hr
            var verticalHr = document.createElement('hr');
            verticalHr.setAttribute('class', 'vertical map-hr');

            // Append wrapper to large div
            largDiv.appendChild(wrapperDiv);
            
            // Append large div and vertical hr to row
            rowDiv2.appendChild(largDiv);
            rowDiv2.appendChild(verticalHr);

            // Append rows to col-1
            colDiv.appendChild(rowDiv1);
            colDiv.appendChild(rowDiv2);

            // Append colDiv to map-div
            mapDiv.insertBefore(colDiv, mapDiv.firstChild);
        });
    }

    rollDice(num1, num2) {
        const die1 = document.querySelector('#hdie-1');
        const die2 = document.querySelector('#hdie-2');

        this.toggleClasses(die1);
        this.toggleClasses(die2);
        
        die1.dataset.roll = num1;
        die2.dataset.roll = num2;
        
      }
      

    rollDie(num) {
        const die = document.getElementById("die-1");
        this.toggleClasses(die);
        die.dataset.roll = num;
    }
      
    toggleClasses(die) {
        die.classList.toggle("odd-roll");
        die.classList.toggle("even-roll");
    }
}

module.exports = {ElementsController};