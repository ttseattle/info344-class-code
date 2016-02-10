<<<<<<< HEAD
<?php
=======
<?php 
>>>>>>> dd127347d12c8bb16a0f6d7fa4d2cd6133701c08
class Zips {
    protected $conn;
    
    public function __construct($conn) {
        $this->conn = $conn;
    }
    
    public function search($q) {
        $sql = 'select * from zips where zip=? or primary_city=?';
        $stmt = $this->conn->prepare($sql);
<<<<<<< HEAD
        $success = $stmt->execute(array($q, $q));
        if (!$success) {
            //var_dump($stmt->errorInfo());
            trigger_error($stmt->errorInfo());
=======
        $success = $stmt->execute(array($q,$q));
        if (!$success) {            
            var_dump($stmt->errorInfo());
>>>>>>> dd127347d12c8bb16a0f6d7fa4d2cd6133701c08
            return false;
        } else {
            return $stmt->fetchAll();
        }
    }
}
?>