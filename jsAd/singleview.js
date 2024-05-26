jQuery(document).ready(function() {
    jQuery.fn.codeCheck = function(queryString) {
        // get the URL of the current page
        var url = window.location.href;

        // split the URL into an array of segments
        var segments = url.split('/');

        // extract the second-to-last segment (i.e. the "61" in this case)
        var id = segments[segments.length - 2];

        //alert(id);
        //jQuery.get("../../api/read_articleby_title.php?title=" + result, function(messages) {
        jQuery.get("../../api/read_articlebyId.php?id=" + id, function(messages) {
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
                var article_references = message.article_references;
                var key_words = message.key_words;
                var article_uploads = message.article_uploads;
                var status = message.status;
                docSize = message.size;

                var fSExt = new Array('Bytes', 'Kb', 'Mb', 'Gb'),
                    i = 0;
                while (docSize > 900) {
                    docSize /= 1024;
                    i++;
                }
                var exactSize = (Math.round(docSize * 100) / 100) + ' ' + fSExt[i];
                /* var words = abstract.match(/\S+/g);
                var count = words ? words.length : 0;
                var truncatedText = words.slice(0, 30).join(" ");
                abstract = truncatedText; */
                //if (abstract.length > 200) abstract = abstract.substring(0, 150);
                var paragraphs = article_references.split('\n'); // Split the text into an array of paragraphs

                for (var i = 0; i < paragraphs.length; i++) {
                    var formattedText = '<p>' + paragraphs[i] + '</p>'; // Wrap each paragraph in a <p> tag
                    jQuery('.article_references').append(formattedText); // Append each formatted paragraph to the body of the page
                }

                var paragraphsAbs = abstract.split('\n'); // Split the text into an array of paragraphs

                for (var i = 0; i < paragraphsAbs.length; i++) {
                    var formattedText2 = '<p>' + paragraphsAbs[i] + '</p>'; // Wrap each paragraph in a <p> tag
                    jQuery('.abstract333').append(formattedText2); // Append each formatted paragraph to the body of the page
                }
                jQuery('.articleTitle').html(title)
                var authorz = `<div>`;
                var aboutAuthors = `<div>`;
                jQuery.each(authors2, function(key, val) {
                    var AuthorId = val.id;
                    var AuthorName = val.author;
                    var authors_phone = val.authors_phone;
                    var AuthorEmail = val.author_email;
                    var authors_ORCID = val.authors_ORCID;
                    var authors_department = val.authors_department;
                    var authors_faculty = val.authors_faculty;
                    var authors_university = val.authors_university;
                    //console.log(key + " : " + val);
                    aboutAuthors += `<div>
                    <h4>` + AuthorName + `</h4>
                    <p>` + authors_phone + `</p>
                    <p>` + AuthorEmail + `</p>
                    <p><a href="` + authors_ORCID + `" target="blank">` + authors_ORCID + `<a/></p>
                    <p>` + authors_department + `</p>
                    <p>` + authors_faculty + `</p>
                    <p>` + authors_university + `</p>
                </div><hr><br>`
                    authorz += `<span class="sj-username"><a href="javascript:void(0);" class="">` + AuthorName + ` </a></span>`;
                })
                aboutAuthors += `</div>`;
                jQuery('.aboutAuthors').html(aboutAuthors);
                authorz += `</div>`;
                jQuery('.authrsNames').html(authorz);
                //jQuery('.abstract333').html(abstract);
                jQuery('.vol_iss').html(volume);
                var wordArray = key_words.split(","); // split the string into an array using the comma as a separator

                // loop through each word in the array and wrap it in a span tag
                for (var i = 0; i < wordArray.length; i++) {
                    // wordArray[i] = "<span>" + wordArray[i].trim() + "</span>"; // wrap the word in a span tag and trim any whitespace
                    wordArray[i] = `<li>
                                        <a href="javascript:void(0);">` + wordArray[i].trim() + `</a>
                                    </li>`; // wrap the word in a span tag and trim any whitespace
                }
                var wrappedWords = wordArray.join("");
                jQuery('.artKeywords').html(wrappedWords);
                var pageRange = `<span><i class="ti-bookmark"></i>` + page_range + `</span>`;
                jQuery('.pageRange').html(pageRange);

                var download22 = ` <div class="sj-downloadheader">
                            <div class="sj-title">
                                <h3 class="downloadArticle">Full Article</h3>
                                <a href="javascript:void(0);" class="fileUp downloadArticle" data-value="` + article_uploads + `"><i class="lnr lnr-download"></i>Download</a>
                            </div>
                            <div class="sj-docdetails">
                            
                                <figure class="sj-docimg fileUp" data-value="` + article_uploads + `">
                                    <img src="http://njem.edu/images/thumbnails/doc-img.jpg" alt="img description" class="downloadArticle">
                                </figure>
                               
                                <div class="sj-docdescription">
                                    <h4>` + article_uploads + `</h4>
                                    <span>File Size ` + exactSize + `</span>
                                </div>
                            </div>
                            </div>
                            </div>
                        </li>`;
                jQuery('.download22').html(download22);
                //jQuery('.article_references').html(article_references);
                jQuery(document).on('click', '.downloadArticle', function() {
                    var downloadArt = article_uploads;
                    //window.location.assign("wasmsr.edu.ng/upload/" + downloadArt);
                    window.open("http://njem.edu/upload/" + downloadArt);

                    //alert(downloadArt);
                });

                // get the meta tag element
                var $keywords = $('meta[name="keywords"]');

                // get the current content of the meta tag
                var currentContent = $keywords.attr('content');

                // add a new keyword to the content
                var newContent = key_words;

                // update the content of the meta tag
                $keywords.attr('content', newContent);

                // get the meta tag element description
                var $keywords = $('meta[name="description"]');

                // get the current content of the meta tag
                var currentContent = $keywords.attr('content');

                // add a new keyword to the content
                var newContent = title;

                // update the content of the meta tag
                $keywords.attr('content', newContent);


                /* ******************************************
                Related Articles
                ******************************************* */
                //var currenTitle = title;
                var currenTitle = key_words;
                // var current_article = currenTitle.split(" ").slice(1, 5).join(" "); // get the first two words
                var current_article = currenTitle.split(" "); //.slice(1, 5).join(" "); // get the first two words
                //alert(current_article)
                jQuery.getJSON('../../api/read_allarticles.php', function(data) {
                    //var related_articles = [];
                    var related_articles = `<div>`

                    data.forEach(function(article) {
                        var article_key_words = article.key_words;
                        var article_title = article.title;
                        var urlTitle = article_title.split(' ').join('-');;


                        if (currenTitle === article_key_words) {
                            related_articles += `<p></p>`
                        } else {
                            var article_words = article_key_words.split(" ");

                            // check if at least two words from the current article title
                            // are present in the article title
                            var match_count = 0;
                            for (var i = 0; i < article_words.length; i++) {
                                if (current_article.includes(article_words[i])) {
                                    match_count++;
                                }
                                if (match_count >= 1) {
                                    related_articles += `<p><a href="http://njem.edu/articledetail/` + article.id + `/` + urlTitle + `" style="text-decoration: none; color: #333;">` + article_title + `</a></p>`
                                        //alert(article_title)
                                        //related_articles.push(article_title);
                                    break;
                                }
                            }
                        }

                    });
                    related_articles += `<div>`
                    jQuery('.relatedArticles').html(related_articles)
                        //console.log(related_articles);
                });

            })
        })





    }
})