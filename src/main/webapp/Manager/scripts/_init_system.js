$(function(){
	$("input").mousedown(function(){
		$(this).css("background-color","#008040");
	});
	$("input").mouseup(function(){
		$(this).css("background-color","#004040");
	});
	$("#initSubjectAmounts").click(function(){
		init_subject_amount();
	});
	$("#initSubjects").click(function(){
		alert("hello,world");
	});
});
function init_subject_amount(){
	doAsynchronousRequest({
		url:"initCompany",
		mute:true,
		cover:false,
		onSuccess:function(data){
			$.messager.show({
		        title: '提示信息',
		        msg: data.response+": "+data.msg,
		        timeout: 500,
		        showType: 'fade',
		        style:{
					right:'',
					bottom:''
				}
		    });
		}
	});
}
function getStatus(){
	doAsynchronousRequest({
		url:"initSubjectAmount",
		mute:true,
		cover:false,
		onSuccess:function(data){
			if(data.status=="running"){
				$("#subjectAmountTerminal").append(data.msg);
				getStatus();
			}else{
				$("#subjectAmountTerminal").append("初始化完毕！");
			}
		}
	});
}