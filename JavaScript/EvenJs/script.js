function On() {
  document.getElementById("bulb").style.backgroundColor = "yellow";
}
function Off() {
  document.getElementById("bulb").style.backgroundColor = "White";
}
function Red() {
  document.getElementById("bulb").style.backgroundColor = "Red";
}
function Green() {
  document.getElementById("bulb").style.backgroundColor = "lightGreen";
}
function gray() {
  document.getElementById("bulb").style.backgroundColor = "gray";
}

const userColor = document.getElementById("color");

userColor.addEventListener("change", () => changeBulbColor(userColor.value));

function changeBulbColor(color) {
  document.getElementById("bulb").style.backgroundColor = color;
}

function sb_control() {
  // document.getElementById("smartBulb").classList.toggle
  const btn = document.getElementById("sb_btn");
  if (btn.innerText === "On") {
    document.getElementById("sb_btn").innerText = "Off";
    document.getElementById("smartBulb").classList.add("On");
  } else {
    document.getElementById("sb_btn").innerText = "On";
    document.getElementById("smartBulb").classList.remove("On");
  }
}

function sb_control2(){
    document.getElementById("smartBulb").classList.toggle("On")
}
