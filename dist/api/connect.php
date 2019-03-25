<?php

    // header("content-type:text/html;charset=utf-8");
    $servername='localhost';//主机名
    $username='root';//登录数据库的用户名
    $password='';//密码
    $dbname='zolmall';//数据库名

    $conn=new mysqli($servername,$username,$password,$dbname);
    $conn->query("SET NAMES utf8");//编码
    // if($conn->connect_error){
    //     //打印这里失败
    // }else{
    //     //连接成功
    //     // echo '成功连接数据库';
    // }

    // if($conn->connect_error){
    //     echo '连接失败';
    // }else{
    //     echo '连接成功';
    // }
?>