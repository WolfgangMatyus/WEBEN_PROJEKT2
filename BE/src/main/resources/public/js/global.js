//-- Variables --//
var productsData = [];
var userData = [];
var cartData = [];


// -- Products --//
function getProducts() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            method: "GET",
            contentType: "application/json",
            url: "/api/v1/shop/products",
            success: function (json) {
                for (let i = 0; i < json.length; i++) {
                    productsData[json[i].id] = json[i];
                }
                resolve(productsData);
            },
            error: function () {
                console.error("An ERROR occured!");
                reject(Error);
            },
        });
    });
};


// -- USERS -- //
function getUserById(id) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            method: "GET",
            dataType: "json",
            url: "/api/v1/user/"+id,
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

function getUserById(id) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            method: "GET",
            dataType: "json",
            url: "/api/v1/user/"+id,
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

function getUsers() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            method: "GET",
            dataType: "json",
            url: "/api/v1/admin/users",
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

// -- CART -- //

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

// --  VOUCHER -- //

function getVoucher() {
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





