<?php 
    // Exercise 1
    $n = rand(1, 100);
    echo "your new random value is $n\n";
    
    // Exercise 2
    date_default_timezone_set('America/Los_Angeles');
    $start = $month = strtotime('2016-01-01');
    $end = strtotime('2017-01-01'); 
    $new_months = 
    
    $months = array();
    while ($month < $end) {
        $m = date('F', $month);
        $month = strtotime("+1 month", $month);
        array_push($months, $m);
    }
    
    echo "Months:\n";
    foreach ($months as $val) {
        echo "$val\n";
    }
?>