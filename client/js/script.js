window.addEventListener("DOMContentLoaded", init);

function init() {
  renderProductList();
  renderCartNumber();
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
        <a href="#" 
            class="btn btn-primary addToCartBtn" 
            product-id="${product.id}" product-title="${product.title}" product-image="${product.image}" product-price="${product.price}">Add To Cart</a>
      </div>
    </div>
  </div>`;
    })
    .join("")}`;

  //B5: Chen vao DOM
  productListElm.appendChild(div);


  // B6: Bắt sự kiện click button add to cart
  // 1. Khởi tạo resource ở file db.json để lưu trữ thông tin giỏ hàng
  // ==> Mở file db.json và thêm thông tin

  // 2. Khai báo html class và html attribute lưu thông tin cần thiết cho button add to cart
  // ==> Tại file script.js, tìm đến đoạn khai báo html button add to cart và thêm thông tin

  // 3. Viết code js xử lý logic bắt sự kiện click button add to cart
  // Lưu ý: Đoạn code phải đặt sau đoạn Chén dữ liệu vào DOM (Sau Bước 5)

  // Lấy danh sách button theo class vừa khai báo
  let addToCartBtnElements = document.getElementsByClassName('addToCartBtn');

  // Sử dụng for để truy xuất từng button
  for (const element of addToCartBtnElements) {

    // Gán sự kiện cho từng button
    element.onclick = async function onClickAddToCart(elementClicked) {
      console.log('Log thử đối tượng được click', elementClicked.target);

      // Lấy thông tin product được tương tác
      let productAddToCart = {
        userId: 'USER_001', // Do ứng dụng không xử lý vấn đề đăng nhập. Nên chúng ta hard code userId đang tương tác là USER_001
        productId: elementClicked.target.getAttribute('product-id'),
        productImage: elementClicked.target.getAttribute('product-image'),
        productTitle: elementClicked.target.getAttribute('product-title'),
        productPrice: Number(elementClicked.target.getAttribute('product-price')),
        productNumber: 1 // Giá trị số lượng mặc định cho 1 lần ấn
      }

      // Call api kiểm tra tồn tại của sản phẩm trong giỏ hàng
      // Nếu tồn tại thì tăng số lượng
      // Nếu không tồn tại thì thêm mới với số lượng là 1
      const responseCartList = await fetch("http://localhost:3000/cart?productId=" + productAddToCart.productId);
      const cartList = await responseCartList.json();

      // Kiểm tra độ dài danh sách trả về từ api
      if (cartList.length > 0) {
        // Sản phẩm đã tồn tại ==> Cần tăng số lượng bản ghi
        productAddToCart.id = cartList[0].id;
        productAddToCart.productNumber = cartList[0].productNumber ? cartList[0].productNumber + 1 : 1;

        // Call api update dữ liệu
        await fetch("http://localhost:3000/cart/" + productAddToCart.id, {
          method: 'PUT',
          body: JSON.stringify(productAddToCart)
        });

      } else {
        // Sản phẩm chưa tồn tại trong giỏ hàng ==> Call api tạo mới dữ liệu
        await fetch("http://localhost:3000/cart", {
          method: 'POST',
          body: JSON.stringify(productAddToCart)
        });
      }

      // Hiển thị giá trị cart number mới
      renderCartNumber();
    }


  }
  // Kết thúc B6: Bắt sự kiện click button add to cart

  // B7: Hiển thị số lượng sản phẩm tồn tại trong giỏ hàng
  // Do dữ logic dùng lại nhiều lần nên ta viết ra 1 file riêng có tên render-cart-number.js

  // B8: Thiết kế màn hình hiển thị danh sách sản phẩm của giỏ hàng
  // 1. Clone file index.html thành 1 file mới có tên cart.html
  // 2. Sử dụng file tainguyen-html cart-template.html có sẵn, có copy nội dung main về file mới
  // Nhiệm vụ của chúng ta là call api lấy dữ liệu sản phẩm thật và hiển thị


}
