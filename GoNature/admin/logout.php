<?php
session_start();
unset($_SESSION['email']);

session_destroy();

// Alihkan pengguna ke halaman login setelah logout
header('Location: login.php');
exit;
