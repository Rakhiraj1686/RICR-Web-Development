function AddTask() {
  const task = document.getElementById("NewTask").value.trim();

  console.log(task);

  if (task) {
    const l = document.createElement("li");
    l.classList.add(
      "p-2",
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "border-bottom"
    );

    const d = document.createElement("div");
    d.classList.add("w-75");
    d.innerText = task;

    const b = document.createElement("button");
    b.classList.add("btn", "btn-danger", "ms-3");
    b.innerHTML = `<i class="bi bi-trash3"></i>Delete`;
    b.onclick = () => {
      l.remove();
    };

    // const i = document.createElement("i");
    // i.classList.add("bi","bi-trash");

    // const s = document.createElement("span");
    // s.innerText = "Delete";

    // b.appendChild(i);
    // b.appendChild(s);

    l.appendChild(d);
    l.appendChild(b);

    document.getElementById("TaskList").appendChild(l);
    document.getElementById("NewTask").value = "";
  }
}
