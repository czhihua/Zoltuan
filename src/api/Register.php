<?php
      header("content-type:text/html;charset=utf-8");


    $m=isset($_POST['m'])? $_POST['m']:'';
    $val=isset($_POST['val'])? $_POST['val']:'';
    $paw=isset($_POST['paw'])? $_POST['paw']:'';
    
    include 'connect.php';
    /*
	注册
	post
		api/Register.php
			m : insert
      val : 要验证的用户名
      paw:密码
      num1：自己在全局定义一个空的null1
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息具体返回信息
			}
    */
     if($m=='insert'){
         $sql="INSERT INTO user (userName,password) VALUES ('$val','$paw')";
          $zhuce=$conn->query($sql);
          echo json_encode($zhuce,JSON_UNESCAPED_UNICODE);
    
     }

?>