<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<!-- //list显示表格 -->
<!-- 	//根据pageNumber判断到底显示什么样的页码 -->
<!-- 	//最大页码页也要引入判断 -->
<!-- 	//如果pagenumber 不等于1的时候 显示上一页 -->
	
	<c:if pagenumber!= 1> {
	<a herf="PageServlet?pageNumber=${pageNumber==1?1:pageNumber-1 }">上一页</a>
	}
	</c:if>
	for(int i=1;i<=pageNumber;i++){
		<a href="PageServlet?pageNumber=i">i</a>
	}
<!-- 	//for int pageNumber pageNumber+3 -->
	<c:if pagenumber!= totolPage ><!-- 如果也是不等于最大页数显示下一页 -->
		<a href="PageServlet?pageNumber=${pageNumber==totalPage? }">下一页</a>
	</c:if>

	
</body>
</html>