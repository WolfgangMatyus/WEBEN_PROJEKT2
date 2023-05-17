//-----REGISTRATION--------//

function newRegistration() {

    $(".submit").click(function(event) {
        sendRegistrationData();
    });

}

function sendRegistrationData(){
    $.ajax({
        url: "/api/v1/auth/register",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            firstname:
            email: "example@example.com",
            password: "password123"

        }),
        success: function(data) {
            console.log(data);
            localStorage.setItem("token", data.token)
            // window.location.replace("/login");
            // Hier kommt die Logik hin, die nach erfolgreicher Anfrage ausgeführt werden soll
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(textStatus, errorThrown);
            // Hier kommt die Logik hin, die im Falle eines Fehlers ausgeführt werden soll
        }
    });
}



    //VALIDATION: https://jqueryvalidation.org/
    $("#formValidation").validate({
        rules:{
            Anrede:{
                required: true,
                maxlength: 4
            },
            Vorname:{
                required: true,
                minlength: 2
            },
            Nachname:{
                required: true,
                minlength: 2
            },
            Strasse:{
                required: true,
            },
            PLZ:{
                required: true,
                digits: true
            },
            ORT:{
                required: true,
                minlength: 2
            },
            email:{
                required: true,
                email:true
            },
            Passwort:{
                required: true,
    
            },
            Passwort2:{
                required: true,
                
            },
        },
        messages:{
            Vorname:{
                required:"Please enter your name",
                minlength:"Name at least 2 characters"
            },
            email:{
                email:"Please enter your email"
            },
            Adress:{
                required:"Please enter your Adress"
            }
        },
        
        submitHandler: function(form) {
          form.submit();
        }
       });







//WRITE JSON JQUERY POST: https://api.jquery.com/jquery.post/
    // $.ajax({
    //     type: "POST",
    //     url: url,
    //     data: data,
    //     success: success,
    //     dataType: dataType
    //   });
    //
    //   $.post( "ajax/test.html", function( data ) {
    //     $( ".result" ).html( data );
    //   });

      // $.post( "../../BE/spring/backend.java", { name: "John", time: "2pm" } );