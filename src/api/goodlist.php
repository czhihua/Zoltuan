<?php
    header("content-type:text/html;charset=utf-8");

    $dbsql=isset($_POST['dbsql']) ? $_POST['dbsql'] :'';
    $page=isset($_POST['page']) ? $_POST['page']:'';
    $num=isset($_POST['num']) ? $_POST['num'] : '';
    $user=isset($_POST['user']) ? $_POST['user'] : '';

    include 'connect.php';

    $index= ($page - 1)*$num;


    if(!$num==''){
        if(!$user){
            $sql = "SELECT * FROM $dbsql  LIMIT $index,$num";
        }else{
            $sql = "SELECT * FROM $dbsql WHERE user='$user' LIMIT $index,$num";
        }
        
        // $res = $conn->query($sql);
        // $data=$res->fetch_array(MYSQLI_ASSOC);;
    }else{
        if(!$user){
            $sql = "SELECT * FROM $dbsql";
        }else{
             $sql = "SELECT * FROM  $dbsql WHERE user='$user'";
        }    
    }
    
    
    $res = $conn->query($sql);
    $data = $res ->fetch_all(MYSQLI_ASSOC);
    // $data=mysqli_fetch_array($res,MYSQLI_ASSOC);
    $sql1="SELECT * FROM $dbsql";
    $res1 = $conn->query($sql1);
    $total=$res1->num_rows;
    $total1=$res->num_rows;
    $arr=array(
             'data'=>$data,
             'total'=>$total,
             'page'=>$page,
             'num'=>$num,
             'total1'=>$total1
         );
        echo json_encode($arr,JSON_UNESCAPED_UNICODE);
?>