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
        },
        error: function(jqXHR, textStatus) {
            console.error(textStatus);
            // Hier kommt die Logik hin, die im Falle eines Fehlers ausgeführt werden soll
        }
    });
}
