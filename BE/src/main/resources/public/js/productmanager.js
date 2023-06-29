//-- Imports --//
import {getProducts, getUser, getCart} from './global.js';
//-- Variables --//
//loadProductList()
//-- Code --//
$(document).ready(function(){
//-- Initialize Productmanager --//
    loadProductWorkbench()

});
//-- EventHandler --//
$(document).on('click', '#addProduct', addProduct);

function loadProductWorkbench(){

    let productWorkbench = '<div class="card" id="cardStammDaten">'
        +  '<div class="card-header" id="stammDatenHeader">'
        +  '<h2 class="card-title">Neues Produkt hinzufügen</h2>'
        +  '<input type="file" id="productImage" accept="image/*" />'
        +  '<input type="text" id="productName" placeholder="Name" />'
        +  '<input type="number" id="productPrice" step="0.01" placeholder="Preis" />'
        +  '<select id="productCategory">'
        +  '<option value="Cardgame">Cardgame</option>'
        +  '<option value="Boardgame">Boardgame</option>'
        +  '<option value="Accessories">Accessories</option>'
        +  '</select>'
        +  '<button class="btn btn-primary" id="addProduct">Produkt hinzufügen</button>'
        +  '</div>'

    $("#productWorkbenchContainer").append(productWorkbench)
}

function addProduct(){
    console.log("addProductClicked");
    var productName = $("#productName").val();
    var productPrice = parseFloat($("#productPrice").val());
    var productCategory = $("#productCategory").val();
    var productImage = $("#productImage")[0].files[0];
    //var imageURL = URL.createObjectURL(productImage); // Erzeugt eine temporäre URL für das Vorschaubild


// Produktobjekt erstellen
    var product = {
        name: productName,
        price: productPrice,
        img_path: productImage,
        category: productCategory,
        ranking: 0
    };
    console.log(product)
//-- Produkt zum Array hinzufügen --//
    //products.push(product); // Produkt zum Array hinzufügen

// url: "/api/v1/auth/cart", // Backend Approach
//data: JSON.stringify(product),

    $.ajax({
        method: "POST",
        url: "../../../TestServer/jsonWriter.php",
        contentType: "application/json",
        data: JSON.stringify(product),
        success: function(response){
            console.log(product);
            console.log(response);
        },
        error: function(response){
            console.log(response)
            console.error("An ERROR occured!")
        }
    })

    //$("#products").append(listItem); // Listenelement zur Produktliste hinzufügen

    // Felder zurücksetzen
    //$("#productName").val("");
    //$("#productPrice").val("");
    //$("#productCategory").val("");
    //$("#productImage").val("");
};
/*
function loadProductList(){

    getProducts();

    let productList = '<div id="productList">'
                    + '<h2>Produktliste</h2>'
                    + '<ul id="products"></ul>'
                    + '</div>'

    let listItem = "<li>" +
                    "<img src='" + imageURL + "' width='100' height='100' />" +
                    "<br />" +
                    "Name: " + productName +
                    "<br />" +
                    "Preis: " + productPrice.toFixed(2) +
                    "<br />" +
                    "Kategorie: " + productCategory +
                    "<br />" +
                    "<button class='editProduct'>Bearbeiten</button>" +
                    "<button class='deleteProduct'>Löschen</button>" +
                    "</li>";

    $("#allProductsData").append(productList)

}

 // Eventlistener für den "Löschen" Button
 $("#products").on("click", ".deleteProduct", function() {
    var listItem = $(this).parent();
    var index = $("#products li").index(listItem);
    products.splice(index, 1); // Produkt aus dem Array entfernen
    listItem.remove(); // Listenelement entfernen
 });
 */