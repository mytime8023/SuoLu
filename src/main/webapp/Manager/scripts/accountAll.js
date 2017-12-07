$(function(){
	init_panel();
});
//来个全查
function init_panel(){
	doAsynchronousRequest({
		url:"getAllAccountantA",
		mute:true,
		onSuccess:function(data){
			
			$("#dx_accountant").datagrid({ 
				title:"系统管理>>会计管理", 
				toolbar:'#toolbar',
				rownumbers:true, 
				fitColumns:true, 
				pagination:true, 
				data:data.slice(0,10), 
				columns:[ 
				         [ 
				          {field:"ck",width:100,checkbox:true},
				          {field:'id', align:"center", title:"会计编号",width:100},
				          {field:'identityName', align:"center", title:"姓名",width:100},
				          {field:'identityCard', align:"center", title:"身份证信息",width:100},
				          {field:'companyCounter', align:"center", title:"已服务公司",width:100},
				          {field:'ranking', align:"center", title:"会计等级",width:100},
				          {field:'email', align:"center", title:"邮箱",width:100},
				          {field:'maxCompanyNumber', align:"center", title:"(最多服务公司)",width:100},
				          {field:'type', align:"center", title:"现场还是网络",width:100,formatter:function(value,row,index){
				        	  if (value =='1') {
				        			return "现场会计";
				        		} 
				        		if (value =='2') {
				        			return "网络会计";
				        		} 
				        		else {
				        			return "啥子会计";
				        		}
				        	  
				          }},
				          {field:'djrq', align:"center", title:"登记日期",width:100,formatter:function(val,rows,index){
				        	  
				        	  return formatDatebox(val);
				          }},
				          {field:'phone', align:"center", title:"手机号",width:100},
				          {field:'phone', align:"center", title:"操作",width:100}
				          ] 
				         ] 
			}); 
			var pager = $("#dx_accountant").datagrid("getPager"); 
			pager.pagination({ 
				total:data.length, 
				onSelectPage:function (pageNo, pageSize) { 
					var start = (pageNo - 1) * pageSize; 
					var end = start + pageSize; 
					$("#dx_accountant").datagrid("loadData", data.slice(start, end)); 
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
	

//根据名称查询
function getName(){
	var nameAll=$("#input_id").val();
	var getType=$("#selectAge option:selected").val();
	
	if(nameAll.length>0||getType!==0){
		console.log("haha mnoi"+getType);
		var name={
				identityName:nameAll,
				type:getType		
		}
		doAsynchronousRequest({
			url:"getAccountAllName",
			data:JSON.stringify(name),
			mute:true,
			onSuccess:function(data){	
				$("#dx_accountant").datagrid({ 
					title:"系统管理>>会计管理", 
					toolbar:'#toolbar',
					rownumbers:true, 
					fitColumns:true, 
					pagination:true, 
					data:data.slice(0,10), 
					columns:[ 
					         [ 
					          {field:"ck",width:100,checkbox:true},
					          {field:'id', align:"center", title:"会计编号",width:100},
					          {field:'identityName', align:"center", title:"姓名",width:100},
					          {field:'identityCard', align:"center", title:"身份证信息",width:100},
					          {field:'nick_name', align:"center", title:"会计昵称",width:100},
					          {field:'ranking', align:"center", title:"会计等级",width:100},
					          {field:'email', align:"center", title:"邮箱",width:100},
					          {field:'maxcompanynumber', align:"center", title:"(以服务/最多服务)",width:100},
					          {field:'type', align:"center", title:"现场还是网络",width:100,formatter:function(value,row,index){
					        	  if (value =='1') {
					        			return "现场会计";
					        		} 
					        		if (value =='2') {
					        			return "网络会计";
					        		} 
					        		else {
					        			return "啥子会计";
					        		}
					        	  
					          }},
					          {field:'yclrk_shelves', align:"center", title:"注册时间",width:100},
					          {field:'email', align:"center", title:"手机号",width:100},
					          {field:'phone', align:"center", title:"操作",width:100}
					          ] 
					         ] 
				}); 
				var pager = $("#dx_accountant").datagrid("getPager"); 
				pager.pagination({ 
					total:data.length, 
					onSelectPage:function (pageNo, pageSize) { 
						var start = (pageNo - 1) * pageSize; 
						var end = start + pageSize; 
						$("#dx_accountant").datagrid("loadData", data.slice(start, end)); 
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
//根据类型查询
function getType1(){
	var getType=$("#selectAge option:selected").val();
	var type={	
			type:getType
	}
	doAsynchronousRequest({
		url:"getAccountType",
		data:JSON.stringify(type),
		mute:true,
		onSuccess:function(data){
			console.log(data);
			if(data==null)return true;
			var container=$(".datagrid-view #dx_accountant").prev().find(".datagrid-body table tbody");//找到对应的tag容器，渲染对应类型的科目
			console.log(container);
			//return false;
			if(data.length>0){
				var marker=container.find("tr").eq(0);
				container.html("");
				for(var index=0;index<data.length;index++){
					var temp = data[index];
					var liMarker=marker.clone(true);
					liMarker.attr("id","datagrid-row-r1-2-"+temp.id);
					liMarker.attr("datagrid-row-index",index);
					var item=liMarker.find("td");
					/*item.eq(0).find("div").html(temp.name);*/
					item.eq(1).find("div").html(temp.id);
					item.eq(2).find("div").html(temp.identityName);
					item.eq(3).find("div").html(temp.identityCard);
					item.eq(4).find("div").html(temp.nick_name);
					item.eq(5).find("div").html(temp.ranking);
					item.eq(6).find("div").html(temp.email);
					item.eq(7).find("div").html(temp.maxcompanynumber);
					item.eq(8).find("div").html(temp.type==1?"现场会计":"网络会计");
					item.eq(9).find("div").html(temp.email);
					item.eq(10).find("div").html(temp.phone);
					container.append(liMarker);
				}
			}
		}
	});
}
