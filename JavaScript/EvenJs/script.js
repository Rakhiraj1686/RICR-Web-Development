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


document.getElementById("c1").addEventListener("mouseenter",()=>{fillColour("Violet")})
document.getElementById("c1").addEventListener("mouseleave",()=>{fillColour("White")})

document.getElementById("c2").addEventListener("mouseenter",()=>{fillColour("Indigo")})
document.getElementById("c2").addEventListener("mouseleave",()=>{fillColour("White")})

document.getElementById("c3").addEventListener("mouseenter",()=>{fillColour("Blue")})
document.getElementById("c3").addEventListener("mouseleave",()=>{fillColour("White")})

document.getElementById("c4").addEventListener("mouseenter",()=>{fillColour("Green")})
document.getElementById("c4").addEventListener("mouseleave",()=>{fillColour("White")})

document.getElementById("c5").addEventListener("mouseenter",()=>{fillColour("Yellow")})
document.getElementById("c5").addEventListener("mouseleave",()=>{fillColour("White")})

document.getElementById("c6").addEventListener("mouseenter",()=>{fillColour("Orange")})
document.getElementById("c6").addEventListener("mouseleave",()=>{fillColour("White")})

document.getElementById("c7").addEventListener("mouseenter",()=>{fillColour("Red")})
document.getElementById("c7").addEventListener("mouseleave",()=>{fillColour("White")})

function fillColour(color){
  document.getElementById("rainbowBulb").style.backgroundColor=color;
}
