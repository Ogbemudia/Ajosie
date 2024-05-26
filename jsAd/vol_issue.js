jQuery(document).ready(function() {

    fetch('../validation/validation.php', {
            method: "POST"
        })
        .then(res => res.json())
        .then(returnData => {

            var success, status, message;
            success = returnData.success;
            status = returnData.status;
            message = returnData.message;

            if (success == 0) {
                sessionStorage.removeItem("users");
                alert('Your session has expired')
                location.href = "loginregister.html"
            }
        });
    jQuery("form").submit(function(e) {
        //alert($('#requestOp').val());

        if (jQuery("#requestOp").val() == '0') {
            jQuery("#requestOp").css('border', '1px solid red');
            jQuery(".warning").html('Please select your request.');

            return false;
        } else {
            jQuery("#requestOp").css('border', '2px solid green');
            // var postTitle = jQuery(".requestOp").val();
            //return true;
        }

        if (jQuery("#vol_issue").val() == '') {
            jQuery("#vol_issue").css('border', '1px solid red');
            jQuery(".warning").html('All fields marked with * are required.');

            return false;
        } else {
            jQuery("#vol_issue").css('border', '2px solid green');
            var postdoi = jQuery("#vol_issue").val();
            //return true;
        }
        if (jQuery("#vol_year").val() == '') {
            jQuery("#vol_year").css('border', '1px solid red');
            jQuery(".warning").html('All fields marked with * are required.');

            return false;
        } else {
            jQuery("#vol_year").css('border', '2px solid green');
            var postdoi = jQuery("#vol_issue").val();
            //return true;
        }


        e.preventDefault();
        jQuery.ajax({
                type: 'POST',
                url: '../api/create_vol_issue.php',
                data: new FormData(this),
                dataType: 'json',
                contentType: false,
                cache: false,
                processData: false,
            })
            .done(function(returnData) {

                var success, status, message;

                success = returnData.success;
                status = returnData.status;
                message = returnData.message;


                alert(message)
                if (status == 201)
                    $('#reviewermodal').fadeOut();
                location.reload();
                //jQuery(".success").html('Article upload successful');
                if (status == 403)
                    jQuery.fn.logout();
                //console.log(returnData)
            });



    });
    jQuery.get("../../api/read_volumes.php", function(messages) {
            var articleVol = `<ul class="sj-allcategorys">`;
            jQuery.each(messages, function(i, message) {
                var id = message.id;
                var volume = message.volume;
                articleVol += `<li class="sj-categorysinfo">
                <div class="sj-title">
                    <h3>` + volume + ` <span class="sj-assignedinfo" data-toggle="modal" data-target="#feedbackmodal">( ` + id + ` )</span></h3>
                </div>
                <div class="sj-categorysrightarea">
                    <a href="javascript:void(0);" class="sj-pencilbtn"><i class="ti-pencil"></i></a>
                    <a href="javascript:void(0);" class="sj-trashbtn"><i class="ti-trash"></i></a>
                </div>
            </li>
       `;


            }, "json")
            articleVol += `</ul>`;
            jQuery('.volumes22').html(articleVol);
        })
        /* ***************************
        issues
        ********************************* */
    jQuery.get("../../api/read_issues.php", function(messages) {
        var articleIss = `<ul class="sj-allcategorys">`;
        jQuery.each(messages, function(i, message) {
            var id = message.id;
            var issue = message.issue;
            articleIss += `<li class="sj-categorysinfo">
                <div class="sj-title">
                    <h3>` + issue + ` <span class="sj-assignedinfo" data-toggle="modal" data-target="#feedbackmodal">( ` + id + ` )</span></h3>
                </div>
                <div class="sj-categorysrightarea">
                    <a href="javascript:void(0);" class="sj-pencilbtn"><i class="ti-pencil"></i></a>
                    <a href="javascript:void(0);" class="sj-trashbtn"><i class="ti-trash"></i></a>
                </div>
            </li>
       `;


        }, "json")
        articleIss += `</ul>`;
        jQuery('.issues222').html(articleIss);
    })
});