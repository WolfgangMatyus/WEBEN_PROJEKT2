$(document).ready(function() {
    // Token aus dem Session Storage lesen
    var jwtToken = sessionStorage.getItem('jwtToken');

    // Funktion zum Hinzufügen des Token zu den Request-Headern
    function addAuthorizationHeader(xhr) {
        xhr.setRequestHeader('Authorization', '' + jwtToken);
    }

    // Funktion zum Hinzufügen des Tokens zu den Request-Headern
    function addTokenToHeaders() {
        $.ajaxSetup({
            beforeSend: addAuthorizationHeader
        });
    }

    // Seitenwechsel oder Refresh der Seite
    addTokenToHeaders();
});