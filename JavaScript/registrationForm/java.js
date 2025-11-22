function submit() {
    console.log("Registration Successful")

    const name = document.getElementById("fullName").value;
    const em = document.getElementById("email").value;
    const mob = document.getElementById("mobile").value;
    const dob = document.getElementById("dob").value;
    const quali = document.getElementById("quali").value;
    const present = document.getElementById("score").value;
    const course = document.getElementById("qualification").value;

    console.log(name);
    console.log(em);
    console.log(mob);
    console.log(dob);
    console.log(quali);
    console.log(present);
    console.log(course);

    alert("are you sure")

    const batch = document.querySelectorAll("input[name='batch']:checked")
    console.log(batch)
    const selectedBatch = [];
    batch.forEach((element)=>{
        selectedBatch.push(element.value)
    });

    console.log(selectedBatch)

    const timing = document.querySelector("input[name='timing']:checked")
    console.log(timing)
    const selectedBatchTiming=[];
    batch.forEach((element)=>{
        selectedBatchTiming.push(element.value)
    });


}