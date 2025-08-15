<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbs = "db_bloger";

// Create connection
$koneksi = mysqli_connect($servername, $username, $password, $dbs);

// Check connection
if ($koneksi) {
} else {
    echo "Server not connected";
}
