const bearListElement = document.getElementById("js-bearlist");

fetch("http://localhost:3000/api/teddies")
    .then(
        function(response) {
            response.json().then(function(data) {
                let bearHtml = ""
                data.forEach(function(item) {
                    bearHtml += `
                        <div class="shop-items col-xl-2" id="js-bearlist">
                        <div class="shop-item ">
                            <h5 class="shop-item-title "><div>${item.name}</div></h5>
                            <img class="shop-item-image " src="${item.imageUrl}">
                        <div class="shop-item-details ">                            
                            <span class="shop-item-price "><div>$${item.price}</div></span>
                            <a class="btn btn-primary shop-item-button" href="item.html?bearid=${item._id}" type="button ">More Details</a>
                        </div>
                        </div>
                    `
                })
                bearListElement.innerHTML = bearHtml
            });
        }
    )