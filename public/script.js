let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');

//making add to cart
//cart working JS
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} 
else {
    ready();
}