$(function(){
	layer.config({
	    extend:"../../scripts/layer/extend/layer.ext.js"
	});
	// 获取需要应急处理的公司列表
	doAsynchronousRequest({
		url:"../Manager/getEmergencyCompanies",
		mute:true,
		onSuccess:function(data){
			//console.log("data",data);
			var blankRow=$("#tablebody-container tr").clone(true).show();
			$(data).each(function(i){
				var blank=blankRow.clone(true);
				blank.attr("data-id",this.id);
				blank.find("td").eq(0).html(this.id);
				blank.find("td").eq(1).html(this.company.name);
				blank.find("td").eq(2).html(this.cause);
				blank.find("td").eq(3).html(timeFormat(this.djrq,"timeStamp"));
				blank.find("td").eq(4).html((this.status=="1"?"已完成":"待鉴定"));
				$("#tablebody-container tbody").append(blank);
			});
		}
	});
	// 触发鉴定结果
	$(".emergency").on("click",function(){
		var sfyw=$(this).attr("data-sfyw");
		var emergencyId=$(this).closest("tr").attr("data-id");
		layer.prompt({
			title : '请简要说明鉴定结果，供客户知晓',
			formType : 2
		},function(msg,index){
			layer.close(index);
			doAsynchronousRequest({
				url:"../Manager/judgeEmergency",
				mute:true,
				data:JSON.stringify({id:emergencyId,sfyw:sfyw,effect:msg}),
				onSuccess:function(data){
					pslog({data:data});
					location.href="emergency.html";
				}
			});
		});
	});
});