


// get the product ID form URL
const urlParams =new URLSearchParams(window.location.search);

const productId= urlParams.get('id');

const products = JSON.parse(localStorage.getItem("products")) || [];
// Find product
const product = products.find(p => p.id == productId);

if (product) {
    document.getElementById("product_details").innerHTML = `
        <div class="product-info">
            <img src="${product.image}" alt="${product.title}" class="large-image">
            <h2>${product.title}</h2>
            <p class="price">$${product.price}</p>
            <button id="add-to-cart">Add to Cart</button>
        </div>
    `;


// add to cart
document.getElementById("add-to-cart").addEventListener("click",()=>{
    let cart =JSON.parse(localStorage.getItem("cart"))|| [];
         cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        // Update cart count
        document.getElementById("cart-count").innerText = `Cart (${cart.length})`;

});
} else {
    document.getElementById("product_details").innerHTML = `<p>Product not found.</p>`;
}


// Show cart count on page load
window.addEventListener("load", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").innerText = `Cart (${cart.length})`;
});