<?php
    header("content-type:text/html;charset=utf-8");
    $dbsql=isset($_POST['dbsql']) ? $_POST['dbsql'] : '';//查询的数据表
    $todbsql=isset($_POST['todbsql']) ? $_POST['todbsql'] : '';//要输入的数据库
    $goodsnum=isset($_POST['goodsnum']) ? $_POST['goodsnum'] : '';//商品数量
    $pid=isset($_POST['pid']) ? $_POST['pid'] : '';//用来判断是否已经存在
    // $Id=isset($_POST['Id']) ? $_POST['Id'] : '';
    $user=isset($_POST['user']) ? $_POST['user'] : '';
    include 'connect.php';

    $sql="SELECT * FROM $dbsql WHERE productid=$pid";
    $res=$conn->query($sql);

    $data=$res->fetch_array(MYSQLI_ASSOC);

    

    // $name=$data['name'];
    // $price=$data['price'];
    $Id=$data['id'];
    $goodsName=$data['goodsName'];
    $intro=$data['intro'];
    $current=$data['current'];
    $original=$data['original'];
    $pic=$data['pic'];
    $type=$data['type'];
    $time=$data['time'];
    $color=$data['color'];
    $shop=$data['shop'];
    $quota=$data['quota'];
    $productid=$data['productid'];
    
   


    $sql2="SELECT * FROM $todbsql WHERE productid='$pid'";//查询表中是否有一致的商品

    $res2=$conn->query($sql2);
    $num=$res2->num_rows;
    $data2=$res2->fetch_array(MYSQLI_ASSOC);
    $number=$data2['num'];
    

    

    if(!$num){
        $sql1="INSERT INTO $todbsql(id,goodsName,intro,current,original,pic,type,time,color,shop,quota,productid,num,user) VALUES ($Id,'$goodsName','$intro',$current,'$original','$pic','$type','$time','$color','$shop',$quota,$productid,$goodsnum,'$user')";
        $res1=$conn->query($sql1);
        if($res1){
            echo 0;
        }else{
            echo 1;
      }
    }else if($num){
        $goodsN=$number+$goodsnum;
        $sql1="update cart set num=$goodsN where productid='$pid'";
        $res1=$conn->query($sql1);
        if($res1){
            echo 0;
        }else{
            echo 1;
        }
    }

   
?>