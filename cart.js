// Shopping Cart Functionality
// Cart array to store items in memory
let cart = [];

/**
 * Add item to cart
 * @param {string} name - Item name
 * @param {number} price - Item price
 */
function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  
  if (existingItem) {
    // If item already exists, increase quantity
    existingItem.quantity++;
  } else {
    // Add new item to cart
    cart.push({ name, price, quantity: 1 });
  }
  
  updateCart();
  showNotification();
}

/**
 * Remove item completely from cart
 * @param {string} name - Item name to remove
 */
function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  updateCart();
}

/**
 * Update quantity of an item in cart
 * @param {string} name - Item name
 * @param {number} change - Amount to change (+1 or -1)
 */
function updateQuantity(name, change) {
  const item = cart.find(item => item.name === name);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(name);
    } else {
      updateCart();
    }
  }
}

/**
 * Update cart display - refreshes cart count, items, and total
 */
function updateCart() {
  const cartCount = document.getElementById('cartCount');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');
  
  // Update cart count badge
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
  
  // Display empty cart message if no items
  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
    cartTotal.style.display = 'none';
    checkoutBtn.style.display = 'none';
  } else {
    // Build cart items HTML
    let itemsHTML = '';
    let total = 0;
    
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      
      itemsHTML += `
        <div class="cart-item">
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
          </div>
          <div class="cart-item-controls">
            <button class="quantity-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="quantity-btn" onclick="updateQuantity('${item.name}', 1)">+</button>
            <button class="remove-btn" onclick="removeFromCart('${item.name}')">Remove</button>
          </div>
        </div>
      `;
    });
    
    cartItems.innerHTML = itemsHTML;
    cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
    cartTotal.style.display = 'block';
    checkoutBtn.style.display = 'block';
  }
}

/**
 * Toggle cart modal visibility
 */
function toggleCart() {
  const cartModal = document.getElementById('cartModal');
  cartModal.classList.toggle('active');
}

/**
 * Show "item added to cart" notification
 */
function showNotification() {
  const notification = document.getElementById('addedNotification');
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

/**
 * Process checkout
 */
function checkout() {
  if (cart.length === 0) return;
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  alert(`Thank you for your order!\n\nTotal: $${total.toFixed(2)}\n\nYour order will be ready soon!`);
  
  // Clear cart after checkout
  cart = [];
  updateCart();
  toggleCart();
}

// Close modal when clicking outside the cart content
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('cartModal').addEventListener('click', function(e) {
    if (e.target === this) {
      toggleCart();
    }
  });
});