jQuery(document).ready(function() {

    //var homeT

    //jQuery(function() {

    jQuery.get("../validation/read_singlelogin.php", function(messages) {

        var myName = messages.fullname;
        var role = messages.role;
        var img = messages.img;
        var img2 = `<img src="upload/` + img + `" alt="image description">`;
        //alert(myName)
        jQuery('.userPic').html(img2);
        jQuery('.userRole').html(role);
        jQuery('.myName').html(myName);


    }, "json");
    // });


})