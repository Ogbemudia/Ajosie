<?php
header('Access-Control-Allow-Origin: localhost/ubjad/');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');
require __DIR__.'/validation.php';

require_once('../validation/classes/session.php');
login();
$email = $_SESSION['userlogin']; 
$fullname = $_SESSION['fullname']; 


//initializing api
include_once('../core/initialize.php');
require_once('../validation/classes/configdb.php');

//instantiate post
$post = new Post($db);


/* function msg($success,$status,$message,$extra = []){
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ],$extra);
} */


//get the raw posted data
$data = json_decode(file_get_contents("php://input"));
$returnData = [];
$status='unpublished';


$authors       = $_POST['authors'];

if(empty(trim($_FILES['file']['name']))){
        //if (isset($_POST['title']) || isset($_POST['abstract']) || isset($_POST['doi']) || isset($_POST['year_of_publication']) || isset($_POST['month_of_publication'])|| isset($_POST['issue'])|| isset($_POST['page_range'])|| isset($_POST['volume'])|| isset($_POST['status'])|| isset($_POST['key_words']) || isset($_POST['authors'])) {
           
            $post   ->  title =$_POST['title'];
            $post   ->  abstract=$_POST['abstract'];
            $post   ->  doi=$_POST['doi'];
            $post   ->  year_of_publication=$_POST['year_of_publication'];
            $post   ->  month_of_publication=$_POST['month_of_publication'];
            $post   ->  uploaded_by=$fullname;
            $post   ->  issue=$_POST['issue'];
            $post   ->  page_range=$_POST['page_range'];
            $post   ->  volume=$_POST['volume'];
            $post   ->  status=$status;
            $post   ->  key_words=$_POST['key_words'];
            $post   ->  article_references=$_POST['article_references'];
            $post   ->  authors=array("authors"=>$authors);

           
            $date1 = date("F j, Y");
            $tim = date("g:i a");
            $post   ->  created = $date1. " at ".$tim;
            $post   ->  date_recieved = $date1. " at ".$tim;
            $post   ->  date_accepted = $date1. " at ".$tim;
            $post   ->  event_date = $date1. " at ".$tim;
            $post   ->  fullname = $fullname;
            $post   ->  email = $email;
            $post   ->  event = 'Uploaded article named: '.$_POST['title'];
       
           /*  $post   ->  code = md5(time());
            $post   ->  book_id = substr(sha1(time()), 0, 6);
            $post   ->  created_by = $username; */
            //$post ->  pages=  $pages;
        
            //substr($book_id,0,6);
            //}
            /* ****************************************check for issues and volume****************************************** */
            
           
            //create post
            if ($post   ->  articles()) {
                $post   ->  logs();
                $returnData = msg(1, 201, "Article created.");
            } else {
                $returnData = msg(0, 422, "Article not created.");
            }
        //}
    }else{

                $filename = $_FILES['file']['name'];
                $file = $_FILES['file']['tmp_name'];
                $size = $_FILES['file']['size'];
                $extension = pathinfo($filename, PATHINFO_EXTENSION);
                //$extension_arr = array("pdf","doc","docx");
                //if (!in_array($extension, $extension_arr)) {
                if ($extension!='pdf') {
               
                        $returnData = msg(0, 422, "File must be pdf format.");
                    }else{
                    
                    $article_uploads=$filename;


                        $post   ->  article_uploads =$article_uploads;
                        $post   ->  size =$size;
                        $post   ->  title =$_POST['title'];
                        $post   ->  abstract=$_POST['abstract'];
                        $post   ->  doi=$_POST['doi'];
                        $post   ->  year_of_publication=$_POST['year_of_publication'];
                        $post   ->  month_of_publication=$_POST['month_of_publication'];
                        $post   ->  uploaded_by=$fullname;
                        $post   ->  issue=$_POST['issue'];
                        $post   ->  page_range=$_POST['page_range'];
                        $post   ->  volume=$_POST['volume'];
                        $post   ->  status=$status;
                        $post   ->  key_words=$_POST['key_words'];
                        $post   ->  article_references=$_POST['article_references'];
                        //$post   ->  authors=$authors;
                        $post   ->  authors=array("authors"=>$authors);
                    

                    
                        $date1 = date("F j, Y");
                        $tim = date("g:i a");
                        $post   ->  created = $date1. " at ".$tim;
                        $post   ->  date_recieved = $date1. " at ".$tim;
                        $post   ->  date_accepted = $date1. " at ".$tim;
                        $post   ->  event_date = $date1. " at ".$tim;
                        $post   ->  fullname = $fullname;
                        $post   ->  email = $email;
                        $post   ->  event = 'Uploaded article named: '.$_POST['title'];
                
                    /*  $post   ->  code = md5(time());
                        $post   ->  book_id = substr(sha1(time()), 0, 6);
                        $post   ->  created_by = $username; */
                        //$post ->  pages=  $pages;
                    
                        //substr($book_id,0,6);
                        //}
                        
                        
                        //create post
                        if ($post   ->  articles()) {
                            $filename = $_FILES['file']['name'];
                            $file = $_FILES['file']['tmp_name'];
                           /*  $extension = pathinfo($post->filename, PATHINFO_EXTENSION);
                            $extension_arr = array("pdf");
                            if (!in_array($extension, $extension_arr)) {
                                $returnData = msg(0, 422, "File must be pdf or word format.");
                            }else{ */
                                $location = "../upload/" . $filename;
                                $imageFileType = pathinfo($location, PATHINFO_EXTENSION);
                                $imageFileType = strtolower($imageFileType); 
                                move_uploaded_file($file, $location);
               
                            $post   ->  logs();
                            $returnData = msg(1, 201, "Article created.");
                        } else {
                            $returnData = msg(0, 422, "Article not created.");
                        }
                };
    
                }

echo json_encode($returnData);


    

