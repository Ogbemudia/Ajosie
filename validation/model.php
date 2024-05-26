<?php
header("Access-Control-Allow-Origin: localhost/ubjad/");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Content-Type: application/json; charset=UTF-8");
//header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


require __DIR__.'/classes/configdb.php';
require_once('vendor/autoload.php');
use \Firebase\JWT\JWT; 


function msg($success,$status,$message,$extra = []){
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ],$extra);
}



// GET DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));
$returnData = [];



if($_SERVER['REQUEST_METHOD'] == "POST" && $_POST['crud_req'] == "login")
login($link);




//login function.
function login($link)
{

   // $returnData = msg(1,201,'Login successful.');

   
    $email = "";
    $password = "";
    $email_err = "";
    $password_err = "";
 

    //$returnData = msg(1,201,'You have successfully loggedin.');

    if (empty(trim($_POST["email"]))) {
        $email_err = "Please enter your email.";
        $returnData = msg(0, 422, $email_err);
    } else {
        $email = trim($_POST["email"]);
    }

    //validate phone number.
    if (empty(trim($_POST["password"]))) {
        $password_err = "Please enter your password.";
        $returnData = msg(0, 422, $password_err);
    } else {
        $password = trim($_POST["password"]);
    }
   // $returnData = msg(0, 422, $email);
 

    //Validating inputs
    if (empty($email_err) && empty($password_err)) {

 //Select statement
        $sql = "SELECT id, fullname, sex, email, pass, role, phone, img  FROM userlogin WHERE email = ? ";
        if ($stmt = mysqli_prepare($link, $sql)) {
            //bind the variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_email);
     
            //set parameters
            $param_email = $email;
    
            //executing the statement
            if (mysqli_stmt_execute($stmt)) {
                //store result
                mysqli_stmt_store_result($stmt);

                //checking if email exits, if yes verified password
                if (mysqli_stmt_num_rows($stmt) > 0) {
             
             //Bind result variables
                    mysqli_stmt_bind_result($stmt, $id, $fullname, $sex, $email, $hashed_password, $role, $phone, $img);
            
             
                    if (mysqli_stmt_fetch($stmt)) {
                        if (password_verify($password, $hashed_password)) {
                            //if password is correct, start new session
                            // echo $role;
                            $date1 = date("F j, Y"); 
                            $tim = date("g:i a");
                            $login_date = $date1. " at ".$tim;
                            //$login_date=date('y/m/d h:i:s');
                            $sql4= "UPDATE userlogin SET last_login= 'Last seen on: $login_date' WHERE email='$email' AND role='$role'";
                            // $sql4 = "UPDATE login SET history = 'Last seen on: $login_date' WHERE email=$email";
                            if (mysqli_query($link, $sql4)) {
                                                              
                                $userid = $id;
                                $issuedAt = time();
                                $expirationTime = $issuedAt + 1800;  // jwt valid for 60 seconds from the issued time
                                $payload = array(
                                   // 'userid' => $userid,
                                    'iat' => $issuedAt,
                                    'exp' => $expirationTime,
                                    'iss' => 'localhost/ubjad/validation',
                                    'aud' => 'localhost/ubjad/'
                                );
                                $key = 'GALOREkey%visions6689#king%';
                                $alg = 'HS512';
                                $jwt = JWT::encode($payload, $key, $alg);
                                $token = $jwt;
                                $expire=time()+60*60;
                                $httponly='HttpOnly';
                                $path = 'path=/';

                               
                                header ("Set-Cookie: token=$token; $expire; $path; $httponly");
                                $returnData = [
                                    'success' => 1,
                                    'message' => 'You have successfully logged in.',
                                    //'token' => $token,
                                    'role' => $role
                                ]; 
                                session_start();
                               $_SESSION['userlogin'] = $email;
                               $_SESSION['role'] = $role;
                               $_SESSION["fullname"] = $fullname;
                               $_SESSION["sex"] = $sex;
                               $_SESSION["id"] = $userid;
                               $_SESSION["phone"] = $phone;
                               $_SESSION["img"] = $img;
                               // header("location: read_login.php");
                               
                               
                            //$returnData = msg(100, 201, 'You have successfully logged in22.');
                            } else {
                                //$returnData = msg(0, 200, "unable to update history");
                            }
                        } else {
                            $date1 = date("F j, Y"); 
                            $tim = date("g:i a");
                            $failed_atempt = $date1. " at ".$tim;
                            //$login_date=date('y/m/d h:i:s');
                            $sql4= "UPDATE userlogin SET failed_atempt= '$failed_atempt' WHERE email='$email' AND role='$role'";
                            if (mysqli_query($link, $sql4)) {
                            $password_err = "Wrong password or wrong email.";
                            $returnData = msg(0, 422, $password_err);
                            }
                        }
                    }
                } else {
                    
                    $email_err = "Wrong password or wrong email.";
                    $returnData = msg(0, 422, $email_err);
                   
                }
            } else {
                $returnData = msg(0, 422, "Error! Please try again later.");
            }
            //close statement
            mysqli_stmt_close($stmt);
        }
    }
    //close connection
 mysqli_close($link);

    echo json_encode($returnData);
};