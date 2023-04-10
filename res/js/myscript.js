
//-----REGISTRATION--------//

    //VALIDATION: https://jqueryvalidation.org/
    $("#formValidation").validate({
        rules:{
            Vorname:{
                minlength: 2
            },
            email:{
                email:true
            }
        },
        message:{
            Vorname:{
                required:"Please enter your name",
                minlength:"Name at least 2 characters"
            },
            Vorname:"Please enter your Name",
            Emailadresse:"Please enter your email",
            Adresse:"Please enter your Adress"
        },
        
        submitHandler: function(form) {
        form.submit();
        }
    });

   //WRITE JSON:
   $.ajax
    ({
        type: "GET",
        dataType : 'json',
        async: false,
        url: 'http://your.host/save_json.php',
        data: { data: JSON.stringify(eventsholded) },
        success: function () {alert("Thanks!"); },
        failure: function() {alert("Error!");}
    });