<<<<<<< HEAD
<h1> Possible Matches </h1>
<ul>
    <?php foreach($matches as $match): ?>
    <li> 
        <?= htmlentities($match['zip']) ?>    
=======
<h1>Possible Matches</h1>
<ul>
    <?php foreach($matches as $match): ?>
    <li>
        <?= htmlentities($match['primary_city']) ?>,
        <?= htmlentities($match['state']) ?>
        <?= htmlentities($match['zip']) ?>
        <?= htmlentities($match['country']) ?>
>>>>>>> dd127347d12c8bb16a0f6d7fa4d2cd6133701c08
    </li>
    <?php endforeach; ?>
</ul>