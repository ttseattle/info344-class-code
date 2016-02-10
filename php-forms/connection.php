<<<<<<< HEAD
<?php
function getConnection() {
    require_once 'secret/db-credentials.php'; /* generates exception if can't find the file (include generates just a warning); once means it will only be loaded into memory once */
    try {
        $conn = new PDO("mysql:host={$dbHost};dbname={$dbDatabase}", $dbUser, $dbPassword); //like a class constructor, a library that allows us to connect to DBS in a vendor-neutral way (Oracle, SQL, SQLite, etc.)
        return $conn;
    } catch (PDOException $e) {
        die('Could not connect to database ' . $e);
    }
}
=======
<?php 
function getConnection() {
    require_once 'secret/db-credentials.php';
    
    try {
        $conn = new PDO("mysql:host={$dbHost};dbname={$dbDatabase}", 
              $dbUser, $dbPassword);
        
        return $conn;
        
    } catch(PDOException $e) {
        die('Could not connect to database ' . $e);
    }
}

>>>>>>> dd127347d12c8bb16a0f6d7fa4d2cd6133701c08
?>