<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
//header('Access-Control-Allow-Methods: GET');
//header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

//initializing api
include_once('../core/initialize.php');

require __DIR__.'/validation.php';

require_once('classes/session.php');
login();
//$username = $_SESSION['userlogin']; 

//instantiate post
$post = new Post($db);
//get the raw posted data

$post->id = isset($_GET['id']) ? $_GET['id'] : die();

$result = $post->read_singlelogin();

    $post_arr = array(
            'id'            => $post->id,
            'fullname'      => $post->fullname,
            'sex'           => $post->sex,
            'email'         => $post->email,
            'created'       => $post->created,
            'role'          => $post->role,
            'phone'         => $post->phone,
            'img'           => $post->img,
            'last_updated'   => $post->last_updated,
            'last_login'    => $post->last_login,
            'failed_atempt' => $post->failed_atempt,

        
        );
        //make a json
print_r(json_encode($post_arr));
