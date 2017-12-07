$(function(){
	init_panel();
});
//来个全查
function init_panel(){
	doAsynchronousRequest({
		url:"getAllCustomer",
		mute:true,
		onSuccess:function(data){
			
			$("#dx_customer").datagrid({ 
				title:"系统管理>>客户管理", 
				toolbar:'#toolbar',
				rownumbers:true, 
				fitColumns:true, 
				pagination:true, 
				data:data.slice(0,10), 
				columns:[ 
				         [ 
				          {field:"ck",width:100,checkbox:true},
				          {field:'id', align:"center", title:"客户编号",width:100},
				          {field:'name', align:"center", title:"客户名称",width:100},
				          {field:'identityCard', align:"center", title:"身份证信息",width:100},
				          {field:'djrq', align:"center", title:"登记日期",width:100,formatter:function(val,rows,index){
				        	  
				        	  return formatDatebox(val);
				          }},
				          {field:'status', align:"center", title:"状态",width:100},
				          {field:'email', align:"center", title:"邮箱",width:100},
				          {field:'address', align:"center", title:"客户地址",width:100},
				          {field:'yclrk_shelves', align:"center", title:"角色",width:100},
				          {field:'phone', align:"center", title:"手机号",width:100},
				          {field:'jing', align:"center", title:"操作",width:100,formatter:function(){
				        	  
				        	  return "干啥子";
				          }}
				          ] 
				         ] 
			}); 
			
			var pager = $("#dx_customer").datagrid("getPager"); 
			pager.pagination({ 
				total:data.length, 
				onSelectPage:function (pageNo, pageSize) { 
					var start = (pageNo - 1) * pageSize; 
					var end = start + pageSize; 
					$("#dx_customer").datagrid("loadData", data.slice(start, end)); 
					pager.pagination('refresh', { 
						total:data.length, 
						pageNumber:pageNo 
					}); 
				} 
			}); 	
		}
	});
}
//时间控件
Date.prototype.format = function (format) {    
    var o = {    
        "M+": this.getMonth() + 1, // month    
        "d+": this.getDate(), // day    
        "h+": this.getHours(), // hour    
        "m+": this.getMinutes(), // minute    
        "s+": this.getSeconds(), // second    
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter    
        "S": this.getMilliseconds()    
        // millisecond    
    }    
    if (/(y+)/.test(format))    
        format = format.replace(RegExp.$1, (this.getFullYear() + "")    
            .substr(4 - RegExp.$1.length));    
    for (var k in o)    
        if (new RegExp("(" + k + ")").test(format))    
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));    
    return format;    
}    
function formatDatebox(value) {    
    if (value == null || value == '') {    
        return '';    
    }    
    var dt;    
    if (value instanceof Date) {    
        dt = value;    
    } else {    
        dt = new Date(value);    
    }    
    
    return dt.format("yyyy-MM-dd");
}


function ww3(date){    
    var y = date.getFullYear();    
    var m = date.getMonth()+1;    
    var d = date.getDate();    
    var h = date.getHours();    
    var str = y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);    
    return str;    
}    
function w3(s){    
    if (!s) return new Date();    
    var y = s.substring(0,4);    
    var m =s.substring(5,7);    
    var d = s.substring(8,10);    
    var h = s.substring(11,14);    
    var min = s.substring(15,17);    
    var sec = s.substring(18,20);    
    if (!isNaN(y) && !isNaN(m) && !isNaN(d) && !isNaN(h) && !isNaN(min) && !isNaN(sec)){    
        return new Date(y,m-1,d,h,min,sec);    
    } else {    
        return new Date();    
    }    
}






//根据名称查询
function getName(){
	var  dv = $('#datetime').datebox('getValue');
	var name=$('#input_id').val();
	if(dv.length>0||name.length>0){
		console.log("haha mnoi"+dv);
		var name={
				djrq:dv,
				name:name		
		}
		doAsynchronousRequest({
			url:"getCustomerName",
			data:JSON.stringify(name),
			mute:true,
			onSuccess:function(data){
				$("#dx_customer").datagrid({ 
					title:"系统管理>>客户管理", 
					toolbar:'#toolbar',
					rownumbers:true, 
					fitColumns:true, 
					pagination:true, 
					data:data.slice(0,10),
					
					columns:[ 
					         [ 
					          {field:"ck",width:100,checkbox:true},
					          {field:'id', align:"center", title:"客户编号",width:100},
					          {field:'name', align:"center", title:"客户名称",width:100},
					          {field:'identityCard', align:"center", title:"身份证信息",width:100},
					          {field:'djrq', align:"center", title:"登记日期",width:100,formatter:function(val,rows,index){
					        	  
					        	  return formatDatebox(val);
					          }},
					          {field:'status', align:"center", title:"状态",width:100},
					          {field:'email', align:"center", title:"邮箱",width:100},
					          {field:'address', align:"center", title:"客户地址",width:100},
					          {field:'yclrk_shelves', align:"center", title:"角色",width:100},
					          {field:'phone', align:"center", title:"手机号",width:100},
					          {field:'jing', align:"center", title:"操作",width:100,formatter:function(){
					        	  
					        	  return "干啥子";
					          }}
					          ] 
					         ] 
				}); 
				
				var pager = $("#dx_customer").datagrid("getPager"); 
				pager.pagination({ 
					total:data.length, 
					onSelectPage:function (pageNo, pageSize) { 
						var start = (pageNo - 1) * pageSize; 
						var end = start + pageSize; 
						$("#dx_customer").datagrid("loadData", data.slice(start, end)); 
						pager.pagination('refresh', { 
							total:data.length, 
							pageNumber:pageNo 
						}); 
					} 
				}); 
			}
		
		});
	}
	
	else{
		location.reload();
		
		/*1.部分刷新:$(".content-east" ).panel('refresh' );
		2.表格数据加载:$( '#group-list').datagrid( 'reload');*/
	}	
}
