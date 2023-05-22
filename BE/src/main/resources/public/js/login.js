//-----REGISTRATION--------//
// Token in den Header setzen, wenn die Seite geladen wird
$(document).ready(function() {
    loginReady();
});


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
            console.log(response.token);
            // Annahme: 'response.token' enthält den erhaltenen Token
            let token = response.token;
            setCookie('token', token, 1); // Token für 1 Tage speichern
            window.location.href = "/";
            // pageloadCatcher();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(textStatus, errorThrown);
            // Hier kommt die Logik hin, die im Falle eines Fehlers ausgeführt werden soll
        }
    });
}

// Funktion zum Setzen eines Cookies
function setCookie(name, value, expirationDays) {
    var date = new Date();
    date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
