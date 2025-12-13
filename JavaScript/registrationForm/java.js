function submit() {
    console.log("Registration Successful")

    const name = document.getElementById("fullName").value.trim();
    const em = document.getElementById("email").value.trim();
    const mob = document.getElementById("mobile").value.trim();
    const dob = document.getElementById("dob").value.trim();
    const quali = document.getElementById("quali").value.trim();
    const present = document.getElementById("score").value.trim();
    const course = document.getElementById("qualification").value.trim();

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