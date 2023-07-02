
function sendRegistration() {

    $(".submit").click(function(event) {
        sendRegistrationData();
    });

}

function sendRegistrationData(){

    var form = $('#registrationForm');
    var isValid = form[0].checkValidity();

    if (!isValid) {
        form.addClass('was-validated');
        return;
    }

    var data = {
        firstname: $('#firstname').val(),
        lastname: $('#lastname').val(),
        email: $('#email').val(),
        password: $('#password').val()
    };

    $.ajax({
        url: "/api/v1/auth/register",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(response){
            if (response.statusCode === 200) {

                // Speichern des JWT-Tokens im Session Storage
                sessionStorage.setItem('jwtToken', 'Bearer ' + response.token);

                // Weiterleitung zur Startseite
                window.location.href = "/";

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

// -- PW Confirmation -- //
$(document).ready(function() {
    // Get references to the password and confirm password input fields
    var passwordInput = $('#password');
    var confirmPasswordInput = $('#password2');
    var passwordError = $('#passwordError');

    // Listen for input changes in the confirm password field
    confirmPasswordInput.on('input', function() {
        // Get the values of both password fields
        var password = passwordInput.val();
        var confirmPassword = confirmPasswordInput.val();

        // Compare the passwords and show/hide the error message accordingly
        if (password !== confirmPassword) {
            passwordError.show();
        } else {
            passwordError.hide();
        }
    });
});

function redirectToHomePage() {
    // Weiterleitung zur Startseite
    window.location.href = "/";
}

//
// //VALIDATION: https://jqueryvalidation.org/
// $("#formValidation").validate({
//     rules:{
//         Anrede:{
//             required: true,
//             maxlength: 4
//         },
//         Vorname:{
//             required: true,
//             minlength: 2
//         },
//         Nachname:{
//             required: true,
//             minlength: 2
//         },
//         Strasse:{
//             required: true,
//         },
//         PLZ:{
//             required: true,
//             digits: true
//         },
//         ORT:{
//             required: true,
//             minlength: 2
//         },
//         email:{
//             required: true,
//             email:true
//         },
//         Passwort:{
//             required: true,
//
//         },
//         Passwort2:{
//             required: true,
//
//         },
//     },
//     messages:{
//         Vorname:{
//             required:"Please enter your name",
//             minlength:"Name at least 2 characters"
//         },
//         email:{
//             email:"Please enter your email"
//         },
//         Adress:{
//             required:"Please enter your Adress"
//         }
//     },
//
//     submitHandler: function(form) {
//       form.submit();
//     }
//    });


