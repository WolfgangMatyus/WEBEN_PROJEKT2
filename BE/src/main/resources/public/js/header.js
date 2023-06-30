//--- VARIABLES ---//
var cartSum = 0.00;
var totalAmount = 0.00;

$(document).ready(function(){

    createCartContent();
    //getCartFromBackendd();
});

function toggleCartClick(event) {
    console.log("clickedcart");
    document.getElementById("cartContainer").classList.toggle("show");
}

function setCartProducts(data) {
    //console.log("setCartProducts: " + data.children().hasClass(".col").hasClass(".card-body").id)
    $(".Placeholder").remove();
    let cartListItem = data;
    /*
      $.each(data, function (i, data) {

          let cartListItem = '<li class="listItem" id="' + data.id + '">'
              + '<span class="listItemValue" id="productName">' + data.name + '</span>'
              + '<span class="listItemValue Number" id="productQuantity">' + data.quantity + '</span>'
              + '<span class="listItemValue Number" id="productPriceSingle"> ' + data.price_single + '</span>'
              + '<span class="listItemValue Number" id="productPriceTotal">' + data.price_total + '</span>'
              + '</li>';
  */
        $("#homeCartList").append(cartListItem);
    //})
    $(".Number").css({
        "text-align": "right"
    });
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
    var droppedElement = document.querySelector("#" + data);
    console.log("droppedElement: " + this);
    setCartProducts(data);
    sendCartProduct(data);
}

//-- write ShoppingCart to CartProductsJson
function sendCartProduct(data) {
    let to = "cartList";
    loadCartProducts(to);
}

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
};

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
