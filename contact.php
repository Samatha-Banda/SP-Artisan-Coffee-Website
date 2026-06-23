<?php
// Database configuration
$host = "localhost";
$username = "root"; // Default XAMPP username
$password = ""; // Default XAMPP password is empty
$database = "coffee_shop_db";

// Connect to the database
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Process the form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize input to prevent SQL injection
    $name = $conn->real_escape_string($_POST['name']);
    $email = $conn->real_escape_string($_POST['email']);
    $message = $conn->real_escape_string($_POST['message']);

    // Prepare SQL statement
    $sql = "INSERT INTO feedback (name, email, message) VALUES ('$name', '$email', '$message')";

    if ($conn->query($sql) === TRUE) {
        echo "<script>
                alert('Thank you! Your feedback has been submitted successfully.');
                window.location.href = 'index.html';
              </script>";
    } else {
        echo "<script>
                alert('Error submitting feedback. Please try again.');
                window.location.href = 'index.html';
              </script>";
    }
}

// Close the connection
$conn->close();
?>
