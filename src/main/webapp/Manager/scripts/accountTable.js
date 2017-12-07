
/*$(function(){
	init_table();

	$("select").click(function(e){e.stopPropagation();});
	$(".row").click(function(){
		currentAccountant=getCurrentAccountant($(this).attr("id"));
		parent.addTab("会计信息","UserInfo.html","user-info");
	});
});
var currentAccountant=null;
var accountantList=null;
function init_table(){
	doAsynchronousRequest({
		url:"getLockedAccountants",
		mute:true,
		onSuccess:function(accountant){
			accountantList=accountant;
			var blank=$(".row").clone(true);
			$("#tableBody").html("");
			//0：未审核；1：审核中；2：审核通过；3：审核未通过；4：补充审核中；5：补充审核未通过；6：补充资料中；
			var statusTxt=["未审核","审核中","通过","未通过","补审中","补审未通过","补充未审"];
			$(accountant).each(function(i){
				var row=$(blank).clone(true).show();
				var cell=$(row).find("td");
				row.attr("id",this.id);
				cell.eq(0).html(i+1);
				cell.eq(1).html(this.realName);
				cell.eq(2).html(this.name);
				cell.eq(3).html(this.email);
				cell.eq(4).html((this.companyCounter!=null?this.companyCounter:0)+"/"+(this.maxCompanyNumber!=null?this.maxCompanyNumber:"未设置"));
				cell.eq(5).html(statusTxt[this.status]);
				$("#tableBody").append(row);
			});
		}
	});
}
function set_accountant_unlocked(handler){
	var acc={
		id:handler.closest(".row").attr("id"),
		type:handler.closest("td").siblings().eq(5).find("select").val()
	}
	doAsynchronousRequest({
		url:"setAccountantUnlock",
		mute:true,
		data:JSON.stringify(acc),
		onSuccess:function(){
			layer.alert("授权成功！");
			handler.closest(".row").hide();
		}
	});
}
function set_accountant_locked(){
	doAsynchronousRequest({
		url:"setAccountantlocked",
		mute:true,
		data:JSON.stringify(acc),
		onSuccess:function(accountant){
			layer.alert("锁定成功！");
		}
	});
}
function getCurrentAccountant(targetId){
	targetId=parseInt(targetId);
	var acc=null;
	$(accountantList).each(function(){
		if(this.id==targetId){
			acc=this;
			return false;
		}
	});
	return acc;
}
function updateTable(targetId){
	$("#tableBody").find("#"+targetId).remove();
}
*/

$(function(){
	init_table();

	/*$("select").click(function(e){e.stopPropagation();});*/
/*	$(".liMarker").click(function(){
		currentAccountant=getCurrentAccountant($(this).attr("id"));
		parent.addTab("会计信息","UserInfo.html","user-info");
	});*/
});
var currentAccountant=null;
var accountantList=null;
var targetId1;
function getCurrentAccountant1(targetId){
	currentAccountant=getCurrentAccountant(targetId);
	parent.addTab("会计信息","UserInfo.html","user-info");
}
function init_table(){
	doAsynchronousRequest({
		url:"getLockedAccountants",
		mute:true,
		onSuccess:function(accountant){
			$("#dx_accountant").datagrid({
				url:'getLockedAccountants',
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
	});
}
function set_accountant_unlocked(handler){
	var acc={
		id:handler.closest(".row").attr("id"),
		type:handler.closest("td").siblings().eq(5).find("select").val()
	}
	doAsynchronousRequest({
		url:"setAccountantUnlock",
		mute:true,
		data:JSON.stringify(acc),
		onSuccess:function(){
			layer.alert("授权成功！");
			handler.closest(".row").hide();
		}
	});
}
function set_accountant_locked(){
	doAsynchronousRequest({
		url:"setAccountantlocked",
		mute:true,
		data:JSON.stringify(acc),
		onSuccess:function(accountant){
			layer.alert("锁定成功！");
		}
	});
}
function getCurrentAccountant(targetId){
	targetId=parseInt(targetId);
	console.log("targetId"+targetId);
	console.log("进入方法没有");
	var acc=null;
	$(accountantList).each(function(){
		if(this.id==targetId){
			acc=this;
			return false;
		}
	});
	return acc;
}
function updateTable(targetId){
	$("#tableBody").find("#"+targetId).remove();
}