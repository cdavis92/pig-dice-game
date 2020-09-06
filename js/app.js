

var introRoll = setInterval(displayNextImage, 1500);
var intro = document.getElementById("intro");
var gameRules = document.getElementById("game-rules");
var game =  document.getElementById("game");
var settings = document.getElementById("game-settings");

// intro page showing random dice images
function displayNextImage() {

    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    var diceDOM1 = document.querySelector(".dice-A");
    var diceDOM2 = document.querySelector(".dice-B");
    diceDOM1.src = "img/dice-" + dice1 + '.png';
    diceDOM2.src = "img/dice-" + dice2 + '.png';

}


// event listener for play now button on intro page
document.querySelector("#play-A-btn").addEventListener('click', function() {

   intro.style.display = "none";
   gameRules.style.display = "none";
   settings.style.display = "block";
   game.style.display = "none";

});


// event listener for game rules button on intro page
document.querySelector("#rules-btn").addEventListener('click', function() {

   intro.style.display = "none";
   gameRules.style.display = "block";
   settings.style.display = "none";
   game.style.display = "none";

});

// event listener for play now button on game rules page
document.querySelector("#play-B-btn").addEventListener('click', function() {

   intro.style.display = "none";
   gameRules.style.display = "none";
   settings.style.display = "block";
   game.style.display = "none";

});

// event listener for play now button on game settings page
document.querySelector("#play-C-btn").addEventListener('click', gameSettings);


// game settings
function gameSettings() {

   var player1Name = document.getElementById("player-1-name").value;
   var player2Name = document.getElementById("player-2-name").value;
   var winningScore = document.getElementById("winning-score-number").value;
   var dice = document.getElementById("option-dice").value;

   // regex for player names and final score
   var letterRegex = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/i;
   var numberRegex = /^([5-9]\d|[1-9]\d{2,})$/;

   // arrays for input data and error messages
   var playerDataArr = [];
   var errors = [];

   var intro = document.getElementById("intro");
   var gameRules = document.getElementById("game-rules");
   var game =  document.getElementById("game");
   var gameSettings = document.getElementById("game-settings");

    // function to change the style of the element with the corrosponding id
    function errorStyle(id) {
        var el = document.getElementById(id);
        el.style.borderColor = "red";
        el.style.backgroundColor = "#ffece6";
    }

    // function to change the style of the element with the corrosponding id
    function errorLabelStyle(id) {
        var el = document.getElementById(id);
        el.style.color = "red";
    }

    // function to change the style of the element with the corrosponding id
    function passStyle(id) {
        var el = document.getElementById(id);
        el.style.borderColor = "green";
        el.style.backgroundColor = "#d6f5d6";
    }

    // function to change the style of the element with the corrosponding id
    function passLabelStyle(id) {
        var el = document.getElementById(id);
        el.style.color = "green";
    }

    // Validation for player names and final score, styling changes depending on validated data
   function validation(element, errorText, error, label, regex) {

    if (element == "" || element == null || !element || element === [] || !regex.test(element)) {
        errors.push(errorText);
        errorStyle(error);
        errorLabelStyle(label);
    } else {
        passStyle(error);
        passLabelStyle(label);
    }

   }

    validation(player1Name, "Please enter a name for Player 1 (letters and numbers only).", "player-1-name", "player-1-label", letterRegex);
    validation(player2Name, "Please enter a name for Player 2 (letters and numbers only).", "player-2-name", "player-2-label", letterRegex);
    validation(winningScore, "Please enter a final score that is greater than or equal to 50 (numbers only).", "winning-score-number", "winning-score-label", numberRegex);


    // alert error messages depending on validation
    if (errors.length) {
        event.preventDefault();
        alert(errors.join("\n\n"));
        return false;
    } else {
       intro.style.display = "none";
       gameRules.style.display = "none";
       gameSettings.style.display = "none";
       game.style.display = "block";
       init(player1Name, player2Name, winningScore, dice);
       return true;
    }

}


// new game settings - this runs if players click on the 'new game' button on the main game page
function newGameSettings() {

   var player1Name = document.getElementById("player-1-name").value;
   var player2Name = document.getElementById("player-2-name").value;
   var winningScore = document.getElementById("winning-score-number").value;

   var player1Label = document.getElementById("player-1-label");
   var player2Label = document.getElementById("player-2-label");
   var winningScoreLabel = document.getElementById("winning-score-label");

   var playerDataArr = [];

   var intro = document.getElementById("intro");
   var gameRules = document.getElementById("game-rules");
   var game =  document.getElementById("game");
   var gameSettings = document.getElementById("game-settings");

   intro.style.display = "none";
   gameRules.style.display = "none";
   gameSettings.style.display = "block";
   game.style.display = "none";

   init(player1Name, player2Name, winningScore);

}

var scores, roundScore, activePlayer, gamePlaying;



document.querySelector(".btn-roll-1").addEventListener('click', function() {

    // condition is if the statement is true or false value
    // gamePlaying is true in the init() function
    if (gamePlaying) {
        // 1. random number
        var dice = Math.floor(Math.random() * 6) + 1;


        // 2. display the result
        var diceDOM = document.querySelector(".dice");
        diceDOM.style.display = "block";
        diceDOM.src = "img/dice-" + dice + '.png';

        // 3. update the round score but only if the rolled number was not a 1
        if (dice !== 1) {
            // add score
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
            // next player
            nextPlayer();  
        }
    }

});




// annonymous function is a nameless function, can not re-use in another piece of code
document.querySelector(".btn-roll-2").addEventListener('click', function() {

    // condition is if the statement is true or false value
    // gamePlaying is true in the init() function
    if (gamePlaying) {
        // 1. random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        var dice = dice1 + dice2;

        // 2. display the result
        var diceDOM1 = document.querySelector(".dice-1");
        var diceDOM2 = document.querySelector(".dice-2");
        diceDOM1.style.display = "block";
        diceDOM1.src = "img/dice-" + dice1 + '.png';
        diceDOM2.style.display = "block";
        diceDOM2.src = "img/dice-" + dice + '.png';
        diceDOM2.src = "img/dice-" + dice2 + '.png';

        // 3. update the round score but only if the rolled number was not a 1
        if (dice1 !== 1 && dice2 !== 1) {
            // add score
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
            // next player
            nextPlayer();  
        }
    }

});


document.querySelector(".btn-hold").addEventListener('click', function() {

    if (gamePlaying) {
        // Add current score to GLOBAL score
        scores[activePlayer] += roundScore;

        // update the UI 
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector(".winning-score").value;
        var winningScore;

        if (input) {
            var winningScore = input;
        } else {
            winningScore = 50;
        }

        if (scores[activePlayer] >= winningScore) {
            document.querySelector("#name-" + activePlayer).textContent = "WINNER! 🎉";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".dice-1").style.display = "none";
            document.querySelector(".dice-2").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }

});


function nextPlayer() {

    // next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    // reset current score back to 0
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    // toggle
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.querySelector(".dice").style.display = "none";    

    document.querySelector(".dice-1").style.display = "none";
    document.querySelector(".dice-2").style.display = "none";

}


document.querySelector(".btn-new").addEventListener('click', newGameSettings);


function init(player1Name, player2Name, score, dice) {

    var player1 = player1Name;
    var player2 = player2Name;
    var winningScore = score;

    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;


    // if number of dice selected is 1, hide btn-roll-2, else hide btn-roll-1
    if (dice == 1) {
      document.querySelector(".btn-roll-1").style.display = "block";
      document.querySelector(".btn-roll-2").style.display = "none";
    } else if (dice == 2) {
      document.querySelector(".btn-roll-1").style.display = "none";
      document.querySelector(".btn-roll-2").style.display = "block";
    } else {
      document.querySelector(".btn-roll-1").style.display = "block";
      document.querySelector(".btn-roll-2").style.display = "none";
    }

    // state variable tells us a condition of a system
    // need a state variable to remember a state of something (is our game playing or not playing)
    gamePlaying = true;
    
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice-1").style.display = "none";
    document.querySelector(".dice-2").style.display = "none";

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.getElementById("name-0").textContent = player1;
    document.getElementById("name-1").textContent = player2;

    document.querySelector(".winning-score").value = winningScore;

    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");

    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");

    document.querySelector(".player-0-panel").classList.add("active");

}

