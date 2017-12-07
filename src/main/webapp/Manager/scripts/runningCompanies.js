$(function(){
	init_company_table();
	$(".selector").click(function(){
		if(!confirm("这将初始化公司本月的科目余额表，确定执行这个操作吗？")){
			return false;
		}
		var comId=$(this).closest(".row").attr("id");
		set_selected_company(comId,1);
	});
	$(".row").click(function(){
		var comId=$(this).attr("id");
		set_selected_company(comId,0);
		$("#DataStorage",parent.document).html(JSON.stringify({id:comId,"flag":"manager"}));
		$("#DataStorage",parent.document).click();
	});
});
var localCompanies=null;
function init_company_table(){
	doAsynchronousRequest({
		url:"getRunningCompanies",
		mute:true,
		onSuccess:function(data){
			var blank=$(".row").clone(true);
			$(".tableBody").html("");
			$(data).each(function(rindex){
				var companyRow=blank.clone(true);
				companyRow.find(".customer").html(data[rindex].currentUser.name);
				companyRow.find(".company").html(data[rindex].name);
				companyRow.find(".shortName").html(data[rindex].shortName);
				companyRow.find(".setupTime").html(data[rindex].djrq);
				companyRow.find(".status").html("运行中......");
				companyRow.attr("id",data[rindex].id);
				$(".tableBody").append(companyRow);
			});
			localCompanies=data;
		}
	});
}
function timeFormat(time){
	var tzrq=new Date(time);
	return tzrq.getFullYear()+"-"+(tzrq.getMonth()+1)+"-"+tzrq.getDate();
}
function set_selected_company(comId,caller){
	var com={
		companyId:comId,
		flag:"periodInit"
	}
	doAsynchronousRequest({
		url:"setSelectedCompany",
		mute:true,
		data:JSON.stringify(com),
		onSuccess:function(){
			if(caller==1){
				$.messager.show({
			        title: '提示信息',
			        msg: '选中公司',
			        timeout: 500,
			        showType: 'fade',
			        style:{
						right:'',
						bottom:''
					}
			    });
			}
			$(localCompanies).each(function(){
				if(this.id==comId){
					parent.currentCompany=this;
					return false;
				}
			});
		}
	});
}