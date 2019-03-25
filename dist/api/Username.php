<?php
    /*

    */
     header("content-type:text/html;charset=utf-8");


      $m=isset($_POST['m'])? $_POST['m']:'';
     //注册

    $val=isset($_POST['val'])? $_POST['val']:'';
    $password=isset($_POST['paw'])? $_POST['paw'] : '';

    //登录
    $username2=isset($_POST['username'])? $_POST['username']:'';
    $password2=isset($_POST['password'])? $_POST['password']:'';
    

    


    include 'connect.php';
   
    /*
	验证用户名
	post
		api/index1.php
			m : index
			val : 要验证的用户名
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息具体返回信息
			}
    */
  // $num;
  if($m=='index'){
    $sql="SELECT * FROM user WHERE username='$val'";
    $reg=$conn->query($sql);
    // var_dump($reg);
    $num=$reg->num_rows;
      if(!$num){
         $zhuce=array(
            'code'=>$num,
            'message'=>'该用户名未注册'
         );
      }
      if($num){
        $zhuce=array(
            'code'=>$num,
            'message'=>'该用户名已注册'
         );
      }
   
      echo json_encode($zhuce,JSON_UNESCAPED_UNICODE);
    
  }

 

   /*
	注册
	post
		api/index1.php
			m : insert
      val : 要验证的用户名
      password:密码
      num1：自己在全局定义一个空的null1
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息具体返回信息
			}
    */
   
   
  // if($m=='insert'){
  //   $password=isset($_POST['paw'])? $_POST['paw'] : '';
  //    if($num1==1){            
  //          $jieg= '注册失败'; 
  //          echo $jieg;       
  //  }
  //  if($num1==0){
  //        $sql="INSERT INTO user (username,paw) VALUES ('$val','$password')";

  //         $jieg1=$conn->query($sql);
  //         $jieg= '注册成功'; 
  //  }
    //  echo json_encode($zhuce,JSON_UNESCAPED_UNICODE);
    // else{
      
    // }
    // if(!$num1-0&&$password){
    //    $sql="INSERT INTO user (username,paw) VALUES ('$val','$password')";
    //   $jieg=$conn->query($sql);
    //   echo $jieg;
    // } 

    
    // echo strlen($password);
  // }





  


  //  if($m=='enter'){
  //     // echo $username2,$password2;
  //     $sql=""
  //  }



  

    


    // if($m=='ojbk'){
    //    function index1(){
    //     echo 12356565;
    //   }
    // index1();
    // }
     
?>