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
$role4 =  $_SESSION["role"];
if($role4 !=='admin'){
    header("location: logout.php");
    exit;
} 
require __DIR__.'/classes/configdb.php';
//require_once('vendor/autoload.php');
//use \Firebase\JWT\JWT; 


/* function msg($success,$status,$message,$extra = []){
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ],$extra);
}  */



// GET DATA FORM REQUEST
//$data = json_decode(file_get_contents("php://input"));
//$returnData = [];

//include_once("../includes/config.php");

//include_once("./classes/configdb.php");

if($_SERVER['REQUEST_METHOD'] == "POST" && $_POST['crud_req'] == "signup")
signup($link);
//signup function
function signup($link){
   

//defining and initializing variables
$fullname = "";
$email = "";
$phone = "";
$password = "";
$created = "";
$role = "";
$sex = "";
$img = "";
$fullname_err = "";
$email_err = "";
$phone_err = "";
$password_err = "";
$registration_succ = "";
$role_err = "";
$sex_err = "";
$img_err = "";

//processing data when form is submited


    $date1 = date("F j, Y"); 
    $tim = date("g:i a");
    $created = $date1. " at ".$tim;
    
 


    //Validate email
    if(empty(trim($_POST["email"]))){
        $email_err = "Please enter your email.";
        $returnData = msg(0,422,$email_err);
    }else{
        //prepare a select statement
        $sql = "SELECT id FROM userlogin WHERE email = ?";
        if($stmt = mysqli_prepare($link, $sql)){
            //bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_email);

            //Set parameters
            $param_email = trim($_POST["email"]);

            //executing the prepared statement
            if(mysqli_stmt_execute($stmt)){
                //store the result                
                mysqli_stmt_store_result($stmt);
                if(mysqli_stmt_num_rows($stmt) == 1){
                    $email_err = "This email is already taken.";
                    $returnData = msg(0,422,$email_err);
                }else{
                    $email = trim($_POST["email"]);
                   
                }
            }else{
               // echo "Error! Please try agin later. ";
               $returnData = msg(0,422,'Error! Please try agin later.');
            }
                //close statement
                mysqli_stmt_close($stmt);
            
        
        }

        //Validate password
        if(empty(trim($_POST["password"]))){
            $password_err = "Please enter your password";
            $returnData = msg(0,422,$password_err);
            }elseif(strlen(trim($_POST["password"])) < 6){
                $password_err = "Password must be atleast 6 characters.";
                $returnData = msg(0,422,$password_err);

            }else{
                $password = trim($_POST["password"]);
            }
            
                //validate name.
           if(empty(trim($_POST["fullname"]))){
                $fullname_err = "Please enter your fullname.";
                $returnData = msg(0,422,$fullname_err);
                }else{
                    $fullname = trim($_POST["fullname"]);
                }

                //validate phone number.
           if(empty(trim($_POST["phone"]))){
            $phone_err = "Please enter your last name.";
            $returnData = msg(0,422,$phone_err);
            }else{
                $phone = trim($_POST["phone"]);
            }

                 //validate role.
           if(empty(trim($_POST["role"]))){
            $role_err = "Please select role.";
            $returnData = msg(0,422,$role_err);
            }else{
                $role = trim($_POST["role"]);
            }
            //validate sex
            if(empty(trim($_POST["sex"]))){
                    $sex_err = "Please select your sex.";
                    $returnData = msg(0,422,$sex_err);
                }else{
                    $sex = $_POST["sex"];
                }
                
                if(empty(trim($_FILES['file']['name']))){
                    if($sex=="male"){
                        $img = "avatar_m1.png";
                    }elseif($sex=="female"){
                        $img = "avatar_f.png"; 
                    }
                }else{
                    $filename = $_FILES['file']['name'];
                    $file = $_FILES['file']['tmp_name'];
                    $size = $_FILES['file']['size'];
                    /* $location = "../upload/" . $filename;
                    $imageFileType = pathinfo($location, PATHINFO_EXTENSION);
                    $imageFileType = strtolower($imageFileType); */
                    $img=$filename;
                } 
                
            // checking input errors before inserting in database
            if(empty($email_err) && empty($password_err) && empty($sex_err) && empty($fullname_err) && empty($phone_err) && empty($role_err)){

                //insert in database
                $sql = "INSERT INTO userlogin (fullname, sex, email, pass, created, role, phone, img) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
                if($stmt = mysqli_prepare($link, $sql)){
                    //bind variables to the prepared statement as parameters.
                    mysqli_stmt_bind_param($stmt, "ssssssss", $param_fullname, $param_sex, $param_email, $param_password, $param_created, $param_role, $param_phone, $param_img);

                    //set parameters
                    $param_fullname = $fullname;
                    $param_sex      = $sex;
                    $param_email    = $email;
                    $param_password = password_hash($password, PASSWORD_DEFAULT); //this creates a hash password.
                    $param_created  = $created;
                    $param_role     = $role;
                    $param_phone    = $phone;
                    $param_img      = $img;
                    
                    
                    //executing the above statements.

                    //Add record to database
      
                if(mysqli_stmt_execute($stmt)){
                    if(!empty(trim($_FILES['file']['name']))){
                    $filename = $_FILES['file']['name'];
                    $file = $_FILES['file']['tmp_name'];
                    $size = $_FILES['file']['size'];
                    $location = "../upload/" . $filename;
                    $imageFileType = pathinfo($location, PATHINFO_EXTENSION);
                    $imageFileType = strtolower($imageFileType);
                    move_uploaded_file($file, $location);
                    }

                    $registration_succ = "Registration successful.";                    
                    $returnData = msg(1, 201, $registration_succ);
                
                }else{
                    //$resultMessages = "<p>Unable to create profile</p>";
                    $returnData = msg(0,422,'Unable to add user');
                }

                //$registration_succ = "Registration successful.";
                
               
                        //redirecting to login page
                       // header("location: admin.php");
                    }else{
                        //echo "Something went wrong. Please try agian later.";
                        $returnData = msg(0,422,'Something went wrong. Please try agian later.');
                    }
                    //close statement
                    mysqli_stmt_close($stmt);

                   
                    }

                    
                    //close connection
                    mysqli_close($link);
            }

//$returnData = msg(1,201,'You have successfully registered.');

    //echo "thanks ok!";
    //$returnData = msg(0,422,'Please Fill in all Required Fields!');
    //$returnData = msg(0,422,'Your password must be at least 8 characters long!');

    echo json_encode($returnData);
};






                    