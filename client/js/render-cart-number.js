// B7: Hiển thị số lượng sản phẩm tồn tại trong giỏ hàng
// Do dữ logic dùng lại nhiều lần nên ta viết ra 1 file riêng có tên render-cart-number.js

// 1. Khai báo function xử lý logic hiển thị số lượng sp trong giỏ hàng
// Do function có call đến api nên cần sử dụng từ khóa async
async function renderCartNumber() {
    // Call api lấy danh sách sản phẩm trong giỏ hàng
    const responseCartList = await fetch("http://localhost:3000/cart");
    const cartList = await responseCartList.json();

    // Khai báo biến lưu tổng số lượng sản phẩm trong giỏ hàng
    let cartNumber = 0;
    for (const cartItem of cartList) {
        cartNumber += cartItem.productNumber;
    }
    console.log('Log thử kết quả cartNumber:', cartNumber);

    // Thiết kế html button Cart kèm badge hiển thị cart number
    // Gán dữ liệu cartNumber hiển tị cho ba
    document.getElementById('cartNumber').innerText = cartNumber;
}

// 2. Nhúng file render-cart-number.js vào file html cần sử dụng
// ==> Nhúng vào file index.html

// 3. Mở file script.js và gọi hàmrenderCartNumber() tại khu vực 2 khu vực
// Khu vực init() để lần đầu vào trang có thể hiển thị được thông tin cart number
// Khu vực sau khi thêm sản phẩm và giỏ hàng thành công để có thể update giá trị cart number mới