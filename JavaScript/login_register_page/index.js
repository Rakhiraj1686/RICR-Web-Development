function login(){
    console.log("Login Button Clicked");

    const em= document.getElementById("LoginEmail").value;
    const ps= document.getElementById("LoginPassword").value;
    console.log("Email :"+ em);
    console.log("Password :"+ ps)

    alert("Login Done");

    document.getElementById("LoginEmail").value = "";
    document.getElementById("LoginPassword").value = "";
}
function registration(){
    console.log("Registration Button Clicked");
}