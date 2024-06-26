<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

//initializing api
include_once('../core/initialize.php');

//instantiate post
$post = new Post($db);


$result = $post->read_recent_volume();
//get the row count
$num = $result->rowCount();

if($num> 0){
    $post_arr = array();
    $post_arr['data'] = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $post_item = array(

              
            'id'        => $id,
            'volume'    => $volume,
            'vol_year'    => $vol_year,
            'created'   =>$created
        );
        array_push($post_arr['data'], $post_item);

    }
    //convert to JSON and output
    echo json_encode($post_arr['data']);
}else{
    echo json_encode(array('message' => ' No post found.'));
}