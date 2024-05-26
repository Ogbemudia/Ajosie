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

    /* **************************
        articles under review
        ********************************** */
    jQuery.get("../../api/read_articles.php", function(messages) {
        var articleAut = `<ul id="accordion" class="sj-articledetails sj-articledetailsvtwo">`;
        jQuery.each(messages, function(i, message) {
            var id = message.id;
            var authors2 = message.authors;
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
            var key_words = message.key_words;
            var article_uploads = message.article_uploads;
            var status = message.status;
            var uploaded_by = message.uploaded_by;
            docSize = message.size;

            var fSExt = new Array('Bytes', 'Kb', 'Mb', 'Gb'),
                i = 0;
            while (docSize > 900) {
                docSize /= 1024;
                i++;
            }
            var exactSize = (Math.round(docSize * 100) / 100) + ' ' + fSExt[i];
            var authorz = `<div>`;
            jQuery.each(authors2, function(key, val) {
                var AuthorId = val.id;
                var AuthorName = val.author;
                var AuthorEmail = val.author_email;
                //console.log(key + " : " + val);
                authorz += `<h4>` + AuthorName + `</h4>
                <span class="sj-mailinfo">` + AuthorEmail + `</span>`;
            })
            authorz += `</div>`;
            //jQuery('.authorzz').html(authorz);
            articleAut += `<li id="headingOne" class="sj-articleheader" data-toggle="collapse" data-target="#` + id + `" aria-expanded="true" aria-controls="collapseOne">
            <div class="sj-detailstime">
                <span><i class="ti-calendar"></i>` + date_recieved + `</span>
                <span><i class="ti-bookmark"></i>` + page_range + `</span>
                <span><i class="ti-layers"></i>` + issue + `</span>
                <span><i class="ti-bookmark-alt"></i>` + volume + `</span>
                <h4>` + title + `</h4>
            </div>
            <div class="sj-nameandmail">
                <span>Authors</span>
                ` + authorz + `
            </div>
        </li>
        <li id="` + id + `" class="collapse sj-active sj-userinfohold" aria-labelledby="headingOne" data-parent="#accordion">
        <div class="sj-userinfoimgname">
            <div class="sj-userinfoname">
                <span>Uploaded on ` + date_recieved + `</span>
                <h3>By ` + uploaded_by + `</h3>
            </div>
            <div class="sj-userbtnarea">
                <button type="button" value="` + id + `"  data-value1="` + title + `" class="sj-btn sj-btnactive deleteArticle" data-toggle="modal" data-target="#reviewermodal">Delete</button>
                <button type="submit" value="` + id + `" class="sj-btn updateArticle" data-toggle="modal2" data-target="#feedbackmodal1">Edit Article</button>
            </div>
            <div class="sj-description">
            <h3>Abstract</h3>
                <p>
                ` + abstract + `
                </p>
            </div>
            <div class="sj-downloadheader">
                <div class="sj-title">
                    <h3>Attached Document</h3>
                    <a href="javascript:void(0);" class="fileUp" data-value="` + article_uploads + `"><i class="lnr lnr-download"></i>Download</a>
                </div>
                <div class="sj-docdetails">
                    <figure class="sj-docimg fileUp" data-value="` + article_uploads + `">
                        <img src="images/thumbnails/doc-img.jpg" alt="img description">
                    </figure>
                    <div class="sj-docdescription">
                        <h4>` + article_uploads + `</h4>
                        <span>File Size ` + exactSize + `</span>
                    </div>
                </div>
                </div>
                </div>
            </li>`;

        }, "json")
        articleAut += `</ul>`;
        jQuery('.underR22').html(articleAut);
        jQuery(document).on('click', '.fileUp', function() {
            var downloadArt = $(this).data('value');
            window.location.assign("../upload/" + downloadArt);
            //alert(downloadArt);
        });
        jQuery(document).on('click', '.updateArticle', function() {
            var articleId = $(this).val();
            location.href = "updatearticle.html?" + articleId;
            //alert(downloadArt);
        });

        jQuery(document).on('click', '.deleteArticle', function() {
            var articleId = $(this).val();
            var title = $(this).data("value1");
            jQuery('.articleTitle').html(title);
            $.fn.deleteAction(articleId);
            //alert(downloadArt);
        });
        /* jQuery(document).on('click', '.deletethisArticle', function() {
            var articleId = $(this).val();
            $.fn.deleteAction(articleId);

            //alert(articleId);
        });
 */
    })

    /* **************************************
    Delete Action
    *****************8************************* */
    $.fn.deleteAction = function(articleId) {
        $('.deletethisArticle').on('click', function() {
            //$('.activate').addClass('clickClass')
            var formData = {
                id: articleId,
            }

            //e.preventDefault();
            $.ajax({
                    type: 'POST',
                    url: '../../api/delete_article.php',
                    data: formData,
                    dataType: "json",
                    encode: true,
                    Cache: false,
                })
                .done(function(returnData) {

                    var success, status, message;

                    success = returnData.success;
                    status = returnData.status;
                    message = returnData.message;


                    //alert(message)
                    if (status == 201) {
                        // $('.addUsers').css('display', 'none');
                        //$.fn.me();
                        location.reload();
                    }
                    elseif(status == 403)
                        // $('.activate').removeClass('clickClass')

                    $.fn.logout();
                    //console.log(returnData)
                });



        });
    }





})