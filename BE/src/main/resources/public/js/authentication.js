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

// Prüfen, ob ein aktuell gültiger Token vorhanden ist
function hasValidToken() {
    // Hier kannst du deine eigene Logik zur Überprüfung des Tokens implementieren
    // Zum Beispiel kannst du den Token aus dem Session Storage oder Local Storage abrufen und dessen Gültigkeit überprüfen
    // Rückgabe true, wenn ein gültiger Token vorhanden ist, sonst false
    // Beispiel:
    const token = sessionStorage.getItem('jwtToken');
    // return token !== null && isTokenValid(token);
    return token !== null;
}


// Funktion zum Dekodieren eines JSON-Web-Tokens (JWT)
function decodeJWT(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function getRoleByCurrentToken() {
    return decodeJWT(sessionStorage.getItem('jwtToken')).role
}

// Funktion zum Abrufen des angemeldeten Benutzernamens
function getLoggedInUsername() {
    const token = sessionStorage.getItem('jwtToken');
    if (token !== null) {
        let subtoken = token.substring(7);
        // Hier kannst du die Logik implementieren, um den Benutzernamen aus dem Token zu extrahieren
        // Beispiel: Annahme, dass das Token im JSON-Web-Token (JWT) Format vorliegt
        const decodedToken = decodeJWT(subtoken);
        return decodedToken.sub;
    } else {
        return null;
    }
}


// Funktion zum Anzeigen der Buttons basierend auf dem Token-Status
function displayButtonsBasedOnToken() {
    const registerButton = document.getElementById('registerButton');
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');

    adminButton.style.display = 'none';

    if (hasValidToken()) {
        registerButton.style.display = 'none';
        loginButton.style.display = 'none';
        logoutButton.style.display = 'block';
        userHeader.style.display = 'block';
        profileButton.style.display = 'block';

        if(getRoleByCurrentToken() == "ROLE_ADMIN") {
            adminButton.style.display = 'block';
        }
    } else {
        registerButton.style.display = 'block';
        loginButton.style.display = 'block';
        logoutButton.style.display = 'none';
        userHeader.style.display = 'none';
        profileButton.style.display = 'none';
    }
}

// Funktion zum Anzeigen des angemeldeten Benutzernamens im Header
function displayLoggedInUsername() {
    const usernameElement = document.getElementById('userprofileContainer');
    const loggedInUsername = getLoggedInUsername();

    if (loggedInUsername !== null) {
        usernameElement.textContent = `Angemeldet als: ${loggedInUsername}`;
        usernameElement.style.display = 'inline-block';
    } else {
        usernameElement.style.display = 'none';
    }
}

// Aufruf der Funktion beim Laden der Seite
window.onload = function() {
    displayButtonsBasedOnToken();
    displayLoggedInUsername();
};

function logout(){

    sessionStorage.removeItem('jwtToken');
    // Aktualisiere die Anzeige der Buttons und des angemeldeten Benutzernamens
    displayButtonsBasedOnToken();
    displayLoggedInUsername();
}



