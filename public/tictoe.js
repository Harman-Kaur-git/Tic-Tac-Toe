let turn = "X";
document.getElementById("winner").style.display = "none";

//changes turn
function changeTurn() {
  playpressAudio();
  return turn === "X" ? "0" : "X";
}

//check winnner
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
  wins.forEach((e) => {
    let boxes = document.getElementsByClassName("boxtext");
    let pos1value = boxes[e[0]].innerText;
    let pos2value = boxes[e[1]].innerText;
    let pos3value = boxes[e[2]].innerText;
    if (pos1value != "" && pos2value != "" && pos3value != "") {
      if (pos1value === pos2value && pos2value === pos3value) {
        playWinAudio();
        let win = (document.getElementById("winner").innerText =
          "Winner " + pos1value);
        document.getElementById("winner").style.fontSize = "3vw";
        console.log(win);
        document.getElementById("winner").style.display = "block";
        document.getElementById("user").style.display = "none";
      }
    }
  });


// Check for draw (all boxes filled and no winner)
  let isDraw = true;
  for (let box of boxes) {
    if (box.innerText === "") {
      isDraw = false;
      break;
    }
  

  if (isDraw) {
    document.getElementById("winner").innerText = "It's a Draw!";
    let boxes=document.getElementsByClassName("boxtext");
    Array.from(boxes).forEach(box=>{
      box.innerHTML="";
    })
    document.getElementById("winner").style.fontSize = "3vw";
    document.getElementById("winner").style.display = "block";
    document.getElementById("user").style.display = "none";
    return true;  // draw found
  }

  return false; // no winner or draw yet
}
}

//Game Logic
function gameLogic() {
  let boxes = document.getElementsByClassName("box");
  Array.from(boxes).forEach((element) => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener("click", () => {
      if (boxtext.innerText === "") {
        boxtext.innerText = turn;
        turn = changeTurn();
        let newU = (document.getElementById("user").innerText =
          "Turn for " + turn);
        checkWinner();
      }
    });
  });
}

gameLogic();

function reset() {
  let reset = document.getElementById("reset");
  reset.onclick = () => {
    let boxes = document.getElementsByClassName("boxtext");
    Array.from(boxes).forEach((box) => {
      box.innerText = "";
      turn = "X";
      document.getElementById("user").innerText = "Turn for " + turn;
      document.getElementById("winner").style.display = "none";
      document.getElementById("user").style.display = "block";
      playresetAudio();
    });
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
