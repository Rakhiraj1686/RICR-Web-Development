const background = document.getElementById("color")
const para =document.getElementById("parabtn")
const head = document.getElementById("heading")

background.addEventListener("change", ()=>changebackgroundColor(background.value));

function changebackgroundColor(color){
    document.getElementById("headingBox").style.background = color;
}

para.addEventListener("change", ()=>
    changeparaColor(paraColor.value));

function changeparaColor(color){
    document.getElementById("color2").style.color = color;
}
head.addEventListener("change", ()=>
    changeheadColor(headColor.value));

function changeheadColor(color){
    document.getElementById("color3").style.color= color;
}
