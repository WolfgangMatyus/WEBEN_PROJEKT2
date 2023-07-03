//--- VARIABLES ---//

//--- CODE ---//
waitForJobs();
async function waitForJobs() {
    try {
        await getProducts()
        console.log("Produkte abholen fertig");
        loadProductWorkbench()
        console.log(JSON.stringify(productsData));
        loadProductList(productsData)
    } catch (error) {
        console.log("An error occured: ", error);
    }
}

//-- EventHandler --//
$(document).on('click', '#addProduct', addProduct);
$(document).on('click', '#deleteProduct', deleteProduct);

function loadProductWorkbench(){

    let productWorkbench = '<div class="card" id="cardStammDaten">'
        +  '<div class="card-header" id="stammDatenHeader">'
        +  '<h2 class="card-title">Neues Produkt hinzufügen</h2>'
        +  '<input type="file" id="productImage" accept="image/*" />'
        +  '<input type="text" id="productName" placeholder="Name" />'
        +  '<input type="text" id="productDescription" placeholder="Beschreibung" />'
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
    var productDescription = $("#productDescription").val();
    var productPrice = parseFloat($("#productPrice").val());
    var productCategory = $("#productCategory").val();
    var productImage = $("#productImage")[0].files[0];

// Produktobjekt erstellen
    var newProduct = {
        name: productName,
        description: productDescription,
        price: productPrice,
        img_path: productImage,
        category: productCategory,
        rating: 0
    };

    console.log(newProduct)
//-- Produkt zum Array hinzufügen --//
    //products.push(product); // Produkt zum Array hinzufügen
    $.ajax({
        url: "/api/v1/admin/product",
        headers: {
            "Authorization": sessionStorage.getItem('jwtToken')
        },
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(newProduct),
        success: function(response){
            if (response.statusCode === 200) {
                console.log("Produkt angelegt");
                alert("Neues Produkt hinzugefügt!")
            }
            // Felder zurücksetzen
            $("#productName").val("");
            $("#productDescription").val("");
            $("#productPrice").val("");
            $("#productCategory").val("");
            $("#productImage").val("");
        },
        error: function(xhr, status, error) {
            console.error("Fehler beim Erstellen des neuen Produkts:");
            console.log(error);
        }
    });
};

function loadProductList(productsData){
    console.log("loadProductList");

    let adminProductListHeader = '<li id="adminProducts">' +
                                 '<div id="productList">'+
                                 '<h2>Produktliste</h2>'+
                                 '<div class="row">' +
                                 '<div class="col">ID: </div>' +
                                 '<div class="col">Image: </div>' +
                                 '<div class="col">Name: </div>' +
                                 '<div class="col">Beschreibung: </div>' +
                                 '<div class="col">Preis: </div>' +
                                 '<div class="col">Kategorie: </div>' +
                                 '<div class="col">Bewertung: </div>' +
                                 '<div class="col">Bearbeiten: </div>' +
                                 '<div class="col">Löschen: </div>' +
                                 '</div>' +
                                 '</li>'

        $("#allProductsData").append(adminProductListHeader);

        $.each(productsData, function (i, product) {
        console.log("addListItem: " + JSON.stringify(productsData));
        let listItem = '<li data-productId="' + product.id + '">' +
            '<div class="row">' +
            '<div class="col">' + product.id + '</div>' +
            '<div class="col">' +
            '<img src="../img/' + product.img_path + '" width="100" height="100"/>' +
            '</div>' +
            '<div class="col">' + product.name + '</div>' +
            '<div class="col">' + product.description + '</div>' +
            '<div class="col">' + product.price.toFixed(2) + '</div>' +
            '<div class="col">' + product.category + '</div>' +
            '<div class="col">' + product.rating + '</div>' +
            '<div class="col">' + '<button class="btn btn-primary editProduct" id="editProduct">Bearbeiten</button>' +'</div>' +
            '<div class="col">' + '<button class="btn btn-primary deleteProduct" id="deleteProduct">Löschen</button>' + '</div>'
            +'</li>';

        $("#adminProducts").append(listItem);
    });
}

 // Eventlistener für den "Löschen" Button
 function deleteProduct() {
    let listItem = $(this).closest("li");
    console.log(listItem);
    let index = $("#adminProducts li").index(listItem);
    let productId = listItem.attr("data-productId");

    console.log("index: " + index);
    console.log("productId: " + productId);

     $.ajax({
         url: "/api/v1/admin/product/" + productId,
         method: "DELETE",
         contentType: "application/json",
         success: function(response){
             if (response.statusCode === 200) {
                 console.log("Produkt gelöscht");
                 alert("Produkt gelöscht!")
             }
         },
         error: function(xhr, status, error) {
             console.error("Fehler beim Löschen des Produkts:");
             console.log(error);
         }
     });
    productsData.splice(index, 1); // Produkt aus dem Array entfernen
    listItem.remove(); // Listenelement entfernen
 };
