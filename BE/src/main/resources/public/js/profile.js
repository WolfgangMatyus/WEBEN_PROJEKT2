//-- ISSUES --//
// Benutzername wird von username immer auf Mailadresse gesetzt
// wenn der PUT Call durchläuft werden die Daten zwar aktualisiert aber die User_ROLE wird in der DB auf Null gesetzt

//-- VARIABLES --//

//-- CODE --//
waitForProfileJobs();
async function waitForProfileJobs() {
    try {
        await getUserById(1); // ??muss gleaden werden damit getCurrentUser funktioniert??
        await getCurrentUser();
        loadProfileNavbar();
        loadUserData();
        console.log("alle fertig");
    } catch (error) {
        console.log("An error occured: ", error);
    }
}

//-- Navigation User Profile --//
function loadProfileNavbar(){
    console.log("loadProfile");
    let profileCardNavbar = '<div class="card" id="cardStammDaten">'
        +'<div class="card-header" id="stammDatenHeader">'
        +'<ul class="nav nav-tabs card-header-tabs">'
        +'<li class="nav-item" id="userDataNav" >'
        +'<a class="nav-link active" id="userData-link">Stammdaten</a>'
        +'</li>'
        +'<li class="nav-item" id="userCartNav" >'
        +'<a class="nav-link" id="userCart-link">Warenkorb</a>'
        +'</li>'
        +'<li class="nav-item" id="invoicesNav" >'
        +'<a class="nav-link" id="invoices-link">Rechnungen</a>'
        +'</li>'
        +'</ul>'
        +'</div>'
        +'</div>'
        +'</div>'

    $("#customerData").append(profileCardNavbar);
}

//-- EventHandler --//
$(document).on(    'click', '#userDataNav', setUserDataActive);
$(document).on(    'click', '#userCartNav', setUserCartActive);
$(document).on(    'click', '#invoicesNav', setUserInvoicesActive);

//-- Navigation User Profile Functionality --//
function setUserDataActive(){
    console.log("setUserDataNavActive");
    $(".profile-card-body").hide()
    $(".nav-link").attr("class", "nav-link")
    $("#userData-link").attr("class", "nav-link active")
    $("#userStammdaten").show();
}

function setUserCartActive(){
    console.log("setUserCartNavActive");
    $(".profile-card-body").hide()
    loadUserCart();
    $(".nav-link").attr("class", "nav-link")
    $("#userCart-link").attr("class", "nav-link active")
    $("#userStammdaten").show();
}

function setUserInvoicesActive(){
    console.log("setUserInvoicesNavActive");
    $(".profile-card-body").hide()
    loadUserInvoices();
    $(".nav-link").attr("class", "nav-link")
    $("#invoices-link").attr("class", "nav-link active")
    $("#invoices").show();
}

function loadUserData(){
    console.log("loadUserData: " + userData);
    let userDataHtml = '<div class="profile-card-body" id="userStammdaten">'
        +'<h5 class="card-title">Ihre Userstammdaten:</h5>'
        +'<div class="userCurrentData" id="userCurrentData">'
        +'<div class="row" id="username">'
        +'<div class="userDataLabel col-4" for="changeUsername" id="usernameLabel">Benutzername: </div>'
        +'<div class="userDataValue col-4" id="usernameValue">'+userData.username+'</div>'
        +'</div>'
        +'<div class="row" id="email">'
        +'<div class="userDataLabel col-4" for="changeEmail" id="emailLabel">Email: </div>'
        +'<div class="userDataValue col-4" id="emailValue">'+userData.email+'</div>'
        +'</div>'
        +'<div class="row" id="firstname">'
        +'<div class="userDataLabel col-4" for="changeFirstname" id="firstnameLabel">Vorname: </div>'
        +'<div class="userDataValue col-4" id="firstnameValue">'+userData.firstname+'</div>'
        +'</div>'
        +'<div class="row" id="lastname">'
        +'<div class="userDataLabel col-4" for="changeLastname" id="lastnameLabel">Nachname: </div>'
        +'<div class="userDataValue col-4" id="lastnameValue">'+userData.lastname+'</div>'
        +'</div>'
        +'</div>'

    let addressData = '<div class="addressData"></div>'
        + '<h5 class="card-title">Ihre Adresse:</h5>'
        +'<div class="row" id="address">'
        +'<div class="userDataLabel col-2" for="changeAddress" id="addressLabel">Strasse: </div>'
        +'<div class="userDataValue col-4" id="addressValue">'+userData.address+'</div>'
        +'</div>'
        +'<div class="row" id="zip_code">'
        +'<div class="userDataLabel col-2" for="changeZip_code" id="zip_codeLabel">PLZ: </div>'
        +'<div class="userDataValue col-4" id="zip_codeValue">'+userData.zip_code+'</div>'
        +'</div>'
        +'<div class="row" id="town">'
        +'<div class="userDataLabel col-2" for="changeTown" id="townLabel">Ort: </div>'
        +'<div class="userDataValue col-4" id="townValue">'+userData.town+'</div>'
        +'</div>'

        let userPaymentType = '<div class="userPaymentData" id="userPaymentData">'
        + '<h5 class="card-title">Ihre Zahlungsart:</h5>'
        + '<div class="paymentTypes" id="paymentTypes">'
        + '<p>Bitte wählen sie eine Zahlungsart:</p>'
        + '<input type="checkbox" id="kreditkarte" name="paymentType" value="kreditkarte">'
        + '<label for="kreditkarte"> Kreditkarte</label><br>'
        + '<input type="checkbox" id="eps" name="paymentType" value="eps">'
        + '<label for="eps"> EPS</label><br>'
        + '<input type="checkbox" id="Klarna" name="paymentType" value="Klarna">'
        + '<label for="Klarna"> Klarna</label><br>'
        + '<input type="checkbox" id="paypal" name="paymentType" value="paypal">'
        + '<label for="paypal"> Paypal</label>'
        + '</div>'
        + '</div>'

    let additionalData = '<div class="row">'
                    +   '<div class="col-4">'
                    +   userPaymentType
                    +   '</div>'
                    +   '<div class="col-8" id="addressData">'
                    +   addressData
                    +   '<button class="btn btn-primary" id="changeDataBtn" onclick="changeUserData()">Stammdaten anpassen</button>'
                    +   '</div>'

    $("#cardStammDaten").append(userDataHtml + additionalData);

    $(".userDataLabel")
        .css({"font-weight": "bold"})
}

function changeUserData(){
    console.log("changeUserData");
    $("#username").append('<input type="text" class="col-3 changeInput" id="changeUsername" type="text" type="text" placeholder="'+userData.username+'"/>');
    $("#email").append('<input type="email" class="col-3 changeInput center" id="changeEmail" type="text" placeholder="'+userData.email+'"/>');
    $("#firstname").append('<input type="text" class="col-3 changeInput" id="changeFirstname" type="text" type="text" placeholder="'+userData.firstname+'"/>');
    $("#lastname").append('<input type="text" class="col-3 changeInput" id="changeLastname" type="text" type="text" placeholder="'+userData.lastname+'"/>');
    $("#address").append('<input type="text" class="col-5 changeInput center" id="changeAddress" type="text" placeholder="'+userData.address+'"/>');
    $("#zip_code").append('<input type="text" class="col-5 changeInput center" id="changeZip_code" type="text" placeholder="'+userData.zip_code+'"/>');
    $("#town").append('<input type="text" class="col-5 changeInput center" id="changeTown" type="text" placeholder="'+userData.town+'"/>');
    $("#changeDataBtn").remove();
    $("#addressData").append('<button class="btn btn-primary" id="updateUser" onclick="updateUser()">Änderung vornehmen</button>');
}

function updateUser() {
    console.log("updateUserClicked");
    if ($('#changeEmail').val() === '') {var updateEmail = userData.email} else {updateEmail = $("#changeEmail").val();}
    if ($('#changeUsername').val() === '') {var updateUsername = userData.username} else {updateUsername = $("#changeUsername").val();}
    if ($('#changeFirstname').val() === '') {var updateFirstname = userData.firstname} else {updateFirstname = $("#changeFirstname").val();}
    if ($('#changeLastname').val() === '') {var updateLastname = userData.lastname} else {updateLastname = $("#changeLastname").val();}
    if ($('#changeAddress').val() === '') {var updateAddress = userData.address} else {updateAddress = $("#changeAddress").val();}
    if ($('#changeZip_code').val() === '') {var updateZip_code = userData.zip_code} else {updateZip_code = $("#changeZip_code").val();}
    if ($('#changeTown').val() === '') {var updateTown = userData.town} else {updateTown = $("#changeTown").val();}
    if ($('#changePayment').val() === '') {var updatePayment = userData.payment} else {updatePayment = $("#changePayment").val();}

    // Update Objekt erstellen
    var updateUser = {
        id: userData.id,
        active: userData.active,
        rode: userData.role,
        username: updateUsername,
        email: updateEmail,
        firstname: updateFirstname,
        lastname: updateLastname,
        address: updateAddress,
        zip_code: updateZip_code,
        town: updateTown,
        payment: updatePayment,
    };
    console.log("updateUser: " + JSON.stringify(updateUser));
    window.location.href = "http://localhost:8181/login";
    $.ajax({
        url: "/api/v1/admin/user/"+ userData.id,
        type: "PUT",
        data: JSON.stringify(updateUser),
        contentType: "application/json",
        success: function (response) {
            console.log("User Update successful!");
            console.log(response);
        },
        error: function (xhr, status, error) {
            // Handle the error response
            console.error("Error in PUT request");
            console.error(xhr.responseText);
        }
    });
    location.reload();
}

function loadUserCart(){
    console.log("UserCart loaded")
}

function loadUserInvoices(){
    console.log("UserInvoices loaded")
}