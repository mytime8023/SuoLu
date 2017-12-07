
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>   
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<!doctype html>
<html lang="en">
 <head>
  <meta charset="UTF-8">
  <meta name="Generator" content="EditPlus®">
  <meta name="Author" content="">
  <meta name="Keywords" content="">
  <meta name="Description" content="">
  <title>Document</title>
  	<link rel="stylesheet" type="text/css" href="themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="themes/icon.css">
	<script type="text/javascript" src="scripts/jquery.min.js"></script>
	<script type="text/javascript" src="scripts/jquery.easyui.min.js"></script>
	 <script type="text/javascript" charset="utf-8" src="../scripts/tools/paisuanTools.js"></script>
	<script type="text/javascript" charset="utf-8" src="../scripts/layer/layer.js" ></script>
	<script type="text/javascript" src="scripts/accountAll.js"></script>
 </head>
 <body>
 <script type="text/javascript">
  	 function barCode(value, rows, index) {
  		if (rows.type == '1') {
  			return "现场会计";
  		} 
  		if (rows.type == '2') {
  			return "网络会计";
  		} 
  		else {
  			return "啥子会计";
  		}
  	}
  </script>
  <table id="dx_accountant">
  	
  </table>
  <div id="toolbar">
		<a href="#" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="getName()">查询 </a><input id="input_id"/>	
		<select style="width:100px;margin-top:10px;border: none;" name="selectAge" id="selectAge">
		<option value="0" selected = "selected">会计类型</option>
		<option value="1">现场会计</option>
		<option value="2">网络会计</option>
		</select>  

	</div>
 </body>
</html>
