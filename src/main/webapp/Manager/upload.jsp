<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>上传文件</title>
</head>
<body>
	<form action="main.do?method=upload" method="POST" enctype="multipart/form-data">
		上传文件
		<br>
		File:<input type="file" name="file"/>
		<input type="submit" value="Submit"/>
	</form>
	<!-- 
	<script type="text/javascript">
		var done = "N";
		var lujing = "D:/b";
		var data = {Done:done,url:lujing};
		var json_obj=JSON.stringify(data);
		alert(json_obj);
		$.ajax({
	   	 	type:'POST',
	        url:'main.do?method=upload',
	        contentType:'application/json',
	        datatype:'json',
	        data:json_obj,
	        async:false,
	        success:function(server){
	       		alert(server);
	       	}
    	 });
	</script> -->
</body>
</html>