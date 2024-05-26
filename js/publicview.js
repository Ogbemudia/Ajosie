jQuery(document).ready(function() {
    jQuery.get("../../api/read_allarticles.php", function(messages) {
            var articleAut = `<div>`;
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
                /* var words = abstract.match(/\S+/g);
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
                //var volumez = ` <h4>` + volume + `</h4>`;

                var authorz = `<div>`;
                jQuery.each(authors2, function(key, val) {
                    var AuthorId = val.id;
                    var AuthorName = val.author;
                    var AuthorEmail = val.author_email;
                    //console.log(key + " : " + val);
                    authorz += `<span><span class="lnr lnr-user" style="display: inline-block;"></span> <a href="author/` + AuthorId + `/` + AuthorName + `" class="myLink">` + AuthorName + `</a></span>`;
                })
                authorz += `</div>`;
                //jQuery('.authorzz').html(authorz);
                articleAut += `<div class="tg-reviews">
                                    <!--<div class="tg-borderheading">
                                        <h4>` + volume + ` 18</h4>
                                    </div>-->
                                    <ul>
                                        <li>
                                            <div class="tg-commenter">
                                                <div class="tg-commenterbox">
                                
                                                    <div class="tg-commenterhead">
                                                        <div class="tg-leftarea">
                                                            <!-- <span>Authors</span> -->
                                                            ` + authorz + `
                                                        </div>
                                                        <div class="tg-rightarea">
                                                            <a class="tg-btnreply" href="articledetail/` + id + `/` + title + `"> <span class="lnr lnr-eye"></span></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="tg-description">
                                                        <h4><a href="articledetail/` + id + `/` + title + `">` + title + `</a></h4>
                                                    </div>
                                                    <div class="tg-description">
                                                        <p>` + abstract + `</p>
                                                        <a href="articledetail/` + id + `/` + title + `"><button class="tg-btn" style="border-radius: 10px;">View Full Article</button></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        
                                    </ul>
                            </div>`;



            }, "json")
            articleAut += `</div>`;

            jQuery('.articlesH').html(articleAut);
            /*jQuery('.reloadArt').click(function(event) {
                var idA = this.val();
                alert('idA')
            }) */
        })
        /* ****************************Read issues/volume************************************ */


    jQuery.get("../../api/read_latest_vol.php", function(messages) {
        //var recentIssues = `<div class="allissues">`;
        jQuery.each(messages, function(i, message) {
            var volId = message.id;
            var vol_issue = message.volume;
            var vol_year = message.vol_year;
            //alert(volId + ' ' + vol_issue)
            jQuery('.yearIssue').html(vol_year);
            jQuery('.vol_issue').html(vol_issue);
            //jQuery('.issueName').html(vol_issue);
            jQuery.get("../../api/read_articles_by_vol.php?volume=" + vol_issue, function(messages) {
                var articleAut = `<div>`;
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
                    var words = abstract.match(/\S+/g);
                    var count = words ? words.length : 0;
                    var truncatedText = words.slice(0, 30).join(" ");
                    abstract = truncatedText;
                    //if (abstract.length > 200) abstract = abstract.substring(0, 150);
                    var authorz = `<div>`;
                    jQuery.each(authors2, function(key, val) {
                        var AuthorId = val.id;
                        var AuthorName = val.author;
                        var AuthorEmail = val.author_email;
                        //console.log(key + " : " + val);
                        authorz += `<span><span class="lnr lnr-user" style="display: inline-block;"></span> <a href="author/` + AuthorId + `/` + AuthorName + `" class="myLink">` + AuthorName + `</a></span>`;
                    })
                    authorz += `</div>`;
                    //jQuery('.authorzz').html(authorz);
                    articleAut += ` <ul>
                                        <li>
                                            <div class="tg-commenter">
                                                <div class="tg-commenterbox">
                                
                                                    <div class="tg-commenterhead">
                                                        <div class="tg-leftarea">
                                                            <!-- <span>Authors</span> -->
                                                            ` + authorz + `
                                                        </div>
                                                        <div class="tg-rightarea">
                                                            <a class="tg-btnreply" href="articledetail/` + id + `/` + title + `"> <span class="lnr lnr-eye"></span></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="tg-description">
                                                        <h4><a href="articledetail/` + id + `/` + title + `">` + title + `</a></h4>
                                                    </div>
                                                    <div class="tg-description">
                                                        <p>` + abstract + `</p>
                                                        <a href="articledetail/` + id + `/` + title + `"><button class="tg-btn" style="border-radius: 10px;">View Full Article</button></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        
                                    </ul>`;

                }, "json")
                articleAut += `</div>`;
                jQuery('.editorPs').html(articleAut);
                jQuery('.articles22').html(articleAut);

            })

        })

    })

    /* ****************************end Read issues************************************ */
})