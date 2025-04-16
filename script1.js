function displayCart() {
  let cart = JSON.parse(localStorage.getItem("daisy-cart")) || {};
  let cartItems = document.getElementById("cart-items");
  let total = 0;

  cartItems.innerHTML = "";

  if (Object.keys(cart).length === 0) {
    cartItems.innerHTML =
      '<p class="empty-cart">Giỏ hàng của bạn đang trống!</p>';
  } else {
    for (let id in cart) {
      let item = cart[id];
      let itemTotal = item.price * item.quantity;
      total += itemTotal;

      cartItems.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>Giá: ${item.price.toLocaleString("vi-VN")} VNĐ</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button onclick="updateQuantity('${id}', -1)">-</button>
                        <input type="text" id="${id}" value="${
        item.quantity
      }" readonly>
                        <button onclick="updateQuantity('${id}', 1)">+</button>
                    </div>
                </div>
            `;
    }
  }

  document.getElementById("total").textContent =
    total.toLocaleString("vi-VN") + " VNĐ";
}

function updateQuantity(id, change) {
  let cart = JSON.parse(localStorage.getItem("daisy-cart")) || {};
  let newQuantity = cart[id].quantity + change;

  if (newQuantity < 1) {
    delete cart[id];
  } else {
    cart[id].quantity = newQuantity;
  }

  localStorage.setItem("daisy-cart", JSON.stringify(cart));
  displayCart();
}

function clearCart() {
  localStorage.removeItem("daisy-cart");
  displayCart();
}

displayCart();
