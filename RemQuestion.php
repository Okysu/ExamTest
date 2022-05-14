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
    $res = $res->fetch(PDO::FETCH_ASSOC);
    if ($res['Q_ANS'] == 1) {
        $Ans = $res['Q_O1'];
    }
    if ($res['Q_ANS'] == 2) {
        $Ans = $res['Q_O2'];
    }
    if ($res['Q_ANS'] == 3) {
        $Ans = $res['Q_O3'];
    }
    if ($res['Q_ANS'] == 4) {
        $Ans = $res['Q_O4'];
    }
    echo $res['Q_CON'] . "<div class='Right'>" . $Ans . "</div>";
} else {
    $ID = mt_rand(1, 349);
    $res = $con->query("SELECT * FROM `True-False` WHERE `Q_ID` = $ID");
    $res = $res->fetch(PDO::FETCH_ASSOC);
    if ($res['Q_ANS'] == 1) {
        echo $res['Q_CON'] . "<div class='Right'>正确</div>";
    } else {
        echo $res['Q_CON'] . "<div class='Right'>错误</div>";
    }
}
