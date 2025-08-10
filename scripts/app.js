// console.log("E-Commerce Website Loaded");
const menuToggle =document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click",()=>{
    navMenu.classList.toggle("active");
});

// grid card
const grid = document.getElementById("product_grid");
fetch("https:fakestoreapi.com/products")
.then(res=>res.json())
.then(products=>{
    products.forEach(product=>{
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML=`
    <img src="${product.image}" alt="${product.title}" loading="lazy">
    <div class="card_content">
    <h6>${product.title}</h6>
    <p>${product.price}</p>
    <a href="#">Add to cart</a>
    </div>`;

    grid.appendChild(card);

    });
    
})
.catch(err=> console.error("Error loading products;".err));