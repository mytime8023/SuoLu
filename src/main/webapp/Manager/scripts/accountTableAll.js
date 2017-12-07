
/*<th data-options="field:'ck',width:100,checkbox:true"></th>
			<th data-options="field:'id',width:100">公司编号</th>
			<th data-options="field:'name',width:100">公司名称</th>
			<th data-options="field:'address',width:100">公司地址</th>
			<th data-options="field:'type',width:100,formatter:barCode">公司类型</th>
			<th data-options="field:'online',width:100,formatter:barCode1">公司模式</th>
			<th data-options="field:'khyhzh',width:100">开户银行账号</th>
			<th data-options="field:'nsrsbh',width:120">纳税人识别号</th>
			<th data-options="field:'gszclx',width:100">公司注册类型</th>
			<th data-options="field:'yclrk_shelves',width:100">注册时间</th>
			<th data-options="field:'currentCustomer',width:100">公司客户</th>*/
$(function(){
	
	getAllAcountantA();
});

function getAllAcountantA(){ 
	doAsynchronousRequest({
		url:"getCompanyLp",
		mute:true,
		onSuccess:function(data){
			$("#dx_accountant").datagrid({ 
				title:"测试本地分页", 
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
				          {field:'online', align:"center", title:"公司类型",width:100,formatter:function(value,row,index){
				        	  if(value){
				       			return "线下公司"
				       		}
				        		else {
				        			return "线上公司";
				        		}  
				          }},
				          {field:'khyhzh', align:"center", title:"哈哈",width:100},
				          {field:'nsrsbh', align:"center", title:"纳税人编号",width:100},
				          {field:'gszclx', align:"center", title:"注册时间",width:100},
				          {field:'yclrk_shelves', align:"center", title:"ll",width:100},
				          {field:'currentCustomer', align:"center", title:"服务",width:100}
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
function getType(){
	/*var getType=$("#selectAge1 option:selected").val();
	console.log("哈啊哈"+getType);*/
	var type={	
			type:1
	}
	doAsynchronousRequest({
		url:"getCompanyLx",
		data:JSON.stringify(type),
		mute:true,
		onSuccess:function(data){
			$("#dx_accountant").datagrid({ 
				title:"测试本地分页", 
				toolbar:'#toolbar',
				rownumbers:true, 
				fitColumns:true, 
				pagination:true, 
				data:data.slice(0,10), 
				columns:[ 
				         [ 
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
				          {field:'online', align:"center", title:"公司类型",width:100,formatter:function(value,row,index){
				        	  if(value){
				       			return "线下公司"
				       		}
				        		else {
				        			return "线上公司";
				        		}  
				          }},
				          {field:'khyhzh', align:"center", title:"哈哈",width:100},
				          {field:'nsrsbh', align:"center", title:"纳税人编号",width:100},
				          {field:'gszclx', align:"center", title:"注册时间",width:100},
				          {field:'yclrk_shelves', align:"center", title:"ll",width:100},
				          {field:'currentCustomer', align:"center", title:"服务",width:100}
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