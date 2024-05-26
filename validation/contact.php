<?php
$name = $_POST['name'];  
$email = $_POST['email'];  
$subject1 = $_POST['subject1'];
$message2 = $_POST['message2'];

$to_email = 'ekiensnews@gmail.com';
$subject = $subject1;
$message = $message2;
$headers = 'From: contact@projectgalore.com';
$sent=mail($to_email,$subject,$message,$headers);
if($send)
{
    echo "Your Account is Successfully Created. You must Activate your account.";
}

        
    
?>