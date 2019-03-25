<?php
    header("content-type:text/html;charset=utf-8");

    $page=isset($_POST['page']) ? $_POST['page'] : '';//页数
    $num=isset($_POST['num']) ? $_POST['num'] :'';//条数
    $dbsql=isset($_POST['dbsql']) ? $_POST['dbsql'] :'';//表名
    $query=isset($_POST['query']) ? $_POST['query'] :'';//查询的条件
    $name=isset($_POST['name']) ? $_POST['name'] :'';//查询的区域
    $now=isset($_POST['now']) ? $_POST['now'] :'';//设置下标
    include 'connect.php';
    
    $index= ($page - 1)*$num;
        if(!$num){
            $sql="SELECT * FROM $dbsql WHERE $name  LIKE '%$query%'";
            $sql1="SELECT * FROM $dbsql WHERE $name  LIKE '%$query%'";
        }
        if($num){
            $sql="SELECT * FROM $dbsql WHERE $name  LIKE '%$query%' LIMIT $index,$num";
            $sql1="SELECT * FROM $dbsql WHERE $name  LIKE '%$query%'";
        }
        
          $res=$conn->query($sql);
          $data=$res->fetch_all(MYSQLI_ASSOC);
          $total=$res->num_rows;
          $res1=$conn->query($sql1);
          $total1=$res1->num_rows;
          $arr=array(
                'name'=>$query,
                'total'=>$total1,
                'page'=>$page,
                'num'=>$num,
                'now'=>$now,
                'data'=>$data
            );
            echo json_encode($arr,JSON_UNESCAPED_UNICODE);

    // }else{
    //      $sql="SELECT * FROM $dbsql WHERE $name  LIKE '%$query%' LIMIT $index,$num";
    //       $res=$conn->query($sql);
    //       $data=$res->fetch_all(MYSQLI_ASSOC);
    //       $total=$res->num_rows;
    //       $arr=array(
    //             'name'=>$query,
    //             'total'=>$total,
    //             'page'=>$page,
    //             'num'=>$num,
    //             'now'=>$now,
    //             'data'=>$data
    //         );
    // }
        
     

?>