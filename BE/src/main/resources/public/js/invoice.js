function loadInvoiceData(){
    console.log("loadInvoiceData")

    let invoiceProduct = ' <tr>' +
                         ' <td>invoiceProduct.name</td>' +
                         ' <td>invoiceProduct.quantity</td>' +
                         ' <td>invoiceProduct.price</td>' +
                         ' <td>invoiceProduct.total</td>' +
                         ' </tr>'

    $("#invoiceProducts").append(invoiceProduct)

    document.getElementById("invoiceTotal").innerHTML = invoiceTotal;
}