jQuery(document).ready(function() {
    const headerCont = `<div class="row">
    <div class="col-sm-12 col-xs-12">
        <div class="tg-logoarea">
            <strong class="tg-logo"><a href="http://ajosie.edu/"><img src="http://ajosie.edu/images/logo.png" alt="image description"></a></strong>
            <div class="tg-addbox">
                <a href="javascript:void(0);"><img src="http://ajosie.edu/images/placeholder/add-01-770x90.jpg" alt="image description"></a>
            </div>
        </div>
        <div class="tg-navigationarea">
            <nav id="tg-nav" class="tg-nav">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#tg-navigation" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
                <div id="tg-navigation" class="collapse navbar-collapse tg-navigation">
                    <ul>
                        <!-- <li class="menu-item-has-children">
                            <a href="javascript:void(0);">Home</a>
                            <ul class="sub-menu">
                                <li><a href="http://ajosie.edu/">Home v1</a></li>
                                <li><a href="index2.html">Home v2</a></li>
                                <li><a href="index3.html">Home v3</a></li>
                                <li><a href="index4.html">Home v4</a></li>
                                <li><a href="index5.html">Home v5</a></li>
                            </ul>
                        </li> -->

                        <li><a href="http://ajosie.edu/">Home</a></li>
                        <li><a href="http://ajosie.edu/articles.html">Articles</a></li>
                        <li class="menu-item-has-children">
                            <a href="javascript:void(0);">For Authors</a>
                            <ul class="sub-menu">
                                <li><a href="http://ajosie.edu/">Authors Guidelines </a></li>
                                <li><a href="index2.html">Open Access Policy</a></li>
                                <li><a href="index3.html">Copy Right Policy/Peer Review</a></li>
                                <li><a href="index4.html">Ethics, Misconduct and Plagiarism </a></li>
                            </ul>
                        </li>
                        <li class="menu-item-has-children">
                            <a href="javascript:void(0);">Issues</a>
                            <ul class="sub-menu">
                                <li><a href="latestissues.html">Latest Issues </a></li>
                                <li><a href="allissues.html">All Issues</a></li>
                            </ul>
                        </li>
                        <li class="menu-item-has-children">
                            <a href="javascript:void(0);">About</a>
                            <ul class="sub-menu">
                                <li><a href="about.html">About Us</a></li>
                                <li><a href="editor-in-chief.html">Editor-in-Chief</a></li>
                                <li><a href="editorialboard.html">Editorial Board</a></li>
                            </ul>
                        </li>
                        <li class="menu-item-has-children">
                            
                        </li>
                        <!--<li class="menu-item-has-children current-menu-item">
                            <a href="#"><i class="fa fa-ellipsis-h"></i></a>
                            <ul class="sub-menu">
                                <li class="menu-item-has-children">
                                    <a href="#">Post Detail</a>
                                    <ul class="sub-menu">
                                        <li><a href="postdetail-numberreview.html">Post Detail</a></li>
                                        <li><a href="postdetail-percentagereview.html">Post Detail v1</a></li>
                                        <li class="current-menu-item"><a href="postdetail-starreview.html">Post Detail v2</a></li>
                                    </ul>
                                </li>
                                <li class="menu-item-has-children">
                                    <a href="#">Shop</a>
                                    <ul class="sub-menu">
                                        <li><a href="productgrid.html">Shop Grid</a></li>
                                        <li><a href="productsingle-leftsidebar.html">Shop Detail v1</a></li>
                                        <li><a href="productsingle-rightsidebar.html">Shop Detail v2</a></li>
                                        <li><a href="productsingle.html">Shop Detail v3</a></li>
                                    </ul>
                                </li>
                                <li><a href="author-detail.html">Author Detail</a></li>
                                <li><a href="contactus.html">Contact Us</a></li>
                                <li><a href="404error.html">404 Error</a></li>
                                <li><a href="commingsoon.html">Comming Soon</a></li>
                            </ul>
                        </li>-->
                    </ul>
                </div>
            </nav>
            <a id="tg-btnsearchtoggle" class="tg-btnsearchtoggle" href="#tg-search"><i class="lnr lnr-magnifier"></i></a>
        </div>
    </div>
</div>`;
    jQuery('.headContainer').html(headerCont);

    const footerCont = `<div class="tg-newsletter">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-5 col-lg-4">
                <div class="tg-borderleft">
                    <span>Singup for Free!</span>
                    <h3>Get Amazing &amp; New Information.</h3>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-7 col-lg-8">
                <form class="tg-formtheme tg-formnewsletter">
                    <fieldset>
                        <div class="form-group">
                            <input type="text" class="form-control" name="yourname" placeholder="Your Name">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" name="yourname" placeholder="Your Name">
                        </div>
                        <button type="submit" class="tg-btn">Signup Now</button>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</div>
<div class="tg-threecolumns">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                <div class="tg-column">
                    <div class="tg-widget tg-widgetaboutus">
                        <figure><img src="http://ajosie.edu/images/img-01.jpg" alt="image description"></figure>
                        <h3>The Journal</h3>
                        <div class="tg-description">
                            <p>The Journal covers a wide range of interests and concerns in education and related field of humanities and social sciences. It is a professional peer-reviewed journal that is published biannually by the Faculty of Education, University of Benin, Benin City, Nigeria.</p>
                        </div>
                        <ul class="tg-socialicons">
                            <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                            <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                            <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
                            <li><a href="#"><i class="fa fa-pinterest-p"></i></a></li>
                            <li><a href="#"><i class="fa fa-instagram"></i></a></li>
                        </ul>
                        <div class="tg-btnbox">
                            <a class="tg-btn" href="javascript:void(0);">Contact Now</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                <div class="tg-column">
                    <div class="tg-widget tg-widgetcategories">
                        <div class="tg-widgettitle">
                            <h3>Issues</h3>
                        </div>
                        <div class="tg-widgetcontent issuesV">
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                <div class="tg-column">
                    <div class="tg-widget tg-widgettrendingposts">
                        <div class="tg-widgettitle">
                            <h3>Latest Articles</h3>
                        </div>
                        <div class="tg-widgetcontent Farticle">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="tg-footerbar">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <strong class="tg-logo"><a href="javascript:void(0);"><img src="http://ajosie.edu/images/logo2.png" alt="image description"></a></strong>
                <div class="tg-copyrightbox">
                    <span>&copy; 2024 - AJOSIE. All  Rights Reserved</span>
                    <ul>
                        <li><a href="javascript:void(0);">Disclaimer</a></li>
                        <li><a href="javascript:void(0);">Privacy</a></li>
                        <li><a href="javascript:void(0);">Advertisement</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>`;
    jQuery('.footerContainer').html(footerCont);

    const sideCont = `<aside id="tg-sidebar" class="tg-sidebar">
    <div class="tg-widget tg-widgetsearch">
        <div class="tg-widgettitle">
            <h3>Start Search Here</h3>
        </div>
        <div class="tg-widgetcontent">
            <form class="tg-formtheme">
                <fieldset>
                    <div class="form-group">
                        <input type="search" name="search" class="form-control" placeholder="Search Here">
                    </div>
                    <!--<button class="tg-btn" type="submit">Search</button> -->
                </fieldset>
            </form>
        </div>
    </div>
    <div class="tg-widget tg-widgetlatestposts">
        <div class="tg-widgettitle">
            <h3>RELATED ARTICLES</h3>
        </div>
        <div class="tg-widgetcontent">
            <div class="tg-postmargin">
                <article class="tg-post">
                    <!--<figure class="tg-postimg">
                        <img src="http://ajosie.edu/images/postimg/img-41.jpg" alt="image description">
                        <a class="tg-btnview" href="#">view</a>
                    </figure>-->
                    <div class="tg-postcontent">
                        <div class="tg-borderleft">
                            <!--<ul class="tg-posttags">
                                <li><a href="javascript:void(0);">Lifestyle</a></li>
                            </ul>-->
                            <div class="tg-posttitle relatedArticles">
                                
                            </div>
                        </div>
                    </div>
                </article>
                <!--<article class="tg-post">
                    <figure class="tg-postimg">
                        <img src="http://ajosie.edu/images/postimg/img-42.jpg" alt="image description">
                        <a class="tg-btnview" href="#">view</a>
                    </figure>
                    <div class="tg-postcontent">
                        <div class="tg-borderleft">
                            <ul class="tg-posttags">
                                <li><a href="javascript:void(0);">Fashion</a></li>
                            </ul>
                            <div class="tg-posttitle">
                                <h3><a href="javascript:void(0);">2017 Cross Lock Collection</a></h3>
                            </div>
                        </div>
                    </div>
                </article>
                <article class="tg-post">
                    <figure class="tg-postimg">
                        <img src="http://ajosie.edu/images/postimg/img-43.jpg" alt="image description">
                        <a class="tg-btnview" href="#">view</a>
                    </figure>
                    <div class="tg-postcontent">
                        <div class="tg-borderleft">
                            <ul class="tg-posttags">
                                <li><a href="javascript:void(0);">Travel</a></li>
                            </ul>
                            <div class="tg-posttitle">
                                <h3><a href="javascript:void(0);">Going Out of the World is Not Easy Now!</a></h3>
                            </div>
                        </div>
                    </div>
                </article>
                <article class="tg-post">
                    <figure class="tg-postimg">
                        <img src="http://ajosie.edu/images/postimg/img-44.jpg" alt="image description">
                        <a class="tg-btnview" href="#">view</a>
                    </figure>
                    <div class="tg-postcontent">
                        <div class="tg-borderleft">
                            <ul class="tg-posttags">
                                <li><a href="javascript:void(0);">Gif</a></li>
                                <li><a href="javascript:void(0);">Sports</a></li>
                            </ul>
                            <div class="tg-posttitle">
                                <h3><a href="javascript:void(0);">YRB Concept Motobike</a></h3>
                            </div>
                        </div>
                    </div>
                </article>-->
            </div>
        </div>
    </div>
    <div class="tg-widget">
        <div class="tg-addbox">
            <span>- GUIDELINES -</span>
            <a href="javascript:void(0);"><img src="http://ajosie.edu/images/placeholder/add-02-300x250.jpg" alt="image description"></a>
           
        </div>
    </div>
    <div class="tg-widget tg-widgetcategories">
        <div class="tg-widgettitle">
            <h3>Notice Board</h3>
        </div>
        <div class="tg-widgetcontent">
            <!--<ul>
                <li><a href="javascript:void(0);"><span>Funny</span>28245</a></li>
                <li><a href="javascript:void(0);"><span>Sports</span>4856</a></li>
                <li><a href="javascript:void(0);"><span>DIY</span>8654</a></li>
                <li><a href="javascript:void(0);"><span>Fashion</span>6247</a></li>
                <li><a href="javascript:void(0);"><span>Travel</span>888654</a></li>
                <li><a href="javascript:void(0);"><span>Lifestyle</span>873144</a></li>
                <li><a href="javascript:void(0);"><span>Gifs</span>873144</a></li>
                <li><a href="javascript:void(0);"><span>Video</span>18465</a></li>
                <li><a href="javascript:void(0);"><span>Gadgets</span>3148</a></li>
                <li><a href="javascript:void(0);"><span>Audio</span>77531</a></li>
                <li><a href="javascript:void(0);"><span>All</span>9247</a></li>
            </ul>-->
        </div>
    </div>
    <!--<div class="tg-widget tg-widgetfacebook">
        <div class="tg-widgetcontent">
            <img src="http://ajosie.edu/images/placeholder/placeholder-01.jpg" alt="image description">
        </div>
    </div>-->
    <!--<div class="tg-widget tg-widgetstayconnected">
        <div class="tg-widgettitle">
            <h3>Stay Connected</h3>
        </div>
        <div class="tg-widgetcontent">
            <ul>
                <li class="tg-facebook">
                    <a href="javascript:void(0);">
                        <i class="fa fa-facebook"></i>
                        <span>15.4K Fans</span>
                        <em>LIKE</em>
                    </a>
                </li>
                <li class="tg-twitter">
                    <a href="javascript:void(0);">
                        <i class="fa fa-twitter"></i>
                        <span>11.2K Followers</span>
                        <em>Follow</em>
                    </a>
                </li>
                <li class="tg-youtubeplay">
                    <a href="javascript:void(0);">
                        <i class="fa fa-youtube-play"></i>
                        <span>29.8K Subscribers</span>
                        <em>Subcribe</em>
                    </a>
                </li>
                <li class="tg-linkedin">
                    <a href="javascript:void(0);">
                        <i class="fa fa-linkedin"></i>
                        <span>22.4K Subscribers</span>
                        <em>Subcribe</em>
                    </a>
                </li>
            </ul>
        </div>
    </div>-->
    <div class="tg-widget tg-widgetnewsletter">
        <div class="tg-widgettitle">
            <!--<h3>Keywords</h3>-->
            <button class="tg-btn" style="margin-bottom: 2px; width: 19em;">Keywords</button>
        </div>
        <div class="tg-widgetcontent artKeywords">
            <!--<div class="tg-description">
                <p>Consectetur adipisicing elit sed eiusmod tempor incididunt labore.</p>
            </div>
            <form class="tg-formtheme">
                <fieldset>
                    <div class="form-group">
                        <input type="text" name="yourname" class="form-control" placeholder="Your Name">
                    </div>
                    <div class="form-group">
                        <input type="email" name="youremail" class="form-control" placeholder="Your Email">
                    </div>
                    <button class="tg-btn" type="submit">send</button>
                </fieldset>
            </form>-->
        </div>
    </div>
    <!--<div class="tg-widget tg-widgettrendingposts">
        <div class="tg-widgettitle">
            <h3>Trending Posts</h3>
        </div>
        <div class="tg-widgetcontent">
            <ul>
                <li>
                    <figure>
                        <a href="#"><img src="http://ajosie.edu/images/thumbnail/img-01.jpg" alt="image description"></a>
                        <a class="tg-btnview" href="#"></a>
                    </figure>
                    <div class="tg-trendingpostcontent">
                        <h4><a href="#">Buckle Up For Your Next Adventure</a></h4>
                        <time datetime="2016-02-02">April 27, 2017</time>
                        <span class="tg-postviews">2.4K Views</span>
                    </div>
                </li>
                <li>
                    <figure>
                        <a href="#"><img src="http://ajosie.edu/images/thumbnail/img-02.jpg" alt="image description"></a>
                        <a class="tg-btnview" href="#"></a>
                    </figure>
                    <div class="tg-trendingpostcontent">
                        <h4><a href="#">Buckle Up For Your Next Adventure</a></h4>
                        <time datetime="2016-02-02">April 27, 2017</time>
                        <span class="tg-postviews">2.4K Views</span>
                    </div>
                </li>
                <li>
                    <figure>
                        <a href="#"><img src="http://ajosie.edu/images/thumbnail/img-03.jpg" alt="image description"></a>
                        <a class="tg-btnview" href="#"></a>
                    </figure>
                    <div class="tg-trendingpostcontent">
                        <h4><a href="#">Buckle Up For Your Next Adventure</a></h4>
                        <time datetime="2016-02-02">April 27, 2017</time>
                        <span class="tg-postviews">2.4K Views</span>
                    </div>
                </li>
                <li>
                    <figure>
                        <a href="#"><img src="http://ajosie.edu/images/thumbnail/img-04.jpg" alt="image description"></a>
                        <a class="tg-btnview" href="#"></a>
                    </figure>
                    <div class="tg-trendingpostcontent">
                        <h4><a href="#">Buckle Up For Your Next Adventure</a></h4>
                        <time datetime="2016-02-02">April 27, 2017</time>
                        <span class="tg-postviews">2.4K Views</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>-->
    <!--<div class="tg-widget tg-widgetinstagram">
        <div class="tg-widgettitle">
            <h3>Instagram</h3>
        </div>
        <div class="tg-widgetcontent">
            <div class="tg-instagramgallery">
                <ul>
                    <li>
                        <figure>
                            <a href="images/instagram/small/img-01.jpg" data-rel="prettyPhoto[instagram]"><img src="http://ajosie.edu/images/instagram/small/img-01.jpg" alt="image description"></a>
                            <span class="tg-instagramlike">50,134</span>
                        </figure>
                    </li>
                    <li>
                        <figure>
                            <a href="images/instagram/small/img-02.jpg" data-rel="prettyPhoto[instagram]"><img src="http://ajosie.edu/images/instagram/small/img-02.jpg" alt="image description"></a>
                            <span class="tg-instagramlike">50,134</span>
                        </figure>
                    </li>
                    <li>
                        <figure>
                            <a href="images/instagram/small/img-03.jpg" data-rel="prettyPhoto[instagram]"><img src="http://ajosie.edu/images/instagram/small/img-03.jpg" alt="image description"></a>
                            <span class="tg-instagramlike">50,134</span>
                        </figure>
                    </li>
                    <li>
                        <figure>
                            <a href="images/instagram/small/img-04.jpg" data-rel="prettyPhoto[instagram]"><img src="http://ajosie.edu/images/instagram/small/img-04.jpg" alt="image description"></a>
                            <span class="tg-instagramlike">50,134</span>
                        </figure>
                    </li>
                    <li>
                        <figure>
                            <a href="images/instagram/small/img-05.jpg" data-rel="prettyPhoto[instagram]"><img src="http://ajosie.edu/images/instagram/small/img-05.jpg" alt="image description"></a>
                            <span class="tg-instagramlike">50,134</span>
                        </figure>
                    </li>
                    <li>
                        <figure>
                            <a href="images/instagram/small/img-06.jpg" data-rel="prettyPhoto[instagram]"><img src="http://ajosie.edu/images/instagram/small/img-06.jpg" alt="image description"></a>
                            <span class="tg-instagramlike">50,134</span>
                        </figure>
                    </li>
                    <li>
                        <figure>
                            <a href="images/instagram/small/img-07.jpg" data-rel="prettyPhoto[instagram]"><img src="http://ajosie.edu/images/instagram/small/img-07.jpg" alt="image description"></a>
                            <span class="tg-instagramlike">50,134</span>
                        </figure>
                    </li>
                    <li>
                        <figure>
                            <a href="images/instagram/small/img-08.jpg" data-rel="prettyPhoto[instagram]"><img src="http://ajosie.edu/images/instagram/small/img-08.jpg" alt="image description"></a>
                            <span class="tg-instagramlike">50,134</span>
                        </figure>
                    </li>
                    <li>
                        <figure>
                            <a href="images/instagram/small/img-09.jpg" data-rel="prettyPhoto[instagram]"><img src="http://ajosie.edu/images/instagram/small/img-09.jpg" alt="image description"></a>
                            <span class="tg-instagramlike">50,134</span>
                        </figure>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="tg-widget tg-widgettrendingposts">
        <div class="tg-widgettitle">
            <h3>Video Posts</h3>
        </div>
        <div class="tg-widgetcontent">
            <ul>
                <li>
                    <figure>
                        <a href="javascript:void(0);"><img src="http://ajosie.edu/images/thumbnail/img-01.jpg" alt="image description"></a>
                        <a class="tg-btnplayvideo" href="javascript:void(0);"><i class="fa fa-play"></i></a>
                    </figure>
                    <div class="tg-trendingpostcontent">
                        <h4><a href="#">Buckle Up For Your Next Adventure</a></h4>
                        <time datetime="2016-02-02">April 27, 2017</time>
                        <span class="tg-postviews">2.4K Views</span>
                    </div>
                </li>
                <li>
                    <figure>
                        <a href="javascript:void(0);"><img src="http://ajosie.edu/images/thumbnail/img-02.jpg" alt="image description"></a>
                        <a class="tg-btnplayvideo" href="javascript:void(0);"><i class="fa fa-play"></i></a>
                    </figure>
                    <div class="tg-trendingpostcontent">
                        <h4><a href="#">Buckle Up For Your Next Adventure</a></h4>
                        <time datetime="2024-01-10">2024</time>
                        <span class="tg-postviews">2.4K Views</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>-->
</aside>`;
    jQuery('.sideContainer').html(sideCont);

    jQuery.get("../../api/read_volumes.php", function(messages) {
        var recentIssues = ` <ul>`;
        var count = 0; // Counter to track the number of displayed items
        jQuery.each(messages, function(i, message) {
            if (count < 10) { // Display only four items
                var volId = message.id;
                var vol_issue = message.volume;
                var vol_year = message.vol_year;
                recentIssues += `<li><a href="javascript:void(0);"><span>` + vol_issue + `" "` + vol_year + `</span></a></li>`;
                count++; // Increment the counter
            } else {
                return false; // Exit the loop if four items have been displayed
            }
        })
        recentIssues += `<li><a href="javascript:void(0);"><span>View all</span></a></li>`;
        recentIssues += `</ul>`;
        jQuery('.issuesV').html(recentIssues);
    })

    jQuery.get("../../api/read_latest_vol.php", function(messages) {
        //var recentIssues = `<div class="allissues">`;
        jQuery.each(messages, function(i, message) {
            var volId = message.id;
            var vol_issue = message.volume;
            var vol_year = message.vol_year;
            jQuery.get("../../api/read_articles_by_vol.php?volume=" + vol_issue, function(messages) {
                var articleTit = '<div>';
                var count = 0; // Counter to track the number of displayed items
                jQuery.each(messages, function(i, message) {
                    if (count < 4) { // Display only four items
                        var title = message.title;
                        var id = message.id;
                        articleTit += '<ul>' +
                            '<li>' +
                            '<div class="tg-trendingpostcontent">' +
                            '<h6><a href="articledetail/' + id + '/' + title + '">' + title + '</a></h6>' +
                            '</div>' +
                            '</li>' +
                            '</ul>';
                        count++; // Increment the counter
                    } else {
                        return false; // Exit the loop if four items have been displayed
                    }
                });
                articleTit += '<ul><li><a href="articles.html">View All</a></li></ul>'; // "View All" link
                articleTit += '</div>';
                jQuery('.Farticle').html(articleTit);
            }, "json");

        })
    })
})