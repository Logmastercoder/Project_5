const queryString = window.location.search
const searchParams = new URLSearchParams(queryString);
const bearid = searchParams.get('bearid')
const bearListElement = document.getElementById("js-bearlist");

fetch("http://localhost:3000/api/teddies/" + bearid)
    .then(
        function(response) {
            response.json().then(function(data) {
                let bearHtml = ""
                bearHtml += `
                        <div class="shop-items col-xl-2">
                        <div class="shop-item ">
                            <h1 class="shop-item-title size"><div>${data.name}</div></h1>
                            <img class="shop-item-image " src="${data.imageUrl}">
                        <div class="description">${data.description}</div>
                        <div class="shop-item-details ">                            
                            <span class="shop-item-price "><div>$${data.price}</div></span>
                            <a class="btn btn-primary shop-item-button add-cart" href="#">Add to Cart</a>
                        </div>
                        </div>
                    `
                bearListElement.innerHTML = bearHtml


                let cart = document.querySelectorAll('.add-cart');

                var localStorageData = {
                    id: data._id,
                    name: data.name,
                    image: data.imageUrl,
                    price: data.price,
                }

                for (let i = 0; i < cart.length; i++) {
                    cart[i].addEventListener('click', () => {
                        //console.log('added to cart');
                        setItems(localStorageData);

                        function setItems() {
                            //console.log('inside of setItems function');
                            //console.log('The product clicked is', localStorageData);

                            let cartItems = {
                                [localStorageData.name]: localStorageData
                            }

                            if (localStorage.getItem('productsInCart') == undefined) {
                                cartItems = {
                                    [localStorageData.name]: localStorageData
                                }
                            } else {
                                cartItems = {
                                    ...JSON.parse(localStorage.getItem('productsInCart')),
                                    [localStorageData.name]: localStorageData
                                }
                            }

                            alert('Item has been added to your Cart!')

                            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                        }

                        function totalPrice() {
                            let cartCost = localStorage.getItem('cartPrice');
                            //console.log(cartCost);

                            if (cartCost != undefined) {
                                //alert('cartprice was empty')
                                cartCost = parseInt(cartCost);
                                localStorage.setItem('cartPrice', cartCost + localStorageData.price);
                            } else {
                                localStorage.setItem('cartPrice', localStorageData.price);
                            }
                        }

                        totalPrice();
                    })
                }
                //console.log(localStorage.getItem('productsInCart'));
            })
        });