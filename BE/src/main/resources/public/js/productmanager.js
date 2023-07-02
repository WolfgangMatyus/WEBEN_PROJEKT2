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

function loadProductWorkbench(){

    let productWorkbench = '<div class="card" id="cardStammDaten">'
        +  '<div class="card-header" id="stammDatenHeader">'
        +  '<h2 class="card-title">Neues Produkt hinzufügen</h2>'
        +  '<input type="file" id="productImage" accept="image/*" />'
        +  '<input type="text" id="productName" placeholder="Name" />'
        +  '<input type="textarea" id="productDescription" placeholder="Beschreibung" />'
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
    var productDescription = $("productDesctiption").val();
    var productPrice = parseFloat($("#productPrice").val());
    var productCategory = $("#productCategory").val();
    var productImage = $("#productImage")[0].files[0];

// Produktobjekt erstellen
    var newProduct = {
        name: productName,
        description: productDescription,
        price: productPrice,
        img_path: "8.jpg",
        category: productCategory,
        rating: 0
    };

    console.log(newProduct)
//-- Produkt zum Array hinzufügen --//
    //products.push(product); // Produkt zum Array hinzufügen
    $.ajax({
        url: "/api/v1/admin/product",
        headers: {
            "Authorization": "Bearer YOUR_AUTH_TOKEN"
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

    let adminProductListHeader = '<div id="productList">'+
                                 '<h2>Produktliste</h2>'+
                                 '<div class="row">' +
                                 '<div class="col">Image: </div>' +
                                 '<div class="col">Name: </div>' +
                                 '<div class="col">Beschreibung: </div>' +
                                 '<div class="col">Preis: </div>' +
                                 '<div class="col">Kategorie: </div>' +
                                 '<div class="col">Bewertung: </div>' +
                                 '</div>' +
                                 '<ul id="amdinProducts"></ul>'

        $("#allProductsData").append(adminProductListHeader);

        $.each(productsData, function (i, product) {
        console.log("addListItem: " + JSON.stringify(productsData));
        let listItem = '<li>' +
            '<div class="row">' +
            '<div class="col">'+
            '<img src="../img/' + product.img_path + '" width="100" height="100"/>' +
            '</div>' +
            '<div class="col">'+product.name + '</div>' +
            '<div class="col">'+product.description + '</div>' +
            '<div class="col">'+product.price.toFixed(2) + '</div>' +
            '<div class="col">'+product.category + '</div>' +
            '<div class="col">'+product.rating + '</div>' +
            '</div>' +
            '</li>' +
            '<div class="row">' +
            '<div class="col"><button class="btn btn-primary" id="editProduct">Bearbeiten</button></div>' +
            '<div class="col"><button class="btn btn-primary" id="deleteProduct">Löschen</button></div>' +
            '</div>';

        $("#amdinProducts").append(listItem);
    });
}

 // Eventlistener für den "Löschen" Button
 $("#amdinProducts").on("click", ".deleteProduct", function() {
    var listItem = $(this).parent();
    var index = $("#products li").index(listItem);
    products.splice(index, 1); // Produkt aus dem Array entfernen
    listItem.remove(); // Listenelement entfernen
 });
