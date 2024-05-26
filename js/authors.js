$(document).ready(function() {
    $.fn.codeCheck = function() {
        var url = window.location.href;

        // split the URL into an array of segments
        var segments = url.split('/');

        // extract the second-to-last segment (i.e. the "61" in this case)
        var id = segments[segments.length - 2];
        var currentAuthor = segments[segments.length - 1];

        //var str = "Sunday-Okungbowa-UHUNMWUANGHO,-PhD";
        var currentAuthor = currentAuthor.replace(/-/g, ' ');

        jQuery('.authorArticles').html('Articles by ' + currentAuthor);
        //alert(result);

        jQuery.getJSON('../../api/read_allarticles.php', function(data) {

            var articleAut = `<div class="sj-articles">`;
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
                //if (abstract.length > 200) abstract = abstract.substring(0, 150);
                /*  var words = abstract.match(/\S+/g);
                 var count = words ? words.length : 0;
                 var truncatedText = words.slice(0, 30).join(" ");
                 abstract = truncatedText; */
                if (abstract.length > 200) {
                    var truncated = abstract.substring(0, 200);
                    var lastSpace = truncated.lastIndexOf(' ');
                    if (lastSpace > 0) {
                        abstract = truncated.substring(0, lastSpace) + '...';
                    } else {
                        abstract = truncated + '...';
                    }
                }


                var authorz = `<div>`;
                jQuery.each(authors2, function(key, val) {
                    var AuthorId = val.id;
                    var AuthorName = val.author;
                    var AuthorEmail = val.author_email;
                    //console.log(key + " : " + val);
                    if (currentAuthor === AuthorName) {
                        authorz += `<span class="sj-username"><a href="javascript:void(0);" class="myLink">` + AuthorName + `</a></span>`;


                        authorz += `</div>`;
                        //jQuery('.authorzz').html(authorz);
                        articleAut += `<article class="sj-post sj-editorchoice">
                                            <div class="sj-postcontent">
                                            <div class="sj-head">
                                                <div class="authorzz">` + authorz + `</div>
                                                <h3><a href="articledetail/` + id + `/` + title + `">` + title + `</a></h3>
                                            </div>
                                                    
                                            <div class="sj-description">
                                            <p>` + abstract + `...</p>
                                        </div>
                                        <a class="sj-btn" href="articledetail/` + id + `/` + title + `">View Full Article</a>
                                    </div>
                                </article>`;
                    }
                })
                authorz += `</div>`;
                jQuery('.allarts').html(authorz);
            });
            articleAut += `</div>`;
            //jQuery('.allarts').html(articleAut);

        })
    }
})