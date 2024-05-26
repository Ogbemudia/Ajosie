<?php
class Post
{
    //db link
    private $conn;
    private $articles_table     = 'articles';
    private $roles_table        = 'roles';
    private $logs_table         = 'logs';
    private $issues_table       = 'issues';
    private $volumes_table      = 'volumes';
    private $userlogin_table    = 'userlogin';
    
    //post properties
    public $article_uploads;
    public $filename;
    public $file;
    public $size;
    public $img;
    public $id;
    public $title;
    public $article_code;
    public $abstract;
    public $created;
    public $doi;
    public $date_recieved;
    public $date_accepted;
    public $volume;
    public $vol_year;
    public $issue;
    public $uploaded_by;
    public $date_published;
    public $no_downloads;
    public $year_of_publication;
    public $month_of_publication;
    public $page_range;
    public $last_updated;
    public $last_login;
    public $failed_atempt;
    public $fullname;
    public $key_words;
    public $article_references;
    public $authors=array();
    public $email;
    public $phone;
    public $role;
    public $pass;
    public $event_date;
    public $event;
    public $sex;
    public $status;

   

    //constructor with db connection
    public function __construct($db)
    {
        $this->conn=$db;
    }

     

/******** **** **** **** **** ************ **** **** **** **** ****   upload img  ******** **** **** **** **** ******** **** **** **** **** ********/
public function upload(){
   
 
    /* Location */
    $this->location = "../upload/" . $this->filename;
    $this->imgFileType = pathinfo($this->location, PATHINFO_EXTENSION);
    $this->imgFileType = strtolower($this->imgFileType);

    
       /* Upload file */
        if (move_uploaded_file($this->file, $this->location)) {
            return true;
        }
        //printf("Error %s. \n", $stmt->error);
        return false;
}

/*** download articles ***/
public function download_article(){
    $query= 'SELECT
    id,
    date_published,
    article_uploads
    FROM '.$this->articles_table.' 
    WHERE date_published = ? LIMIT 1';
    

    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(1, $this->date_published);
    //execute
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $this->date_published         = $row['date_published'];
    $this->article_uploads        = $row['article_uploads'];
    $this->id                     = $row['id'];
    
    
    }

    /***********************************update no_downloads */
    public function update_no_downloads(){
                  
        //update no_downloads
        $query = 'UPDATE '. $this->articles_table . " SET 
        no_downloads           =  :no_downloads
        WHERE id          =  :id";
        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->no_downloads        = htmlspecialchars(strip_tags($this->no_downloads));
        $this->volume     = htmlspecialchars(strip_tags($this->volume));
        
        //binding param
        $stmt->bindParam(':no_downloads', $this->no_downloads);
        $stmt->bindParam(':id', $this->id);
        
        //execute
        if($stmt->execute()){
           return true; 
       }
       //error
       printf("Error %s. \n", $stmt->error);
       return false;
   }

/******** **** **** **** **** ************ **** **** **** **** ****   articles  ******** **** **** **** **** ******** **** **** **** **** ********/
    /*** create articles ***/
    public function articles(){
    $this->authors= implode(',', $this->authors);
         //create query
         $query = 'INSERT INTO '. $this->articles_table . " SET 
         title                  =  :title,
         abstract               =  :abstract,
         doi                    =  :doi,
         article_code           =  :article_code,
         article_uploads        =  :article_uploads,
         size                   =  :size,
         date_recieved          =  :date_recieved,
         date_accepted          =  :date_accepted,
         year_of_publication	=  :year_of_publication,
         month_of_publication	=  :month_of_publication,
         uploaded_by            =  :uploaded_by,
         created                =  :created,
         date_published         =  :date_published,
         issue                  =  :issue,
         page_range             =  :page_range,
         volume                 =  :volume,
         authors                =  :authors,
         status                 =  :status,
         article_references     =  :article_references,
         key_words              =  :key_words";
         $stmt = $this->conn->prepare($query);
        
        
         //clean data
         $this->title               = htmlspecialchars(strip_tags($this->title));
         $this->abstract            = htmlspecialchars(strip_tags($this->abstract));
         $this->doi                 = htmlspecialchars(strip_tags($this->doi));
         $this->date_recieved       = htmlspecialchars(strip_tags($this->date_recieved));
         $this->date_accepted       = htmlspecialchars(strip_tags($this->date_accepted));
         $this->article_uploads     = htmlspecialchars(strip_tags($this->article_uploads));
         $this->size                = htmlspecialchars(strip_tags($this->size));
         $this->year_of_publication = htmlspecialchars(strip_tags($this->year_of_publication));
         $this->month_of_publication= htmlspecialchars(strip_tags($this->month_of_publication));
         $this->authors             = (strip_tags($this->authors));
         //$this->authors             = $stmt ->real_escape_string($this->authors);
         $this->article_code        = htmlspecialchars(strip_tags($this->article_code));
         $this->uploaded_by         = htmlspecialchars(strip_tags($this->uploaded_by));
         $this->created             = htmlspecialchars(strip_tags($this->created));
         $this->date_published      = htmlspecialchars(strip_tags($this->date_published));
         $this->issue               = htmlspecialchars(strip_tags($this->issue));
         $this->page_range          = htmlspecialchars(strip_tags($this->page_range));
         $this->volume              = htmlspecialchars(strip_tags($this->volume));
         $this->status              = htmlspecialchars(strip_tags($this->status));
         $this->article_references  = htmlspecialchars(strip_tags($this->article_references));
         $this->key_words           = htmlspecialchars(strip_tags($this->key_words));

         //$this->authors             = mysqli_real_escape_string($this->authors);


         //binding param
         $stmt->bindParam(':title', $this->title);
         $stmt->bindParam(':abstract', $this->abstract);
         $stmt->bindParam(':doi', $this->doi);
         $stmt->bindParam(':date_recieved', $this->date_recieved);
         $stmt->bindParam(':date_accepted', $this->date_accepted);
         $stmt->bindParam(':article_uploads', $this->article_uploads);
         $stmt->bindParam(':size', $this->size);
         $stmt->bindParam(':year_of_publication', $this->year_of_publication);
         $stmt->bindParam(':month_of_publication', $this->month_of_publication);
         $stmt->bindParam(':authors', $this->authors);
         $stmt->bindParam(':article_code', $this->article_code);
         $stmt->bindParam(':uploaded_by', $this->uploaded_by);
         $stmt->bindParam(':created', $this->created);
         $stmt->bindParam(':date_published', $this->date_published);
         $stmt->bindParam(':issue', $this->issue);
         $stmt->bindParam(':page_range', $this->page_range);
         $stmt->bindParam(':volume', $this->volume);
         $stmt->bindParam(':status', $this->status);
         $stmt->bindParam(':article_references', $this->article_references);
         $stmt->bindParam(':key_words', $this->key_words);
         //$stmt .= implode(',', $this->authors);
         //execute
         if($stmt->execute()){
            return true; 
        }
        //error
        printf("Error %s. \n", $stmt->error);
        return false;
    }

/*** read articles ***/
    public function read_articles(){
        
        //create query
        $query = 'SELECT
        b.id,
        b.title,
        b.abstract,
        b.doi,
        b.date_recieved,
        b.date_accepted,
        b.article_uploads,
        b.size,
        b.year_of_publication,
        b.month_of_publication,
        b.authors,
        b.article_code,
        b.uploaded_by,
        b.created,
        b.date_published,
        b.issue,
        b.no_downloads,
        b.page_range,
        b.volume,
        b.status,
        b.key_words,
        b.article_references,
        b.last_updated
        FROM '.$this->articles_table.' b
        ORDER BY b.year_of_publication ASC, b.month_of_publication ASC, b.page_range ASC';

    //prepare statement
    $stmt = $this->conn->prepare($query);
    //execute query
    $stmt->execute();
    return $stmt; 
    }

    /*** read all articles ***/
    public function read_allarticles(){
        //create query
        $query = 'SELECT
        b.id,
        b.title,
        b.abstract,
        b.doi,
        b.date_recieved,
        b.date_accepted,
        b.article_uploads,
        b.size,
        b.year_of_publication,
        b.month_of_publication,
        b.authors,
        b.date_published,
        b.issue,
        b.page_range,
        b.volume,
        b.status,
        b.article_references,
        b.key_words,
        FROM '.$this->articles_table.' b
        ORDER BY b.date_published DESC b.page_range DESC';

    //prepare statement
    $stmt = $this->conn->prepare($query);
    //execute query
    $stmt->execute();
    return $stmt; 
    }
//////////////////////////
/*** read recent no_downloads ***/
/* public function read_no_downloads(){
    //create query
    $query = 'SELECT
    b.id,
    b.title,
    b.abstract,
    b.doi,
    b.date_recieved,
    b.date_accepted,
    b.date_published,
    b.issue,
    b.pages,
    b.no_downloads
    FROM '.$this->articles_table.' b
    ORDER BY b.no_downloads DESC';

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
} */
     /*** read single articles ***/
     public function read_singlearticle(){
        $query= 'SELECT
         b.id,
        b.title,
        b.abstract,
        b.doi,
        b.date_recieved,
        b.date_accepted,
        b.article_uploads,
        b.year_of_publication,
        b.month_of_publication,
        b.authors,
        b.date_published,
        b.issue,
        b.page_range,
        b.volume,
        b.status,
        b.article_references,
        b.size,
        b.key_words
        FROM '.$this->articles_table.' b 
        WHERE id = ? LIMIT 1';
        

        //prepare statement
        /* $stmt = $this->conn->prepare($query);
        //binding param
        $stmt->bindParam(1, $this->id);
        //execute
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC); */
        $stmt = $this->conn->prepare($query);
        //binding param
        $stmt->bindParam(1, $this->id);
        //execute
        $stmt->execute();
        return $stmt; 
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->id                   = $row['id'];
        $this->title                = $row['title'];
        $this->abstract             = $row['abstract'];
        $this->doi                  = $row['doi'];
        $this->date_recieved        = $row['date_recieved'];
        $this->date_accepted        = $row['date_accepted'];
        $this->article_uploads      = $row['article_uploads'];
        $this->year_of_publication  = $row['year_of_publication'];
        $this->month_of_publication = $row['month_of_publication'];
        $this->authors              = $row['authors'];
        $this->date_published       = $row['date_published'];
        $this->issue                = $row['issue'];
        $this->page_range           = $row['page_range'];
        $this->volume               = $row['volume'];
        $this->status               = $row['status'];
        $this->size                 = $row['size'];
        $this->article_references   = $row['article_references'];
        $this->key_words            = $row['key_words'];
        
        }

        /*** read complete single articles ***/
     public function read_comsinglearticle(){
        $query= 'SELECT
        b.id,
        b.title,
        b.abstract,
        b.doi,
        b.date_recieved,
        b.date_accepted,
        b.article_uploads,
        b.size,
        b.year_of_publication,
        b.month_of_publication,
        b.authors,
        b.article_code,
        b.uploaded_by,
        b.created,
        b.date_published,
        b.issue,
        b.no_downloads,
        b.page_range,
        b.volume,
        b.status,
        b.article_references,
        b.key_words,
        b.last_updated
        FROM '.$this->articles_table.' 
        WHERE id = ? LIMIT 1';
        

        //prepare statement
        $stmt = $this->conn->prepare($query);
        //binding param
        $stmt->bindParam(1, $this->id);
        //execute
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->id                   = $row['id'];
        $this->title                = $row['title'];
        $this->abstract             = $row['abstract'];
        $this->doi                  = $row['doi'];
        $this->date_recieved        = $row['date_recieved'];
        $this->date_accepted        = $row['date_accepted'];
        $this->article_uploads      = $row['article_uploads'];
        $this->size                 = $row['size'];
        $this->year_of_publication  = $row['year_of_publication'];
        $this->month_of_publication = $row['month_of_publication'];
        $this->authors              = $row['authors'];
        $this->article_code                 = $row['article_code'];
        $this->uploaded_by          = $row['uploaded_by'];
        $this->created              = $row['created'];
        $this->date_published       = $row['date_published'];
        $this->issue                = $row['issue'];
        $this->no_downloads         = $row['no_downloads'];
        $this->page_range           = $row['page_range'];
        $this->volume               = $row['volume'];
        $this->status               = $row['status'];
        $this->article_references   = $row['article_references'];
        $this->key_words            = $row['key_words'];
        $this->last_updated         = $row['last_updated'];
        
        }

        /*** read by article title ***/
     public function read_articlebytitle(){
        $query= 'SELECT
        b.id,
        b.title,
        b.abstract,
        b.doi,
        b.date_recieved,
        b.date_accepted,
        b.article_uploads,
        b.year_of_publication,
        b.month_of_publication,
        b.authors,
        b.date_published,
        b.issue,
        b.page_range,
        b.volume,
        b.status,
        b.article_references,
        b.size,
        b.key_words
        FROM '.$this->articles_table.' b 
        WHERE b.title = ?';
        

       /*  //prepare statement
        $stmt = $this->conn->prepare($query);
        //binding param
        $stmt->bindParam(1, $this->id);
        //execute
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC); */
        //prepare statement
        $stmt = $this->conn->prepare($query);
        //binding param
        $stmt->bindParam(1, $this->id);
        //execute
        $stmt->execute();
        return $stmt; 
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->id                   = $row['id'];
        $this->title                = $row['title'];
        $this->abstract             = $row['abstract'];
        $this->doi                  = $row['doi'];
        $this->date_recieved        = $row['date_recieved'];
        $this->date_accepted        = $row['date_accepted'];
        $this->article_uploads      = $row['article_uploads'];
        $this->year_of_publication  = $row['year_of_publication'];
        $this->month_of_publication = $row['month_of_publication'];
        $this->authors              = $row['authors'];
        $this->date_published       = $row['date_published'];
        $this->issue                = $row['issue'];
        $this->page_range           = $row['page_range'];
        $this->volume               = $row['volume'];
        $this->status               = $row['status'];
        $this->size                 = $row['size'];
        $this->article_references   = $row['article_references'];
        $this->key_words            = $row['key_words'];
        
        }

        /*** read by date_recieved ***/
     /* public function read_catarticle(){
        $query= 'SELECT
        b.id,
        b.title,
        b.abstract,
        b.doi,
        b.date_recieved,
        b.date_accepted,
        b.date_published,
        b.issue,
        b.pages,
        b.no_downloads
        FROM '.$this->articles_table.' b
        WHERE b.date_recieved = ?';
        

        //prepare statement
        $stmt = $this->conn->prepare($query);
        //binding param
        $stmt->bindParam(1, $this->id);
        //execute
        $stmt->execute();
        return $stmt; 
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->id             = $row['id'];
        $this->title          = $row['title'];
        $this->abstract       = $row['abstract'];
        $this->doi   = $row['doi'];
        $this->date_recieved       = $row['date_recieved'];
        $this->date_accepted     = $row['date_accepted'];
        $this->date_published           = $row['date_published'];
        $this->issue        = $row['issue'];
        $this->pages        = $row['pages'];
        $this->no_downloads      = $row['no_downloads'];
        
        } */

        
        /*** read by article issue ***/
        public function read_articlebyissues(){
            $query= 'SELECT
            b.id,
            b.title,
            b.abstract,
            b.doi,
            b.date_recieved,
            b.date_accepted,
            b.article_uploads,
            b.year_of_publication,
            b.month_of_publication,
            b.authors,
            b.date_published,
            b.issue,
            b.page_range,
            b.volume,
            b.status,
            b.article_references,
            b.key_words
            FROM '.$this->articles_table.' b 
            WHERE b.issue = ?';
            
        
            //prepare statement
            $stmt = $this->conn->prepare($query);
            //binding param
            $stmt->bindParam(1, $this->id);
            //execute
            $stmt->execute();
        
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        }
        



     public function read_articlebyissue(){
        $query= 'SELECT
        b.id,
        b.title,
        b.abstract,
        b.doi,
        b.date_recieved,
        b.date_accepted,
        b.article_uploads,
        b.year_of_publication,
        b.month_of_publication,
        b.authors,
        b.date_published,
        b.issue,
        b.page_range,
        b.volume,
        b.status,
        b.article_references,
        b.key_words
        FROM '.$this->articles_table.' b 
        WHERE b.issue = ?';
        

       /*  //prepare statement
        $stmt = $this->conn->prepare($query);
        //binding param
        $stmt->bindParam(1, $this->id);
        //execute
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC); */
        //prepare statement
        $stmt = $this->conn->prepare($query);
        //binding param
        $stmt->bindParam(1, $this->id);
        //execute
        $stmt->execute();
        return $stmt; 
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->id                   = $row['id'];
        $this->title                = $row['title'];
        $this->abstract             = $row['abstract'];
        $this->doi                  = $row['doi'];
        $this->date_recieved        = $row['date_recieved'];
        $this->date_accepted        = $row['date_accepted'];
        $this->article_uploads      = $row['article_uploads'];
        $this->year_of_publication  = $row['year_of_publication'];
        $this->month_of_publication = $row['month_of_publication'];
        $this->authors              = $row['authors'];
        $this->date_published       = $row['date_published'];
        $this->issue                = $row['issue'];
        $this->page_range           = $row['page_range'];
        $this->volume               = $row['volume'];
        $this->status               = $row['status'];
        $this->article_references   = $row['article_references'];
        $this->key_words            = $row['key_words'];
        
        }

/*** read by article volume ***/
     public function read_articlebyvolume(){
        $query= 'SELECT
        b.id,
        b.title,
        b.abstract,
        b.doi,
        b.date_recieved,
        b.date_accepted,
        b.article_uploads,
        b.year_of_publication,
        b.month_of_publication,
        b.authors,
        b.date_published,
        b.issue,
        b.page_range,
        b.volume,
        b.status,
        b.article_references,
        b.key_words
        FROM '.$this->articles_table.' b 
        WHERE b.volume = ?
        ORDER BY b.page_range ASC';
        

       /*  //prepare statement
        $stmt = $this->conn->prepare($query);
        //binding param
        $stmt->bindParam(1, $this->id);
        //execute
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC); */
        //prepare statement
        $stmt = $this->conn->prepare($query);
        //binding param
        $stmt->bindParam(1, $this->id);
        //execute
        $stmt->execute();
        return $stmt; 
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->id                   = $row['id'];
        $this->title                = $row['title'];
        $this->abstract             = $row['abstract'];
        $this->doi                  = $row['doi'];
        $this->date_recieved        = $row['date_recieved'];
        $this->date_accepted        = $row['date_accepted'];
        $this->article_uploads      = $row['article_uploads'];
        $this->year_of_publication  = $row['year_of_publication'];
        $this->month_of_publication = $row['month_of_publication'];
        $this->authors              = $row['authors'];
        $this->date_published       = $row['date_published'];
        $this->issue                = $row['issue'];
        $this->page_range           = $row['page_range'];
        $this->volume               = $row['volume'];
        $this->status               = $row['status'];
        $this->article_references   = $row['article_references'];
        $this->key_words            = $row['key_words'];
        
        }

/*** read by article year_of_publication ***/
     public function read_articlebyyear_of_publication(){
        $query= 'SELECT
        b.id,
        b.title,
        b.abstract,
        b.doi,
        b.date_recieved,
        b.date_accepted,
        b.article_uploads,
        b.year_of_publication,
        b.month_of_publication,
        b.authors,
        b.date_published,
        b.issue,
        b.page_range,
        b.volume,
        b.status,
        b.article_references,
        b.key_words,
        FROM '.$this->articles_table.' 
        WHERE b.year_of_publication = ?
        ORDER BY b.page_range DESC';
        

        //prepare statement
        $stmt = $this->conn->prepare($query);
        //binding param
        $stmt->bindParam(1, $this->id);
        //execute
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->id                   = $row['id'];
        $this->title                = $row['title'];
        $this->abstract             = $row['abstract'];
        $this->doi                  = $row['doi'];
        $this->date_recieved        = $row['date_recieved'];
        $this->date_accepted        = $row['date_accepted'];
        $this->article_uploads      = $row['article_uploads'];
        $this->year_of_publication  = $row['year_of_publication'];
        $this->month_of_publication = $row['month_of_publication'];
        $this->authors              = $row['authors'];
        $this->date_published       = $row['date_published'];
        $this->issue                = $row['issue'];
        $this->page_range           = $row['page_range'];
        $this->volume               = $row['volume'];
        $this->status               = $row['status'];
        $this->article_references   = $row['article_references'];
        $this->key_words            = $row['key_words'];
        
        }

/*** read by article month_of_publication ***/
     public function read_articlebymonth_of_publication(){
        $query= 'SELECT
        b.id,
        b.title,
        b.abstract,
        b.doi,
        b.date_recieved,
        b.date_accepted,
        b.article_uploads,
        b.year_of_publication,
        b.month_of_publication,
        b.authors,
        b.date_published,
        b.issue,
        b.page_range,
        b.volume,
        b.status,
        b.article_references,
        b.key_words,
        FROM '.$this->articles_table.' 
        WHERE b.month_of_publication = ?
        ORDER BY b.page_range DESC';
        

        //prepare statement
        $stmt = $this->conn->prepare($query);
        //binding param
        $stmt->bindParam(1, $this->id);
        //execute
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->id                   = $row['id'];
        $this->title                = $row['title'];
        $this->abstract             = $row['abstract'];
        $this->doi                  = $row['doi'];
        $this->date_recieved        = $row['date_recieved'];
        $this->date_accepted        = $row['date_accepted'];
        $this->article_uploads      = $row['article_uploads'];
        $this->year_of_publication  = $row['year_of_publication'];
        $this->month_of_publication = $row['month_of_publication'];
        $this->authors              = $row['authors'];
        $this->date_published       = $row['date_published'];
        $this->issue                = $row['issue'];
        $this->page_range           = $row['page_range'];
        $this->volume               = $row['volume'];
        $this->status               = $row['status'];
        $this->article_references   = $row['article_references'];
        $this->key_words            = $row['key_words'];
        
        }
        
        /*** read by article month_of_publication ***/
     public function read_articlebykey_words(){
        $query= 'SELECT
        b.id,
        b.title,
        b.abstract,
        b.doi,
        b.date_recieved,
        b.date_accepted,
        b.article_uploads,
        b.year_of_publication,
        b.month_of_publication,
        b.authors,
        b.date_published,
        b.issue,
        b.page_range,
        b.volume,
        b.status,
        b.article_references,
        b.key_words,
        FROM '.$this->articles_table.' 
        WHERE b.key_words = ?';
        

        //prepare statement
        $stmt = $this->conn->prepare($query);
        //binding param
        $stmt->bindParam(1, $this->id);
        //execute
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->id                   = $row['id'];
        $this->title                = $row['title'];
        $this->abstract             = $row['abstract'];
        $this->doi                  = $row['doi'];
        $this->date_recieved        = $row['date_recieved'];
        $this->date_accepted        = $row['date_accepted'];
        $this->article_uploads      = $row['article_uploads'];
        $this->year_of_publication  = $row['year_of_publication'];
        $this->month_of_publication = $row['month_of_publication'];
        $this->authors              = $row['authors'];
        $this->date_published       = $row['date_published'];
        $this->issue                = $row['issue'];
        $this->page_range           = $row['page_range'];
        $this->volume               = $row['volume'];
        $this->status               = $row['status'];
        $this->article_references   = $row['article_references'];
        $this->key_words            = $row['key_words'];
        
        }
        
        /*** read by article month_of_publication ***/
     public function read_articleauthors(){
        $query= 'SELECT
        b.id,
        b.title,
        b.abstract,
        b.doi,
        b.date_recieved,
        b.date_accepted,
        b.article_uploads,
        b.year_of_publication,
        b.month_of_publication,
        b.authors,
        b.date_published,
        b.issue,
        b.page_range,
        b.volume,
        b.status,
        b.article_references,
        b.key_words,
        FROM '.$this->articles_table.' 
        WHERE b.authors = ?';
        

        //prepare statement
        $stmt = $this->conn->prepare($query);
        //binding param
        $stmt->bindParam(1, $this->id);
        //execute
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->id                   = $row['id'];
        $this->title                = $row['title'];
        $this->abstract             = $row['abstract'];
        $this->doi                  = $row['doi'];
        $this->date_recieved        = $row['date_recieved'];
        $this->date_accepted        = $row['date_accepted'];
        $this->article_uploads      = $row['article_uploads'];
        $this->year_of_publication  = $row['year_of_publication'];
        $this->month_of_publication = $row['month_of_publication'];
        $this->authors              = $row['authors'];
        $this->date_published       = $row['date_published'];
        $this->issue                = $row['issue'];
        $this->page_range           = $row['page_range'];
        $this->volume               = $row['volume'];
        $this->status               = $row['status'];
        $this->article_references   = $row['article_references'];
        $this->key_words            = $row['key_words'];
        
        }



    /*** update articles ***/
    public function update_articles(){
        $this->authors= implode(',', $this->authors);
                  
        //create query
        $query = 'UPDATE '. $this->articles_table . " SET 
         title                  =  :title,
         abstract               =  :abstract,
         doi                    =  :doi,
         article_uploads        =  :article_uploads,
         size                   =  :size,
         year_of_publication	=  :year_of_publication,
         month_of_publication	=  :month_of_publication,
         article_code           =  :article_code,
         uploaded_by            =  :uploaded_by,
         date_published         =  :date_published,
         issue                  =  :issue,
         page_range             =  :page_range,
         volume                 =  :volume,
         authors                =  :authors,
         status                 =  :status,
         article_references     =  :article_references,
         key_words              =  :key_words,
         last_updated            =  :last_updated
         WHERE id               =  :id";
        //prepare statement
        $stmt = $this->conn->prepare($query);

        

        //clean data
         $this->title               = htmlspecialchars(strip_tags($this->title));
         $this->abstract            = htmlspecialchars(strip_tags($this->abstract));
         $this->doi                 = htmlspecialchars(strip_tags($this->doi));
         $this->article_uploads     = htmlspecialchars(strip_tags($this->article_uploads));
         $this->size                = htmlspecialchars(strip_tags($this->size));
         $this->year_of_publication = htmlspecialchars(strip_tags($this->year_of_publication));
         $this->month_of_publication= htmlspecialchars(strip_tags($this->month_of_publication));
         $this->authors             = (strip_tags($this->authors));
         $this->article_code                = htmlspecialchars(strip_tags($this->article_code));
         $this->uploaded_by         = htmlspecialchars(strip_tags($this->uploaded_by));
         $this->date_published      = htmlspecialchars(strip_tags($this->date_published));
         $this->issue               = htmlspecialchars(strip_tags($this->issue));
         $this->page_range          = htmlspecialchars(strip_tags($this->page_range));
         $this->volume              = htmlspecialchars(strip_tags($this->volume));
         $this->status              = htmlspecialchars(strip_tags($this->status));
         $this->article_references  = htmlspecialchars(strip_tags($this->article_references));
         $this->key_words           = htmlspecialchars(strip_tags($this->key_words));
         $this->last_updated         = htmlspecialchars(strip_tags($this->last_updated));
         $this->id                  = htmlspecialchars(strip_tags($this->id));

        //binding param
         $stmt->bindParam(':title', $this->title);
         $stmt->bindParam(':abstract', $this->abstract);
         $stmt->bindParam(':doi', $this->doi);
         $stmt->bindParam(':article_uploads', $this->article_uploads);
         $stmt->bindParam(':size', $this->size);
         $stmt->bindParam(':year_of_publication', $this->year_of_publication);
         $stmt->bindParam(':month_of_publication', $this->month_of_publication);
         $stmt->bindParam(':authors', $this->authors);
         $stmt->bindParam(':article_code', $this->article_code);
         $stmt->bindParam(':uploaded_by', $this->uploaded_by);
         $stmt->bindParam(':date_published', $this->date_published);
         $stmt->bindParam(':issue', $this->issue);
         $stmt->bindParam(':page_range', $this->page_range);
         $stmt->bindParam(':volume', $this->volume);
         $stmt->bindParam(':status', $this->status);
         $stmt->bindParam(':article_references', $this->article_references);
         $stmt->bindParam(':key_words', $this->key_words);
         $stmt->bindParam(':last_updated', $this->last_updated);
         $stmt->bindParam(':id', $this->id);
        //execute
        if($stmt->execute()){
           return true; 
       }
       //error
       printf("Error %s. \n", $stmt->error);
       return false;
   }

   /*** update articles and img ***/
   public function update_articleupload(){
                  
    //create query
    $query = 'UPDATE '. $this->articles_table . " SET 
    article_uploads   =  :article_uploads,
    last_updated       =  :last_updated
    WHERE id          =  :id";
    //prepare statement
    $stmt = $this->conn->prepare($query);

    //clean data
    $this->article_uploads  = htmlspecialchars(strip_tags($this->article_uploads));
    $this->last_updated      = htmlspecialchars(strip_tags($this->last_updated));
    $this->id               = htmlspecialchars(strip_tags($this->id));

    //binding param
    $stmt->bindParam(':article_uploads', $this->article_uploads);
    $stmt->bindParam(':last_updated', $this->last_updated);
    $stmt->bindParam(':id', $this->id);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}


   /*** delete articles ***/
   public function delete_articles(){
                  
    //create query
    $query = 'DELETE FROM '. $this->articles_table . " WHERE id = :id";
    //prepare statement
    $stmt = $this->conn->prepare($query);

    //clean data
    $this->id      = htmlspecialchars(strip_tags($this->id));

    //binding param
    $stmt->bindParam(':id', $this->id);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}





/******** **** **** **** **** ************ **** **** **** **** ****   roles  ******** **** **** **** **** ******** **** **** **** **** ********/
   /****   create roles  ****/
   public function roles(){
   //create query
   $query = 'INSERT INTO '. $this->roles_table . " SET 
   role        =  :role,
   created     =  :created";
  
   //prepare statement
   $stmt = $this->conn->prepare($query);

   //clean data
   $this->role        = htmlspecialchars(strip_tags($this->role));
   $this->created     = htmlspecialchars(strip_tags($this->created));

   //binding param
   $stmt->bindParam(':role', $this->role);
   $stmt->bindParam(':created', $this->created);

   //execute
   if($stmt->execute()){
      return true; 
  }
  //error
  printf("Error %s. \n", $stmt->error);
  return false;
}

/*** read roles ***/
public function read_allrole(){
    //create query
    $query = 'SELECT
    r.id,
    r.role,
    r.last_updated,
    r.created
    
    FROM '.$this->roles_table.' r
    ORDER BY r.created DESC';

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}


 /*** read single role ***/
 public function read_singlerole(){
    $query= 'SELECT
     id,
     role   
     
    FROM '.$this->role_table.' 
    WHERE id = ? LIMIT 1';
    

    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(1, $this->id);
    //execute
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $this->id     = $row['id'];
    $this->role  = $row['role'];
    
       
    }

/*** update article_type ***/
public function update_role(){
              
    //create query
    $query = 'UPDATE '. $this->role_table . " SET 
    
    role            =  :role
    last_updated    =  :last_updated,
    WHERE id        =  :id";
    //prepare statement
    $stmt = $this->conn->prepare($query);

    //clean data
    $this->role         = htmlspecialchars(strip_tags($this->role));
    $this->last_updated = htmlspecialchars(strip_tags($this->last_updated));
    $this->id           = htmlspecialchars(strip_tags($this->id));

   //binding param
   $stmt->bindParam(':role', $this->role);
   $stmt->bindParam(':last_updated', $this->last_updated);
   $stmt->bindParam(':id', $this->id);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}



/*** delete article_type ***/
public function delete_role(){
              
//create query
$query = 'DELETE FROM '. $this->roles_table . " WHERE id = :id";
//prepare statement
$stmt = $this->conn->prepare($query);

//clean data
$this->id      = htmlspecialchars(strip_tags($this->id));

//binding param
$stmt->bindParam(':id', $this->id);
//execute
if($stmt->execute()){
   return true; 
}
//error
printf("Error %s. \n", $stmt->error);
return false;
}



/******** **** **** **** **** ************ **** **** **** **** ****   payment  ******** **** **** **** **** ******** **** **** **** **** ********/
 /****   create payment  ****/
/* public function payment(){
    //clean data
    $this->bank_logo     = htmlspecialchars(strip_tags($this->bank_logo));
    $this->bank_name     = htmlspecialchars(strip_tags($this->bank_name));
    $this->acc_number    = htmlspecialchars(strip_tags($this->acc_number));
    $this->acc_name      = htmlspecialchars(strip_tags($this->acc_name));
    $this->phone         = htmlspecialchars(strip_tags($this->phone));
    $this->created       = htmlspecialchars(strip_tags($this->created));
    $this->last_updated   = htmlspecialchars(strip_tags($this->last_updated));
    $this->uploaded_by    = htmlspecialchars(strip_tags($this->uploaded_by));
    
    //create query
    $query = 'INSERT INTO '.$this->payment_table.' SET
    bank_logo    = :bank_logo,
    bank_name    = :bank_name,
    acc_number   = :acc_number,
    acc_name     = :acc_name,
    phone        = :phone,
    created      = :created,
    last_updated  = :last_updated,
    uploaded_by   = :uploaded_by';
    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(':bank_logo', $this->bank_logo);
    $stmt->bindParam(':bank_name', $this->bank_name);
    $stmt->bindParam(':acc_number', $this->acc_number);
    $stmt->bindParam(':acc_name', $this->acc_name);
    $stmt->bindParam(':phone', $this->phone);
    $stmt->bindParam(':created', $this->created);
    $stmt->bindParam(':last_updated', $this->last_updated);
    $stmt->bindParam(':uploaded_by', $this->uploaded_by);
    //execute
    if($stmt->execute()){
       return true; 
   } 
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}*/

/*** read payment ***/
/* public function read_payment(){
    //create query
    $query = 'SELECT
    p.id,
    p.bank_logo,
    p.bank_name,
    p.acc_number,
    p.acc_name,
    p.phone,
    p.last_updated,
    p.created
    
    FROM '.$this->payment_table.' p
    ORDER BY p.created DESC';
    //$this->conn->quote($this->payment_table);

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
} */

/*** read all payment ***/
/* public function read_allpayment(){
    //create query
    $query = 'SELECT
    p.id,
    p.bank_logo,
    p.bank_name,
    p.acc_number,
    p.acc_name,
    p.phone,
    p.last_updated,
    p.created
   
    FROM '.$this->payment_table.' p
    ORDER BY p.created DESC';
    //$this->conn->quote($this->payment_table);

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
} */

 /*** read single payment ***/
 /* public function read_singlepayment(){
    $query= 'SELECT
    id,
    bank_logo,
    bank_name,
    acc_number,
    acc_name,
    phone
    
     
    FROM '.$this->payment_table.' 
    WHERE id = ? LIMIT 1';
    
    //$this->conn->quote($this->payment_table);

    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(1, $this->id);
    //execute
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $this->id         = $row['id'];
    $this->bank_logo  = $row['bank_logo'];
    $this->bank_name  = $row['bank_name'];
    $this->acc_number = $row['acc_number'];
    $this->acc_name   = $row['acc_name'];
    $this->phone      = $row['phone'];
    
       
    } */

/*** update payment ***/
/* public function update_payment(){
              
    //create query
    $query = 'UPDATE '. $this->payment_table . " SET 
    
    bank_name    = :bank_name,
    acc_number   = :acc_number,
    acc_name     = :acc_name,
    phone        = :phone,
    
    last_updated  = :last_updated
    
    WHERE id      =  :id";
    //prepare statement
    $stmt = $this->conn->prepare($query);

    //clean data
    $this->bank_name     = htmlspecialchars(strip_tags($this->bank_name));
    $this->acc_number    = htmlspecialchars(strip_tags($this->acc_number));
    $this->acc_name      = htmlspecialchars(strip_tags($this->acc_name));
    $this->phone         = htmlspecialchars(strip_tags($this->phone));

    $this->last_updated   = htmlspecialchars(strip_tags($this->last_updated));
    $this->id            = htmlspecialchars(strip_tags($this->id));

   //binding param
  
    $stmt->bindParam(':bank_name', $this->bank_name);
    $stmt->bindParam(':acc_number', $this->acc_number);
    $stmt->bindParam(':acc_name', $this->acc_name);
    $stmt->bindParam(':phone', $this->phone);
    $stmt->bindParam(':last_updated', $this->last_updated);
    $stmt->bindParam(':id', $this->id);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}
 */
/*** update payment img ***/
/* public function update_payimg(){
              
    //create query
    $query = 'UPDATE '. $this->payment_table . " SET 
    
    bank_logo    = :bank_logo,
    bank_name    = :bank_name,
    acc_number   = :acc_number,
    acc_name     = :acc_name,
    phone        = :phone,
    
    last_updated  = :last_updated
    
    WHERE id      =  :id";
    //prepare statement
    $stmt = $this->conn->prepare($query);

    //clean data
    $this->bank_logo     = htmlspecialchars(strip_tags($this->bank_logo));
    $this->bank_name     = htmlspecialchars(strip_tags($this->bank_name));
    $this->acc_number    = htmlspecialchars(strip_tags($this->acc_number));
    $this->acc_name      = htmlspecialchars(strip_tags($this->acc_name));
    $this->phone         = htmlspecialchars(strip_tags($this->phone));

    $this->last_updated   = htmlspecialchars(strip_tags($this->last_updated));
    $this->id            = htmlspecialchars(strip_tags($this->id));

   //binding param
   $stmt->bindParam(':bank_logo', $this->bank_logo);
    $stmt->bindParam(':bank_name', $this->bank_name);
    $stmt->bindParam(':acc_number', $this->acc_number);
    $stmt->bindParam(':acc_name', $this->acc_name);
    $stmt->bindParam(':phone', $this->phone);
    $stmt->bindParam(':last_updated', $this->last_updated);
   $stmt->bindParam(':id', $this->id);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
} */

/*** delete payment ***/
/* public function delete_payment(){
              
//create query
$query = 'DELETE FROM '. $this->payment_table . " WHERE id = :id";
//prepare statement
$stmt = $this->conn->prepare($query);

//clean data
$this->id      = htmlspecialchars(strip_tags($this->id));

//binding param
$stmt->bindParam(':id', $this->id);
//execute
if($stmt->execute()){
   return true; 
}
//error
printf("Error %s. \n", $stmt->error);
return false;
} */



/******** **** **** **** **** ************ **** **** **** **** ****   Issues  ******** **** **** **** **** ******** **** **** **** **** ********/
/*** create issues ***/
public function issues(){
    //clean data
    $this->issue     = htmlspecialchars(strip_tags($this->issue));
   
    
    //create query
    $query = 'INSERT INTO '.$this->issues_table.' SET
    issue    = :issue';
    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(':issue', $this->issue);
    
    //execute
    if($stmt->execute()){
       return true; 
   } 
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}

/*** read issue ***/
 public function read_issue(){
    //create query
    $query = 'SELECT
    i.id,
    i.issue,
    i.created
    
    FROM '.$this->issues_table.' i
    ORDER BY i.created DESC';
    //$this->conn->quote($this->payment_table);

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
} 



/*** read single issue ***/
public function read_singleissue(){
    $query= 'SELECT
     id,
     issue   
     
    FROM '.$this->issues_table.' 
    WHERE issue = ? LIMIT 1';
    

    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(1, $this->issue);
    //execute
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $this->id     = $row['id'];
    $this->issue  = $row['issue'];
    
       
    }

/******** **** **** **** **** ************ **** **** **** **** ****   end Issues  ******** **** **** **** **** ******** **** **** **** **** ********/

/******** **** **** **** **** ************ **** **** **** **** ****   Volumes  ******** **** **** **** **** ******** **** **** **** **** ********/
/*** create issues ***/
public function volumes(){
    //clean data
    $this->volume     = htmlspecialchars(strip_tags($this->volume));
   
    
    //create query
    $query = 'INSERT INTO '.$this->volumes_table.' SET
    volume    = :volume,
    vol_year  = :vol_year';
    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(':volume', $this->volume);
    $stmt->bindParam(':vol_year', $this->vol_year);
    
    //execute
    if($stmt->execute()){
       return true; 
   } 
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}

/*** read issue ***/
 public function read_volume(){
    //create query
    $query = 'SELECT
    v.id,
    v.volume,
    v.vol_year,
    v.created
    
    FROM '.$this->volumes_table.' v
    ORDER BY v.created DESC';
    //$this->conn->quote($this->payment_table);

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
} 

/*** read recent volume ***/
public function read_recent_volume(){
    //create query
    $query = 'SELECT
    v.id,
    v.volume,
    v.vol_year,
    v.created
    
    FROM '.$this->volumes_table.' v
    ORDER BY v.created DESC
    LIMIT 1';
    
    //prepare statement
    $stmt = $this->conn->prepare($query);
    //execute query
    $stmt->execute();
    return $stmt; 
} 

/***end read recent issue ***/

/*** read single volume ***/
public function read_singlevolume(){
    $query= 'SELECT
     id,
     volume
     vol_year   
     
    FROM '.$this->volumes_table.' 
    WHERE volume = ? LIMIT 1';
    

    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(1, $this->volume);
    //execute
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $this->id     = $row['id'];
    $this->volume  = $row['volume'];
    $this->vol_year  = $row['vol_year'];
    
       
    }

/******** **** **** **** **** ************ **** **** **** **** ****   end Volumes  ******** **** **** **** **** ******** **** **** **** **** ********/


/******** **** **** **** **** ************ **** **** **** **** ****   users  ******** **** **** **** **** ******** **** **** **** **** ********/
/*** read users ***/
public function read_login(){
    //create query
    $query = 'SELECT
    l.id,          
    l.fullname,
    l.sex,
    l.email,
    l.created,
    l.role,
    l.phone,
    l.img,
    l.last_updated,
    l.last_login,
    l.failed_atempt   
   
    FROM '.$this->userlogin_table.' l
    ORDER BY l.created DESC';

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}

/*** read single user ***/
public function read_singlelogin(){
    $query= 'SELECT
    id,          
    created,
    fullname,
    email,
    role,
    phone,
    img,
    sex,
    last_updated,
    failed_atempt,
    last_login   
     
    FROM '.$this->userlogin_table.' 
    WHERE id = ? LIMIT 1';
    

    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(1, $this->id);
    //execute
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $this->id           = $row['id'];
    $this->created      = $row['created'];
    $this->fullname     = $row['fullname'];
    $this->email        = $row['email'];
    $this->role         = $row['role'];
    $this->phone        = $row['phone'];
    $this->img          = $row['img'];
    $this->sex          = $row['sex'];
    $this->last_login   = $row['last_login'];
    $this->last_updated  = $row['last_updated'];
    $this->failed_atempt= $row['failed_atempt'];

    }



    /******** **** **** **** **** ************ **** **** **** **** ****   logs  ******** **** **** **** **** ******** **** **** **** **** ********/
   /****   create logs  ****/
   public function logs(){
    //create query
    $query = 'INSERT INTO '. $this->logs_table . " SET 
    fullname     =  :fullname,
    email        =  :email,
    event        =  :event,
    event_date   =  :event_date";
   
    //prepare statement
    $stmt = $this->conn->prepare($query);
 
    //clean data
    $this->fullname     = htmlspecialchars(strip_tags($this->fullname));
    $this->email        = htmlspecialchars(strip_tags($this->email)); 
    $this->event        = htmlspecialchars(strip_tags($this->event));
    $this->event_date   = htmlspecialchars(strip_tags($this->event_date));
 
    //binding param
    $stmt->bindParam(':fullname', $this->fullname);
    $stmt->bindParam(':email', $this->email);
    $stmt->bindParam(':event', $this->event);
    $stmt->bindParam(':event_date', $this->event_date);
 
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
 }
 
 /*** read roles ***/
 public function read_alllogs(){
     //create query
     $query = 'SELECT
     l.id,
     l.fullname,
     l.email,
     l.event,
     l.event_date
     
     FROM '.$this->logs_table.' l
     ORDER BY l.created DESC';
 
 //prepare statement
 $stmt = $this->conn->prepare($query);
 //execute query
 $stmt->execute();
 return $stmt; 
 }
 
 
  /*** read single log ***/
  public function read_singlelog(){
     $query= 'SELECT
      id,
      fullname,   
      email,   
      event,   
      event_date,   
      
     FROM '.$this->logs_table.' 
     WHERE email = ? LIMIT 1';
     
 
     //prepare statement
     $stmt = $this->conn->prepare($query);
     //binding param
     $stmt->bindParam(1, $this->id);
     //execute
     $stmt->execute();
 
     $row = $stmt->fetch(PDO::FETCH_ASSOC);
 
     $this->id          = $row['id'];
     $this->fullname    = $row['fullname'];
     $this->email       = $row['email'];
     $this->event       = $row['event'];
     $this->event_date  = $row['event_date'];
     
        
     }
 
 

}