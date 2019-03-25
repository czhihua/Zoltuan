<?php
     $delete=isset($_POST['delete']) ?  $_POST['delete']:'';
     $Id=isset($_POST['Id']) ? $_POST['Id'] : '';

     include "connect.php";

     $sql="DELETE FROM $delete WHERE productid=$Id";
     $res=$conn->query($sql);
?>