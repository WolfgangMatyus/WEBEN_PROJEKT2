
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
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        email: $('#email').val(),
        password: $('#password').val()
    };

    $.ajax({
        url: "/api/v1/auth/register",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(response){
            console.log(response.token);
            window.localStorage.setItem("token", response.token);
            window.location.href = "/";
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(textStatus, errorThrown);
            // Hier kommt die Logik hin, die im Falle eines Fehlers ausgeführt werden soll
        }
    });
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


