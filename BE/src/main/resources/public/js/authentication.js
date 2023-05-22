$(document).ready(function() {
    // Token aus dem Cookie abrufen
    var token = getCookie('token');

    // Überprüfen, ob ein Token vorhanden ist
    if (token) {
        // Setzen des Authorization-Headers für alle ausgehenden HTTP-Anfragen
        $.ajaxSetup({
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
    }

    // Weitere Initialisierungen oder Aktionen hier ausführen
});

// Funktion zum Abrufen eines Cookies
function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(name + '=') === 0) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}
