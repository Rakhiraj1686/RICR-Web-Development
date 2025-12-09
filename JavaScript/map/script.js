function search() {
  console.log("hello");
  const state = document.getElementById("state").value.trim().toLowerCase();

  console.log(state);

  // if (!state) {
  //   alert("State Empty");
  //   return;
  // }

  const flag = document.createElement("i");
  flag.classList.add("bi", "bi-flag-fill", "text-danger", "fs-3");
  flag.style.position = "absolute";

  if (state === "delhi") {
    flag.style.top = "345px";
    flag.style.left = "360px";
    flag.title = "State : Delhi \nCapital : New Delhi";
  }
  if (state === "madhya pradesh" || state === "mp") {
    flag.style.top = "550px";
    flag.style.left = "400px";
    flag.title = "State : Madhya Pradesh \nCapital : Bhopal";
  }
  if (state === "rajasthan") {
    flag.style.top = "390px";
    flag.style.left = "250px";
    flag.title = "State : Rajasthan \nCapital : Jaipur";
  }
  if (state === "chhatisgarh") {
    flag.style.top = "640px";
    flag.style.left = "500px";
    flag.title = "State : Chhatisgarh \nCapital : Raipur";
  }
  if (state === "uttar pradesh" || state === "up") {
    flag.style.top = "400px";
    flag.style.left = "450px";
    flag.title = "State : Uttar Pradesh \nCapital : Luchnow";
  }
  if (state === "bihar") {
    flag.style.top = "470px";
    flag.style.left = "640px";
    flag.title = "State : Bihar \nCapital : Patna";
  }
  if (state === "haryana") {
    flag.style.top = "330px";
    flag.style.left = "330px";
    flag.title = "State : Haryana \nCapital : Chandigarh";
  }
  if (state === "uttarakhand") {
    flag.style.top = "290px";
    flag.style.left = "420px";
    flag.title = "State : Uttarakhand \nCapital : Dehradun";
  }
  if (state === "ladakh") {
    flag.style.top = "100px";
    flag.style.left = "350px";
    flag.title = "State : Ladakh \nCapital : New Delhi";
  }
  if (state === "jammu & kashmir") {
    flag.style.top = "150px";
    flag.style.left = "300px";
    flag.title = "State : Jammu & Kashmir \nCapital : Srinagar";
  }
  if (state === "himachal pradesh") {
    flag.style.top = "230px";
    flag.style.left = "370px";
    flag.title = "State : Himachal Pradesh \nCapital : Shimla";
  }
  if (state === "punjab") {
    flag.style.top = "250px";
    flag.style.left = "300px";
    flag.title = "State : Punjab \nCapital : Chandigarh";
  }
  if (state === "jharkhand") {
    flag.style.top = "550px";
    flag.style.left = "620px";
    flag.title = "State : Jharkhand \nCapital : Ranchi";
  }
  if (state === "west bengal") {
    flag.style.top = "560px";
    flag.style.left = "700px";
    flag.title = "State : West bengal \nCapital : Kolkata";
  }
  if (state === "gujarat") {
    flag.style.top = "550px";
    flag.style.left = "150px";
    flag.title = "State : Gujarat \nCapital : Gandhi Nagar";
  }
  if (state === "maharashtra") {
    flag.style.top = "700px";
    flag.style.left = "350px";
    flag.title = "State : maharastra \nCapital : mumbai";
  }
  if (state === "goa") {
    flag.style.top = "870px";
    flag.style.left = "230px";
    flag.title = "State : goa \nCapital : Panaji";
  }
  if (state === "karnataka") {
    flag.style.top = "870px";
    flag.style.left = "300px";
    flag.title = "State : Karnataka \nCapital : Bengaluru";
  }
  if (state === "andhra pradesh") {
    flag.style.top = "870px";
    flag.style.left = "400px";
    flag.title = "State : andhra pradesh \nCapital : Amaravati";
  }
  if (state === "tamil nadu") {
    flag.style.top = "1050px";
    flag.style.left = "350px";
    flag.title = "State : tamil nadu \nCapital : Chenni";
  }
  if (state === "kerala") {
    flag.style.top = "1050px";
    flag.style.left = "300px";
    flag.title = "State : Kerala \nCapital : Thiruvananthapuram";
  }
  if (state === "telangana") {
    flag.style.top = "780px";
    flag.style.left = "450px";
    flag.title = "State : Telangana \nCapital : Hyderabad";
  }
  if (state === "odisha") {
    flag.style.top = "640px";
    flag.style.left = "600px";
    flag.title = "State : Odisha \nCapital : Bhubaneswar";
  }
  if (state === "sikkim") {
    flag.style.top = "390px";
    flag.style.left = "730px";
    flag.title = "State : Sikkim \nCapital : Gangtok";
  }
  if (state === "assam") {
    flag.style.top = "440px";
    flag.style.left = "870px";
    flag.title = "State :Assam \nCapital : Dispur";
  }
  if (state === "meghalaya") {
    flag.style.top = "470px";
    flag.style.left = "800px";
    flag.title = "State : Meghalaya \nCapital : Shillong";
  }
  if (state === "tripura") {
    flag.style.top = "530px";
    flag.style.left = "840px";
    flag.title = "State : Tripura \nCapital : Agartala";
  }
  if (state === "arunachal pradesh") {
    flag.style.top = "360px";
    flag.style.left = "920px";
    flag.title = "State : Arunachal Pradesh \nCapital : Itanagar";
  }
  if (state === "nagaland") {
    flag.style.top = "440px";
    flag.style.left = "920px";
    flag.title = "State :Nagaland \nCapital : Kohima";
  }
  if (state === "manipur") {
    flag.style.top = "480px";
    flag.style.left = "900px";
    flag.title = "State : Manipur \nCapital : Imphal";
  }
  if (state === "mizoram") {
    flag.style.top = "530px";
    flag.style.left = "870px";
    flag.title = "State : Mizoram \nCapital : Aizawal";
  }


  document.getElementById("map").appendChild(flag);
  document.getElementById("State").value = "";
}
function clearIcons() {
  document.querySelectorAll("#map i").forEach((el) => el.remove());
  window.location.reload();
}
function selectAll() {
  const checkboxes = document.querySelectorAll(".state");
  checkboxes.forEach((cb) => (cb.checked = true));
}
