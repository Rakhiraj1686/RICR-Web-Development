function start() {
  console.log("Game Started");

  document.getElementById("roll1").disabled = false;
  document.getElementById("restart").disabled = false;
  document.getElementById("start").disabled = true;
  //   document.getElementById("roll2").disabled = false;
}
function restart() {
  window.location.reload();
  console.log("Game restart");
}
function p1Play() {
  console.log("Player1Playing");
  let Score = Number(document.getElementById("score1").innerText);

  const DF = Math.floor(Math.random() * 6) + 1;
  switch (DF) {
    case 1: {
      document.getElementById("p1dice").src = "./dice1.jpg;";
      break;
    }
    case 2: {
      document.getElementById("p1dice").src = "./dice2.jpg;";
      break;
    }
    case 3: {
      document.getElementById("p1dice").src = "./dice3.jpg;";
      break;
    }
    case 4: {
      document.getElementById("p1dice").src = "./dice4.jpg;";
      break;
    }
    case 5: {
      document.getElementById("p1dice").src = "./dice5.jpg;";
      break;
    }
    case 6: {
      document.getElementById("p1dice").src = "./dice6.jpg;";
      break;
    }
  }
  if (DF === 6) {
    document.getElementById("roll1").disabled = true;
    document.getElementById("roll2").disabled = false;
  } else {
    Score = Score + DF;
    document.getElementById("score1").innerText = Score;
  }
  //   console.log(DF);
}
function p2Play() {
  console.log("Player2Playing");
  let Score = Number(document.getElementById("score2").innerText);

  const DF = Math.floor(Math.random() * 6) + 1;
  //   shortcut switch case
  document.getElementById("p2dice").src = `./dice${DF}.jpg`;
  if (DF == 6) {
    document.getElementById("roll1").disabled = false;
    document.getElementById("roll2").disabled = true;
  } else {
    Score = Score + DF;
    document.getElementById("score2").innerText = Score;
  }
  //   console.log(DF);
}
