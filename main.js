document.addEventListener('DOMContentLoaded', init)

function init () {
  // addEventListener for board and reset buttons
  var board = document.getElementsByClassName('board')[0]
  board.addEventListener('click', play)
  var box = document.querySelectorAll('.box')
  var resetAlert = document.getElementsByClassName('reset')[0]
  resetAlert.addEventListener('click', reset)
  var resetButton = document.getElementsByClassName('reset')[1]
  resetButton.addEventListener('click', reset)

  // variable to store player turn, store what has been clicked, store x & 0 scores
  var playerTurn = 'x'
  var clickedB4 = []
  var xscore = []
  var oscore = []

  // store id of element clicked
  // push to clickedb4 array if not clicked before
  // insert img tags and change player
  // if clickedb4 length is 9, show alert
  function play (e) {
    if (e.target !== e.currentTarget) {
      var boxId = e.target.id
    }
    if (clickedB4.indexOf(boxId) < 0 && boxId) {
      var boxClicked = document.getElementById(boxId)
      if (playerTurn === 'x') {
        boxClicked.innerHTML = "<img src =\'images/cross.png\'/>"
        xscore.push(boxId)
        calculate(xscore)
        playerTurn = 'o'
      } else {
        boxClicked.innerHTML = "<img src =\'images/circle.png\'/>"
        oscore.push(boxId)
        calculate(oscore)
        playerTurn = 'x'
      }
      clickedB4.push(boxId)
      if (clickedB4.length === 9) {
        endGame()
      }
    }
    else {
      return
    }
  }

  function calculate (array) {
    var win = [['b1', 'b2', 'b3'], ['b4', 'b5', 'b6'], ['b7', 'b8', 'b9'], ['b1', 'b4', 'b7'], ['b2', 'b5', 'b8'], ['b3', 'b6', 'b9'], ['b1', 'b5', 'b9'], ['b3', 'b5', 'b7']]
    array.sort()
    for (var j = 0; j < win.length; j++) {
      if (array.indexOf(win[j][0]) > -1 && array.indexOf(win[j][1]) > -1 && array.indexOf(win[j][2]) > -1) {
        winner(array)
      }
    }
  }
  function endGame () {
    var alert = document.getElementsByClassName('alert')[0]
    alert.style.display = 'block'
    for (var i = 0; i < 9; i++) {
      box[i].classList.add('grey')
    }
    board.removeEventListener('click', play, false)
  }
  function winner (array) {
    var winner = document.getElementsByClassName('winner')[0]
    winner.style.display = 'block'
    var para = document.getElementsByTagName('p')[0]
    if (array === xscore) {
      para.textContent = 'Player X Wins!'
      endGame()
    }
    else if (array === oscore) {
      para.textContent = 'Player O Wins!'
      endGame()
    }
  }

  function reset () {
    window.location.reload()
  }
}
