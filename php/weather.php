<?php 
$url = parse_url($_SERVER['REQUEST_URI']); 
$city = substr($url['path'], 13); 
if (strlen($city) < 13) { 
    $city = 'Seattle';
} 

$json_url = "http://api.openweathermap.org/data/2.5/weather?q=$city,us&units=imperial&appid=2de143494c0b295cca9337e1e96b00e0";
$json = file_get_contents($json_url);
$arr = json_decode($json, true);

$temp = floatval($arr['main']['temp']);
$pressure = intval($arr['main']['pressure']);
$humidity = intval($arr['main']['humidity']);
$temp_min = intval($arr['main']['temp_min']);
$temp_max = intval($arr['main']['temp_max']);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <h1> Weather in <?= $city ?>: </h1>
        <ul>
            <li> Temperature: <?=  $temp ?> </li>
            <li> Pressure: <?= $pressure ?> </li>
            <li> Humidity: <?= $humidity ?> </li>
            <li> Low: <?= $temp_min ?> </li>
            <li> High: <?= $temp_max ?> </li>
        </ul>
</body>
</html>