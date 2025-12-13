function submit() {
  const nm = document.getElementById("name").value.trim();
  const em = document.getElementById("email").value.trim();
  const mb = document.getElementById("number").value.trim();
  const db = document.getElementById("dob").value.trim();

  document.querySelectorAll(".Error").forEach((element) =>{
    element.innerHTML = "";
  });


  if(!nm){
    document.getElementById("NameError").innerText = "Required";
  }else if (!/^[A-Za-z]+$/.test(nm)) {
    document.getElementById("NameError").innerText="Only Alphabets and spaces are allowed";
    return;
  }

  if(!em){
    document.getElementById("EmailError").innerText = "Required";
  }else if (!/^[\w\.]+@(gamil|outlook|ricr|yahoo)\.(com|in|co.in)$/.test(em)) {
        document.getElementById("EmailError").innerText="Use Proper Email Format";
    return;
  }

  if(!mb){
    document.getElementById("MobileError").innerText = "Required";
  }else if (!/^[6-9]\d{9}$/.test(mb)) {
    document.getElementById("MobileError").innerText = "Only Indian Mobile Number Allowed";
    return;
  }

  const currentyear = new Date().getFullYear();

  const birthyear = Number(db.split("-")[0]);
  console.log(currentyear, birthyear);

  if (currentyear - birthyear < 17) {
    alert("not eligible by age");
    return;
  }
  console.log(currentyear);

  const data = {
    Fullname: nm,
    Email: em,
    Phone: mb,
    DOB: db,
  };

  console.log(data);
}
