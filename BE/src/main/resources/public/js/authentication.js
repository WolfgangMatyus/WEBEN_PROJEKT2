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
    // Hier kannst du die Logik zur Decodierung des JWT implementieren
    // Beispiel: Verwendung einer JWT-Bibliothek wie 'jsonwebtoken'
    // Beispiel-Code:
    const decodedToken = jwt.decode(token);
    return decodedToken;
    // Beachte, dass du die entsprechende JWT-Bibliothek installieren musst, um sie verwenden zu können
    // Bitte passe den Code entsprechend der von dir verwendeten JWT-Bibliothek an

    // In diesem Beispiel wird ein Dummy-Objekt zurückgegeben
    //return { username: 'JohnDoe' };
}

// Funktion zum Abrufen des angemeldeten Benutzernamens
function getLoggedInUsername() {
    const token = sessionStorage.getItem('token');
    if (token !== null && isTokenValid(token)) {
        // Hier kannst du die Logik implementieren, um den Benutzernamen aus dem Token zu extrahieren
        // Beispiel: Annahme, dass das Token im JSON-Web-Token (JWT) Format vorliegt
        const decodedToken = decodeJWT(token);
        return decodedToken.username;
    } else {
        return null;
    }
}


// Funktion zum Anzeigen der Buttons basierend auf dem Token-Status
function displayButtonsBasedOnToken() {
    const registerButton = document.getElementById('registerButton');
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');

    if (hasValidToken()) {
        registerButton.style.display = 'none';
        loginButton.style.display = 'none';
        logoutButton.style.display = 'block';
    } else {
        registerButton.style.display = 'block';
        loginButton.style.display = 'block';
        logoutButton.style.display = 'none';
    }
}

// Funktion zum Anzeigen des angemeldeten Benutzernamens im Header
function displayLoggedInUsername() {
    const usernameElement = document.getElementById('loggedInUsername');
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

    sessionStorage.removeItem('token');
    // Aktualisiere die Anzeige der Buttons und des angemeldeten Benutzernamens
    displayButtonsBasedOnToken();
    displayLoggedInUsername();
}



