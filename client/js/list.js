// const API_URL = "https://fakestoreapi.com";
const API_URL = "http://localhost:3000";

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

  // console.log(productList);

  const tbody = document.createElement("tbody");
  tbody.innerHTML = `
        ${productList.map( (product) => ` 
            <tr>
                <th scope="row">${product.id}</th>
                <td>${product.title.substring(0, 60)} ...</td>
                <td>${product.category}</td>
                <td><img src="${product.image}" width="50px"/></td>
                <td>${product.price}</td>
                <td>
                <a href='editProduct.html?id=${product.id}' class="text-decoration-none">
                    <button type="button" class="btn btn-primary">Edit</button>
                </a>
                <button onClick="handleDeleteProduct('${product.id}')" type="button" class="btn btn-danger">Delete</button>
            </tr>
            `
      )
      .join("")}`;

  document.getElementById("product-list").appendChild(tbody);
}
