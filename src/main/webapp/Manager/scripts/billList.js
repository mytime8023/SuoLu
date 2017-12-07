var billList=new Array();
var currentBill=null;
$(function(){
	init_bill_frame();
	$(".picView").click(function(){
		$(".current-picture").removeClass("current-picture");
		setCurrentBillSelected($(this).attr("id"));
		$("#bill",parent.document).html(JSON.stringify({billList:billList}));
		$("#picInfo").html(JSON.stringify({id:$(this).attr("id"),fileName:$(this).find("img").attr("src").split("/")[1]}));
		$("#poplayer",parent.document).click();
	});
	$(".bill-del").click(function(e){
		e.stopPropagation();
		var billHandler=$(this);
		layer.confirm("这将永久这张单据，继续此操作吗？",{icon:3,title:"小算易财税平台提示"},function(index){
			//是
			layer.close(index);
			var billName=billHandler.next().attr("src").split("/")[1];
			var billContainer=billHandler.closest(".billcontainer");
			var bill={
				billName:billName,
				id:billContainer.attr("id")
			}
			doAsynchronousRequest({
				url:"../Customer/deleteSingleBill",
				tip:"正在删除单据......",
				mute:true,
				data:JSON.stringify(bill),
				onSuccess:function(){
					billHandler.closest(".picView").remove();
					layer.msg("删除成功！",{time:1000});
				}
			});
		});
	});
	var windowHandler=null;
	$(".new-window").click(function(e){
		e.stopPropagation();
		var filename=$(this).siblings("img").attr("src").split("/")[1];
		$(".current-picture").removeClass("current-picture");
		setCurrentBillSelected($(this).closest(".picView").attr("id"));
		if(windowHandler==null){
			windowHandler=open("../commons/imageWindow/imageWindow.htm?current="+filename,filename);
		}else{
			if(windowHandler.closed){
				windowHandler=open("../commons/imageWindow/imageWindow.htm?current="+filename,filename);
			}else{
				windowHandler.location.href="../commons/imageWindow/imageWindow.htm?current="+filename;
				windowHandler.focus();
			}
		}
	});
});
function init_bill_frame(){
	doAsynchronousRequest({
		url:"getBillRecord",
		tip:"正在加载单据列表......",
		mute:true,
		onSuccess:function(billRecord){
			billList=billRecord;
			if(billRecord.length!=0){
				var picView=$(".picView").clone(true);
				var cols=$(".picFrame .column");
				var index=0;
				$(billRecord).each(function(i){
					if(index==6)index=0;
					picView=picView.clone(true).show();
					picView.find("img").attr("src","getBillImage/"+billRecord[i].filename+"/png/initial");
					picView.attr("id",billRecord[i].id);
					cols.eq(index).append(picView);
					index++;
				});
			}else{
				layer.msg(tip_e9,{time:2500});
			}
			if(parent.localSubjects!=null){
				$("#dynamicEvents",parent.document).html("initSubjects");
				$("#dynamicEvents",parent.document).click();
			}
		}
	});
}
function setCurrentBillSelected(bid){
	$(".current-picture").removeClass("current-picture");
	currentBill=$(".column").find("#"+bid);
	currentBill.addClass("current-picture");
}