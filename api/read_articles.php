<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

require __DIR__.'/validation.php';

require_once('../validation/classes/session.php');
login();
//initializing api
include_once('../core/initialize.php');

//instantiate post
$post = new Post($db);


$result = $post->read_articles();
//get the row count
$num = $result->rowCount();

if($num> 0){
    $post_arr = array();
    $post_arr['data'] = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $post_item = array(
             

            'id'            => $id,
            'title'         => $title,
            'abstract'      =>$abstract,
            'doi'  => $doi,
            'date_recieved'      => $date_recieved,
            'date_accepted'    =>$date_accepted,
            'article_uploads'           => $article_uploads,
            'size'                      => $size,
            'year_of_publication'          => $year_of_publication,
            'month_of_publication'    =>$month_of_publication,
            //'authors' =>$someJSON = json_encode($authors),
            'authors' =>$someJSON = json_decode($authors, true),
            //'authors'          => explode(',',$authors),
            'article_code'     => $article_code,
            'uploaded_by'          =>$uploaded_by,
            'date_published'       =>$date_published,
            'issue'       =>$issue,
            'no_downloads'       =>$no_downloads,
            'page_range'       =>$page_range,
            'volume'       =>$volume,
            'status'       =>$status,
            'key_words'       =>$key_words,
            'article_references'       =>$article_references,
            'last_updated'   =>$last_updated,
            'created'       =>$created

        );
        array_push($post_arr['data'], $post_item);

    }
    //convert to JSON and output
    echo json_encode($post_arr['data']);
}else{
    echo json_encode(array('message' => ' No post found.'));
}