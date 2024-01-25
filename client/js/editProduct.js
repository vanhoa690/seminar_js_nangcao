const API_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", init);

function init() {
    console.log("init edit");

    // Lấy params trên url
    const urlParams = new URLSearchParams(window.location.search);

    // Lấy giá trị của id
    const id = urlParams.get('id');

    // console.log(id);

    if(id){
        // Lấy thông tin sản phẩm theo id đã lấy được
        getProductById(id);

        // Xử lý cập nhật sản phẩm
        handleEditProduct(id);
    }

}

async function getProductById(id){
    // Gọi API
    const response = await fetch(`${API_URL}/products/${id}`);

    // Lấy được thông tin sản phẩm
    const product = await response.json();

    // console.log(product);

    // Đổ dữ liệu vào form chỉnh sửa 
    handleLoadProduct(product);
    
}

function handleLoadProduct(product){
    // Lấy các element input
    let productName = document.getElementById('productName');
    let productPrice = document.getElementById('productPrice');
    let productCategory = document.getElementById('productCategory');
    let productImage = document.getElementById('productImage');
    let productDescription = document.getElementById('productDescription');

    // Gán giá trị Product cho các input
    productName.value = product.title;
    productPrice.value = product.price;
    productCategory.value = product.category;
    productDescription.value = product.description;
    productImage.value = product.image;

}

function handleEditProduct(id){
    const btnEdit = document.getElementById('btnEdit');

    // khởi tạo sự kiện onclick khi nút cập nhật ấn
    btnEdit.onclick = async function(e){
        e.preventDefault();
        // get giá trị khi nhấn nút cập nhật 
        let productName = document.getElementById('productName').value;
        let productPrice = document.getElementById('productPrice').value;
        let productCategory = document.getElementById('productCategory').value;
        let productImage = document.getElementById('productImage').value;
        let productDescription = document.getElementById('productDescription').value;

        // console.log(productName.value);

        let data ={
            id : id,
            title : productName,
            price : productPrice,
            category : productCategory,
            image : productImage,
            description :productDescription
        }
        // Hàm call api sửa product
        await editProduct(data);

        // sau khi sửa thành công thì trả về trang danh sách
        window.location.href = '/client/admin/list.html';

    
    }
}

function editProduct(data){
    let options ={
        method : "PUT",
        body : JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    }

    fetch(`${API_URL}/products/${data.id}`,options);

}