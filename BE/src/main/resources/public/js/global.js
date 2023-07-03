//-- Variables --//
var productsData = [];
var userData = [];
var usersData = [];

// -- Products --//
function getProducts() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            method: "GET",
            contentType: "application/json",
            url: "/api/v1/shop/products",
            success: function (json) {
                productsData = json;
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
            contentType: "application/json",
            url: "/api/v1/user/"+id,
            success: function (json) {
                console.log(json);
                userData = json;
                console.log("userData: " + JSON.stringify(userData));
                resolve(userData);
            },
            error: function () {
                console.error("An ERROR occured!")
                reject(Error);
            }
        });
    });
}

function getCurrentUser() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            method: "GET",
            contentType: "application/json",
            url: "/api/v1/user/currentUser",
            success: function (json) {
                console.log(json);
                userData = json;
                console.log("userData: " + JSON.stringify(userData));
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
            contentType: "application/json",
            url: "/api/v1/admin/users",
            success: function (json) {
                console.log(json);
                usersData = json;
                console.log("userData: " + usersData);
                resolve(usersData);
            },
            error: function () {
                console.error("An ERROR occured!")
                reject(Error);
            }
        });
    });
}





