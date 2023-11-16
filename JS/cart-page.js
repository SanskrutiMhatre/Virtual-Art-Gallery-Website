// Cart items data structure
let cartItems = [];

// Function to update the cart HTML
function updateCartHTML() {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = "";

  cartItems.forEach((item) => {
    const cartItemDiv = document.createElement("div");
    cartItemDiv.classList.add("cart-item");

    cartItemDiv.innerHTML = `
      <div class="cart-item-details">
        <img src="${item.image}" alt="${item.name}" />
        <div>
          <h3>${item.name}</h3>
          <p>Price: ₹${item.price}</p>
        </div>
      </div>
      <div class="cart-item-quantity">
        <button class="decrease-quantity" data-index="${item.index}">-</button>
        <span>${item.quantity}</span>
        <button class="increase-quantity" data-index="${item.index}">+</button>
      </div>
      <div class="cart-item-price">
        ₹${(item.price * item.quantity).toFixed(2)}
      </div>
      <button class="remove-item" data-index="${item.index}">Remove</button>
    `;

    cartItemsContainer.appendChild(cartItemDiv);
  });

  // Update the total amount
  const totalAmount = document.getElementById("total-amount");
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  totalAmount.textContent = total.toFixed(2);
}

// Function to add an item to the cart
function addItemToCart(name, price, image) {
  const existingItem = cartItems.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const newItem = {
      name,
      price,
      image,
      quantity: 1,
    };
    cartItems.push(newItem);
  }

  // Update the cart HTML
  updateCartHTML();
}

// Event listener for adding items to the cart
const addToCartButtons = document.querySelectorAll(".add-to-cart-button");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    const price = parseFloat(button.getAttribute("data-price"));
    const image = button.getAttribute("data-image");
    addItemToCart(name, price, image);
  });
});

// Event listener for increasing and decreasing item quantity in the cart
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("increase-quantity")) {
    const index = parseInt(e.target.getAttribute("data-index"));
    if (!isNaN(index) && index >= 0 && index < cartItems.length) {
      cartItems[index].quantity += 1;
      updateCartHTML();
    }
  }

  if (e.target.classList.contains("decrease-quantity")) {
    const index = parseInt(e.target.getAttribute("data-index"));
    if (!isNaN(index) && index >= 0 && index < cartItems.length) {
      if (cartItems[index].quantity > 1) {
        cartItems[index].quantity -= 1;
      }
      updateCartHTML();
    }
  }
});

// Event listener for removing items from the cart
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-item")) {
    const index = parseInt(e.target.getAttribute("data-index"));
    if (!isNaN(index) && index >= 0 && index < cartItems.length) {
      cartItems.splice(index, 1);
      updateCartHTML();
    }
  }
});

// Event listener for checkout button
const checkoutButton = document.getElementById("checkout-button");
checkoutButton.addEventListener("click", () => {
  // You can add the checkout logic here, e.g., redirect to a payment page.
  // You may want to send the `cartItems` array to the server for processing.
});
