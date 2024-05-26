let authors = [];
// example {id:1592304983049, title: 'Deadpool', year: 2015}
const addAuthors = (ev) => {
    ev.preventDefault(); //to stop the form submitting
    let author = {
        id: Date.now(),
        author: document.getElementById('authors_name').value,
        author_email: document.getElementById('authors_email').value,
        authors_phone: document.getElementById('authors_phone').value,
        authors_ORCID: document.getElementById('authors_ORCID').value,
        authors_department: document.getElementById('authors_department').value,
        authors_faculty: document.getElementById('authors_faculty').value,
        authors_university: document.getElementById('authors_university').value
    }
    authors.push(author);
    //document.forms[0].reset(); // to clear the form for the next entries
    // document.querySelector('form').reset();


    //for display purposes only
    //c onsole.warn('added', { authors });


    let pre = document.querySelector('#added_authors');

    pre.textContent = JSON.stringify(authors, '\n');


    //saving to localStorage
    //localStorage.setItem('Authors', JSON.stringify(authors));
}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('add_author').addEventListener('click', addAuthors);
});


jQuery(document).ready(function() {
    /* **************************
    select volume
    ********************************** */
    jQuery.get("../../api/read_volumes.php", function(messages) {
        var volume = ` <option value="0">Select Volume</option>`;

        jQuery.each(messages, function(i, messages) {
            var vol22 = messages.volume;
            //var region1 = messages.region;
            //var id = messages._id.jQueryoid;
            volume += `<option value="` + vol22 + `">` + vol22 + `</option>`;


        });

        jQuery('.vol22').html(volume);
    });

    /* **************************
    select issues
    ********************************** */
    jQuery.get("../../api/read_issues.php", function(messages) {
        var issue = ` <option value="0">Select Issues</option>`;

        jQuery.each(messages, function(i, messages) {
            var issue22 = messages.issue;
            //var region1 = messages.region;
            //var id = messages._id.jQueryoid;
            issue += `<option value="` + issue22 + `">` + issue22 + `</option>`;


        });

        jQuery('.issue22').html(issue);
    });



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
        var allAuthorsb = jQuery("#added_authors").val();
        //alert(allAuthorsb)


        //var authors = ('authors', JSON.stringify(authors));

        if (jQuery(".title").val() == '') {
            jQuery(".title").css('border', '1px solid red');
            jQuery(".warning").html('All fields marked with * are required.');

            return false;
        } else {
            jQuery(".title").css('border', '2px solid green');
            var postTitle = jQuery(".title").val();
            //return true;
        }

        /*  if (jQuery(".doi").val() == '') {
             jQuery(".doi").css('border', '1px solid red');
             jQuery(".warning").html('All fields marked with * are required.');

             return false;
         } else { */
        jQuery(".doi").css('border', '2px solid green');
        var postdoi = jQuery(".doi").val();
        //return true;
        // }

        if (jQuery(".year_of_publication").val() == '') {
            jQuery(".year_of_publication").css('border', '1px solid red');
            jQuery(".warning").html('All fields marked with * are required.');

            return false;
        } else {
            jQuery(".year_of_publication").css('border', '2px solid green');
            var postyear_of_publication = jQuery(".year_of_publication").val();
            //return true;
        }

        if (jQuery(".page_range").val() == 0) {
            jQuery(".page_range").css('border', '1px solid red');
            jQuery(".warning").html('All fields marked with * are required.');

            return false;
        } else {
            jQuery(".page_range").css('border', '2px solid green');
            var postpage_range = jQuery(".page_range").val();
            //return true;
        }

        if (jQuery(".volume").val() == 0) {
            jQuery(".volume").css('border', '1px solid red');
            jQuery(".warning").html('Please select your package.');

            return false;
        } else {
            jQuery(".volume").css('border', '2px solid green');
            var postvolume = jQuery(".volume").val();
            //return true;
        }
        if (jQuery(".issue").val() == '') {
            jQuery(".issue").css('border', '1px solid red');
            jQuery(".warning").html('All fields marked with * are required.');
            return false;
        } else {
            jQuery(".issue").css('border', '2px solid green');
            var postissue = jQuery(".issue").val();
            //return true;
        }

        if (jQuery('.key_words').val() == 0) {
            jQuery(".key_words").css('border', '2px solid red');
            jQuery(".warning").html('All fields marked with * are required.');
            return false;
        } else {
            jQuery(".key_words").css('border', '2px solid green');
            var postkey_words = jQuery('key_words').val();
        }
        if (jQuery('.abstract22').val() == 0) {
            jQuery(".abstract22").css('border', '2px solid red');
            jQuery(".warning").html('All fields marked with * are required.');
            return false;
        } else {
            jQuery(".abstract22").css('border', '2px solid green');
            var postabstract = jQuery('abstract22').val();
        }
        if (jQuery('.article_references').val() == 0) {
            jQuery(".article_references").css('border', '2px solid red');
            jQuery(".warning").html('All fields marked with * are required.');
            return false;
        } else {
            jQuery(".article_references").css('border', '2px solid green');
            var postarticle_references = jQuery('article_references').val();
        }





        e.preventDefault();
        jQuery.ajax({
                type: 'POST',
                url: '../api/create_articles.php',
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
                    jQuery(".success").html('Article upload successful');
                location.href = "underreview.html";
                if (status == 403)
                    jQuery.fn.logout();
                console.log(returnData)
            });



    });
    /* jQuery.get("../../api/read_articles.php", function(messages) {
        var articleAut = `<div>`;
        jQuery.each(messages, function(i, message) {
            var authors2 = message.authors;
            jQuery.each(authors2, function(key, val) {
                var AuthorId = val.id;
                var AuthorName = val.author;
                var AuthorEmail = val.author_email;
                //console.log(key + " : " + val);
                articleAut += `<div><span>Id:      ` + val.id + `</span></br>
            <span>Author:      ` + val.author + `</span></br>
           <span>Email:      ` + val.author_email + `</span></br></div>`;
            });



        }, "json")
        articleAut += `</div`;
        jQuery('.articleAutCon').html(articleAut);
    }) */
});