const removeItem = document.getElementsByClassName('btn-danger');

function displayCart() {

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let productContainer = document.querySelector('.product');
    //console.log(productContainer);
    //console.log(cartItems);
    if (cartItems && productContainer) {
        //console.log('running');
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product1">    
                <img class="cart-img" src="${item.image}">
                <span class="cart-name">${item.name}</span>
            <div class="cart-price">
                <span>$${item.price}</span>
            </div>
            </div>
            `;
        })

        let total = localStorage.getItem('cartPrice');

        productContainer.innerHTML += `
        <div class="cart-total">
                <h4 class="price-total">
                    $${total}
                </h4>
            </div>
            <div class="clear"> 
                <button class="btn btn-danger" type="button">EMPTY CART</button>
                <a href="checkout.html"><button class="btn btn-primary btn-buy" type="button">PURCHASE</button></a>
            </div>
            
        `;
    }

    let removeCart = document.querySelectorAll('.btn-danger')

    for (let i = 0; i < removeCart.length; i++) {
        removeCart[i].addEventListener('click', () => {
            //console.log('remove button clicked');


            function itemRemove() {
                localStorage.removeItem('productsInCart');
                localStorage.removeItem('cartPrice');
                location.reload();
            }
            itemRemove();
        });


    }
}





displayCart();