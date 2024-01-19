const API_URL = "https://fakestoreapi.com";

document.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init list");
  displayProductList();
}
async function handleDeleteProduct(id) {
  //   alert(id);
  try {
    if (window.confirm("Do you really remove product?")) {
      await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
      });
    }
  } catch (error) {
    console.log(error);
  }
}

async function displayProductList() {
  const response = await fetch(`${API_URL}/products`);
  const productList = await response.json();
  const tbody = document.createElement("tbody");
  tbody.innerHTML = `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
        </tr>
        </thead>
        ${productList
          .map(
            (product) => ` 
            <tr>
                <th scope="row">${product.id}</th>
                <td>${product.title.substring(0, 60)} ...</td>
                <td>$${product.price}</td>
                <td>
                <a href='/products/edit.html?id=${product.id}'>
                    <button type="button" class="btn btn-primary">Edit</button>
                </a>
                <button onClick="handleDeleteProduct(${
                  product.id
                })" type="button" class="btn btn-danger">Delete</button>
            </tr>
            `
          )
          .join("")}`;

  document.getElementById("product-list").appendChild(tbody);
}
