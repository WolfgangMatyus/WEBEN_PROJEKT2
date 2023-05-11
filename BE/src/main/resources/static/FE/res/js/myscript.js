//-----REGISTRATION--------//

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


    //WRITE JSON JQUERY POST: https://api.jquery.com/jquery.post/
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: success,
        dataType: dataType
      });

      $.post( "ajax/test.html", function( data ) {
        $( ".result" ).html( data );
      });

      $.post( "../../BE/spring/backend.java", { name: "John", time: "2pm" } );