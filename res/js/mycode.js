//VALIDATION:
$("#formValidation").validate({
    rules:{
        name:{
            minlength: 2
        },
        email:{
            email:true
        }
    },
    message:{
        name:{
            required:"Please enter your name",
            minlength:"Name at least 2 characters"
        },
        name:"Please enter your email",
        email:"Please enter your email",
        Adress:"Please enter your email"
    },
    
    submitHandler: function(form) {
      form.submit();
    }
   });