Hey this is some content above the code
<<<<<<< HEAD

<?php 
$name = 'Tisha'; //declares a variable called name and assigns a value to it
//like JS, PHP's variables are loosely typed 
$fullName = $name . 'Trongtham'; //concatenates String

class Person {
    protected $name;
    //super in Java = parent in PHP
    public function __construct($n) { //__construct denotes Constructor
        $this->name = $n; //equivalent to this.name in Java
=======
<?php
$name = 'Dave';
$fullName = $name . 'Stearns';

class Person {
    protected $name;
    
    public function __construct($n) {
        $this->name = $n;
>>>>>>> dd127347d12c8bb16a0f6d7fa4d2cd6133701c08
    }
    
    public function getName() {
        return $this->name;
    }
}

function foo($bar) {
    echo "Hey this is the foo fighting function\n";
}

<<<<<<< HEAD
echo "Hello {$name}s\n"; 
//single quotes --> nothing interpreted as string 
//double quotes --> PHP looks inside string and does various kinds of substitutions
foo(NULL);

?>

And this is some content below
All code outside the code block is streamed directly to output
=======
echo "Hello {$name}s\n";
foo(NULL);
?>
And this is some content below
>>>>>>> dd127347d12c8bb16a0f6d7fa4d2cd6133701c08
