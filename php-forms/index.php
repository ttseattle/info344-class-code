<?php
//appID (this is their demo app ID from their web site)
$appId = '2de143494c0b295cca9337e1e96b00e0';

//weather API URL
//http://api.openweathermap.org/data/2.5/weather?zip={zipcode},us&units=imperial&appid={$appId}

//weather icon URLs
// http://openweathermap.org/img/w/{iconName}.png

require_once 'connection.php';
require_once 'models/zip-model.php';

<<<<<<< HEAD
$q = $_GET['q']; //treats GET as an associative array, gets the value of property string q
// global variable automatically interpreted by PHP
=======
if (isset($_GET['q'])) {
    $q = $_GET['q'];   
}
else {
    $q = '';
}
>>>>>>> dd127347d12c8bb16a0f6d7fa4d2cd6133701c08

$conn = getConnection();
$zipModel = new Zips($conn);
$matches = $zipModel->search($q);

<<<<<<< HEAD
if (count($matches) == 1) { //only 1 match
=======
if (count($matches) == 1) {
>>>>>>> dd127347d12c8bb16a0f6d7fa4d2cd6133701c08
    $zip = $matches[0]['zip'];
    $url = "http://api.openweathermap.org/data/2.5/weather?zip={$zip},us&units=imperial&appid={$appId}";
    $json = file_get_contents($url);
    $weatherData = json_decode($json);
<<<<<<< HEAD
    //var_dump($weatherData);
=======
>>>>>>> dd127347d12c8bb16a0f6d7fa4d2cd6133701c08
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta charset="UTF-8">
    <link rel="icon" href="img/page-icon.png">
    <title>Weather</title>
    
    <!-- bootstrap css -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

</head>
<body class="container">
    <?php 
<<<<<<< HEAD
    include 'views/search-form.php';
=======
    include 'views/search-form.php';   
>>>>>>> dd127347d12c8bb16a0f6d7fa4d2cd6133701c08
    include 'views/matches.php';
    
    if (isset($weatherData)) {
        include 'views/weather.php';
    }
<<<<<<< HEAD
    ?> 
    
=======
    ?>
       
   
>>>>>>> dd127347d12c8bb16a0f6d7fa4d2cd6133701c08
</body>
</html>