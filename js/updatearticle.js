$(document).ready(function() {
    $.fn.codeCheck = function() {
        var queryString = decodeURIComponent(window.location.search);
        queryString = queryString.substring(1);

        var result = queryString;
        //alert(result);
        jQuery.get("../../api/readArticleById.php?id=" + result, function(messages) {
            jQuery.each(messages, function(i, message) {
                var id = message.id;
                //var authors2 = message.authors;
                var title = message.title;
                var abstract = message.abstract;
                var doi = message.doi;
                var date_recieved = message.date_recieved;
                var date_accepted = message.date_accepted;
                var date_published = message.date_published;
                var year_of_publication = message.year_of_publication;
                var month_of_publication = message.month_of_publication;
                var page_range = message.page_range;
                var volume = message.volume;
                var issue = message.issue;
                var article_references = message.article_references;
                var key_words = message.key_words;
                var authors = message.authors;
                authors = JSON.stringify(authors);
                var article_uploads = message.article_uploads;
                var status = message.status;
                docSize = message.size;



                /* **************************
                select volume
                ********************************** */
                jQuery.get("../../api/read_volumes.php", function(messages) {
                    //var volume22 = ` <option value="not set">Select Volume</option>`;
                    var volume22 = ` <option value="` + volume + `">` + volume + `</option>`;

                    jQuery.each(messages, function(i, messages) {
                        var vol22 = messages.volume;
                        //var region1 = messages.region;
                        //var id = messages._id.jQueryoid;
                        volume22 += `<option value="` + vol22 + `">` + vol22 + `</option>`;


                    });

                    jQuery('.vol22').html(volume22);
                });
                jQuery('.title').val(title);
                jQuery('.articleId').val(id);
                jQuery('.doi').val(doi);
                jQuery('.year_of_publication').val(year_of_publication);
                jQuery('.month_of_publication').val(month_of_publication);
                jQuery('.page_range').val(page_range);
                /*  var volume33 = `<option value="` + volume + `">` + volume + `</option>`;
                 jQuery('.vol22').html(volume33); */
                jQuery('.issue22').val(issue);
                jQuery('.key_words').val(key_words);
                jQuery('#added_authors').val(authors);
                jQuery('.abstract22').val(abstract);
                jQuery('.article_references').val(article_references);
                //jQuery('.fileUpload').val(article_uploads);

            })
        })



        /* ****************************
        update form
        ******************************** */
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
                    url: '../api/update_article.php',
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
                    location.reload();
                    if (status == 403)
                        jQuery.fn.logout();
                    console.log(returnData)
                });



        });

    }

})