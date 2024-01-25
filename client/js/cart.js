// 1. Khởi tạo function init và gọi khi DOM content được hoàn tất (Tương tự như các xử lý ở trang chủ)

window.addEventListener("DOMContentLoaded", init);

function init() {
    renderCartList();
    renderCartNumber();
}

// Khai báo hàm render dữ liệu cart list
async function renderCartList() {

    // Khai báo biến lưu đối tượng html sẽ được đổ dữ liệu
    const cartListElement = document.getElementById('cart-list');

    // Call api lấy danh sách sản phẩm trong giỏ hàng
    const responseCartList = await fetch("http://localhost:3000/cart");
    const cartList = await responseCartList.json();

    // Sử dụng vòng for để duyệt từng sản phẩm
    // Khai báo biến lưu tổng tiền của giỏ hàng
    let cartTotalPrice = 0;
    for (const item of cartList) {

        // Khởi tạo 1 thẻ tr
        trHtml = document.createElement("tr");

        // Khai báo dữ liệu html sẽ đổ và thẻ tr
        // Mở file html và copy nội dung. Sau đó sửa từng khu vực cần đổ dữ liệu vào
        trHtml.innerHTML = `
            <td>
                <div class="overflow-hidden border rounded d-flex align-items-center justify-content-center bg-light" style="height: 100px; width: 100px;">
                    <img src="${item.productImage}" class="mh-100 mw-100">
                </div>
            </td>
            <td> ${item.productTitle}</td>
            <td> ${item.productPrice}</td>
            <td>
                <div class="d-flex">
                    <button class="btn btn-secondary shadow-none rounded-0 rounded-start">+</button>
                    <input value="${item.productNumber}" type="text"
                        class="form-control shadow-none text-center rounded-0 border-0 border-top border-bottom border-secondary" style="width: 60px;">
                    <button class="btn btn-secondary shadow-none rounded-0 rounded-end ">-</button>
                </div>
            </td>
            <td> ${item.productPrice * item.productNumber}</td>
            <td> <button class="btn btn-danger">Remove</button></td>
        `;

        // Đổ thêm dữ liệu vào cartListElement
        cartListElement.appendChild(trHtml);

        // Tăng giá trị biến tổng tiền
        cartTotalPrice += item.productPrice * item.productNumber;
    }

    // Sau khi hoàn tất hiển thị các sản phẩm. Chúng ta bổ sung thêm dòng total cuối cùng
    trTotalHtml = document.createElement("tr");
    trTotalHtml.innerHTML = `
        <td></td>
        <td></td>
        <td></td>
        <td class="fw-bold">Total Cart</td>
        <td class="fw-bold">${cartTotalPrice.toFixed(2)}</td>
        <td>
            <a href="#" class="btn btn-primary">Checkout</a>
        </td>
    `;
    cartListElement.appendChild(trTotalHtml);

    // ==> Kiểm tra kết quả tại trình duyệt
}

