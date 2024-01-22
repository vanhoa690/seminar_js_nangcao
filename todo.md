- Buoc 1: tao thư muc: client và server
- Bước 2: EXt Live server chạy code cho nhanh
- B3: Xay dựng UI Homepage
  - Boostrap / Tailwind
  - Nhúng CSS vào head
  - Nhúng JS vào trước thẻ đóng body
- B4: Xây dựng Homepage
- index.html
  - header : navbar bootstrap
  - main: chứa content
  - Footer: chữ ký liên hệ ....
# Xây dựng UI Content trong main:

  - h1 tiêu đề Product List
  - Bootstrap Grid: Layout 12 col : 3 col / 4 col
  col-4: 4 cột // mobile: col-12
    <div class="row"> // 1 hang
          <div class="col-4">
              <div class="card col-4" style="width: 18rem">
                  <img
                  src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
                  class="card-img-top"
                  alt="..."
                  />
                  <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">
                      Some quick example text to build on the card title and make up
                      the bulk of the card's content.
                  </p>
                  <a href="#" class="btn btn-primary">Add To Cart</a>
                  </div>
          </div>
          <div class="col-4">SP B</div>
          <div class="col-4">SP C</div>
  </div>

# Tìm UI Product Card:
    <div class="card col-4" style="width: 18rem">
            <img
              src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" class="btn btn-primary">Add To Cart</a>
    </div>

# Code JS trong file script.js
  - Tạo file js: console.log('init')
  - Lang nghe su kien: DOMContentLoaded: dam bao DOM HTML -> tuong tac DOM
  - function init () : code chuc nang web
  - async function renderProdcutList()
  - B1: Lay Data - API - server
    - await fetch(API_URL)
    - await res.json()
  - B2: Create new Element document.createElement('')
     - Add class: div.classList.add('class')
  - B3: Update Content - InnerHTML-> map() -> UI Udemy: video 151
  - B4: getElementByID(parent)
      - Tim diem neo Insert : getElementByID (product-list)
  - B5: Insert DOM : parent.appenChild(child)
# Server
- Cài đặt nodejs
- cd server
- Cài đặt json-server: npm i -g json-server
- Create db.json: Update data products: [] trong db.json
- Chạy server: npx json-server db.json