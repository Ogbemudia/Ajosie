<?php
header("Access-Control-Allow-Origin: localhost/ubjad/");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
//header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once('validation.php');

require_once('classes/session.php');
login();
$username = $_SESSION['userlogin']; 
$fullname = $_SESSION['fullname']; 
$role4 =  $_SESSION["role"];
if($role4 !=='admin'){
    header("location: logout.php");
    exit;
} 
require __DIR__.'/classes/configdb.php';
$data = json_decode(file_get_contents("php://input"));
$returnData = [];
$status='unpublished';


/* function msg($success,$status,$message,$extra = []){
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ],$extra);
}  */
$authors       = $_POST['authors']=array();
$title =$_POST['title'];
$abstract=$_POST['abstract'];
$doi=$_POST['doi'];
$year_of_publication=$_POST['year_of_publication'];
$month_of_publication=$_POST['month_of_publication'];
$uploaded_by=$fullname;
$issue=$_POST['issue'];
$page_range=$_POST['page_range'];
$volume=$_POST['volume'];
$status=$_POST['status'];
$key_words=$_POST['key_words'];
$authors=[$authors];

/* $authors = mysqli_real_escape_string($link, $tittle);
$intro = mysqli_real_escape_string($link, $intro); */
   

$sql = "INSERT articles SET
        tittle = '$tittle', 
        introduction = '$intro', 
        last_update = '$last_update' 
        WHERE id = '$id'
        ";
//id	tittle	introduction	uploaded_date	downloads	size	doc
if (mysqli_query($link, $sql)) {
    header('Location: admin.php');
 exit;
} else {
    echo "<p style='color:red;'>Failed to update.</p>";
}

// GET DATA FORM REQUEST
//$data = json_decode(file_get_contents("php://input"));

    echo json_encode($returnData);







                    