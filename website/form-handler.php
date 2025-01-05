<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form data
    $name = htmlspecialchars($_POST['name']);
    $user_email = htmlspecialchars($_POST['email']); // User's email (to use as sender)
    $message = htmlspecialchars($_POST['message']);
    
    // Email settings
    $to = "syedmaaz.amin@gmail.com; // The email address where you want to receive form submissions
    $subject = "New Form Submission from $name";

    // Email content (user's message)
    $body = "You have received a new form submission:\n\n";
    $body .= "Name: $name\n";
    $body .= "Email: $user_email\n";
    $body .= "Message: $message";

    // Headers (set the "From" email to the user's email)
    $headers = "From: $user_email"; // Set the "From" email to the user's email address

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        echo "Thank you for your submission!";
    } else {
        echo "There was an error sending your message.";
    }
}
?>