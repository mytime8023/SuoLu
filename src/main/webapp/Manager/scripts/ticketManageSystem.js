$(function(){
	init();
	$("#1").change(function(){
		var targetId=parseInt($(this).val());
		var secondLevel=null;
		var secondCounter=0;
		$("#2").html("");
		$("#3").html("");
		$("#3").append('<option value="0">请选择</option>');
		$(secondLeveClassList).each(function(i){
			if(targetId==this.pid){
				++secondCounter;
				if(secondCounter==1)secondLevel=this;
				$("#2").append('<option value="'+this.id+'">'+this.className+'</option>');
			}
		});
		$(thirdLeveClassList).each(function(){
			if(secondLevel.id==this.pid)$("#3").append('<option value="'+this.id+'">'+this.className+'</option>');
		});
	});
	$("#2").change(function(){
		var targetId=parseInt($(this).val());
//		$("#3").html("");
//		$("#3").append('<option value="0">请选择</option>');
//		$(thirdLeveClassList).each(function(){
//			if(targetId==this.pid)$("#3").append('<option value="'+this.id+'">'+this.className+'</option>');
//		});
		$(".table-body").html("");
		doAsynchronousRequest({
			url:"../commons/ticketSystem/getTicketTableForManager",
			tip:"正在获取数据...",
			mute:true,
			data:JSON.stringify({id:targetId}),
			onSuccess:function(data){
				ticketList=data;
				$("#solutionContainer")
				var ticket=$("#reporsitory").find(".table-body-row").eq(0).clone(true);
				$(data).each(function(){
					renderTicketTable(this,ticket.clone(true));
				});
			}
		});
	});
//	$("#3").change(function(){
//		var targetId=$(this).val();
//		$(".table-body").html("");
//		doAsynchronousRequest({
//			url:"../commons/ticketSystem/getTicketTableForManager",
//			tip:"正在获取.....",
//			mute:true,
//			data:JSON.stringify({id:targetId}),
//			onSuccess:function(data){
//				ticketList=data;
//				$("#solutionContainer")
//				var ticket=$("#reporsitory").find(".table-body-row").eq(0).clone(true);
//				$(data).each(function(){
//					renderTicketTable(this,ticket.clone(true));
//				});
//			}
//		});
//	});
	//创建回复
	var response=false;
	$(".response").click(function(){
		response=true;
	});
	//查看回复
	var previousRow=null;
	$(".table-body-row").click(function(){
		if(previousRow!=null)previousRow.removeClass("selected-row");
		$(this).addClass("selected-row");
		previousRow=$(this);
		var replyTicket=$("#replies .reply-ticket");
		if(replyTicket.length!=0){
			replyTicket.find(".reply-input").hide();
			replyTicket.hide();
		}
		var flag=$(this).attr("flag");
		var ticketId=$(this).attr("id");
		var foundContainer=$("#replies").find("> #"+ticketId);
		if(flag=="1"){
			if(foundContainer.length==0){
				doAsynchronousRequest({
					url:"../commons/ticketSystem/getMyReplies",
					tip:"正在获取回复......",
					mute:true,
					data:JSON.stringify({id:ticketId}),
					onSuccess:function(data){
						var tikcetContainer=$("#reporsitory").find(".reply-ticket").clone(true);
						replyContainer=tikcetContainer.find(".record").eq(0);
						tikcetContainer.attr("id",ticketId);
						var model=replyContainer.find(".reply").clone(true);
						replyContainer.find(".reply").remove();
						$(data).each(function(){
							renderReply(model.clone(true),this);
						});
						$("#replies").append(tikcetContainer);
					}
				});
			}else{
				foundContainer.show();
			}
			if(response){
				foundContainer.find(".reply-input").show();
				if(foundContainer.find(".read-reply").length!=0)foundContainer.find(".record").eq(0).removeClass("read-reply");
				response=false;
			}
		}else{
			if(foundContainer.length==0){
				if(response){
					var newContainer=$("#reporsitory").find(".reply-ticket").clone(true);
					newContainer.find(".reply-input").show();
					newContainer.attr("id",ticketId);
					newContainer.find(".reply").remove();
					newContainer.find(".record").eq(0).removeClass("read-reply");
					$("#replies").append(newContainer);
					response=false;
				}
			}else{
				foundContainer.show();
			}
		}
	});
	//保存回复信息
	$(".submit-message").click(function(){
		var currentContainer=$(this).closest(".reply-ticket");
		var textarea=$(this).closest(".button").prev().find("textarea");
		var reply={
			message:textarea.val(),
			ticket:{id:currentContainer.attr("id"),flag:1},
		}
		if(reply.message==""){
			layer.msg("回复不能为空！");
		}else{
			doAsynchronousRequest({
				url:"../commons/ticketSystem/replyToTicket",
				tip:"正在保存回复......",
				data:JSON.stringify(reply),
				onSuccess:function(data){
					if(data!=null){
						replyContainer=currentContainer.find(".record").eq(0);
						renderReply($("#reporsitory").find(".reply-ticket .reply").clone(true),data);
						layer.msg("保存成功！");
						textarea.val("");
					}else{
						layer.msg("保存失败！");
					}
				}
			});
		}
	});
});
var replyContainer=null;
var firstLeveClassList=new Array();
var secondLeveClassList=new Array();
var thirdLeveClassList=new Array();
function init(){
	doAsynchronousRequest({
		url:"../commons/ticketSystem/getTicketClassTable",
		mute:true,
		onSuccess:function(data){
			$(data).each(function(){
				switch(this.level){
				case 1:
					firstLeveClassList.push(this);
					break;
				case 2:
					secondLeveClassList.push(this);
					break;
				case 3:
					thirdLeveClassList.push(this);
					break;
				}
			});
			var secondLevel=null;
			var firstLevel=null;
			$(firstLeveClassList).each(function(i){
				if(i==0)firstLevel=this;
				$("#1").append('<option value="'+this.id+'">'+this.className+'</option>');
			});
			$(secondLeveClassList).each(function(i){
				if(i==0)secondLevel=this;
				if(firstLevel.id==this.pid)$("#2").append('<option value="'+this.id+'">'+this.className+'</option>');
			});
			$("#3").append('<option value="0">请选择</option>');
			$(thirdLeveClassList).each(function(){
				if(secondLevel.id==this.pid)$("#3").append('<option value="'+this.id+'">'+this.className+'</option>');
			});
		}
	});
}
function renderTicketTable(ticket,row){
	row.attr("id",ticket.id);
	row.attr("flag",ticket.flag);
	row.find(".code").html(getBitedNumber(ticket.id,6));
	row.find(".context").html(ticket.problem);
	row.find(".time").html(timeFormat(ticket.timeStamp,"timeStamp"));
	row.find(".status").html(getReadableStatus(ticket.status));
	row.find(".opteration").html();
	$(".table-body").append(row);
}
function getReadableStatus(status){
	var text=null;
	switch(status){
	case 0:
		text="未处理";
		break;
	case 1:
		text="处理中";
		break;
	case 2:
		text="已处理";
		break;
	case 3:
		text="未关闭";
		break;
	case 4:
		text="已关闭";
		break;
	case 5:
		text="待反馈";
		break;
	case 6:
		text="已反馈";
		break;
	}
	return text;
}
function renderReply(model,reply){
	model.attr("id",reply.id);
	if(reply.customer!=null){
		model.find(".user").html("回复人："+reply.customer.name);
	}else{
		if(reply.accountant!=null){
			model.find(".user").html("回复人："+reply.accountant.name);
		}else{
			model.find(".user").html("回复人："+reply.user.name);
		}
	}
	model.find(".time").html("回复时间："+timeFormat(reply.timeStamp,"timeStamp"));
	model.find(".msg").html(reply.message);
	replyContainer.append(model);
}