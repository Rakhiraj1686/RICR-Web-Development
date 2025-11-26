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
  switch(DF){
    case 1: {
        document.getElementById("pedice").src ="./image/1.png;"
    break;
    } 
    case 2: {
        document.getElementById("pedice").src ="./image/2.png;"
    break;
    } 
    case 3: {
        document.getElementById("pedice").src ="./image/3.png;"
    break;
    } 
    case 4: {
        document.getElementById("pedice").src ="./image/4.png;"
    break;
    } 
    case 5: {
        document.getElementById("pedice").src ="./image/5.png;"
    break;
    } 
    case 6: {
        document.getElementById("pedice").src ="./image/6.png;"
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
    document.getElementById("p1dice").src=`./image/$(DF).png`;
  if (DF == 6) {
    document.getElementById("roll1").disabled = false;
    document.getElementById("roll2").disabled = true;
  } else {
    Score = Score + DF;
    document.getElementById("score2").innerText = Score;
  }
//   console.log(DF);
}
