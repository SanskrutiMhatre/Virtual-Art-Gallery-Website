/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

let carts = document.querySelectorAll('.mt-auto');
let products = [
    {
        name: 'Oil Painting',
        tag: 'oilpainting',
        price: 180,
        inCart: 0
    },
    {
        name: 'Watercolor Painting',
        tag: 'watercolor',
        price: 108,
        inCart: 0
    },
    {
        name: 'Acrylic Painting',
        tag: 'acrylic',
        price: 250,
        inCart: 0
    },
    {
        name: 'Mandala Painting',
        tag: 'mandala',
        price: 140,
        inCart: 0
    },
    {
        name: 'Flower Mandala',
        tag: 'flowermandala',
        price: 215,
        inCart: 0
    },
    {
        name: 'Warli Art',
        tag: 'warliart',
        price: 280,
        inCart: 0
    },
    {
        name: 'Landscape',
        tag: 'landscape',
        price: 128,
        inCart: 0
    },
    {
        name: 'Scenic Painting',
        tag: 'scenic',
        price: 140,
        inCart: 0
    },
]

for(let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers) {
        document.querySelector('.rounded-pill').textContent = productNumbers;
    }
}

function cartNumbers(products) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.rounded-pill').textContent = productNumbers + 1;
    }
    else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.rounded-pill').textContent = 1;
    }
    setItem(products);
}

function setItem(products) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    if(cartItems != null) {
        if(cartItems[products.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [products.tag]: products
            }
        }
        cartItems[products.tag].inCart += 1;
    } else {
        products.inCart = 1;
        cartItems = {
            [products.tag]: products
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(products) {
    let cartCost = localStorage.getItem('totalCost');
    console.log("My cartCost is ", cartCost);
    console.log(typeof cartCost);
    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + products.price);
    } else {
        localStorage.setItem("totalCost", products.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');
    console.log(cartItems);
    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="products">
                <i class="bi bi-x-circle"></i>
                <img src="/images/${item.tag}.jpg" style="height: 131px; margin-top: 11px; margin-left: -311px;">
                <span>${item.name}</span>
            </div>
            <div class="price" style="margin-top: -85px;">$${item.price}.00</div>
            <div class="quantity">
                <i class="bi bi-plus-square-fill"></i>
                <span>${item.inCart}</span>
                <i class="bi bi-dash-square-fill"></i>
            </div>
            <div class="total">
                $${item.inCart * item.price}.00
            `
        });
        productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">
                Basket Total: 
            </h4>
            <h4 class="basketTotal" style="margin-left: 292px;">
                $${cartCost}.00
            </h4>
        `
    }
}

onLoadCartNumbers();
displayCart();