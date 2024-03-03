const cartIcon = document.getElementById('cart-icon');
const cart = document.querySelector('.cart')
const cartClose = document.getElementById('close-cart')
const shoppingClose = document.querySelector('fa-bag-shopping');
const buy = document.querySelector('.btn-buy');
const containerModal = document.querySelector('.container');

// open
cartIcon?.addEventListener('click', () => {
    cart.classList.add('active');
  });

// close
cartClose?.addEventListener('click', () => {
    cart.classList.remove('active');
  });


  buy?.addEventListener('click', () => {
    containerModal.classList.add('si-active');
  });


// Making add to cart

if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', readyState);
} else {

    ready();
}




// function

function ready() {

    // remove item
    var removeCartButtons = document.getElementsByClassName('cart-remove');

    for(var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem)
    }

    // quantity change
    var quantityInput = document.getElementsByClassName('cart-quantity');

    for(var i = 0; i < quantityInput.length; i++) {
        var input = quantityInput[i];
        input.addEventListener('change', quantityChange)
    }

    var addCart = document.getElementsByClassName("add-cart");

    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];

        button.addEventListener('click', addCartClick)
    }

}

// remove cart item
function removeCartItem(event) {
    var buttonClick = event.target;

    buttonClick.parentElement.remove();
    updateTotal();

}


// quantity changes
function quantityChange(event) {

    var input = event.target;

    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }

    updateTotal();
}

// quantity in cart icon

function updateCartIcon() {
    var cartBoxes = document.getElementsByClassName('cart-box');
    var quantity = 0;

    for(var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        quantity += parseInt(quantityElement.value);
    }

    var cartIcon = document.querySelector('#cart-icon');
    cartIcon.setAttribute('data-quantity', quantity);
}


// add cart produtc
function addCartClick(event) {
    var button = event.target;
    var shopProducts = button.parentElement;

    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();

    cart.classList.add('active');
}

function addProductToCart(title, price, productImg) {

    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsName = cartItems.getElementsByClassName('cart-product-title');

    for(var i = 0; i < cartItemsName.length; i++ ) {
        if(cartItemsName[i].innerText == title) {
            alert('Error')
            return;
        }
    }

    var cartBoxContent = `<img src="${productImg}" class="cart-img" alt="">

    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" name="" id="" value="1"  class="cart-quantity">
    </div>

    <i class="fa-solid fa-trash cart-remove"></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChange);

}


// update
function updateTotal() {

    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;

    for(var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('R$', ''));
        var quantity = quantityElement.value;
        total += price * quantity;

       
    }

    total = Math.round(total * 100) / 100
    document.getElementsByClassName('total-price')[0].innerText = 'R$' + total;

}