function submit(){
    const guess = document.getElementById("guessNum").value;
    const num = Math.floor(Math.random()*10) +1;
    console.log(num);

    if(guess>num){
        alert("OOPS SORRY!!! TRY SMALLER NUMBER");
    }
    else if(guess<num){
        alert("OOPS SORRY!!! TRY LARGET NUMBER");
    }else{
        alert("😊 Well Done!! you guessed it right.")
    }
    document.getElementById("guessNum").value="";
}