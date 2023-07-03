//-----LOGIN--------//
function loginReady() {
    $("#submit-login").click(function(event) {
        event.preventDefault();
        sendLoginData();
    });
}

function sendLoginData(){

    var form = $('#loginForm');
    var isValid = form[0].checkValidity();

    if (!isValid) {
        form.addClass('was-validated');
        return;
    }

    var data = {
        email: $('#email').val(),
        password: $('#password').val()
    };

    $.ajax({
        url: "/api/v1/auth/authenticate",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(response){
            if (response.statusCode === 200) {

                // Speichern des JWT-Tokens im Session Storage
                sessionStorage.setItem('jwtToken', 'Bearer ' + response.token);

                // Lesen des JWT-Tokens aus dem Session Storage
                var jwtToken = sessionStorage.getItem('jwtToken');

                fetch('/', {
                    headers: {
                        'Authorization': jwtToken,
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                })
                .then(response => {
                    // Verarbeiten Sie die Antwort des Servers
                    console.log(response);
                    // Hier kommt die Logik hin, die nach dem Seitenwechsel ausgeführt werden soll
                    window.location.replace('/');
                })
                .catch(error => {
                    console.log(error);
                    // Behandeln Sie etwaige Fehler
                });
            } else {
                alert('Authentifizierung fehlgeschlagen');
            }
            window.location.href = "http://localhost:8181/profile";
        },
        error: function(jqXHR, textStatus) {
            console.error(textStatus);
            // Hier kommt die Logik hin, die im Falle eines Fehlers ausgeführt werden soll
            window.location.href = "http://localhost:8181/";
        }
    });
}

/*
//-- ANMELDEDATEN MERKEN COOKIE --//

// Funktion zum Setzen des Cookies
function setLoginCookie(email, remember) {
    var expirationDays = remember ? 7 : 1; // Ablaufzeit des Cookies in Tagen
    var date = new Date();
    date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + date.toUTCString();
    document.cookie = "email=" + email + ";" + expires + ";path=/";
}

// Funktion zum Auslesen des Cookies
function getLoginCookie() {
    var name = "email=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}

// Überprüfe, ob ein Cookie für die Anmeldedaten vorhanden ist
var savedEmail = getLoginCookie();
if (savedEmail !== "") {
    // Setze das gespeicherte E-Mail in das Eingabefeld
    $("#email").val(savedEmail);
    // Aktiviere das Merken der Anmeldedaten
    $("#vehicle1").prop("checked", true);
}

// Event Listener für das Absenden des Formulars
$("#loginForm").on("submit", function(event) {
    var email = $("#email").val();
    var remember = $("#vehicle1").is(":checked");
    setLoginCookie(email, remember);
});
*/