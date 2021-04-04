var result = document.getElementById("result");
var player = document.querySelector("player");
var playerScore = document.getElementById("player-score");
var dealer = document.querySelector("dealer");
var dealerScore = document.getElementById("dealer-score");
var hitBtn = document.getElementById("hit-btn");
var standBtn = document.getElementById("stand-btn");
var dealBtn = document.getElementById("deal-btn");
var playerImg = document.getElementById("player-img");
var dealerImg = document.getElementById("dealer-img");

var cardsObj = {
  1: "A.png",
  2: "2.png",
  3: "3.png",
  4: "4.png",
  5: "5.png",
  6: "6.png",
  7: "7.png",
  8: "8.png",
  9: "9.png",
  10: "10.png",
  11: "K.png",
  12: "J.png",
  13: "Q.png",
};

var cards = {
  "2.png": 2,
  "3.png": 3,
  "4.png": 4,
  "5.png": 5,
  "6.png": 6,
  "7.png": 7,
  "8.png": 8,
  "9.png": 9,
  "10.png": 10,
  "A.png": [1, 11],
  "J.png": 10,
  "K.png": 10,
  "Q.png": 10,
};

var playerTurn = false;
var isStandValid = true;
var scorePlayer = 0;
var scoreDealer = 0;
var wins = 0;
var loss = 0;
var draw = 0;
var i = 0;
var j = 0;
var img1;
var img2;
var aww = new Audio("./sounds/aww.mp3");
var cash = new Audio("./sounds/cash.mp3");
var swish = new Audio("./sounds/swish.m4a");

function reset() {
  playerTurn = false;
  isStandValid = true;
  scorePlayer = 0;
  scoreDealer = 0;
  playerScore.textContent = "0";
  dealerScore.textContent = "0";
  result.textContent = "Let's Play";
  result.style.color = "white";
  dealerScore.style.color = "white";
  playerScore.style.color = "white";
  //   dealerImg.remove("img");
  //   playerImg.remove("img");
  for (var k = 0; k < i; k++) {
    var nameImagePlayer = `playerImage${k}`;
    var removePlayerImage = document.getElementById(nameImagePlayer);
    removePlayerImage.parentNode.removeChild(removePlayerImage);
  }

  for (var k = 0; k < j; k++) {
    var nameImageDealer = `dealerImage${k}`;
    var removeDealerImage = document.getElementById(nameImageDealer);
    removeDealerImage.parentNode.removeChild(removeDealerImage);
  }
  i = 0;
  j = 0;

  img1 = "";
  img2 = "";
}

function cardRandom() {
  var val = Math.round(Math.random() * 12) + 1;
  card = cardsObj[val];
  cardValue = cards[card];
  return [card, cardValue];
}

function playerFn() {
  if (!playerTurn) {
    var cardDetails = cardRandom();
    swish.play();
    if (cardDetails[0] === "A.png") {
      if (scorePlayer + cardDetails[1][1] > 21) {
        scorePlayer += cardDetails[1][0];
      } else {
        scorePlayer += cardDetails[1][1];
      }
    } else {
      scorePlayer += cardDetails[1];
    }

    img1 = document.createElement("img");
    img1.src = `./images/player/${cardDetails[0]}`;
    img1.id = `playerImage${i}`;
    i++;
    playerImg.appendChild(img1);
    if (scorePlayer > 21) {
      playerScore.textContent = "BUSTED!";
      playerScore.style.color = "red";
      result.textContent = "You Lost!";
      result.style.color = "red";
      loss++;
      isStandValid = false;
      document.getElementById("loss").textContent = loss;
      aww.play();
      playerTurn = true;
    } else {
      playerScore.textContent = scorePlayer;
    }
  }
}

function sleep() {
  return new Promise((resolve) => setTimeout(resolve, 750));
}

async function dealerFn() {
  playerTurn = true;
  if (isStandValid) {
    while (
      scoreDealer < 15 ||
      (Math.abs(scoreDealer - scorePlayer) >= 2 && 21 - scoreDealer > 3)
    ) {
      await sleep();
      var cardDetails = cardRandom();
      swish.play();
      if (cardDetails[0] === "A.png") {
        if (scoreDealer + cardDetails[1][1] > 21) {
          scoreDealer += cardDetails[1][0];
        } else {
          scoreDealer += cardDetails[1][1];
        }
      } else {
        scoreDealer += cardDetails[1];
      }

      img2 = document.createElement("img");
      img2.src = `./images/dealer/${cardDetails[0]}`;
      img2.id = `dealerImage${j}`;
      j++;
      dealerImg.appendChild(img2);
      if (scoreDealer > 21) {
        dealerScore.textContent = "BUSTED!";
        dealerScore.style.color = "red";
        result.textContent = "You won!";
        result.style.color = "#11f54e";
        wins++;
        document.getElementById("win").textContent = wins;
        cash.play();
        break;
      } else if (scoreDealer > scorePlayer) {
        dealerScore.textContent = scoreDealer;
        result.textContent = "You Lost!";
        result.style.color = "red";
        aww.play();
        // loss++;
        document.getElementById("loss").textContent = loss;
        break;
      } else {
        dealerScore.textContent = scoreDealer;
      }
    }
  }
  decideWinner(scorePlayer, scoreDealer);
}

function decideWinner(score_player, score_dealer) {
  if (score_dealer === score_player) {
    result.textContent = "Tied";
    result.style.color = "yellow";
    draw++;
    document.getElementById("draw").textContent = draw;
  } else if (score_player > score_dealer && score_player <= 21) {
    result.textContent = "You won!";
    result.style.color = "#11f54e";
    wins++;
    document.getElementById("win").textContent = wins;
    cash.play();
  } else if (score_player < score_dealer && score_dealer <= 21) {
    result.textContent = "You Lost!";
    result.style.color = "red";
    loss++;
    document.getElementById("loss").textContent = loss;
    aww.play();
  }
}

hitBtn.addEventListener("click", playerFn);
standBtn.addEventListener("click", dealerFn);
dealBtn.addEventListener("click", reset);
