<?php
$email = $_POST['email'];
$password = $_POST['password'];

// Mock credentials for demonstration purposes
if ($email == "admin@dte.com" && $password == "admin123") {
    header("Location: ../admin-dashboard.html");
    exit();
} elseif ($email == "college@example.com" && $password == "college123") {
    header("Location: ../college-dashboard.html");
    exit();
} else {
    echo "<script>
            alert('Invalid credentials!');
            window.location.href = '../index.html';
          </script>";
    exit();
}
?>
