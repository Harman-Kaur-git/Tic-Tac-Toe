let turn = "X";
document.getElementById("winner").style.display = "none";

//changes turn
function changeTurn() {
  // Removed playpressAudio() from here
  return turn === "X" ? "0" : "X";
}

//check winner or draw
function checkWinner() {
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let boxes = document.getElementsByClassName("boxtext");

  // Check for winner
  for (let e of wins) {
    let pos1value = boxes[e[0]].innerText;
    let pos2value = boxes[e[1]].innerText;
    let pos3value = boxes[e[2]].innerText;

    if (pos1value !== "" && pos1value === pos2value && pos2value === pos3value) {
      playWinAudio();
      document.getElementById("winner").innerText = "Winner: " + pos1value;
      document.getElementById("winner").style.fontSize = "3vw";
      document.getElementById("winner").style.display = "block";
      document.getElementById("user").style.display = "none";

      // Stop further moves
      return true;
    }
  }

  // Check for draw (all boxes filled and no winner)
  let isDraw = true;
  for (let box of boxes) {
    if (box.innerText === "") {
      isDraw = false;
      break;
    }
  }

  if (isDraw) {
    document.getElementById("winner").innerText = "It's a Draw!";
    document.getElementById("winner").style.fontSize = "3vw";
    document.getElementById("winner").style.display = "block";
    document.getElementById("user").style.display = "none";

    // Clear board after 2 seconds so user can see message
    setTimeout(() => {
      // Clear boxes here directly
      Array.from(boxes).forEach(box => {
        box.innerText = "";
      });
      turn = "X";
      document.getElementById("user").innerText = "Turn for " + turn;
      document.getElementById("winner").style.display = "none";
      document.getElementById("user").style.display = "block";
      playresetAudio();
    }, 1000);

    return true;
  }

  // No winner or draw
  return false;
}

//Game Logic
function gameLogic() {
  let boxes = document.getElementsByClassName("box");
  Array.from(boxes).forEach((element) => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener("click", () => {
      // Only allow move if box empty and game not ended
      if (
        boxtext.innerText === "" &&
        document.getElementById("winner").style.display === "none"
      ) {
        playpressAudio(); // Play sound on click here
        boxtext.innerText = turn;

        if (!checkWinner()) {
          turn = changeTurn();
          document.getElementById("user").innerText = "Turn for " + turn;
        }
      }
    });
  });
}

gameLogic();

function reset() {
  let resetBtn = document.getElementById("reset");
  resetBtn.onclick = () => {
    let boxes = document.getElementsByClassName("boxtext");
    Array.from(boxes).forEach((box) => {
      box.innerText = "";
    });
    turn = "X";
    document.getElementById("user").innerText = "Turn for " + turn;
    document.getElementById("winner").style.display = "none";
    document.getElementById("user").style.display = "block";
    playresetAudio();
  };
}

reset();

function playWinAudio() {
  const audio = document.getElementById("winaudio");
  audio.play();
}

function playresetAudio() {
  const audio = document.getElementById("resetaudio");
  audio.play();
}

function playpressAudio() {
  const audio = document.getElementById("pressaudio");
  audio.play();
}
