//--- VARIABLES ---//
var products = [];
var cartData = [];
var cartSum = 0.00;
var totalAmount = 0.00;

//--- CODE ---//
waitFor2Jobs();
async function waitFor2Jobs() {
    try {
        await getProducts();
        await getCart();
        console.log("Beide fertig");
        InitializeSearchFilter();
        filterProducts();
        loadCartHTML();
    } catch (error) {
        console.log("An error occured: ", error);
    }
}

function getProducts() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            method: "GET",
            dataType: "json",
            url: "/api/v1/products",
            success: function (json) {
                //console.log(json);
                products = json;
                console.log(products);
                resolve(json);
            },
            error: function () {
                console.error("An ERROR occured!");
                reject(Error);
            },
        });
    });
}

function getCart() {
    return new Promise(function (resolve, reject) {
        // WORKAROUND LOAD TEST cart.json
        $.ajax({
            method: "GET",
            dataType: "json",
            url: "/api/v1/shop/products",
            success: function (json) {
                //console.log(json)
                cartData = json;
                console.log(cartData);
                resolve(cartData);
            },
            error: function () {
                console.error("An ERROR occured!");
                reject(Error);
            },
        });
        // END WORKAROUND LOAD TEST cart.json
    });
}

//-- SearchFilter Visuals -- //
function InitializeSearchFilter() {
    $("#categorySearchFilter").append(
        '<div id="filterContainer">' +
        '<select id="categoryFilter">' +
        '<option value="">All Categories</option>' +
        '<option value="Cardgame">Cardgame</option>' +
        '<option value="Boardgame">Boardgame</option>' +
        '<option value="Accesories">Accesories</option>' +
        '<option value="rating">Rating</option>' +
        "</select>" +
        '<select id="priceFilter">' +
        '<option value="">All Prices</option>' +
        '<option value="under25"> < €25</option>' +
        '<option value="25to50">€25 - €50</option>' +
        '<option value="over50"> > €50</option>' +
        "</select>" +
        '<input type="text" id="searchInput" placeholder="Search products">' +
        "</div>"
    );
}
//-- SearchFilter Functionality --//
function filterProducts() {
    console.log("filterProducts");
    const searchKeyword = $("#searchInput").val().toLowerCase();
    const categoryFilter = $("#categoryFilter").val();
    const priceFilter = $("#priceFilter").val();

    const filteredProducts = products.filter((product) => {
        const nameMatch = product.name.toLowerCase().includes(searchKeyword);
        const categoryMatch =
            categoryFilter === "" || product.category === categoryFilter;
        const priceMatch =
            priceFilter === "" ||
            (priceFilter === "under25" && product.price < 25) ||
            (priceFilter === "25to50" &&
                product.price >= 25 &&
                product.price <= 50) ||
            (priceFilter === "over50" && product.price > 50);

        return nameMatch && categoryMatch && priceMatch;
    });

    loadProducts(filteredProducts);
}

// Function to display the filtered products
function loadProducts(products) {
    const productList = $("#productList");
    productList.empty();

    if (products.length === 0) {
        productList.append("<p>No products found.</p>");
    } else {
        products.forEach((product) => {
            productList.append("<p>" + product.name + "</p>");
        });
    }
}

// Event listeners for search input and filter changes
$("#searchInput, #categoryFilter, #priceFilter").on(
    "input change",
    filterProducts
);

function loadProducts(data) {
    console.log("loadProducts");
    let productCardsList =
        '<div id="productList" class="row row-cols-1 row-cols-md-3 g-4">' +
        "</div>";

    $("#productListContainer").empty().append(productCardsList);

    $.each(data, function (i, data) {
        let cardBody =
            '<div class="col">' +
            '<div class="card-body" id="' +
            data.id +
            '">' +
            '<p class="productPrice">Price: ' +
            data.price +
            "</p>" +
            '<p class="productCategory">Category: ' +
            data.category +
            "</p>" +
            '<p class="productRating">Rating: ' +
            data.rating +
            "</p>" +
            "</div>" +
            '<div class="card-footer">' +
            '<small class="text-body-secondary">' +
            '<a href="#" class="btn btn-primary">Add to Cart</a>' +
            "</small>" +
            "</div>";

        let cardImg =
            '<div class="cardimg h-100">' +
            "<img src=../../public/img/" +
            data.img_path +
            ' class="img-fluid" alt="Product Picture">' +
            "</div>";

        $("#productList").append(
            '<div class="col">' +
            '<div class="card h-100" id="card' +
            i +
            '" draggable="true" ondragstart="drag(event)">' +
            '<div class="card-header">' +
            '<h5 class="productName">' +
            data.name +
            "</h5>" +
            "</div>" +
            cardImg +
            cardBody +
            "</div>" +
            "</div>"
        );
    });
}

//-- HOMESHOPPING_CART --//
function loadCartHTML() {
    console.log("loadCart");
    let cartHeader =
        '<div class="header" id="cartHeader">' +
        '<div class="row">' +
        '<div class="col center"><h5>Product Name</5></div>' +
        '<div class="col center"><h5>Quantity</5></div>' +
        '<div class="col center"><h5>Price Single</5></div>' +
        '<div class="col center"><h5>Total</5></div>' +
        "</div>" +
        "</div>";
    let cartList =
        '<ul class="cartList" id="cartList">' +
        '<div class="Placeholder" id="cartListPlaceholder">' +
        "You can drag a Product and drop it here to add it to the Shopping Cart!" +
        "</div>" +
        "</ul>";
    let cartSum =
        '<div class="row">' +
        '<div class="col" id="cartSumLable">SUMME:</div>' +
        '<div class="col total-amount Number" id="cartSum">0,00 €</div>' +
        "</div>";

    let cart =
        '<div class="col" id="shoppingCart">' +
        '<div class="card droppable h-100" ondrop="drop(event)" ondragover="allowDrop(event)" id="cart">' +
        '<div class="card-header">' +
        '<h4 class="cartName">Shopping Cart</h4>' +
        "</div>" +
        cartHeader +
        cartList +
        '<div class="card-footer">' +
        '<small class="text-body-secondary">' +
        cartSum +
        "</small>" +
        "</div>" +
        '<button class="btn btn-primary" id="orderBtn" onclick="openPopup()">Jetzt bestellen!</button>' +
        "</div>";

    let popupWindow =
        "<h2>Ihre Bestellung</h2>" +
        '<div id="orderPopup"></div>' +
        '<div>' +
        '<label for="coupon-input">Gutscheincode hier eingeben:</label>' +
        '</div>' +
        '<div class="row">' +
        '<div class="col">' +
        '<input type="text" id="coupon-input">' +
        '</div>' +
        '<div class="col Number" id="coupon-amount">0,00 €</div>' +
        '</div>' +
        '<button class="btn btn-primary" onclick="applyCoupon()">Gutschein einlösen</button>' +
        '<div class="row">' +
        '<div class="col" id="total-amountLable">MwSt 20 % : </div>' +
        '<div class="col Number" id="tax-amount">0,00 €</div>' +
        '</div>' +
        '<hr>' +
        '<div class="row">' +
        '<div class="col" id="orderSumLable">SUMME : </div>' +
        '<div class="col total-amount Number" id="orderSum">0,00 €</div>' +
        '</div>' +
        '<label for="payment-method">Zahlungsmethode:</label>' +
        '<select id="payment-method">' +
        '<option value="Kreditkarte">Kreditkarte</option>' +
        '<option value="EPS">EPS</option>' +
        '<option value="Klarna">Klarna</option>' +
        "</select>" +
        '<button class="btn btn-primary" onclick="closePopup()">Zahlungspflichtig bestellen!</button>' +
        "</div>";

    $("#cartContainer").append(cart);
    $("#popup").append(popupWindow);
    $("#cartListPlaceholder").css({
        "border-style": "dotted",
        "border-radius": "15px",
        padding: "40px",
        margin: "20px 30px 20px 0px",
    });
    $(".Number").css({ "text-align": "right" });
}

//-- DragAndDrop --//
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    console.log(data + " dropped");
    var draggedElement = document.querySelector("#" + data);

    sendCartProduct(data);
}
//-- write ShoppingCart to CartProductsJson
function sendCartProduct(data) {

    getCart();
    let to = "cartList";
    loadCartProducts(to);

    // WORKAROUND LOAD TEST cart.json
    // Every drag and drop sends a POST with CartProductID to REST-API
    // wich adds the id to a cartlist and returns the current
    // Shopping Cart Items with values in response like in
    // Data/cart.json

    /*var cartproductid = {
          id: data,
      };

      $.ajax({
          method: "POST",
          url: "/api/v1/auth/cart",
          contentType: "application/json",
          data: JSON.stringify(cartproductid),

          success: function(response){
              console.log(response)
              loadCart(response);
          },
          error: function(response){
              console.log(response)
              console.error("An ERROR occured!")
          }
      })
      */
}

function loadCartProducts(to) {
    console.log("loadCartProducts " + to);
    $(".Placeholder").hide();

    $.each(cartData, function (i, cartData) {
        //console.log(cartData);
        $.each(cartData.cartProducts, function (i, cartProducts) {
            //console.log(cartProducts);
            let cartBody =
                '<li class="listItem" id="' +
                cartProducts.id +
                '">' +
                '<span class="listItemValue" id="productName">' +
                cartProducts.name +
                "</span>" +
                '<span class="listItemValue Number" id="productQuantity">' +
                cartProducts.quantity +
                "</span>" +
                '<span class="listItemValue Number" id="productPriceSingle"> ' +
                cartProducts.price_single +
                "</span>" +
                '<span class="listItemValue Number" id="productPriceTotal">' +
                cartProducts.price_total +
                "</span>" +
                "</li>";
            var price = parseFloat(cartProducts.price_total);
            cartSum += price;
            $("#" + to).append(cartBody);
        });
    });
    var totalAmount = cartSum;
    cartSum = 0.00;
    document.getElementById("cartSum").innerHTML = totalAmount.toFixed(2) + " €";
    document.getElementById("orderSum").innerHTML = (parseFloat(document.getElementById("cartSum").innerHTML)).toFixed(2) + " €";
    document.getElementById("tax-amount").innerHTML = (parseFloat(document.getElementById("orderSum").innerHTML)/100*20).toFixed(2) + " €";
    $(".Number").css({ "text-align": "right" });
}

function openPopup() {
    console.log("openPopup");
    document.getElementById("popup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
    let to = "orderPopup";
    loadCartProducts(to);
}

function applyCoupon() {
    var couponInput = document.getElementById("coupon-input").value;
    // Hier können Sie den Gutscheinwert prüfen und die Gesamtsumme entsprechend reduzieren.
    // Beispiel:
    var totalAmount = parseFloat(document.getElementById("orderSum").innerHTML).toFixed(2);
    var couponValue = parseFloat(couponInput).toFixed(2);
    if (!isNaN(couponValue)) {
        totalAmount -= couponValue;
    }
    document.getElementById("coupon-amount").innerHTML = couponInput + " €";
    document.getElementById("orderSum").innerHTML = totalAmount + " €";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
    totalAmount = 0.00;
    document.getElementById("orderSum").innerHTML = (parseFloat(document.getElementById("cartSum").innerHTML)).toFixed(2) + " €";
    document.getElementById("cartSum").innerHTML = totalAmount.toFixed(2) + " €";
    $(".listItem").remove();
    $(".Placeholder").show();
}
