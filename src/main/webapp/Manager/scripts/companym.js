$(function(){
	init_panel();
});
//来个全查
function init_panel(){
	/*doAsynchronousRequest({
		url:"getCompanyLp",
		mute:true,
		onSuccess:function(data){
			$('#lp_company').datagrid('loadData',data.rows);
			var grid_data = {};
	        grid_data.total = data.total;
			console.log("data.result.total"+grid_data.total);
			$("#lp_company").datagrid("loaddata",{"total":data.total,rows:data.rows});
			$("#lp_company").datagrid({
				url:'getCompanyLp',
			    loadFilter: function(data){
			        var grid_data = {};
			        grid_data.total = data.result.length;
			        console.log("grid_data.total"+grid_data.total);
			        grid_data.rows = data.result;
			        console.log("grid_data.total"+grid_data.rows);
			        return grid_data;
			    }
			});
				
		}
	});*/
	doAsynchronousRequest({
		url:"getCompanyLp",
		mute:true,
		onSuccess:function(data){
			$("#lp_company").datagrid({ 
				title:"系统管理>>公司管理", 
				toolbar:'#toolbar',
				rownumbers:true, 
				fitColumns:true, 
				pagination:true, 
				data:data.slice(0,10), 
				columns:[ 
				         [ 
				          {field:"ck",width:100,checkbox:true},
				          {field:'id', align:"center", title:"编号",width:100},
				          {field:'name', align:"center", title:"公司名称",width:100},
				          {field:'address', align:"center", title:"公司地址",width:100},
				          {field:'type', align:"center", title:"公司类型",width:100,formatter:function(value,row,index){
				        	  if (value == '0') {
				        			return "小规模纳税人";
				        		} 
				        		if (value == '1') {
				        			return "一般纳税人";
				        		} 
				        		else {
				        			return "网络问题";
				        		} 
				          }},
				          {field:'online', align:"center", title:"公司模式",width:100,formatter:function(value,row,index){
				        	  if(value){
				       			return "线下公司"
				       		}
				        		else {
				        			return "线上公司";
				        		}  
				          }},
				          {field:'khyhzh', align:"center", title:"开户银行账号",width:100},
				          {field:'nsrsbh', align:"center", title:"纳税人识别号",width:100},
				          {field:'gszclx', align:"center", title:"公司注册类型",width:100},
				          {field:'currentCustomer', align:"center", title:"注册时间",width:100},
				          {field:'currentCustomer', align:"center", title:"公司客户",width:100},
				          ] 
				         ] 
			}); 
			var pager = $("#lp_company").datagrid("getPager"); 
			pager.pagination({ 
				total:data.length, 
				onSelectPage:function (pageNo, pageSize) { 
					var start = (pageNo - 1) * pageSize; 
					var end = start + pageSize; 
					$("#lp_company").datagrid("loadData", data.slice(start, end)); 
					pager.pagination('refresh', { 
						total:data.length, 
						pageNumber:pageNo 
					}); 
				} 
			}); 	
		}
	});
}
//根据类型查询
function getCompanyLx(){
	
	var getType=$("#selectAge1 option:selected").val();
	
	var type={	
			type:getType
	}
	doAsynchronousRequest({
		url:"getCompanyLx",
		data:JSON.stringify(type),
		mute:true,
		onSuccess:function(data){
			/*$("#lp_company").datagrid("loadData",{"total":data.length,rows:data});*/
			console.log(data);
			if(data==null)return true;
			var container=$(".datagrid-view #lp_company").prev().find(".datagrid-body table tbody");//找到对应的tag容器，渲染对应类型的科目
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
					item.eq(2).find("div").html(temp.name);
					item.eq(3).find("div").html(temp.address);
					item.eq(4).find("div").html(temp.type==0?"小规模纳税人":"一般纳税人");
					item.eq(5).find("div").html(temp.online==true?"线下公司":"线上公司");
					item.eq(6).find("div").html(temp.nsrsbh);
					item.eq(7).find("div").html(temp.gszclx);
					item.eq(8).find("div").html(temp.type==1?"哈哈":"嘻嘻");
					item.eq(9).find("div").html(temp.yclrk_shelves);
					/*item.eq(10).find("div").html(temp.phone);*/
					container.append(liMarker);
				}
			}                                                     
		}
	});
}
//根据模式查询
function getCompanyMs(){
	
	var getType=$("#selectAge option:selected").val();
	console.log("哈啊哈"+getType);
	var online={	
			online:getType
	}
	doAsynchronousRequest({
		url:"getCompanyMs",
		data:JSON.stringify(online),
		mute:true,
		onSuccess:function(data){
			console.log(data);
			if(data==null)return true;
			var container=$(".datagrid-view #lp_company").prev().find(".datagrid-body table tbody");//找到对应的tag容器，渲染对应类型的科目
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
					item.eq(2).find("div").html(temp.name);
					item.eq(3).find("div").html(temp.address);
					item.eq(4).find("div").html(temp.type==0?"小规模纳税人":"一般纳税人");
					item.eq(5).find("div").html(temp.online==true?"线下公司":"线上公司");
					item.eq(6).find("div").html(temp.nsrsbh);
					item.eq(7).find("div").html(temp.gszclx);
					item.eq(8).find("div").html(temp.type==1?"哈哈":"嘻嘻");
					item.eq(9).find("div").html(temp.yclrk_shelves);
					/*item.eq(10).find("div").html(temp.phone);*/
					container.append(liMarker);
				}
			}
		}
	});
}
//根据名称查询
function getCompanyNamexz(){
	
	var input_value=$("#input_id").val();
	var getType=$("#selectAge1 option:selected").val();
	var getType1=$("#selectAge option:selected").val();
	console.log("哈啊哈"+input_value);
	
	var name={	
			name:input_value
	}
	doAsynchronousRequest({
		url:"getCompanyName",
		data:JSON.stringify(name),
		mute:true,
		onSuccess:function(data){
			console.log(data);
			if(data==null)return true;
			var container=$(".datagrid-view #lp_company").prev().find(".datagrid-body table tbody");//找到对应的tag容器，渲染对应类型的科目
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
					item.eq(2).find("div").html(temp.name);
					item.eq(3).find("div").html(temp.address);
					item.eq(4).find("div").html(temp.type==0?"小规模纳税人":"一般纳税人");
					item.eq(5).find("div").html(temp.online==true?"线下公司":"线上公司");
					item.eq(6).find("div").html(temp.nsrsbh);
					item.eq(7).find("div").html(temp.gszclx);
					item.eq(8).find("div").html(temp.type==1?"哈哈":"嘻嘻");
					item.eq(9).find("div").html(temp.yclrk_shelves);
					/*item.eq(10).find("div").html(temp.phone);*/
					container.append(liMarker);
					/* $('#lp_company').datagrid('load'); */
				}
				/*$('#lp_company').datagrid( 'reload');*/
			/*	 $('#lp_company1').datagrid('load'); 
				$("#lp_company1" ).panel('refresh' )*/
			}
			else{
				location.reload();
				/*1.部分刷新:$(".content-east" ).panel('refresh' );
				2.表格数据加载:$('#lp_company').datagrid( 'reload');*/
			}
		}
	});
}

//根据名称查询
function getCompanyName(){
	var nameAll=$("#input_id").val();
	var getType=$("#selectAge1 option:selected").val();
	var online=$("#selectAge option:selected").val();
		
	if(online==0){
		console.log("haha mnoi"+getType+online+nameAll);
		var name={
			
				name:nameAll,
				type:getType		
		}
		doAsynchronousRequest({
			url:"getCompanyLx",
			data:JSON.stringify(name),
			mute:true,
			onSuccess:function(data){		
				$("#lp_company").datagrid({ 
					title:"系统管理>>公司管理", 
					toolbar:'#toolbar',
					rownumbers:true, 
					fitColumns:true, 
					pagination:true, 
					data:data.slice(0,10), 
					columns:[ 
					         [ 
					          {field:"ck",width:100,checkbox:true},
					          {field:'id', align:"center", title:"编号",width:100},
					          {field:'name', align:"center", title:"公司名称",width:100},
					          {field:'address', align:"center", title:"公司地址",width:100},
					          {field:'type', align:"center", title:"公司类型",width:100,formatter:function(value,row,index){
					        	  if (value == '0') {
					        			return "小规模纳税人";
					        		} 
					        		if (value == '1') {
					        			return "一般纳税人";
					        		} 
					        		else {
					        			return "网络问题";
					        		} 
					          }},
					          {field:'online', align:"center", title:"公司模式",width:100,formatter:function(value,row,index){
					        	  if(value){
					       			return "线下公司"
					       		}
					        		else {
					        			return "线上公司";
					        		}  
					          }},
					          {field:'khyhzh', align:"center", title:"开户银行账号",width:100},
					          {field:'nsrsbh', align:"center", title:"纳税人识别号",width:100},
					          {field:'gszclx', align:"center", title:"公司注册类型",width:100},
					          {field:'currentCustomer', align:"center", title:"注册时间",width:100},
					          {field:'currentCustomer', align:"center", title:"公司客户",width:100},
					          ] 
					         ] 
				}); 
				var pager = $("#lp_company").datagrid("getPager"); 
				pager.pagination({ 
					total:data.length, 
					onSelectPage:function (pageNo, pageSize) { 
						var start = (pageNo - 1) * pageSize; 
						var end = start + pageSize; 
						$("#lp_company").datagrid("loadData", data.slice(start, end)); 
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
			console.log("else没有")
			var name={
					online:online,
					identityName:nameAll,
					type:getType		
			}
		
		doAsynchronousRequest({
			url:"getCompanyName",
			data:JSON.stringify(name),
			mute:true,
			onSuccess:function(data){		
				$("#lp_company").datagrid({ 
					title:"系统管理>>公司管理", 
					toolbar:'#toolbar',
					rownumbers:true, 
					fitColumns:true, 
					pagination:true, 
					data:data.slice(0,10), 
					columns:[ 
					         [ 
					          {field:"ck",width:100,checkbox:true},
					          {field:'id', align:"center", title:"编号",width:100},
					          {field:'name', align:"center", title:"公司名称",width:100},
					          {field:'address', align:"center", title:"公司地址",width:100},
					          {field:'type', align:"center", title:"公司类型",width:100,formatter:function(value,row,index){
					        	  if (value == '0') {
					        			return "小规模纳税人";
					        		} 
					        		if (value == '1') {
					        			return "一般纳税人";
					        		} 
					        		else {
					        			return "网络问题";
					        		} 
					          }},
					          {field:'online', align:"center", title:"公司模式",width:100,formatter:function(value,row,index){
					        	  if(value){
					       			return "线下公司"
					       		}
					        		else {
					        			return "线上公司";
					        		}  
					          }},
					          {field:'khyhzh', align:"center", title:"开户银行账号",width:100},
					          {field:'nsrsbh', align:"center", title:"纳税人识别号",width:100},
					          {field:'gszclx', align:"center", title:"公司注册类型",width:100},
					          {field:'currentCustomer', align:"center", title:"注册时间",width:100},
					          {field:'currentCustomer', align:"center", title:"公司客户",width:100},
					          ] 
					         ] 
				}); 
				var pager = $("#lp_company").datagrid("getPager"); 
				pager.pagination({ 
					total:data.length, 
					onSelectPage:function (pageNo, pageSize) { 
						var start = (pageNo - 1) * pageSize; 
						var end = start + pageSize; 
						$("#lp_company").datagrid("loadData", data.slice(start, end)); 
						pager.pagination('refresh', { 
							total:data.length, 
							pageNumber:pageNo 
						}); 
					} 
				}); 
			}
		
		});
		}
	
}