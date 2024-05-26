<?php
//headers
header("Access-Control-Allow-Origin: localhost/ubjad/");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
//header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
//header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
require __DIR__.'/validation.php';

require_once('classes/session.php');
login();


//$username = $_SESSION['userlogin'];
$user_id =  $_SESSION["id"]; 


//initializing api
include_once('../core/initialize.php');

//instantiate post
$post = new Post($db);

//$post->id = isset($_GET['username']) ? $_GET['username'] : die();
$post->id = $user_id ? $user_id : die();
$post->read_singlelogin();

$post_arr = array(
    
    'id'            => $post->id,
    'created'       => $post->created,
    'fullname'      => $post->fullname,
    'email'         => $post->email,
    'role'          => $post->role,
    'phone'         => $post->phone,
    'img'           => $post->img,
    'sex'           => $post->sex
    
);
 

//make a json
print_r(json_encode($post_arr));

?>