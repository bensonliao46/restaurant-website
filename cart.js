let cart = [];

function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  
  updateCart();
}

function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  updateCart();
}


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

function updateCart() {
  const cartCount = document.getElementById('cartCount');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const clearCartBtn = document.getElementById('clearCartBtn');
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
    cartTotal.style.display = 'none';
    checkoutBtn.style.display = 'none';
    clearCartBtn.style.display = 'none';
  } else {
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
    clearCartBtn.style.display = 'inline-block';
  }
}

function toggleCart() {
  const cartModal = document.getElementById('cartModal');
  cartModal.classList.toggle('active');
}

function checkout() {
  if (cart.length === 0) return;
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  alert(`Thank you for your order!\n\nTotal: $${total.toFixed(2)}\n\nYour order will be ready soon!`);
  
  cart = [];
  updateCart();
  toggleCart();
}

function clearCart() {
  if (cart.length === 0) return;
  
  if (confirm('Are you sure you want to remove all items from your cart?')) {
    cart = [];
    updateCart();
  }
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('cartModal').addEventListener('click', function(e) {
    if (e.target === this) {
      toggleCart();
    }
  });
});