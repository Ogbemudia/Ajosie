jQuery(document).ready(function() {
    /*************************************************** Read Users ****************************************************************************** */

    jQuery.fn.read_users = function() {

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

        var usersList = `<ul class="sj-allcategorys sj-allcategorysvtwo">`;

        jQuery.ajax({

            type: "GET",
            url: "../validation/read_users.php",
            //data: formData,
            dataType: "json",
            encode: true,
            Cache: false,
            // setTimeout();

        })

        .done(function(messages) {

            jQuery.each(messages, function(i, messages) {

                Id = messages.id;
                fullname = messages.fullname;
                sex = messages.sex;
                email = messages.email;
                created = messages.created;
                phone = messages.phone;
                img = messages.img;
                role = messages.role;
                last_login = messages.last_login;

                usersList += `<li class="sj-categorysinfo">
                <figure class="sj-assignuserimg">
                    <img src="upload/` + img + `" alt="img">
                </figure>
                <div class="sj-title">
                    <h3 data-toggle="modal" data-target="#feedbackmodal" class="singleClick" data-custome-value="` + Id + `">` + fullname + `<span class="sj-assignedinfo" >( Role: ` + role + ` )</span></h3>
                    
                </div>
                
                <div class="sj-categorysrightarea">
                    <ul class="sj-userdropdown">
                        <li>
                            <a href="javascript:void(0);" class="sj-userdropdownbtn">
                                <span><i class="lnr lnr-user"></i></span>
                                <i class="fa fa-angle-down"></i>
                            </a>
                            <ul class="sj-userdropdownmanu">
                                <li class="sj-checked">
                                    <span class="sj-checkbox">
                                        <input type="checkbox" id="sj-speaker1" name="bycondition" value="Speaker" checked="">
                                        <label for="sj-speaker1">
                                            <span>Speaker</span>
                                    </label>
                                    </span>
                                </li>
                                <li class="sj-checked">
                                    <span class="sj-checkbox">
                                        <input type="checkbox" id="sj-director1" name="bycondition a" value="Director">
                                        <label for="sj-director1">
                                            <span>Course Director</span>
                                    </label>
                                    </span>
                                </li>
                                <li class="sj-checked">
                                    <span class="sj-checkbox">
                                        <input type="checkbox" id="sj-admin" name="bycondition c" value="Admin">
                                        <label for="sj-admin">
                                            <span>Admin</span>
                                    </label>
                                    </span>
                                </li>
                            </ul>
                        </li>
                        <li class="sj-checkbtnbox">
                            <a href="javascript:void(0);" class="sj-checkbtn"><i class="ti-check"></i></a>
                        </li>
                    </ul>
                    <div class="sj-addremove">
                        <a href="javascript:void(0);" class="sj-pencilbtn"><i class="ti-pencil"></i></a>
                        <a href="javascript:void(0);" class="sj-trashbtn"><i class="ti-trash"></i></a>
                    </div>
                </div>
            </li>`;

            });
            usersList += `</ul>`;
            jQuery('.userList').html(usersList);
            jQuery('.singleClick').on('click', function(event) {
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

                var Id = jQuery(this).data("custome-value");
                //alert(Id);

                jQuery.get("../validation/read_singleuser.php?id=" + Id, function(messages) {

                    Id = messages.id;
                    fullname = messages.fullname;
                    sex = messages.sex;
                    email = messages.email;
                    created = messages.created;
                    phone = messages.phone;
                    img = messages.img;
                    role = messages.role;
                    last_login = messages.last_login;
                    last_updated = messages.last_updated;
                    failed_atempt = messages.failed_atempt;

                    //var img2 = `<img src="upload/` + img + `" alt="image description">`;
                    var singleUser = `<div class="sj-modalcontent modal-content">
                            <div class="sj-popuptitle">
                                <h2>` + fullname + `</h2>
                                <a href="javascript%3bvoid(0.html" class="sj-closebtn close"><i class="lnr lnr-cross" data-dismiss="modal" aria-label="Close"></i></a>
                            </div>
                            <div class="modal-body">
                                <form class="sj-formtheme sj-formaddnewfield sj-verticalscrollbar">
                                    <fieldset id="filter-masonry" class="sj-haslayout">
                                        <div class="form-group">
                                            <span class="sj-checkbox sj-firstheadcheckbox">
                                                <input type="checkbox" id="sj-checkboxone1" name="bycondition" value="Accountant">
                                                <label for="sj-checkboxone1">
                                                    <small><span></span></small>
                                            </label>
                                            </span>
                                            <span class="sj-checkbox">
                                                <input type="checkbox" id="sj-title1" name="bycondition" value="Accountant">
                                                <label for="sj-title1">
                                                <figure class="sj-assignuserimg">
                                                <img src="upload/` + img + `" alt="img">
                                            </figure>
                                            </label>
                                            </span>
                                            <span class="sj-checkbox">
                                                <input type="checkbox" id="sj-title2" name="bycondition" value="Accountant">
                                                <label for="sj-title2">
                                                    <span>` + role + `</span>
                                            </label>
                                            </span>
                                            <span class="sj-checkbox">
                                                <input type="checkbox" id="sj-title3" name="bycondition" value="Accountant">
                                                <label for="sj-title3">
                                                    <span>` + sex + `</span>
                                            </label>
                                            </span>
                                            <span class="sj-checkbox">
                                                <input type="checkbox" id="sj-title4" name="bycondition" value="Accountant">
                                                <label for="sj-title4">
                                                    <span>` + email + `</span>
                                            </label>
                                            </span>
                                            <span class="sj-checkbox">
                                                <input type="checkbox" id="sj-title5" name="bycondition" value="Accountant">
                                                <label for="sj-title5">
                                                    <span>` + phone + `</span>
                                            </label>
                                            </span>
                                            <span class="sj-checkbox">
                                                <input type="checkbox" id="sj-title6" name="bycondition" value="Accountant">
                                                <label for="sj-title6">
                                                    <span>Date Created: ` + created + `</span>
                                            </label>
                                            </span>
                                            <span class="sj-checkbox">
                                                <input type="checkbox" id="sj-title7" name="bycondition" value="Accountant">
                                                <label for="sj-title7">
                                                    <span>Last Login: ` + last_login + `</span>
                                            </label>
                                            </span>
                                            <span class="sj-checkbox">
                                                <input type="checkbox" id="sj-title8" name="bycondition" value="Accountant">
                                                <label for="sj-title8">
                                                    <span>Failed Login Attempt: ` + failed_atempt + `</span>
                                            </label>
                                            </span>
                                            
                                        </div>
                                    </fieldset>
                                </form>
                                <div class="sj-popupbtn">
                                </div>
                            </div>
                        </div>`;

                    jQuery('.singleModal').html(singleUser);


                }, "json");
            });


        }, "json")

        /* ************************************
            Popup Single User
        ************************************* */
    }

    jQuery('.addUser').click(function() {
        jQuery.fn.adduser();
        //alert('adduser')

    });
    /*************************************************** Create Users ****************************************************************************** */

    jQuery.fn.adduser = function() {
        //alert('adduser')
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


        //validating form
        //email validation

        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }



        jQuery("form").submit(function(event) {
            var postReq = $("#crud_req").val();


            if (jQuery(".fullname").val() == '') {
                jQuery(".fullname").css('border', '1px solid red');

                jQuery('.errmsg').html('All fields marked with * are required.');
                return false;
            } else {
                jQuery(".fullname").css('border', '2px solid green');

                var postfullname = $(".fullname").val();
                //return true;
            }

            if (jQuery(".phone").val() == '') {
                jQuery(".phone").css('border', '1px solid red');

                jQuery('.errmsg').html('All fields marked with * are required.');
                return false;
            } else {
                jQuery(".phone").css('border', '2px solid green');

                var postPhone = $(".phone").val();
                //return true;
            }


            if ($(".email").val() == '') {
                $(".email").css('border', '1px solid red');
                jQuery('.errmsg').html('All fields marked with * are required.');
                return false;
            }

            if ($(".email").val() != '') {
                var email2 = $(".email").val();
                if (!validateEmail(email2)) {
                    $(".email").css('border', '1px solid red');
                    jQuery('.errmsg').html('Enter a valid email');
                    return false;
                } else {
                    jQuery(".email").css('border', '2px solid green');
                    var postEmail = email2;
                    //return true;
                }
            }




            if (jQuery(".password").val() == '') {
                jQuery(".password").css('border', '1px solid red');
                jQuery('.errmsg').html('All fields marked with * are required.');
                return false;
            }

            if (jQuery(".password").val() != '') {
                var password1 = jQuery(".password").val();
                if (password1.length < 6) {
                    jQuery(".password").css('border', '1px solid red');
                    jQuery(".errmsg").html('Your password must be at least 6 character');
                    return false;
                } else {
                    jQuery(".password").css('border', '2px solid green');
                    var postPassword = password1;
                    //return true;
                }
            }

            if (jQuery(".confirm_password").val() == '') {
                jQuery(".confirm_password").css('border', '1px solid red');
                jQuery(".errmsg").html('Confirm your password');
                return false;
            }

            if (jQuery(".confirm_password").val() != '') {
                var confirm_password1 = jQuery(".confirm_password").val();
                if (confirm_password1 != password1) {
                    jQuery(".confirm_password").css('border', '1px solid red');
                    jQuery("errmsg").html('Password does not match');
                    return false;
                } else {
                    jQuery(".confirm_password").css('border', '2px solid green');
                    var postConfirm_password = confirm_password1;
                    //return true;
                }
            }



            if (jQuery('.role').val() == '') {
                jQuery(".role").css('border', '2px solid red');
                jQuery('.errmsg').html('All fields marked with * are required.');
                return false;
            } else {
                jQuery(".role").css('border', '2px solid green');
                var postCategory = $('.role').val();
            }
            if (jQuery('.sex').val() == '') {
                jQuery(".sex").css('border', '2px solid red');
                jQuery('.errmsg').html('All fields marked with * are required.');
                return false;
            } else {
                jQuery(".sex").css('border', '2px solid green');
                var postSex = $('.sex').val();
            }

            /*  var formData = {
                 crud_req: postReq,

                 fullname: postfullname,
                 email: postEmail,
                 role: postCategory,
                 sex: postSex,
                 phone: postPhone,
                 password: postPassword,
                 confirm_password: postConfirm_password


             }; */
            //alert('ok');
            // formData.append('file', formData);
            //e.preventDefault();
            jQuery.ajax({
                type: 'POST',
                url: '../validation/model2.php',
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
                    location.reload();
                if (status == 403)
                    $.fn.logout();
                //console.log(returnData)
            });
            event.preventDefault();


        });


    }


    /* ************end of popup delete************* */
})