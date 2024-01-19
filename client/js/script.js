// On DOM Load
window.addEventListener("DOMContentLoaded", init);
const API_URL = "http://localhost:3000/products";
function init() {
  console.log("init");
  renderProductList();
}

async function fetchDataApi() {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data;
}

async function renderProductList() {
  const productList = await fetchDataApi();
  console.log(productList);
}
