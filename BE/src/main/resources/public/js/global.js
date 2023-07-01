//-- Variables --//
var productsData = [];
var userData = [];
var cartData = [];

function getProducts() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            method: "GET",
            contentType: "application/json",
            url: "/api/v1/shop/products",
            success: function (json) {
                console.log(json);
                productsData = json;
                console.log("productsData: " + productsData); // + JSON.stringify(productsData)
                resolve(productsData);
            },
            error: function () {
                console.error("An ERROR occured!");
                reject(Error);
            },
        });
    });
};

function getUser() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            method: "GET",
            dataType: "json",
            url: "/api/v1/authorisation/users",
            success: function (json) {
                console.log(json);
                userData = json;
                console.log("userData: " + userData);
                resolve(userData);
            },
            error: function () {
                console.error("An ERROR occured!")
                reject(Error);
            }
        });
    });
}

function getCart() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            method: "GET",
            dataType: "json",
            url: "/api/v1/user/cart",
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
    });
};



