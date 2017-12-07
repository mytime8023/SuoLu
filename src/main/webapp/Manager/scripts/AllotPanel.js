$(function(){
	init_panel();
	var selected_acc=null;//选中的会计
	var prevRow=null;
	$("#accountants .tbody .inner .row").click(function(){
		selected_acc=$(this);
		set_row_selected(prevRow,selected_acc);
		hilight_company_row(selected_acc.find('.rightCell').html());
		$("#selectedAccountant").val(selected_acc.find('.rightCell').html());
		$("#selectedAccountant").attr("accid",selected_acc.attr("accid"));
		prevRow=selected_acc;
	});
	var selected_com=null;//选中的公司
	$("#companies .tbody .inner .row").click(function(){
		selected_com=$(this);
		set_row_selected(prevRow,selected_com);
		$("#selectedCompany").val(selected_com.find(".rightCell").html());
		$("#selectedCompany").attr("comid",selected_com.attr("comid"));
		prevRow=selected_com;
	});
	$("#conect").click(function(){
		var allot_param ={
			company_id:$("#selectedCompany").attr("comid"),
			accountant_id:$("#selectedAccountant").attr("accid")
		}
		if(allot_param.company_id==undefined || allot_param.accountant_id==undefined){
			layer.msg("没有选择公司!",{time:1500})
			return false;
		}
		doAsynchronousRequest({
			url:"setConnection",
			mute:true,
			data:JSON.stringify(allot_param),
			onSuccess:function(){
				selected_acc.hide(600);
				selected_com.hide(600);
				$("#selectedAccountant").val("");
				$("#selectedCompany").val("");
				alert("分配成功！");
			}
		});
	});
})
function init_panel(){
	$(".shade .info",parent.document).html("正在获取公司和会计列表......");
	$(".shade",parent.document).show();
	var status=0;
	doAsynchronousRequest({
		url:"getAccountants",
		cover:false,
		onSuccess:function(accountants){
			++status;
			if(accountants==null){
				alert("没有可以分配的会计！");
				return false;
			}
			var blank=$("#accountants .tbody .inner .row").clone(true);
			var accContainer=$("#accountants .tbody .inner");
			accContainer.html("");
			$(accountants).each(function(i){
				if(accountants[i].accountantCompanies.length==0){
					var row=blank.clone(true);
					row.find(".rightCell").html(accountants[i].name);
					row.attr("accid",accountants[i].id);
					accContainer.append(row);
					return true;
				}
				$(accountants[i].accountantCompanies).each(function(k){
					var row=blank.clone(true);
					row.find(".rightCell").html(accountants[i].name);
					row.find(".leftCell").html(accountants[i].accountantCompanies[k].name);
					row.attr("accid",accountants[i].id);
					accContainer.append(row);
				});
			});
			if(status==2){
				$(".shade .info",parent.document).html("");
				$(".shade",parent.document).hide();
			}
		}
	});
	doAsynchronousRequest({
		url:"getCompanies",
		cover:false,
		onSuccess:function(companies){
			++status;
			if(companies==null){
				alert("没有待分配会计的公司！");
				return false;
			}
			var blank=$("#companies .tbody .inner .row").clone(true);
			var comContainer=$("#companies .tbody .inner");
			comContainer.html("");
			$(companies).each(function(i){
				var row=blank.clone(true);
				row.find(".leftCell").html(companies[i].accountant_name);
				row.attr("comid",companies[i].id);
				row.find(".rightCell").html(companies[i].name);
				comContainer.append(row);
			});
			if(status==2){
				$(".shade .info",parent.document).html("");
				$(".shade",parent.document).hide();
			}
		}
	});
}
function set_row_selected(prevRow,currentRow){
	var brother=currentRow.siblings(".selected");
	if(brother.length!=0){
		brother.removeClass("selected");
	}
	currentRow.addClass("selected");
	if(prevRow!=null){
		if(prevRow.attr("class")==currentRow.attr("class")){
			prevRow.removeClass("selected");
		}
	}
}
function hilight_company_row(selected_company){
	if(selected_company!=""){
		$("#companies .tbody .inner .selected").removeClass("selected");
		$("#companies .tbody .inner .row").each(function(){
			if($(this).find(".leftCell").html()==selected_company){
				$(this).addClass("selected");
			}
		});
	}
}