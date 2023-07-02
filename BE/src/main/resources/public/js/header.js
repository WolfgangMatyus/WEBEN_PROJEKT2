$(document).ready(function(){

    createCartContent();
    //getCartFromBackendd();

});

function toggleCartClick(event) {
    console.log("clickedcart");
    document.getElementById("cartContainer").classList.toggle("show");
}


/*
function getCartFromBackendd(){

    $.ajax({
        method: "GET",
        contentType: "application/json",
        url: "/api/v1/user/cart",
        beforeSend: function(xhr) {
            let jwtToken = sessionStorage.getItem('jwtToken');
            xhr.setRequestHeader('Authorization', jwtToken);
        },
        success: function(json){
            console.log(json);
        },
        error: function(){
            console.error("An ERROR occured!")
        }
    })
}
*/
function setCartProducts(data) {

    $(".Placeholder").remove();

    $.each(data, function (i, data) {

        let cardBody = '<li class="listItem" id="' + data.id + '">'
            + '<span class="listItemValue" id="productName">' + data.name + '</span>'
            + '<span class="listItemValue Number" id="productQuantity">' + data.quantity + '</span>'
            + '<span class="listItemValue Number" id="productPriceSingle"> ' + data.price_single + '</span>'
            + '<span class="listItemValue Number" id="productPriceTotal">' + data.price_total + '</span>'
            + '</li>';

        $("#homeCartList").append(cardBody);
    })
    $(".Number").css({
        "text-align": "right"
    });
}


function createCartContent() {

    let cartList = '<ul class="homeCartList" id="homeCartList">'
        +  '<div class="Placeholder" id="cartListPlaceholder">'
        +  'You can drag a Product and drop it here to add it to the Shopping Cart!'
        +  '</div>'
        +  '</ul>';
    let cartSum = '<div class="row">'
        + '<div class="col" id="cartSumLable">SUMME:</div>'
        + '<div class="col" id="cartSumValue">0,00</div>'
        + '</div>';
    let cartHeader = '<div class="header" id="cartHeader">'
        +'<div class="row">'
        +'<div class="col center"><h5>Product Name</h5></div>'
        +'<div class="col center"><h5>Quantity</h5></div>'
        +'<div class="col center"><h5>Price Single</h5></div>'
        +'<div class="col center"><h5>Total</h5></div>'
        +'</div>'
        +'</div>';

    let homeCart = '<div class="col">'
        +  '<div class="card droppable h-100" ondrop="drop(event)" ondragover="allowDrop(event)" id="homeCart">'
        +  '<div class="card-header">'
        +  '<h4 class="cartName">Shopping Cart</h4>'
        +  '</div>'
        +  cartHeader
        +  cartList
        +  '<div class="card-footer">'
        +  '<small class="text-body-secondary">'
        +  cartSum
        +  '</small>'
        +  '</div>'
        +  '</div>';

    $("#cartContainer")
        .append(homeCart);

    $("#cartListPlaceholder").css({
        "border-style": "dotted",
        "border-radius": "15px",
        "padding": "40px",
        "margin": "20px 30px 20px 0px"
    });
};