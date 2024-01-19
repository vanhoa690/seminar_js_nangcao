window.addEventListener("DOMContentLoaded", init);

function init() {
  renderProductList();
}

async function renderProductList() {
  const API_URL = "http://localhost:3000/products";
  //B1: lay Data
  const res = await fetch(API_URL);

  // axios
  const productList = await res.json();
  //B2: LAy DOM Element
  const productListElm = document.getElementById("product-list");
  // B3: Creat Element

  const div = document.createElement("div");
  div.classList.add("row", "gap-2");
  // B4: Inner HTML
  div.innerHTML = `${productList
    .map((product) => {
      return ` <div class="col-12 col-md-3">
    <div class="card" style="width: 18rem">
      <img
        src=${product.image}
        class="img-fluid img-thumbnail"
        alt=""
        style="height: 400px; object-fit: contain"
      />
      <div class="card-body">
        <h5 class="card-title" style="font-size: 1.1rem">${product.title}</h5>
        <p class="card-text">${product.description.substring(0, 60)} ...</p>
        <a href="#" class="btn btn-primary">Add To Cart</a>
      </div>
    </div>
  </div>`;
    })
    .join("")}`;

  //B5: Chen vao DOM
  productListElm.appendChild(div);
}
