function calculateTip() {
  let bill = document.getElementById("bill").value;
  let service = document.getElementById("service").value;
  let person = document.getElementById("person").value;

  if (bill === "" || service === "" || person === "") {
    alert("Please fill all fields");
    return;
  }

  bill = parseFloat(bill);
  person = parseInt(person);

  if (bill <= 0 || person <= 0) {
    alert("Please enter valid values");
    return;
  }

  let tipPercent = 0;

  switch (service) {
    case "1":
      tipPercent = 0.25;
      break;
    case "2":
      tipPercent = 0.2;
      break;
    case "3":
      tipPercent = 0.15;
      break;
    case "4":
      tipPercent = 0.1;
      break;
    case "5":
      tipPercent = 0.05;
      break;
    default:
      alert("Please select service quality");
      return;
  }

  let totalTip = bill * tipPercent;
  let tipPerPerson = totalTip / person;

  document.getElementById(
    "result"
  ).innerHTML = `Tip per person: ₹${tipPerPerson.toFixed(2)}`;
}
