function submit(){
    console.log("Submit Button Clicked")

    const pn = document.getElementById("personName").value;
    const contact = document.getElementById("contact").value;
    const em = document.getElementById("email").value;
    const quali = document.getElementById("qualification").value;
    const cs = document.getElementById("college").value;
    const year = document.getElementById("year").value;
    const branch = document.getElementById("branch").value;
    const interested = document.getElementById("checkbox").value;
    const inform = document.getElementById("text").value;
    const executive = document.getElementById("text1").value;

    console.log(pn);
    console.log(contact);
    console.log(em);
    console.log(quali);
    console.log(cs);
    console.log(year);
    console.log(branch);
    console.log(interested);
    console.log(inform);
    console.log(executive);

    alert("Submit Done")

}