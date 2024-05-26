jQuery(document).ready(function() {

    jQuery.get("../../api/read_volumes.php", function(messages) {
        var allIssuesCont = `<div class="sj-issuesyears"> 
        <div id="sj-accordion" class="sj-accordion" role="tablist" aria-multiselectable="true">`;
        jQuery.each(messages, function(i, message) {
            var volId = message.id;
            var vol_issue = message.volume;
            var vol_year = message.vol_year;
            var classIssue = 'issue' + volId;
            allIssuesCont += `<div class="sj-panel">
            <button style="width:100%; text-align:left; border-radius:5px;" value="` + vol_issue + `" data-custome-value="` + classIssue + `" class="clickIssue" id="clickIssue11"><h4 class="clickIssue">` + vol_year + `<i class="fa fa-angle-down"></i></h4><button>
            <div class="issueContent" id="` + classIssue + `"></div>
            <!--<div class="sj-panelcontent">
                <div class="sj-recordholder">
                    <a class="sj-btnrecord" href="javascript:void(0);"><span>2018</span><i class="fa fa-angle-right"></i></a>
                    <a class="sj-btnrecord" href="javascript:void(0);"><span>2017</span><i class="fa fa-angle-right"></i></a>
                    <a class="sj-btnrecord" href="javascript:void(0);"><span>2016</span><i class="fa fa-angle-right"></i></a>
                    <a class="sj-btnrecord" href="javascript:void(0);"><span>2015</span><i class="fa fa-angle-right"></i></a>
                    <a class="sj-btnrecord" href="javascript:void(0);"><span>2014</span><i class="fa fa-angle-right"></i></a>
                    <a class="sj-btnrecord" href="javascript:void(0);"><span>2013</span><i class="fa fa-angle-right"></i></a>
                    <a class="sj-btnrecord" href="javascript:void(0);"><span>2012</span><i class="fa fa-angle-right"></i></a>
                    <a class="sj-btnrecord" href="javascript:void(0);"><span>2011</span><i class="fa fa-angle-right"></i></a>
                    <a class="sj-btnrecord" href="javascript:void(0);"><span>2010</span><i class="fa fa-angle-right"></i></a>
                </div>
            </div>-->
        </div>`;
        })
        allIssuesCont += `</div>`;
        jQuery('.allIssuesCont').html(allIssuesCont);
        $('.clickIssue').click(function() {
            jQuery('.issueContent').html('');
            var volume = $(this).val();
            var issueId = $(this).data("custome-value");
            //jQuery('#' + issueId).html(volume);

            //alert(issueId);
            //benMyName = firstName + ' ' + lastName;
            //alert(state_of_residence + ' ' + uid)
            $.fn.archIssues(issueId, volume);
        });
    })

    /* ****************************end Read issues************************************ */

    $.fn.archIssues = function(issueId, volume) {
        jQuery.get("../../api/read_articles_by_vol.php?volume=" + volume, function(messages) {
            var articleAut = `<div class="sj-panelcontent" style="text-align:left;">
            <div class="sj-recordholder">`;
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
                    authorz += `<span class="sj-username"><a href="javascript:void(0);">` + AuthorName + ` </a></span>`;
                })
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

            }, "json")
            articleAut += `</div></div>`;

            jQuery('#' + issueId).html(articleAut);

        })
    }
})