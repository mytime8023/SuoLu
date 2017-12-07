var flag_cbjzxz = "0";	//成本结转标志
var currentCompany=parent.currentCompany;
$(function(){
	init_company_table();
	$(".tableBody").on('mouseover','.row',function(){
		$(this).css("background","#ffff80");
	});
	$(".tableBody").on('mouseout','.row',function(){
		$(this).css("background","#ffffff");
	});
	//选中公司，执行初始化
	$(".init").click(function(e){
		e.stopPropagation();
		var selectRow=$(this).closest(".row");
		var comId=selectRow.attr("id");
		if(comId=="0"){
			layer.msg(tip_e8);
			return false;
		}
		var c_name=selectRow.find(".shortName:first");
		if(c_name.html()==""){//公司没有简称先设置简称
			layer.confirm(tip_e1,{
				btns:["设置简称","等一下"],
				btn1:function(index){
					layer.close(index);
					shortNameClickHandler(c_name);
				},
				btn2:function(index){
					layer.close(index);
				}
			});
			return false;
		}
		var tempcompany=getCompanyById(comId);
		layer.confirm("当前公司的建账月份："+tempcompany.startPeriod+"，确定使用该期间值吗？若不确定，请先到修改公司信息处确认或修改后再执行当前操作！",function(index){
			layer.close(index);
			set_selected_company({
				comId:comId,
				opt:"init",
				onSuccess:function(data){
					parent.clearLocalData("customer");
					parent.currentCompany=tempcompany;
					parent.selected=true;
					parent.localSubjects=data;
					$("#dynamicEvents",parent.document).html("checkBill");
					$("#dynamicEvents",parent.document).click();
				}
			});
		});
	});
	$(".row").click(function(){
		var handler=$(this);
		var comId=handler.attr("id");
		if(comId=="0"){
			layer.msg(tip_e8);
		}else{
			layer.confirm("这个操作将会让你去审核并完善公司信息，现在就去吗？",{
				icon:6,
				title:"小算易财税平台提示",
				btn:["审核公司信息","取消"],
				btn1:function(index){
					layer.close(index);
					set_selected_company({
						comId:comId,
						opt:"select",
						onSuccess:function(){
							var option={cover:"false",mode:"readwrite",refresh:true,comId:comId};
							$("#DataStorage",parent.document).html(JSON.stringify(option));
							parent.openCompanyDialog(option);
							$("#dynamicEvents",parent.document).html("checkBill");
							$("#dynamicEvents",parent.document).click();
						}
					});
				},
				btn2:function(index){
					layer.close(index);
				}
			});
		}
	});
	//选中公司，让公司重新上传（公司会计发现,无法完成初始化，需要重新上传）
	$(".redo").click(function(e){
		e.stopPropagation();
		var comId=$(this).closest(".row").attr("id");
		if(comId=="0"){
			layer.msg(tip_e8);
			return false;
		}else{
			setCompanyUploadAgain(comId,$(this));
			currentCompany=getCompanyById(comId);
		}
	});
	$(".shortName").click(function(e){
		e.stopPropagation();
		shortNameClickHandler($(this));
	});
	$("input").change(function(){
		var selectedId=$(this).closest(".row").attr("id");
		var com={id:selectedId,shortName:$(this).val()};
		doAsynchronousRequest({
			url:"setCompanyShortName",
			tip:"正在保存公司的简称...",
			data:JSON.stringify(com),
			onComplete:function(){
				currentCompany=getCompanyById(selectedId);
				currentCompany.shortName=com.shortName;
				//此时parent.currentCompany为null
				//parent.currentCompany.shortName=com.shortName;
			}
		});
	});
	$("input").blur(function(){
		setCompanyShortname($(this));
	});
});
function setCompanyShortname(input){
	var editor=input.closest(".editor");
	editor.hide();
	editor.prev().show();
	editor.prev().html(input.val());
}
var localCompanies=null;
function init_company_table(){
	$(".shade .info",parent.document).html("正在获取公司列表数据......");
	$(".shade",parent.document).show();
	doAsynchronousRequest({
		url:"getNewCompanies",
		cover:false,
		mute:true,
		onSuccess:function(data){
			$(".shade",parent.document).hide();
			$(".shade .info",parent.document).html("");
			var blank=$(".row").clone(true);
			$(".tableBody").html("");
			$(data).each(function(rindex){
				var companyRow=blank.clone(true);
				companyRow.find(".customer").html(this.currentCustomer.name);
				companyRow.find(".company").html(this.name);
				companyRow.find(".shortName").eq(0).html(this.shortName).next().find("input").val(this.shortName);
				companyRow.find(".setupTime").html(timeFormat(this.djrq));
				if(data[rindex].status=="0"){
					companyRow.find(".status").html("单据上传中...");
					companyRow.attr("id","0");
				}else{
					companyRow.find(".status").html("单据上传完毕！");
					companyRow.attr("id",data[rindex].id);
					if(this.type==null || this.sdslx==null){
						companyRow.attr("check","N");
					}else{
						companyRow.attr("check","Y");
					}
					
				}
				$(".tableBody").append(companyRow);
			});
			localCompanies=data;
		}
	});
}
function set_selected_company(option){
	var com={
			companyId:option.comId,
			flag:option.opt
		}
	$(".shade .info",parent.document).html("正在创建公司初始化数据......");
	$(".shade",parent.document).show();
	doAsynchronousRequest({
		url:"setSelectedCompany",
		cover:false,
		timeout:600000,//10分钟
		mute:true,
		data:JSON.stringify(com),
		onSuccess:function(data){
			parent.clearLocalData("customer");
			if(option.onSuccess!=null)option.onSuccess(data);
			layer.msg("成功选中公司，点击<科目期初数据>！",{time:1500});
		},
		onComplete:function(){
			$(".shade",parent.document).hide();
			$(".shade .info",parent.document).html("");
		}
	});
}
function setCompanyUploadAgain(comId,handler){
	var com={
		id:comId,
		message:null
	}
	layer.prompt({
		  	formType:2,
		  	title:"留言板"
		},function(value,index){
			com.message=value;
			layer.close(index);
			$(".shade .info",parent.document).html("正在重新设置公司为上传单据状态...");
			$(".shade",parent.document).show();
			doAsynchronousRequest({
				url:"setCompanyUploadAgain",
				cover:false,
				mute:true,
				data:JSON.stringify(com),
				onSuccess:function(){
					handler.closest(".row").attr("id",0).find(".status").html("单据上传中...");
				},
				onComplete:function(){
					$(".shade",parent.document).hide();
					$(".shade .info",parent.document).html("");
				}
			});
		}
	);
}
function updateTable(){
	$("#xzcbjzlx",parent.document).click();
	$(".tableBody").find("#"+parent.currentCompany.id).remove();
	parent.currentCompany=null;
	parent.selected=false;
}
function shortNameClickHandler(handler){
	var selectedId=handler.closest(".row").attr("id");
	if(selectedId==0){
		layer.msg(tip_e8,{time:1500});
		return false;
	}
	var editor=handler.next();
	editor.show();
	editor.find("input").focus();
	if(handler.html()!="")editor.find("input").val(handler.html());
	handler.hide();
}
function getCompanyById(comId){
	comId=parseInt(comId);
	var com=null;
	$(localCompanies).each(function(){
		if(this.id==comId){
			com=this;
			return false;
		}
	});
	return com;
}