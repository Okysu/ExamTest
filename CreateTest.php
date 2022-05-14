<?php
error_reporting(0);
header('content-type:text/html;charset=utf-8');
try {
    $con = new PDO('mysql:host=localhost;dbname=xxjs', 'xxjs', 'z7fmPeAKZ7cRk46S');
} catch (PDOException $e) {

    echo "Error: Can not connect to sever.";
    exit();
}
$Q = $_POST['type'];
if ($Q >= 5) {
    $ID = mt_rand(1, 673);
    $res = $con->query("SELECT * FROM `Multiple-Choice` WHERE `Q_ID` = $ID");
    echo json_encode($res->fetch(PDO::FETCH_ASSOC));
} else {
    $ID = mt_rand(1, 349);
    $res = $con->query("SELECT * FROM `True-False` WHERE `Q_ID` = $ID");
    echo json_encode($res->fetch(PDO::FETCH_ASSOC));
}
