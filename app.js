/*
GAME RULES:

- The game has 2 players, playing in rounds.
- In each turn, a player rolls a dice as many times as they whish. Each result get added to their ROUND score.
- BUT, if the player rolls a 1, all their ROUND score gets lost. After that, it's the next player's turn.
- The player can choose to 'Hold', which means that their ROUND score gets added to their GLBAL score. After that, it's the next player's turn.
- The first player to reach 100 points on GLOBAL score wins the game.

*/

let scores, roundScore, activePlayer, gamePlaying;

init();

// rules pop up on page load
var result = (function showRules() {
	alert("GAME RULES \n \n" +
	"▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n\n" +
	"• The game has 2 players, playing in rounds. \n" +
	"• In each turn, a player rolls a dice as many times as they whish. Each result get added to their ROUND score. \n" +
	"• BUT, if the player rolls a 1, all their ROUND score gets lost. After that, it's the next player's turn. \n" +
	"• The player can choose to 'Hold', which means that their ROUND score gets added to their GLOBAL score. After that, it's the next player's turn \n" +
	"• The first player to reach 100 points on GLOBAL score wins the game.");
})();
result;

// Event listeners
document.querySelector(".btn-roll").addEventListener("click", () => {
  if (gamePlaying) {
    // 1. Random number;
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    // var dice = 6;
    // 2. Display the result;
    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";
    document.getElementById("dice-1").src = `dice-${dice1}.png`;
    document.getElementById("dice-2").src = `dice-${dice2}.png`;
    // 3. Update the round score IF the rolled number was not a 1.
    if (dice1 !== 1 && dice2 !== 1) {
      // Add score
      roundScore += dice1 + dice2;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      // Next player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", () => {
  if (gamePlaying) {
    // Add CURRENT to Global score;
    scores[activePlayer] += roundScore;

    // Update the UI;
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    var input = document.querySelector(".final-score").value;
    var vinningScore;
    console.log(input);
    if (input) {
      vinningScore = input;
    } else {
      vinningScore = 100;
    }

    // Check if the user won;
    if (scores[activePlayer] >= vinningScore) {
      alert("You Won!!!");
      document.querySelector("#name-" + activePlayer).textContent = "Winner";
      document.querySelector("#dice-1").style.display = "none";
      document.querySelector("#dice-2").style.display = "none";
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.add("winner");
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer == 0 ? (activePlayer = 1) : (activePlayer = 0);

  roundScore = 0;

  document.getElementById("current-" + activePlayer).textContent = "0";

  document.querySelector(`.player-0-panel`).classList.toggle("active");
  document.querySelector(`.player-1-panel`).classList.toggle("active");

  document.querySelector("#dice-1").style.display = "none";
  document.querySelector("#dice-2").style.display = "none";

  document.querySelector(".btn-new").addEventListener("click", init);
}
function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector("#dice-1").style.display = "none";
  document.querySelector("#dice-2").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(`.player-0-panel`).classList.remove("winner");
  document.querySelector(`.player-1-panel`).classList.remove("winner");
  document.querySelector(`.player-0-panel`).classList.remove("active");
  document.querySelector(`.player-1-panel`).classList.remove("active");
  document.querySelector(`.player-0-panel`).classList.add("active");
}

// Alert for rules
function showRules() {
	alert("GAME RULES \n \n" +
	"▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n\n" +
	"• The game has 2 players, playing in rounds. \n" +
	"• In each turn, a player rolls a dice as many times as they whish. Each result get added to their ROUND score. \n" +
	"• BUT, if the player rolls a 1, all their ROUND score gets lost. After that, it's the next player's turn. \n" +
	"• The player can choose to 'Hold', which means that their ROUND score gets added to their GLOBAL score. After that, it's the next player's turn \n" +
	"• The first player to reach 100 points on GLOBAL score wins the game.");
}
