<?php
error_reporting(0);
require_once("./config.php");
header('content-type:text/html;charset=utf-8');
try {
    $con = new PDO('mysql:host=' . $db_host . ';dbname=' . $db_name, $db_user, $db_pd);
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
