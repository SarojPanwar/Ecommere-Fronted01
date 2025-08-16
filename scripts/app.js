// console.log("E-Commerce Website Loaded");
const menuToggle =document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click",()=>{
    navMenu.classList.toggle("active");
});

// grid card
const grid = document.getElementById("product_grid");
if(grid){
fetch("https://fakestoreapi.com/products")
.then(res=>res.json())
.then(products=>{
    // stroe products for product.html
    localStorage.setItem("products",JSON.stringify(products));

    products.forEach(product=>{
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML=`
     <a href="product.html?id=${product.id}">
    <img src="${product.image}" alt="${product.title}" loading="lazy">
    </a>
    <div class="card_content">
    <h6>${product.title}</h6>
    <p>${product.price}</p>
    <button class="add-to-cart" data-id="${product.id}">Add to cart</button>
    </div>`;

    grid.appendChild(card);

    });

     // Update cart count on load
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        updateCartCount(cart.length);
       
    
})
.catch(err=> console.error("Error loading products;",err));
}


// Event delegation for all Add to Cart buttons
document.addEventListener("click", e => {
    let btn = e.target.closest(".add-to-cart");
    if (btn) {
        e.preventDefault();

        let products = JSON.parse(localStorage.getItem("products")) || [];
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        
        let productId = btn.dataset.id;
        let product = products.find(p => p.id == productId);

        if (product) {
            if(!cart.some(item=>item.id==productId)){
                cart.push(product);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartCount(cart.length);
                alert(`${product.title} added to cart!`);

            }else{
                alert(`${product.title} is already in your cart!`);
            }
            
            
        }
    }
});

// function to update cart 
function updateCartCount(count){
    let cartCountEl = document.getElementById("cart-count");
    if(cartCountEl){
        cartCountEl.innerText = `Cart (${count})`;
    }
}


