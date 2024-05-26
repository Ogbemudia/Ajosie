//form validation
jQuery(document).ready(function() {
    jQuery("form").submit(function(event) {

        var postcrud_req = jQuery("#crud_req").val();



        if (jQuery("#email").val() == '') {
            //jQuery("#email").css('border', '1px solid red');
            //jQuery("#h_email").html('Enter your email');
            return false;
        } else {
            // jQuery("#email").css('border', '2px solid green');
            jQuery("#h_email").html('');
            var postemail = jQuery("#email").val();
            //return true;
        }




        if (jQuery("#password").val() == '') {
            // jQuery("#password").css('border', '1px solid red');
            //jQuery("#h_password").html('Enter your password');
            return false;
        }

        if (jQuery("#password").val() != '') {
            var postPassword = jQuery("#password").val();

            // jQuery("#password").css('border', '2px solid green');
            //jQuery("#h_password").html('');

            //return true;
        }









        var formData = {
            crud_req: postcrud_req,
            email: postemail,
            password: postPassword,


        };

        jQuery.ajax({
            type: "POST",
            url: "../validation/model.php",
            data: formData,
            dataType: "json",
            encode: true,

        })

        .done(function(returnData) {

            var role, success, status, message, token;

            role = returnData.role;
            success = returnData.success;
            status = returnData.status;
            message = returnData.message;
            //token = returnData.token;


            //alert(message);


            if (success == 1) {


                if (role == 'admin') {
                    //var category1 = category;
                    location.href = "underreview.html";

                } else {
                    if (role == 'user') {
                        location.href = "../users.html";

                    }
                }
            } else {
                //jQuery("#email").css('border', '1px solid red');
                jQuery("#login_err").html('You have entered the wrong password or email');

            }



            //console.log(returnData)

        });
        event.preventDefault();


    });






})