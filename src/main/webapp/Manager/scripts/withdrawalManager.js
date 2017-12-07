$(function(){
	init();
	
});
function init(){
	$(".table-body").html("");
	doAsynchronousRequest({
		url:"viewWithdraws",
		//cover:true,
		mute:true,
		onSuccess:function(data){
			var list=$("#reporsitory").find(".table-body-row").eq(0).clone(true);
			$(data).each(function(){
				renderWithdrawItem(this,list.clone(true));
			});
			// 处理成功
			$(".opteration a").on("click", function(){
				var withdrawId = parseInt($(this).parents(".table-body-row").attr("id"));
				layer.confirm("您确定该笔提现已经付款成功且对方已收到吗？<br>（该操作不可逆哦！）",{
					closeBtn:0,
					btn:["已到账","取消"],
					btn1:function(index){
						doAsynchronousRequest({
							url:"authenWithdrawDetail",
							data:JSON.stringify({id:withdrawId}),
							onSuccess:function(){
								location.reload();
							}
						});
						layer.close(index);
					},
					btn2:function(index){
						layer.close(index);
					}}
				);
			})
		}
	});
}
function renderWithdrawItem(data,row){
	row.attr("id",data.id);
	row.find(".id").html(data.id);
	row.find(".amount").html(data.amount/100);
	row.find(".status").html((data.status)?"申请中":"已处理");
	row.find(".message").html(data.message);
	row.find(".submitTime").html(data.submitTime);
	row.find(".payTime").html(data.payTime);
	row.find(".paid").html((data.paid)?"已处理":"待处理");
	var companyName = "— —";
	if(data.company!=null) companyName = data.company.name;
	row.find(".company").html(companyName);
	var accountantName = "— —";
	if(data.accountant!=null) accountantName = data.accountant.name;
	row.find(".accountant").html(accountantName);
	row.find(".opteration").html();
	$(".table-body").append(row);
	if(data.paid) row.find(".opteration").html("");
}