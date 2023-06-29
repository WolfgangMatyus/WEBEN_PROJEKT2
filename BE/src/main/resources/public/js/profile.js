
//-- Variables --//
var userData = [];
var userCart = [];
getUserData();
//getCart();

function loadCart(){
    getCart();
}

//-- EventHandler --//
$(document).on(
    'click', '#userData', setUserDataActive,
    'click', '#userCart', setUserCartActive,
    'click', '#invoices', setUserInvoicesActive,
);

$(document).ready(function(){
//-- Initialize  --//
    loadProfile();
    loadUserData();
});

function getUserData(){
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "../../Data/user.json",
        success: function(json){
            //console.log(json);
            userData = json;
            console.log(userData);
        },
        error: function(){
            console.error("An ERROR occured!")
        }
    })
};

//-- Navigation User Profile --//
function loadProfile(){

    let profileCardNavbar = '<div class="card" id="cardStammDaten">'
        +'<div class="card-header" id="stammDatenHeader">'
        +'<ul class="nav nav-tabs card-header-tabs">'
        +'<li class="nav-item" id="userData" >' // onclick="setUserDataActive()"
        +'<a class="nav-link active" id="userData-link">Stammdaten</a>'
        +'</li>'
        +'<li class="nav-item" id="userCart" >' // onclick="setUserCartActive()"
        +'<a class="nav-link" id="userCart-link">Warenkorb</a>'
        +'</li>'
        +'<li class="nav-item" id="invoices" >' // onclick="setUserInvoicesActive()"
        +'<a class="nav-link" id="invoices-link">Rechnungen</a>'
        +'</li>'
        +'</ul>'
        +'</div>'
        +'</div>'
        +'</div>'

    $("#customerData").append(profileCardNavbar);
}

//-- Navigation User Profile Functionality --//
function setUserDataActive(){
    $(".profile-card-body").hide()
    $(".nav-link").attr("class", "nav-link")
    $("#userData-link").attr("class", "nav-link active")
    $("#userStammdaten").show();
}

function setUserCartActive(){
    $(".profile-card-body").hide()
    loadCart();
    $(".nav-link").attr("class", "nav-link")
    $("#userCart-link").attr("class", "nav-link active")
    $("#userStammdaten").show();
}

function setUserInvoicesActive(){
    $(".profile-card-body").hide()
    loadUserIvoices();
    $(".nav-link").attr("class", "nav-link")
    $("#invoices-link").attr("class", "nav-link active")
    $("#invoices").show();
}

function loadUserData(){
    console.log("loadUserData: " + userData);
    let userDataHtml = '<div class="profile-card-body" id="userStammdaten">'
        +'<h5 class="card-title">Ihre Userstammdaten:</h5>'
        +'<div class="userData" id="userData">'
        +'<div class="row">'
        +'<div class="userDataLable col" for="changeEmail" id="emailLable">Email: </div>'
        +'<div class="userDataValue col" id="emailValue">'+userData[2].email+'</div>'
        +'</div>'
        +'<div class="row">'
        +'<div class="userDataLable col" for="changeFirstname" id="firstnameLable">Vorname: </div>'
        +'<div class="userDataValue col" id="firstnameValue">'+userData[2].firstname+'</div>'
        +'</div>'
        +'<div class="row">'
        +'<div class="userDataLable col" for="changeLastname" id="lastnameLable">Nachname: </div>'
        +'<div class="userDataValue col" id="lastnameValue">'+userData[2].lastname+'</div>'
        +'</div>'
        +'<div class="btn">'
        +'<button class="btn btn-primary" id="changeDataBtn" onclick="changeUserData()">Stammdaten anpassen</button>'
        +'</div>'
        +'</div>'

    let userPaymentType = '<div class="userData" id="userData">'
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
    getUserData();
    $("#emailLable").append('<input type="email" class="changeInput center" id="changeEmail" type="text" placeholder="'+json[2].email+'"></input>')
    $("#firstnameLable").append('<input type="text" class="changeInput" id="changeFirstname" type="text" type="text" placeholder="'+json[2].firstname+'"></input>')
    $("#lastnameLable").append('<input type="text" class="changeInput" id="changeLastname" type="text" type="text" placeholder="'+json[2].lastname+'"></input>')
    $("#changeDataBtn").attr('onclick', 'sendDataToBackend')
}

