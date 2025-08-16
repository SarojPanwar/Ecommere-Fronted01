
// Menu toggle
const menuToggle =document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click",()=>{
    navMenu.classList.toggle("active");
});


// get the product ID form URL
const urlParams =new URLSearchParams(window.location.search);

const productId= urlParams.get('id');

const products = JSON.parse(localStorage.getItem("products")) || [];
// Find product
const product = products.find(p => p.id == productId);

if (product) {
    document.getElementById("product_details").innerHTML = `
        <div class="product-info">
       
            <img  src="${product.image}" alt="${product.title}" class="large-image">
            <h2>${product.title}</h2>

         <p class="price">Price: $<span id="unit-price">${product.price}</span></p>
        
        <!-- Variations -->
        <label for="size">Size:</label>
        <select id="size">
            <option value="" disabled selected>Select Size</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
        </select>

        <label for="color">Color:</label>
        <select id="color">
            <option value="" disabled selected>Select Color</option>
            <option value="Red">Red</option>
            <option value="Blue" disabled>Blue (Out of Stock)</option>
            <option value="Black">Black</option>
        </select>

        <!-- Quantity -->
        <div class="quantity-selector">
            <button id="decrease">−</button>
            <input type="number" id="quantity" value="1" min="1" max="10" readonly>
            <button id="increase">+</button>
        </div>

        <!-- Total Price -->
        <p>Total: $<span id="total-price">${product.price}</span></p>

        <button id="add-to-cart">Add to Cart</button>
        <p id="cart-message" style="display:none;color:green;">✔ Added to Cart!</p>
    </div>
       
    `;


    
  // JS logic
  const unitPrice = product.price;
  let quantity = 1;
  const maxQty = 10;

  const quantityInput = document.getElementById("quantity");
  const totalPriceEl = document.getElementById("total-price");

  // Quantity buttons
  document.getElementById("increase").addEventListener("click", () => {
    if (quantity < maxQty) {
      quantity++;
      updateQuantity();
    }
  });

  document.getElementById("decrease").addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      updateQuantity();
    }
  });

  function updateQuantity() {
    quantityInput.value = quantity;
    totalPriceEl.textContent = (unitPrice * quantity).toFixed(2);
  }



// add to cart
document.getElementById("add-to-cart").addEventListener("click",()=>{
   
   const size = document.getElementById("size").value;
    const color = document.getElementById("color").value;

    if (!size || !color) {
      alert("Please select size and color!");
      return;
    }

     let cart =JSON.parse(localStorage.getItem("cart"))|| [];

         cart.push({
            ...product,
            size,
            color,
            quantity,
            totalPrice:unitPrice*quantity,
         });
        

        localStorage.setItem("cart", JSON.stringify(cart));
        // Update cart count
        document.getElementById("cart-count").innerText = `Cart (${cart.length})`;
         //  Feedback
         const cartMessage = document.getElementById("cart-message");
           cartMessage.style.display = "block";
            setTimeout(() => {
            cartMessage.style.display = "none";
            }, 2000);
 
});

} else {
    document.getElementById("product_details").innerHTML = `<p>Product not found.</p>`;
}


// Show cart count on page load
window.addEventListener("load", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").innerText = `Cart (${cart.length})`;
});


 
