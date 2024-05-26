jQuery.ajaxSetup({
    cache: false
});
jQuery('.articleSerach').keyup(function() {
    jQuery('.allarts').html('');
    // $('.pageAll').addClass('nonActive3')
    //$('#state').val('');
    var searchField = $('.articleSerach').val();
    var expression = new RegExp(searchField, "i");
    jQuery.getJSON('../../api/read_allarticles.php', function(data) {
        var articleAut = `<div class="sj-articles">`;
        jQuery.each(data, function(key, value) {
            var authors = value.authors;
            authors = JSON.stringify(authors);

            // if (value.userId.search(expression) != -1 || value.biodata.first_name.search(expression) != -1 || value.biodata.last_name.search(expression) != -1 || value.contact.email.search(expression) != -1 || value.biodata.gender.search(expression) != -1 || value.status.status.search(expression) != -1 || value.contact.region.search(expression) != -1 || value.created.search(expression) != -1 || value.contact.state_of_residence.search(expression) != -1 || value.contact.current_city.search(expression) != -1 || value.assesment.package.search(expression) != -1 || value.partner_organization.partner_o.search(expression) != -1) {
            if (value.title.search(expression) != -1 || value.abstract.search(expression) != -1 || value.year_of_publication.search(expression) != -1 || value.month_of_publication.search(expression) != -1 || /* value.page_range.search(expression) != -1 ||  */ value.volume.search(expression) != -1 || value.issue.search(expression) != -1 || value.key_words.search(expression) != -1 || authors.search(expression) != -1) {
                var abstract = value.abstract;
                var words = abstract.match(/\S+/g);
                var count = words ? words.length : 0;
                var truncatedText = words.slice(0, 30).join(" ");
                abstract = truncatedText;

                var authors2 = value.authors;
                var authorz = `<div>`;
                jQuery.each(authors2, function(key, val) {
                    var AuthorId = val.id;
                    var AuthorName = val.author;
                    var AuthorEmail = val.author_email;
                    //console.log(key + " : " + val);
                    authorz += `<span class="sj-username"><a href="javascript:void(0);" class="myLink">` + AuthorName + `</a></span>`;
                })
                authorz += `</div>`;
                articleAut += `<article class="sj-post sj-editorchoice">
                <div class="sj-postcontent">
                                            <div class="sj-head">
                                                <div class="authorzz">` + authorz + `</div>
                                                <h3><a href="articledetail/` + value.id + `/` + value.title + `">` + value.title + `</a></h3>
                                            </div>
                                                    
                                            <div class="sj-description">
                                            <p>` + abstract + `...</p>
                                        </div>
                                        <a class="sj-btn" href="articledetail/` + value.id + `/` + value.title + `">View Full Article</a>
                                    </div>
                                </article>`;
            }
        });
        articleAut += `</div>`;

        jQuery('.allarts').html(articleAut);

        /* if (searchField == '') {
            jQuery('allarts').html('');

            //$.fn.BeneficiariesJS();
            //location.reload();

        } */

    });
})