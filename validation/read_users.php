<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

//initializing api
include_once('../core/initialize.php');

require __DIR__.'/validation.php';

require_once('classes/session.php');
login();
//$username = $_SESSION['userlogin']; 

//instantiate post
$post = new Post($db);


$result = $post->read_login();
//get the row count
$num = $result->rowCount();

if($num> 0){
    $post_arr = array();
    $post_arr['data'] = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $post_item = array(
             
            'id'            => $id,
            'fullname'      => $fullname,
            'sex'           => $sex,
            'email'         => $email,
            'created'       => $created,
            'role'          => $role,
            'phone'         => $phone,
            'img'           => $img,
            'last_updated'   => $last_updated,
            'last_login'    => $last_login,
            'failed_atempt' => $failed_atempt,
        );
        array_push($post_arr['data'], $post_item);

    }
    //convert to JSON and output
    echo json_encode($post_arr['data']);
}else{
    echo json_encode(array('message' => ' No post found.'));
}