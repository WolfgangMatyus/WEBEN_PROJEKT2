//--- Variables---//


//--- Code --//
$(document).ready(function(){
//-- Initialize SHOPLIST --//
    InitializeSearchFilter();
    getProducts(function(products){
        console.log(products);
        filterProducts(products)
    });
    loadHomeCart();
});

function getProducts(callback){
    $.ajax({
        method: "GET",
        contentType: "application/json",
        url: "/api/v1/shop/products",
        success: function(json){
            console.log(json);
            callback(json);
        },
        error: function(){
            console.error("An ERROR occured!")
        }
    })
};

//-- SearchFilter Visuals -- //
function InitializeSearchFilter(){
    $("#categorySearchFilter")
        .append('<div id="filterContainer">'
                +'<select id="categoryFilter">'
                +'<option value="">All Categories</option>'
                +'<option value="Cardgame">Cardgame</option>'
                +'<option value="Boardgame">Boardgame</option>'
                +'<option value="Accesories">Accesories</option>'
                +'<option value="rating">Rating</option>'
                +'</select>'
                +'<select id="priceFilter">'
                +'<option value="">All Prices</option>'
                +'<option value="under25"> < €25</option>'
                +'<option value="25to50">€25 - €50</option>'
                +'<option value="over50"> > €50</option>'
                +'</select>'
                +'<input type="text" id="searchInput" placeholder="Search products">'
                +'</div>'
                );
}
//-- SearchFilter Functionality-- //
function filterProducts(products) {
    //console.log(products);
    //console.log("filterProducts:");
    //for (var i = 0; i < products.length; i++) {
    //console.log("Product: ", products[i].name , products[i].category, products[i].price);
    //}
    const searchKeyword = $("#searchInput").val().toLowerCase();
    const categoryFilter = $("#categoryFilter").val();
    const priceFilter = $("#priceFilter").val();
  
    const filteredProducts = products.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(searchKeyword);
      const categoryMatch = categoryFilter === "" || product.category === categoryFilter;
      const priceMatch =
        priceFilter === "" ||
        (priceFilter === "under25" && product.price < 25) ||
        (priceFilter === "25to50" && product.price >= 25 && product.price <= 50) ||
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
      products.forEach(product => {
        productList.append("<p>" + product.name + "</p>");
      });
    }
  }
  
  // Event listeners for search input and filter changes
  $("#searchInput, #categoryFilter, #priceFilter").on("input change", filterProducts);

function loadProducts(data) {

    let productCardsList = '<div id="productList" class="row row-cols-1 row-cols-md-3 g-4">'
                        +  '</div>'

    $("#productListContainer")
        .empty()
        .append(productCardsList);

    $.each(data, function (i, data) {

        let cardBody = '<div class="col">'
                    +  '<div class="card-body" id="' + data.id + '">'
                    
                    +  '<p class="productPrice">Price: ' + data.price + '</p>'
                    +  '<p class="productCategory">Category: ' + data.category + '</p>'
                    +  '<p class="productRating">Rating: ' + data.rating + '</p>'
                    +  '</div>'
                    +  '<div class="card-footer">'
                    +  '<small class="text-body-secondary">'
                    +  '<a href="#" class="btn btn-primary">Add to Cart</a>'
                    +  '</small>'
                    +  '</div>'

        let cardImg = '<div class="cardimg h-100">'
                    + '<img src=../../img/'+ data.img_path +' class="img-fluid" alt="Product Picture">'
                    + '</div>'
        
        $("#productList").append( '<div class="col">'
                                + '<div class="card h-100" id="card'+ i +'" draggable="true" ondragstart="drag(event)">'
                                + '<div class="card-header">'
                                + '<h5 class="productName">' + data.name + '</h5>'
                                + '</div>'
                                + cardImg
                                + cardBody
                                + '</div>'
                                + '</div>'            
            )
    });  
}

//-- HOMESHOPPING_CARD --//  
function loadHomeCart() {

    let homeCartList = '<ul class="homeCartList" id="homeCartList">'
                    +  '<div class="Placeholder" id="homeCartListPlaceholder">'
                    +  'You can drag a Product and drop it here to add it to the Shopping Cart!'
                    +  '</div>'
                    +  '</ul>'
    let homeCartSum = '<div class="row">'
                    + '<div class="col" id="cartSumLable">SUMME:</div>'
                    + '<div class="col" id="cartSumValue">0,00</div>'
                    + '</div>'
    let homeCartHeader = '<div class="header" id="homeCartHeader">'
                        +'<div class="row">'
                        +'<div class="col center"><h5>Product Name</h5></div>'
                        +'<div class="col center"><h5>Quantity</h5></div>'
                        +'<div class="col center"><h5>Price Single</h5></div>'
                        +'<div class="col center"><h5>Total</h5></div>'
                        +'</div>'
                        +'</div>'

    let homeCart = '<div class="col">'
    +  '<div class="card droppable h-100" ondrop="drop(event)" ondragover="allowDrop(event)" id="homeCart">'
    +  '<div class="card-header">'
    +  '<h4 class="cartName">Shopping Cart</h4>'
    +  '</div>'
    +  homeCartHeader
    +  homeCartList
    +  '<div class="card-footer">'
    +  '<small class="text-body-secondary">'
    +  homeCartSum
    +  '</small>'
    +  '</div>'
    +  '</div>'
    
    $("#homeCartContainer")
    .append(homeCart)

    $("#homeCartListPlaceholder").css({
        "border-style": "dotted",
        "border-radius": "15px",
        "padding": "40px",
        "margin": "20px 30px 20px 0px"
      });
};

//-- DragAndDrop --//
function allowDrop(event){
    event.preventDefault();
}

function drag(event){
    event.dataTransfer.setData("text", event.target.id)
}

function drop(event){
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    console.log(data)
    var draggedElement = document.querySelector("#" + data);

    sendCartProduct(data);
}
//-- write ShoppingCart to CartProductsJson
function sendCartProduct(data){
    
    let response = data;
    getCartFromBackend(response);

    // WORKAROUND LOAD TEST cartproducts.json
    // Every drag and drop sends a POST with CartProductID to REST-API 
    // wich adds the id to a cartlist and returns the current 
    // Shopping Cart Items with values in response like in 
    // Data/cartproducts.json

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

function getCartFromBackend(response){

    // WORKAROUND LOAD TEST cartproducts.json
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "../../Data/cartproducts.json",

        success: function(json){
            console.log(json)
            loadCartOnFrontend(json)
        },
        error: function(json){
            console.error("An ERROR occured!")
        }
    })
    // END WORKAROUND LOAD TEST cartproducts.json
}
    
function setCartProducts(data){

    $(".Placeholder").remove();

    $.each(data, function (i, data) {
            
        let cardBody = '<li class="listItem" id="' + data.id + '">'
        + '<span class="listItemValue" id="productName">' + data.name + '</span>'
        + '<span class="listItemValue Number" id="productQuantity">' + data.quantity + '</span>'
        + '<span class="listItemValue Number" id="productPriceSingle"> ' + data.price_single + '</span>'
        + '<span class="listItemValue Number" id="productPriceTotal">'+ data.price_total + '</span>'
        + '</li>'
    
       
    $("#homeCartList").append(cardBody);
    })
    $(".Number")
    .css({"text-align": "right"
})

}


 

