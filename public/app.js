const API_URL = "http://localhost:3000";
let products = [];
let cart = [];
let user = null;
let currentDiscount = "";

// Initialize App
async function init() {
  await fetchUser();
  await fetchProducts();
  renderProducts();
  updateCartUI();
}

// Fetch User Data (Simulated Auth - getting user 1)
async function fetchUser() {
  try {
    const res = await fetch(`${API_URL}/users/1`);
    user = await res.json();
    document.getElementById("username").innerText = user.username;
    document.getElementById("balance").innerText = user.balance;
  } catch (e) {
    console.error("Error fetching user:", e);
  }
}

// Fetch Products
async function fetchProducts() {
  try {
    const res = await fetch(`${API_URL}/products`);
    products = await res.json();
  } catch (e) {
    console.error("Error fetching products:", e);
  }
}

// Render Products to DOM
function renderProducts() {
  const list = document.getElementById("product-list");
  list.innerHTML = "";
  products.forEach((p) => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
            <span>${p.name} - <strong>${p.price} pts</strong></span>
            <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
        `;
    list.appendChild(div);
  });
}

// Add Item to local cart
window.addToCart = function (id) {
  const product = products.find((p) => p.id === id);
  if (product) {
    cart.push(product);
    updateCartUI();
  }
};

// Apply Discount Code
window.applyDiscount = function () {
  const code = document.getElementById("discount-code").value;
  const msg = document.getElementById("discount-message");

  if (isValidDiscount(code)) {
    currentDiscount = code;
    msg.innerText = "Discount Applied! (10% off)";
    msg.style.color = "green";
  } else {
    currentDiscount = "";
    msg.innerText = "Invalid Discount Code";
    msg.style.color = "red";
  }
  updateCartUI();
};

// Update Cart Logic & UI
function updateCartUI() {
  const cartList = document.getElementById("cart-items");
  cartList.innerHTML = "";
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            ${item.name} - ${item.price} pts 
            <button class="btn" style="background-color: #ff3b30; color: white; padding: 2px 8px; font-size: 0.8em; margin-left: 10px;" onclick="removeFromCart(${item.id})">X</button>
        `;
    cartList.appendChild(li);
  });

  // UNIT TEST INTEGRATION: Calling the shared logic
  const total = calculateTotal(cart, currentDiscount);
  document.getElementById("total-price").innerText = total;

  // Check balance
  const btn = document.getElementById("checkout-btn");
  const msg = document.getElementById("message-area");

  if (user && total > user.balance) {
    msg.innerText = "Insufficient Balance!";
    msg.style.color = "red";
    btn.disabled = true;
  } else {
    msg.innerText = "";
    btn.disabled = false;
  }
}

// Remove Item logic
window.removeFromCart = function (id) {
  // Use the shared logic function to update state
  // Note: removeItem modifies the array in place in our implementation (Answer Key)
  // In a real Redux app we'd return a new array.
  removeItem(cart, id);
  updateCartUI();
};

// Checkout Logic
window.checkout = async function () {
  const total = calculateTotal(cart, currentDiscount);
  if (total > user.balance) return;

  // Backend call to update balance (Simulation)
  const newBalance = user.balance - total;

  try {
    await fetch(`${API_URL}/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ balance: newBalance }),
    });

    // Also save cart to backend for records (optional but good for API testing)
    // Note: json-server "cart" endpoint
    await fetch(`${API_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart, total: total, user: user.username }),
    });

    alert(`Purchase Successful! New Balance: ${newBalance} pts`);
    cart = []; // clear local cart
    currentDiscount = "";
    document.getElementById("discount-code").value = "";
    await init(); // refresh data
  } catch (e) {
    alert("Checkout Failed");
    console.error(e);
  }
};

// Start
init();
