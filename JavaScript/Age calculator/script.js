function calculate() {
  const dob = document.getElementById("month").value;
  const current_year = document.getElementById("day").value;

  if (!dob || !current_year) {
    alert("Please select both dates");
    return;
  }

  const birthYear = new Date(dob).getFullYear();
  const currentYear = new Date(current_year).getFullYear();
  const age = currentYear - birthYear;

  // Remove previous result if exists
  const oldResult = document.getElementById("ageResult");
  if (oldResult) {
    oldResult.remove();
  }

  const d = document.createElement("div");
  d.classList.add("text-center", "mt-3");
  d.id = "ageResult";

  const h = document.createElement("h5");
  h.innerText = `Your age is ${age} years`;

  d.appendChild(h);

  document.getElementById("mainBox").appendChild(d);
  document.getElementById("month").value = "";
  document.getElementById("day").value = "";
}