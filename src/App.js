import $ from 'jquery';
import React, { useState } from 'react';
import './App.css';



function App() {
  let numCards = 20;
  let cardsClicked = [];

  const [pairsMatched, setPairsMatched] = useState(0);


  function turnCard(id) {
    if (cardsClicked.length < 2) {
      $('#' + id + ' > .card-back').addClass("flipped");
      $('#' + id + ' > .card-front').addClass("flipped");
      $('#' + id).addClass("flipped");
      cardsClicked.push(id);
      if (cardsClicked.length === 2) {
        setTimeout(checkPair, 1000, cardsClicked[0], cardsClicked[1])
      }
    }
  }

  function turnCardBack(id) {
    $('#' + id + ' > .card-back').removeClass("flipped");
    $('#' + id + ' > .card-front').removeClass("flipped");
    $('#' + id).removeClass("flipped");
  }

  function checkPair(card1, card2) {
    let img1 = $('#' + card1 + ' > .card-front');
    let img2 = $('#' + card2 + ' > .card-front');

    if ($(img1).attr("src") === $(img2).attr("src")) {
      setPairsMatched(pairsMatched + 1);
      $('#' + card1).css('visibility', 'hidden');
      $('#' + card2).css('visibility', 'hidden');
      if (pairsMatched === numCards / 2) {
        $('#winningMessage').removeClass('d-none')
      }
    } else {
      turnCardBack(card1);
      turnCardBack(card2);
    }
    cardsClicked = [];
  }

  function createBoard() {
    $('#gameBoard').empty()
    cardsClicked = [];
    setPairsMatched(0);
    for (let i = 0; i < numCards; i++) {
      $('#gameBoard').append('<div class="card" id="card-' + i + '"><img class="card-back" src="./CatImages/card-background.jpg"/></div>')
      $('#card-' + i).on("click", function (event) {
        event.preventDefault();
        let id = $(this).attr('id');
        turnCard(id)
      })
    }
    setUpCards();
  }

  function setUpCards() {
    var list = []
    for (let n = 0; n < numCards; n++) {
      list.push(n)
    }

    for (let i = 1; i <= 10; i++) {
      let num1 = (Math.floor(Math.random() * list.length))
      let card1 = list[num1]
      $('#card-' + card1).append('<img class="card-front" src="./CatImages/Cat' + i + '.png" style="height: 100%; width: 100%; object-fit: contain"/>')
      list.splice(num1, 1)
      let num2 = (Math.floor(Math.random() * list.length))
      let card2 = list[num2]
      $('#card-' + card2).append('<img class="card-front" src="./CatImages/Cat' + i + '.png" style="height: 100%; width: 100%; object-fit: contain"/>')
      list.splice(num2, 1)
    }
  }


  return (

    <div className="App">
      <h1>Cat Memory Game</h1>
      <div id="newGame" className="btn btn-info" onClick={() => createBoard()}>New Game</div>
      <div id="gameBoard"></div>
      <div id="winningMessage" class="d-none">
        <div>Congratulations, you win!</div>
        <div>Click <em>New Game</em> to try again</div>
      </div>
    </div>
  );
}

export default App;