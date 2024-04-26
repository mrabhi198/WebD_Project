
//for cart
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} 
else {
    ready();
}

// function
function ready(){
    // remove prod
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    for(var i = 0 ; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    // quantity change
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for(var i = 0 ; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    // add to cart
    var addCart = document.getElementsByClassName("add-cart");
    for(var i = 0 ; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    loadCartItems();
}

//to removing prod
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

//to change quantity
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

//to add prod
function addCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('title')[0].innerText;
    var price = shopItem.getElementsByClassName('price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('image')[0].src;
    addItemToCart(title, price, imageSrc);
    updateCartTotal();
}

// to add prod
function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart');
            return;
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
}

//to update cart
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('₹', ''));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    // if price contain some paisa(some decimal)
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '₹' + total;

    
    //save total to localstorage
    localStorage.setItem('cartTotal', total)
}

// Function to load cart items
function loadCartItems() {
    // Your code to load cart items from storage or server
    // and add them to the cart should go here
}
