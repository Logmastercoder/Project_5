let validateButton = document.getElementById('btn-validate');

validateButton.addEventListener('click', (event) => {
    event.preventDefault();

    const firstName = document.getElementById('First-Name');
    const lastName = document.getElementById('Last-Name');
    const address = document.getElementById('Address');
    const city = document.getElementById('City');
    const email = document.getElementById('Email');

    const clientInformation = { firstName: firstName.value, lastName: lastName.value, email: email.value, city: city.value, address: address.value };
    const arrayId = [];

    function cartId() {
        let productInCartId = JSON.parse(localStorage.getItem('productsInCart'));
        //console.log(typeof orderId);
        Object.values(productInCartId).forEach(bearInCartId => {
            //console.log(bearInCartId);
            arrayId.push(bearInCartId.id)
                //console.log(arrayId);
                //console.log(typeof orderId);
        })
    }
    cartId();

    fetch('http://localhost:3000/api/teddies/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ contact: clientInformation, products: arrayId })
        })
        .then(
            function(response) {
                response.json().then(function(data) {
                    //console.log(data);

                    function displayOrderInformation() {
                        confirmationInformation = document.getElementById('confirmation');
                        let totalPrice = localStorage.getItem('cartPrice');

                        confirmationInformation.innerHTML = `
                        <div class="confirmation">
                            <h3 class="space"> Your total was $ ${totalPrice}</h3>
                            <h4 class="space"> Thank you for shopping with us!</h4>
                            <h4 class="space"> Your confirmation Number is: ${data.orderId}</h4>
                            <h5 class="space"> Thank you for shopping with us ${firstName.value} ${lastName.value}</h5>
                        </div>
                    `;
                    }
                    displayOrderInformation();
                })
            });
});
