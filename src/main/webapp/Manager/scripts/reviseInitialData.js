$(function(){
	init_company_table();
	$(".tableBody").on('mouseover','.row',function(){
		$(this).css("background","#ffff80");
	});
	$(".tableBody").on('mouseout','.row',function(){
		$(this).css("background","#ffffff");
	});
	$(".tableBody").on('click','.row .options .revise',function(e){
		e.stopPropagation();
		if(!confirm("点击修改后，公司将中断运行状态。确认已经联系客户"))return false;
		var row=$(this).closest(".row");
		var comId=row.attr("id");
		set_selected_company(comId,row);
	});
})
var localCompanies=null;
function init_company_table(){
	doAsynchronousRequest({
		url:"getRunningCompanies",
		mute:true,
		onSuccess:function(data){
			var blank=$(".row").clone(true);
			$(".tableBody").html("");
			$(data).each(function(){
				var companyRow=blank.clone(true);
				companyRow.find(".customer").html(this.currentCustomer.name);
				companyRow.find(".company").html(this.name);
				companyRow.find(".shortName").html(this.shortName);
				companyRow.find(".setupTime").html(timeFormat(this.djrq,"年、月、日"));
				switch(this.status){
					case "2":
						companyRow.find(".status").html("等待匹配会计...");
						break;
					case "3":
						companyRow.find(".status").html("运行中...");
						break;
					case "4":
						companyRow.find(".status").html("修改公司数据...");
						break;
					case "5":
						companyRow.find(".status").html("等待会计确认......");
				}
				companyRow.attr("id",this.id);
				$(".tableBody").append(companyRow);
			});
			localCompanies=data;
		}
	});
}
function set_selected_company(comId,handler){
	var com={
		companyId:comId,
		flag:"revise"
	}
	doAsynchronousRequest({
		url:"setSelectedCompany",
		mute:true,
		data:JSON.stringify(com),
		onSuccess:function(){
			$(localCompanies).each(function(){
				if(this.id==comId){
					parent.clearLocalData("customer");
					this.status="4";
					parent.currentCompany=this;
					parent.selected=true;
					return false;
				}
			});
			handler.find(".status").html("修改公司数据...")
			layer.msg("成功选中公司，点击<科目期初数据>！");
		}
	});
}
function updateTable(){
	$(".tableBody").find("#"+parent.currentCompany.id).find(".status").html("运行中...");
	parent.currentCompany=null;
	parent.selected=false;
}