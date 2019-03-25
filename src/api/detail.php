<?php
    header("content-type:text/html;charset=utf-8");
    $dbsql=isset($_POST['dbsql']) ? $_POST['dbsql'] :'';
    $Id=isset($_POST['id']) ? $_POST['id'] : '';

    include 'connect.php';

    $sql="SELECT * FROM $dbsql WHERE id=$Id";

    $res=$conn->query($sql);

    $data=$res->fetch_all(MYSQLI_ASSOC);
    // var_dump($data);
    echo json_encode($data,JSON_UNESCAPED_UNICODE);
?>