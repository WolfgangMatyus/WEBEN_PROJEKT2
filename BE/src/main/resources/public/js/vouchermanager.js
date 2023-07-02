var voucherData = [];

$(document).ready(function(){

    getAllVouchers();
    loadVoucherWorkbench();

});

$(document).on('click', '#addVoucher', addVoucher);


function getAllVouchers() {
    $.ajax({
        method: "GET",
        contentType: "application/json",
        url: "/api/v1/admin/voucher",
        success: function (json) {
            //console.log(json)
            voucherData = json;
            console.log(voucherData);
        },
        error: function () {
            console.error("An ERROR occured!");
        },
    });
}


function addVoucher(){
    console.log("addProductClicked");
    var voucherAmount = $("#voucherAmount").val();
    var voucherDate = $("#voucherDate").val();

// Produktobjekt erstellen
    var newVoucher = {
        amount: voucherAmount,
        validUntil: voucherDate
    };

    console.log(newVoucher)
//-- Produkt zum Array hinzufügen --//
    //products.push(product); // Produkt zum Array hinzufügen
    $.ajax({
        url: "/api/v1/admin/voucher",
        headers: {
            'Authorization':  sessionStorage.getItem('jwtToken')
        },
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(newVoucher),

        success: function(response){
            if (response.statusCode === 200) {
                console.log("Gutschein angelegt");
                alert("Neuer Gutschein hinzugefügt!")
            }
            // Felder zurücksetzen
            $("#voucherAmount").val("");
            $("#voucherDate").val("");
        },
        error: function(xhr, status, error) {
            console.error("Fehler beim Erstellen des neuen Gutscheins:");
            console.log(error);
        }
    });

    //$("#products").append(listItem); // Listenelement zur Produktliste hinzufügen

};

function loadVoucherWorkbench(){

    let voucherWorkbench = '<div class="card" id="cardStammDaten">'
        +  '<div class="card-header" id="stammDatenHeader">'
        +  '<h2 class="card-title">Neuen Gutschein hinzufügen</h2>'
        +  '<input type="text" id="voucherAmount" placeholder="Wert" />'

        +  '<input type="text" id="voucherDate" placeholder="Gültig bis">'

        // +  '<div class = "row"> <div class = "col-sm-3" ><div class = "form-group" >'
        // +  '<div class = "input-group date" id = "datetimepicker1" >'
        // +  '<input type = "text" class = "form-control" />'
        // +  '<span class = "input-group-addon" >'
        // +  '<span class = "glyphicon glyphicon-calendar" ></span>'
        // +  '</span></div></div></div></div>'

        +  '<button class="btn btn-primary" id="addVoucher">Gutschein hinzufügen</button>'
        +  '</div>'

    $("#voucherWorkbenchContainer").append(voucherWorkbench)
}
