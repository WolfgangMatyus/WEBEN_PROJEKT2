//--- VARIABLES ---//

//--- CODE ---//
waitFor2Jobs();
async function waitFor2Jobs() {
    try {
        await getProducts();
        //await getCart();
        console.log("Beide fertig");
        InitializeSearchFilter();
        loadProducts(productsData);
        loadCartHTML();
    } catch (error) {
        console.log("An error occured: ", error);
    }
}

//-- SearchFilter Visuals -- //
function InitializeSearchFilter() {
    $("#categorySearchFilter").append(
        '<div id="filterContainer">' +
        '<select id="categoryFilter">' +
        '<option value="">Alle</option>' +
        '<option value="Kartenspiel">Kartenspiel</option>' +
        '<option value="Brettspiel">Brettspiel</option>' +
        '<option value="Komponenten">Komponenten</option>' +
        '<option value="besteBewertung">Beste Bewertung</option>' +
        '</select>' +
        '<select id="priceFilter">' +
        '<option value="">Alle Preise</option>' +
        '<option value="under25"> < €25</option>' +
        '<option value="25to50">€25 - €50</option>' +
        '<option value="over50"> > €50</option>' +
        '</select>' +
        '<input type="text" id="searchInput" placeholder="Search products">' +
        '</div>'
    );
}

function loadProducts(productsData) {

    console.log("loadProducts: " + productsData);

    var categoryFilterValue = $("#categoryFilter").val();
    console.log("categoryFilterValue: " + categoryFilterValue);
    var priceFilterValue = $("#priceFilter").val();
    console.log("priceFilterValue: " + priceFilterValue);
    var searchInputValue = $("#searchInput").val().toLowerCase();
    console.log("searchInputValue: " + searchInputValue);

    let productCardsList =
        '<div id="productList" class="row row-cols-1 row-cols-md-3 g-4">' +
        "</div>";

    $("#productListContainer").empty().append(productCardsList);



     var filteredProducts = productsData.filter(function (product) {
        return (
            (categoryFilterValue === "" || product.category.toLowerCase() === categoryFilterValue.toLowerCase()) &&
            (priceFilterValue === "" || checkPriceFilter(priceFilterValue, product.price)) &&
            (searchInputValue === "" || product.name.toLowerCase().includes(searchInputValue))
        );
    });

    if (categoryFilterValue === "besteBewertung") {
        filteredProducts = productsData.sort(function (a, b) {
            return b.rating - a.rating;
        });
    }

    $.each(filteredProducts, function (i, product) {
        let cardBody =
            '<div class="col">' +
            '<div class="card-body" id="' +
            product.id +
            '">' +
            '<p class="productPrice">Preis: ' +
            product.price +
            "</p>" +
            '<p class="productCategory">Kategorie: ' +
            product.category +
            "</p>" +
            '<p class="productRating">Bewertung: ' +
            product.rating +
            "</p>" +
            "</div>" +
            '<div class="card-footer">' +
            '<small class="text-body-secondary">' +
            '<a href="#" class="btn btn-primary">In den Warenkorb</a>' +
            "</small>" +
            "</div>";

        let cardImg =
            '<div class="cardimg h-100">' +
            '<img src="../img/' +
            product.img_path +
            '"' +
            ' class="img-fluid" alt="Product Picture">' +
            "</div>";

        $("#productList").append(
            '<div class="col">' +
            '<div class="card h-100" id="card' +
            i +
            '" draggable="true" ondragstart="drag(event)">' +
            '<div class="card-header">' +
            '<h5 class="productName">' +
            product.name +
            "</h5>" +
            "</div>" +
            cardImg +
            cardBody +
            "</div>" +
            "</div>"
        );
    });
}

function checkPriceFilter(priceFilter, productPrice) {
    switch (priceFilter) {
        case "under25":
            return productPrice < 25;
        case "25to50":
            return productPrice >= 25 && productPrice <= 50;
        case "over50":
            return productPrice > 50;
        default:
            return true;
    }
}

// Call the loadProducts function when the filter values change or search input is entered
$(document).on("change keyup", "#categoryFilter, #priceFilter, #searchInput", function () {
    console.log("Filter triggered");
    loadProducts(productsData);
});
