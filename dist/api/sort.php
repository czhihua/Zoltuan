<?php
    header("content-type:text/html;charset=utf-8");

    $dbsql=isset($_POST['dbsql']) ? $_POST['dbsql'] :'';
    $page=isset($_POST['page']) ? $_POST['page'] : '';
    $num=isset($_POST['num']) ? $_POST['num'] :'';
    $sort=isset($_POST['sort'])? $_POST['sort']:'';//升降
    $demand=isset($_POST['demand']) ? $_POST['demand'] :'';
    $query=isset($_POST['query']) ? $_POST['query'] :'';//查询条件
    $name=isset($_POST['name']) ? $_POST['name'] :'';//查询范围


    include 'connect.php';

    $index= ($page - 1)*$num;
 
    if($sort=='ascend'){
        // 判断是否有想要查询的
        if(!$query){
            $sql="SELECT * FROM $dbsql ORDER BY  $demand LIMIT $index,$num";
            $sql2="SELECT * FROM $dbsql ORDER BY  $demand";
        }
        if($query){
            $sql="SELECT * FROM $dbsql  WHERE $name LIKE '%$query%' ORDER BY $demand LIMIT $index,$num";
            $sql2="SELECT * FROM $dbsql  WHERE $name LIKE '%$query%' ORDER BY $demand";
        }
    }
     if($sort=='descend'){
         if(!$query){
            $sql="SELECT * FROM $dbsql ORDER BY  $demand desc LIMIT $index,$num";
            $sql2="SELECT * FROM $dbsql ORDER BY  $demand desc";
         }
        if($query){
            $sql="SELECT * FROM $dbsql  WHERE $name LIKE '%$query%' ORDER BY $demand desc LIMIT $index,$num";
            $sql2="SELECT * FROM $dbsql  WHERE $name LIKE '%$query%' ORDER BY $demand desc";
        }  
    }
        $res=$conn->query($sql);
        $data=$res->fetch_all(MYSQLI_ASSOC);
        $sql1="SELECT * FROM $dbsql";
        $res1 = $conn->query($sql2);
        $total=$res1->num_rows;
        $total1=$res->num_rows;
        $arr=array(
                'data'=>$data,
                'total'=>$total,
                'page'=>$page,
                'num'=>$num
                // 'total1'=>$total1
            );
            echo json_encode($arr,JSON_UNESCAPED_UNICODE);
?>