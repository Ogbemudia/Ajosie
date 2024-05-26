<?php
//connect to our database.
/*  */
$db_user     = 'root';
$db_password = '';
$db_name     = 'ajosie';

$db = new PDO('mysql:host=localhost;dbname='.$db_name.';charset=utf8',$db_user,$db_password);


//set db attributes
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, true);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//$db->quote($db_name);


define('APP_NAME', 'ajosie');



//connect to our database.
/*  */
/* $db_user     = "ajosieorgn_ajosieorgn";
$db_password = "f+#SBRQTHI!c";
$db_name     = "ajosieorgn_ajosie";

$db = new PDO('mysql:host=localhost;dbname='.$db_name.';charset=utf8',$db_user,$db_password);


//set db attributes
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, true);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//$db->quote($db_name);


define('APP_NAME', 'ajosie'); */
?>
