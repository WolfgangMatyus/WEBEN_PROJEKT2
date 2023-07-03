//--- VARIABLES ---//
var cartSum = 0.00;
var voucherAmount = 0.00;
var taxSum = 0.00;
var totalAmount = 0.00;
/*
function loadHeaderValues(){
    createCartContent();
    showCartFromStorage();
};
*/
$(document).ready( function (){
    createCartContent();
    showCartFromStorage();
});

function toggleCartClick(event) {
    console.log("clickedcart");
    document.getElementById("cartContainer").classList.toggle("show");
}

function addCartProduct(product_id) {
    console.log("product_id: ", product_id)

    let cart = localStorage.getItem('cart');
    if(!cart) {
        cart = [];
    } else {
        cart = JSON.parse(cart);
    }

    let toAdd = true;
    $.each(cart, function (i, cart_entry){
        if(cart_entry.product.id == product_id) {
            cart_entry.quantity++;
            toAdd = false;
        }
    });

    if(toAdd) {
        let entry = {};
        entry.quantity = 1;
        entry.product = productsData[product_id-1]
        cart.push(entry);
    }
    localStorage.setItem('cart', JSON.stringify(cart));

    $(".Placeholder").remove();
    showCartFromStorage();
}

function removeCartProduct(product_id) {
    console.log("product_id wird gelöscht: ", product_id)
    // find in productData

    let cart = localStorage.getItem('cart');
    if(!cart) {
        cart = [];
    } else {
        cart = JSON.parse(cart);
    }
    let index = cart.indexOf(product_id);

    cart.splice(index, 1);

    localStorage.setItem('cart', JSON.stringify(cart));

    $(".Placeholder").remove();
    showCartFromStorage();
}

function showCartFromStorage() {
    $("#cartList").empty();
    let cart = localStorage.getItem('cart');
    cart = JSON.parse(cart);
    let cartQuantity = 0;
    cartSum = 0.00;
    $("#orderPopup").empty();
    $.each(cart, function (i, cart_entry) {
        console.log(cart_entry);
        let cartListItem = '<li class="listItem" id="' + cart_entry.product.id + '">'
            + '<span class="listItemValue" id="productName">' + cart_entry.product.name + '</span>'
            + '<span class="listItemValue Number" id="productQuantity">' + cart_entry.quantity + '</span>'
            + '<span class="listItemValue Number" id="productPriceSingle"> ' + cart_entry.product.price.toFixed(2) + '</span>'
            + '<span class="listItemValue Number" id="productPriceTotal">' + (cart_entry.product.price * cart_entry.quantity).toFixed(2) + '</span>'
            + '<button class="btn btn-primary" onclick="removeCartProduct(' + cart_entry.product.id + ')">Produkt entfernen</button>'
            + '<button class="btn btn-primary" onclick="addCartProduct(' + cart_entry.product.id + ')">mehr davon!</button>' + '</li>';

        $("#cartList").append(cartListItem);
        $("#orderPopup").append(cartListItem);

        cartQuantity = cartQuantity + cart_entry.quantity;
        cartSum = cartSum + (cart_entry.product.price * cart_entry.quantity);
        document.getElementById("cartSum").innerHTML = cartSum;
    });

    totalAmount = cartSum - voucherAmount;
    taxSum = (totalAmount / 100 * 20).toFixed(2)

    document.getElementById("cartSum").innerHTML = cartSum + " €";
    document.getElementById("orderSum").innerHTML = totalAmount + " €";
    document.getElementById("tax-amount").innerHTML = taxSum + " €";
    document.getElementById("amountProducts").innerHTML = cartQuantity;

    $(".Number").css({
        "text-align": "right"
    });

    if (document.getElementById("amountProducts").innerHTML === 0) {
        $("#amountProducts").hide()
    } else {
        $("#amountProducts").show()
    }
}

//-- DragAndDrop --//
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    document.getElementById("cartContainer").classList.add("show");
    event.dataTransfer.setData("product_id", event.target.dataset.product);
}

function drop(event) {
    event.preventDefault();
    var product_id = event.dataTransfer.getData("product_id");
    addCartProduct(product_id);
}

//-- write ShoppingCart to CartProductsJson

function createCartContent() {
    console.log("loadCart");
    let cartHeader =
        '<div class="header" id="cartHeader">' +
        '<div class="row">' +
        '<div class="col center"><h5>Name</5></div>' +
        '<div class="col center"><h5>Anzahl</5></div>' +
        '<div class="col center"><h5>Preis</5></div>' +
        '<div class="col center"><h5>Gesamt</5></div>' +
        "</div>" +
        "</div>";

    let cartList =
        '<ul class="cartList" id="cartList">' +
        '<div class="Placeholder" id="cartListPlaceholder">' +
        "Sie können Ihre Produkte hier in den Warenkorb ziehen!" +
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
        '<button class="btn btn-primary" onclick="closePopup()">Zurück zum Shop!</button>' +
        "</div>";

    $("#cartContainer").append(cart);
    $("#popup").append(popupWindow);
    $("#cartListPlaceholder").css({
        "border-style": "dotted",
        "border-radius": "15px",
        padding: "40px",
        margin: "20px 30px 20px 0px",
    });

    $(".Number").css({"text-align": "right"});
};
function openPopup() {
    document.getElementById("popup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function applyCoupon() {
    var couponInput = document.getElementById("coupon-input").value;
    // Hier können Sie den Gutscheinwert prüfen und die Gesamtsumme entsprechend reduzieren.
    // Beispiel:

    console.log("couponInput", couponInput);

    $.ajax({
        method: "GET",
        contentType: "application/json",
        url: "/api/v1/shop/voucher/" + couponInput + "/valid",
        success: function (json) {
            voucherData = json;
            loadProductList();
        },
        error: function () {
            console.error("An ERROR occured!");
        },
    });

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