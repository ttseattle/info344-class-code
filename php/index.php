<?php 
    $url = parse_url($_SERVER['REQUEST_URI']); // $_SERVER = global variable under any PHP
    // associative array = set of key value pairs; all arrays in PHP are associative
    $name = substr($url['path'], 1); // trim off the leading slash
    if (strlen($name) == 0) { // if there is no path
        $name = 'World';
    } 
?>

<!DOCTYPE html>
<!-- 
index is the file the web service will look for if you didn't specify a particular file
! TAB gives you basic HTML page (Emmet convention)    
-->
<html lang="en">
<head>
    <!-- meta:vp TAB -->
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta charset="UTF-8">
    <title>Hello <?= $name ?> </title>
</head>
<body>
    <h1> <?php echo "Hello $name!" ?> </h1>
    <h1> Hello again <?= htmlentities($name) ?>! </h1> <!-- short hand syntax for echo; htmlentities allows HTML encodings -->
</body>
</html>