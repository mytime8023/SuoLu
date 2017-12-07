<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>索路管理系统</title>
	<link rel="stylesheet" href="css/pintuer.css">
    <link rel="stylesheet" href="css/admin.css">
    <script src="js/jquery.js"></script>
    <script src="js/pintuer.js"></script>
    <script src="layer/layer.js"></script>
</head>
<body>
<div class="bg"></div>
<div class="container">
    <div class="line bouncein">
        <div class="xs6 xm4 xs3-move xm4-move">
            <div style="height:150px;"></div>
            <div class="media media-y margin-big-bottom">
            </div>
            <!-- 登录的表单 -->
            <form  method="post" action="../UserServlet">
                <div class="panel loginbox">
                    <div class="text-center margin-big padding-big-top"><h1>索路后台管理系统</h1></div>
                    <div class="panel-body" style="padding:30px; padding-bottom:10px; padding-top:10px;">
                        <div class="form-group">
                            <div class="field field-icon-right">
                                <input type="text" class="input input-big" name="username" placeholder="登录账号" data-validate="required:请填写账号" />
                                <span class="icon icon-user margin-small"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="field field-icon-right">
                                <input type="password" class="input input-big" name="password" placeholder="登录密码" data-validate="required:请填写密码" />
                                <span class="icon icon-key margin-small"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <!-- 动态验证 -->
                            <div class="field">
                                <input type="text" class="input input-big" name="code" placeholder="填写右侧的验证码" data-validate="required:请填写右侧的验证码" />
                                <img id="loginform:vCode" src="validatecode.jsp" alt="" width="100" height="32" class="passcode" style="height:43px;cursor:pointer;"             
                            	onclick="javascript:document.getElementById('loginform:vCode').src='validatecode.jsp?'+Math.random();">
									
                            </div>
                            
                        </div>
                    </div>
                    <div>
	                  <c:forEach items="${map}" var="node">  
	       			  <c:out value="${node.error}"></c:out>  
	 				  </c:forEach>
   					</div>  
                    <div style="padding:30px;">
                        <button type="submit" class="button button-block bg-main text-big input-big" value="登录" >登录</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

</body>
</html>