
// -- VALIDIRUNG -- //
function validateInput() {
    var username = document.getElementById("username").value;
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;
    var zip_code = document.getElementById("zip_code").value;
    var town = document.getElementById("town").value;
/*
    // Hashen der Passwörter
    var saltRounds = 10; // Anzahl der Salt-Runden
    var hashedPassword = bcrypt.hashSync(password, saltRounds);
    var hashedPassword2 = bcrypt.hashSync(password2, saltRounds);
*/
    var password = document.getElementById("password").value;
    var password2 = document.getElementById("password2").value;
    var errorLabel = document.getElementById("errorLabel");

    // Überprüfe Benutzername
    if (username.trim() === "") {
        errorLabel.textContent = "Bitte geben Sie einen Benutzernamen ein.";
        return;
    }

    if (username.length < 3) {
        errorLabel.textContent = "Der Benutzername muss mindestens 3 Zeichen lang sein.";
        return;
    }

    // Überprüfe firstname
    if (firstname.trim() === "") {
        errorLabel.textContent = "Bitte geben Sie einen Vornamen ein.";
        return;
    }
    // Überprüfe lastname
    if (lastname.trim() === "") {
        errorLabel.textContent = "Bitte geben Sie einen Nachnamen ein.";
        return;
    }
    // Überprüfe email
    if (email.trim() === "") {
        errorLabel.textContent = "Bitte geben Sie ein Email ein.";
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailRegex.test(email)) {
        errorLabel.textContent = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
        return;
    }

    // Überprüfe address
    if (address.trim() === "") {
        errorLabel.textContent = "Bitte geben Sie eine Adresse ein.";
        return;
    }
    // Überprüfe zip_code
    if (zip_code.trim() === "") {
        errorLabel.textContent = "Bitte geben Sie eine Postleitzahl ein.";
        return;
    }

    const zipCodeRegex = /^\d+$/;
    if (!zipCodeRegex.test(zip_code.trim())) {
        errorLabel.textContent = "Die Postleitzahl darf nur aus Ziffern bestehen.";
        return;
    }

    // Überprüfe town
    if (town.trim() === "") {
        errorLabel.textContent = "Bitte geben Sie einen Ort oder eine Stadt ein.";
        return;
    }

    // Überprüfe Passwort
    if (password.trim() === "") {
        errorLabel.textContent = "Bitte geben Sie ein Passwort ein.";
        return;
    }

    // Überprüfe password2
    if (password2.trim() === "") {
        errorLabel.textContent = "Bitte wiederholen Sie Ihr Passwort.";
        return;
    }

    // Überprüfe Übereinstimmung der Passwörter
    if (password !== password2) {
        errorLabel.textContent = "Die Passwörter stimmen nicht überein.";
        return;
    }
    // Wenn alle Validierungen erfolgreich sind
    errorLabel.textContent = ""; // Setze Fehlermeldung zurück oder leere sie
    sendRegistrationData();
}

function sendRegistrationData(){
    console.log("sendRegistration");

    var data = {
        username: $('#username').val(),
        firstname: $('#firstname').val(),
        lastname: $('#lastname').val(),
        email: $('#email').val(),
        password: $('#password').val(),
        address: $('#address').val(),
        zip_code: $('#zip_code').val(),
        place: $('#place').val(),
        payment : $('#payment').val()
    }

    console.log(data);
    $.ajax({
        url: "/api/v1/auth/register",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(response){
            if (response.statusCode === 200) {

                // Speichern des JWT-Tokens im Session Storage
                sessionStorage.setItem('jwtToken', 'Bearer ' + response.token);

                // Weiterleitung zur Loginseite
                window.location.href = "/login";

            } else {
                alert('Authentifizierung fehlgeschlagen');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(textStatus, errorThrown);
            // Hier kommt die Logik hin, die im Falle eines Fehlers ausgeführt werden soll
        }
    });
}

function redirectToHomePage() {
    // Weiterleitung zur Startseite
    window.location.href = "/";
}
