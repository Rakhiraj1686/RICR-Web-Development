async function getProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    const productList = document.getElementById("productRow")

    data.forEach((element) => {
      const d = document.createElement("div");
      d.classList.add("row", "p-2");
    //   d.classList.add("col-3" , "p-2")

      d.innerHTML = `
       <div class="d-flex rounded shadow p-3 bg-light">
    <div class="h-100 w-50" >
      <img
        src=${element.image}
        alt=${element.title}
        class="w-50 h-100 object-fit-contain rounded"
      />
    </div>
    <div class="h-100  p-2  justify-content-center mt-5">
      <div class="fw-bold fs-5">${element.title.length>50 ? element.title.slice(0,80) + "..." : element.title}</div>
      <div class="fw-semibold">${element.rating.rate}/5 (${element.rating.count})</div>
      <div class="fw-semibold">₹ ${element.price * 100}</div>
      <div class="mb-2">
        ${element.description.slice(0,100)}.....
      </div>
      <div class="d-flex justify-content-center gap-3">
        <button class="btn btn-outline-primary">Add to cart</button>
        <button class="btn btn-primary">Buy Now</button>
      </div>
    </div>
  </div> `;

  productList.appendChild(d);
    });


  } catch (error) {
    console.log(error.message);
  }
}

getProducts();
