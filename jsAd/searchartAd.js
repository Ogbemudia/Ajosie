jQuery.ajaxSetup({
    cache: false
});
jQuery('.articleSerach').keyup(function() {
    jQuery('.underR22').html('');
    // jQuery('.pageAll').addClass('nonActive3')
    //jQuery('#state').val('');
    var searchField = jQuery('.articleSerach').val();
    var expression = new RegExp(searchField, "i");
    jQuery.getJSON('../../api/read_articles.php', function(data) {
        var articleAut = `<ul id="accordion" class="sj-articledetails sj-articledetailsvtwo">`;
        jQuery.each(data, function(key, value) {
            var authors = value.authors;
            authors = JSON.stringify(authors);

            // if (value.userId.search(expression) != -1 || value.biodata.first_name.search(expression) != -1 || value.biodata.last_name.search(expression) != -1 || value.contact.email.search(expression) != -1 || value.biodata.gender.search(expression) != -1 || value.status.status.search(expression) != -1 || value.contact.region.search(expression) != -1 || value.created.search(expression) != -1 || value.contact.state_of_residence.search(expression) != -1 || value.contact.current_city.search(expression) != -1 || value.assesment.package.search(expression) != -1 || value.partner_organization.partner_o.search(expression) != -1) {
            if ( /* value.page_range.search(expression) != -1 ||  */ value.title.search(expression) != -1 || value.abstract.search(expression) != -1 || value.year_of_publication.search(expression) != -1 || value.month_of_publication.search(expression) != -1 || value.volume.search(expression) != -1 || value.issue.search(expression) != -1 || value.key_words.search(expression) != -1 || authors.search(expression) != -1 || value.uploaded_by.search(expression) != -1) {
                var id = value.id;
                var authors2 = value.authors;
                var title = value.title;
                var abstract = value.abstract;
                var doi = value.doi;
                var date_recieved = value.date_recieved;
                var date_accepted = value.date_accepted;
                var date_published = value.date_published;
                var year_of_publication = value.year_of_publication;
                var month_of_publication = value.month_of_publication;
                var page_range = value.page_range;
                var volume = value.volume;
                var issue = value.issue;
                var key_words = value.key_words;
                var article_uploads = value.article_uploads;
                var status = value.status;
                var uploaded_by = value.uploaded_by;
                docSize = value.size;

                var fSExt = new Array('Bytes', 'Kb', 'Mb', 'Gb'),
                    i = 0;
                while (docSize > 900) {
                    docSize /= 1024;
                    i++;
                }
                var exactSize = (Math.round(docSize * 100) / 100) + ' ' + fSExt[i];

                var authors2 = value.authors;
                var authorz = `<div>`;
                jQuery.each(authors2, function(key, val) {
                    var AuthorId = val.id;
                    var AuthorName = val.author;
                    var AuthorEmail = val.author_email;
                    authorz += `<h4>` + AuthorName + `</h4>
                    <span class="sj-mailinfo">` + AuthorEmail + `</span>`;
                })
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

            }
        });
        articleAut += `</ul>`;
        jQuery('.underR22').html(articleAut);
        jQuery(document).on('click', '.fileUp', function() {
            var downloadArt = jQuery(this).data('value');
            window.location.assign("../upload/" + downloadArt);
            //alert(downloadArt);
        });
        jQuery(document).on('click', '.updateArticle', function() {
            var articleId = jQuery(this).val();
            location.href = "updatearticle.html?" + articleId;
            //alert(downloadArt);
        });

        jQuery(document).on('click', '.deleteArticle', function() {
            var articleId = jQuery(this).val();
            var title = jQuery(this).data("value1");
            jQuery('.articleTitle').html(title);
            $.fn.deleteAction(articleId);
            //alert(downloadArt);
        });

        jQuery('.underR22').html(articleAut);

        /* if (searchField == '') {
            jQuery('allarts').html('');

            //$.fn.BeneficiariesJS();
            //location.reload();

        } */

    });
})