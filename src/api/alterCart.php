<?php
    header("content-type:text/html;charset=utf-8");
    $dbsql=isset($_POST['dbsql']) ? $_POST['dbsql'] : '';
    $Id=isset($_POST['Id']) ? $_POST['Id'] : '';
    $num=isset($_POST['num']) ? $_POST['num'] : '';
    // $add=isset($_POST['add'])? $_POST['add']:'';
    // $subtract=isset($_POST['subtract']) ? $_POST['subtract']:'';
   

    include "connect.php";

    // $sql="SELECT * FROM $dbsql WHERE productid=$Id";
    // $res=$conn->query($sql);
    // $data=$res->fetch_all(MYSQLI_ASSOC);
    // $number=$data[0]['num'];
    


    
    // if($add=='add'){
    //     $number++;
    //     if($number>=20){
    //         $number=20;
    //     }
    // }
    // if($subtract=='$subtract'){
    //     $number--;
    //     if($number<=0){
    //         $number=1;
    //     }
    // }

    $sql1="UPDATE $dbsql SET num=$num where productid=$Id";
    $res1=$conn->query($sql1);




?>