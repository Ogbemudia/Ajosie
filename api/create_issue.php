<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

require __DIR__.'/validation.php';

require_once('../validation/classes/session.php');
login();
//initializing api
include_once('../core/initialize.php');


//instantiate post
$post = new Post($db);


//get the raw posted data
$data = json_decode(file_get_contents("php://input"));
$returnData = [];


    $post->issue     =$_POST['issue'];
   
    //create post
    if ($post->issues()) {
        $returnData = msg(1, 201, "issue created.");
    } else {
        $returnData = msg(0, 422, "issue not created.");
    }
//}
echo json_encode($returnData);
    


