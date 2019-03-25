<?php
      header("content-type:text/html;charset=utf-8");


      $m=isset($_POST['m'])? $_POST['m']:'';
      $val=isset($_POST['val'])?$_POST['val']:'';
      $paw=isset($_POST['paw'])?$_POST['paw']:'';

      include 'connect.php';
        
      /*
	登录
	post
		api/login.php
		m : login
        val : 要登录的用户名
         paw:密码
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息具体返回信息
			}
    */

    if($m=='login'){
         $sql="select * from user where userName = '$val' and password='$paw'";
        $login=$conn->query($sql);
        $num=$login->num_rows;
        
         if(!$num){
         $lg=array(
            'code'=>$num,
            'message'=>'登录失败'
         );
      }else{
           $lg=array(
            'code'=>$num,
            'message'=>'登录成功'
         );
      }
        echo json_encode($lg,JSON_UNESCAPED_UNICODE);
       
      }
    
?>