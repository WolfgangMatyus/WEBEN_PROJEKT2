//-- Variables --//
waitForJobs();
async function waitForJobs() {
    try {
        await getUserById(1);
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
        +'<div class="row">'
        +'<div class="userDataLable col" for="changeEmail" id="emailLable">Email: </div>'
        +'<div class="userDataValue col" id="emailValue">'+userData.email+'</div>'
        +'</div>'
        +'<div class="row">'
        +'<div class="userDataLable col" for="changeFirstname" id="firstnameLable">Vorname: </div>'
        +'<div class="userDataValue col" id="firstnameValue">'+userData.firstname+'</div>'
        +'</div>'
        +'<div class="row">'
        +'<div class="userDataLable col" for="changeLastname" id="lastnameLable">Nachname: </div>'
        +'<div class="userDataValue col" id="lastnameValue">'+userData.lastname+'</div>'
        +'</div>'
        +'<div class="btn">'
        +'<button class="btn btn-primary" id="changeDataBtn" onclick="changeUserData()">Stammdaten anpassen</button>'
        +'</div>'
        +'</div>'

    let userPaymentType = '<div class="userPaymentData" id="userPaymentData">'
        + '<h5 class="card-title">Ihre Zahlungsart:</h5>'
        + '<div class="paymentTypes" id="paymentTypes">'
        + '<p>Bitte wählen sie eine Zahlungsart:</p>'
        + '<input type="radio" id="kreditkarte" name="paymentType" value="kreditkarte">'
        + '<label for="kreditkarte"> Kreditkarte</label><br>'
        + '<input type="radio" id="eps" name="paymentType" value="eps">'
        + '<label for="eps"> EPS</label><br>'
        + '<input type="radio" id="Klarna" name="paymentType" value="Klarna">'
        + '<label for="Klarna"> Klarna</label><br>'
        + '<input type="radio" id="paypal" name="paymentType" value="paypal">'
        + '<label for="paypal"> Paypal</label>'
        + '</div>'
        + '</div>'

    $("#cardStammDaten").append(userDataHtml + userPaymentType);

    $(".userDataLable")
        .css({"font-weight": "bold"})
}

function changeUserData(){
    console.log("changeUserData");
    $("#emailLable").append('<input type="email" class="changeInput center" id="changeEmail" type="text" placeholder="'+userData.email+'"/>');
    $("#firstnameLable").append('<input type="text" class="changeInput" id="changeFirstname" type="text" type="text" placeholder="'+userData.firstname+'"/>');
    $("#lastnameLable").append('<input type="text" class="changeInput" id="changeLastname" type="text" type="text" placeholder="'+userData.lastname+'"/>');
    $("#changeDataBtn").remove();
    $("#userCurrentData").append('<button class="btn btn-primary" id="updateUser" onclick="updateUser()">Änderung vornehmen</button>');
}

function updateUser() {
    console.log("updateUserClicked");
    var updateEmail = $("#changeEmail").val();
    var updateFirstname = $("#changeFirstname").val();
    var updateLastname = $("#changeLastname").val();

    // Update Objekt erstellen
    var updateUser = {
        id: userData.id,
        username: userData.username,
        email: updateEmail,
        firstname: updateFirstname,
        lastname: updateLastname,
        active: userData.active,
        address: userData.address,
        zip_code: userData.zip_code,
        place: userData.place,
        payment: userData.payment,
    };
    console.log("updateUser: " + updateUser);

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
}

function loadUserCart(){
    console.log("UserCart loaded")
}

function loadUserInvoices(){
    console.log("UserInvoices loaded")
}