//-- Variables --//
var products = [];
var userData = [];
var cartData = [];

function getProducts(){
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "/api/v1/shop/products",
        success: function(json){
            console.log(json);
            products = json;
            console.log("products: " + products);
        },
        error: function(){
            console.error("An ERROR occured!")
        }
    })
};

function getUser(){
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "/api/v1/authorisation/users",
        success: function(json){
            console.log(json);
            userData = json;
            console.log("userData: " + userData);
        },
        error: function(){
            console.error("An ERROR occured!")
        }
    })
};

function getCart(){
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "/api/v1/user/cart",
        success: function(json){
            console.log(json);
            cartData = json;
            console.log("cartData: " + cartData);
        },
        error: function(){
            console.error("An ERROR occured!")
        }
    })
};






