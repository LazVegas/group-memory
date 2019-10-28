/* ---------- From the Deck string, separate the "cards" and shuffle the deck ---------- */
function shuffle(deck) {
  let currentIndex = deck.length
  let temporaryValue
  let randomIndex
  const newArray = deck.slice()
  // While there remains elements to shuffle...
  while (currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    // Swap it with the current element.
    temporaryValue = newArray[currentIndex]
    newArray[currentIndex] = newArray[randomIndex]
    newArray[randomIndex] = temporaryValue
  }
  return newArray
}

/* ---------- Deal the Deck ---------- */
function readyDeck(deck) {
  let buttons = ""
  deck = shuffle(deck.split(""))
  deck.forEach(l => {
    buttons += `<button class="face-down">${l.toUpperCase()}</button>`
  })
  $("#buttons").html(buttons)
}

/* ---------- If the Reset button is clicked, reload/reset the game ---------- */
function resetGame() {
  document.location.reload(true)
} 


function timer() {
  timerRunning = true
  setInterval(function() {
    var elapsedTime = Date.now() - startTime
    $(".timer").html(`Time: ${getTimeStr(elapsedTime)}`)
  }, 100)
}

function handleGame() {
  let arrCards = []
  // Handling cards
  $("#buttons").on("click", "button", function(e) {
    e.preventDefault()
    if (!timerRunning) {
      timer()
    }
    // putting values of clicked cards into the array
    //if 2 cards are active, disables you from selecting other cards
    if (!$(this).hasClass("stay")) {
      //alert($(this).hasClass("stay"))
      arrCards.push($(this))
    }
    if (
      arrCards.length <= 2 &&
      !$(this).hasClass("face-up") &&
      !$(this).hasClass("stay")
    ) {
      $(this)
        .not(".stay")
        .toggleClass("face-up")
    }
    if (arrCards.length === 2) {
      turn = turn + 1
      $(".turns").html(turn)  /* Laz: Adding the number of turns */
      // if total cards in array are equal to 2 then compare win/lose scenario
      if (arrCards[0].html() != arrCards[1].html()) {
        setTimeout(function() {
          arrCards[0].toggleClass("face-up")
          arrCards[1].toggleClass("face-up")
          arrCards = []
        }, 1200)
        boo.play()
      } else {
        pairs = pairs + 1
        $(".completed").html(pairs)  /* Laz: Adding the number completed */
        arrCards[0].addClass("stay")
        arrCards[1].addClass("stay")
        win.play()
        arrCards = []
        if (pairs === 9) {
          clearInterval(counter) //to stop interval
          timerscore()
          turnsScore(turn)
          winnerScreen()
        }
      }
    }
  })
}

function getTimeStr(milliseconds) {
  var minutes = milliseconds / 60000
  var sec=milliseconds/1000
  var intMinutes = Math.floor(minutes)
  var seconds = Math.floor((minutes - intMinutes) * 60)
  return (
    intMinutes +
    ":" +
    (seconds < 10 ? "0" + seconds.toFixed(0) : seconds.toFixed(0))
  )
}

/* ---------- Start: Bonus based on time ---------- */ 
function timerscore() {
  let howmanysecs = sec
  if (howmanysecs < 30) {
    timerbonus = 3
  } else if (howmanysecs >= 30 && howmanysecs < 60) {
    timerbonus = 2
  } else if (howmanysecs >= 60 && howmanysecs < 90) {
    timerbonus = 1
  } else {
    timerbonus = 0
  }
  console.log("timerbonus" + timerbonus)
  console.log(howmanysecs + " how many Secs")
  console.log("secs " + sec)
}
/* ---------- End: Bonus based on time ---------- */ 

/* ---------- Start: Bonus based on turns ---------- */ 
function turnsScore() {
  if(turn>=0 && turn<=15) {
    turnbonus=10
  } else if (turn>=25) {
    turnbonus=0
  } switch (turn) {
      case 16:
        turnbonus = 9;
        break
      case 17:
        turnbonus = 8;
        break
      case 18:
        turnbonus = 7;
        break
      case 19:
        turnbonus = 6;
        break
      case 20:
        turnbonus = 5;
        break
      case 21:
        turnbonus = 4;
        break
      case 22:
        turnbonus = 3;
        break
      case 23:
        turnbonus = 2;
        break
      case 24:
        turnbonus = 1;
        break
  }
}
/* ---------- End: Bonus based on turns ---------- */ 

/* ---------- Start: Outcome = timebonus + turnbonus ---------- */ 
function finalscreen(){
  if (result > 9) {
    outcome="Amazing!!!";
   } else if (result === 7 || result === 8){
    outcome="Great Job!";
   } else if (result === 5 || result === 6){
    outcome="Not Bad";
   } else if (result === 3 || result === 4){
    outcome="You can do Better";
   } else if (result < 3) {
    outcome="Try something else!!";
   }
}

function winnerScreen() {
  result = turnbonus + timerbonus
  finalscreen()
  $(".outcome").html(result)
  $(".outcome").html(outcome)
  $(".outcome").show()
}
/* ---------- End: Outcome = timebonus + turnbonus ---------- */ 

$(document).ready(function() {
  readyDeck(deck)
  handleGame()
})