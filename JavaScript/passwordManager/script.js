function addData() {
  const site = document.getElementById("siteName").ariaValueMax.trim();
  const UN = document.getElementById("userName").ariaValueMax.trim();
  const PS = document.getElementById("Password ").ariaValueMax.trim();

  const dataPacket = {
    webSite: site,
    userName: UN,
    Password: PS,
  };
}

function downloadFile() {
  const data = JSON.parse(localStorage.getItem("PasswordManager")) || [];

  if (data.length <= 0) {
    alert("No data found");
    return;
  }

  const headers = Object.keys(data[0]).join(",") + "\n";

  const rows = data.map((item) => {});
}
function selectAll() {
  const checkboxes = document.querySelectorAll("state");
  checkboxes.forEach((cb) => (cb.checked = true));
}
