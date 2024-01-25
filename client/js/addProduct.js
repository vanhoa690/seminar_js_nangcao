const API_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", init);

function init() {
    console.log("init add");
    //khởi tạo
    handleAddProduct();

}

function handleAddProduct(){
    const btnAdd = document.getElementById('btnAdd');

    btnAdd.onclick = async function(e){
        e.preventDefault();
        // lấy giá trị khi nhấn nút thêm mới
        let productName = document.getElementById('productName').value;
        let productPrice = document.getElementById('productPrice').value;
        let productCategory = document.getElementById('productCategory').value;
        let productImage = document.getElementById('productImage').value;
        let productDescription = document.getElementById('productDescription').value;

        // Cần kiểm tra dữ liệu trước khi thêm

        let data ={
            title : productName,
            price : productPrice,
            category : productCategory,
            image : productImage,
            description :productDescription
        }
        // Thêm sản phẩm
        await createProduct(data);

        // Di chuyển về trang danh sách
        window.location.href = '/client/admin/list.html';

    
    }
}


function createProduct(data){

    let options ={
        method:'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    }

    fetch(`${API_URL}/products`,options);

}