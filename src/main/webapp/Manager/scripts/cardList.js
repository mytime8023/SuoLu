var cardId="";
$(function(){
	getCard();
	//新增卡片
	$("#add").click(function() {
		parent.addCard();
	});
	//修改卡片
	$("#update").click(function() {
		if(cardId==""){
			layer.msg("请选择需要修改的卡片！",{time:2000});
		}else{
			$("#DataStorage",parent.document).html(cardId);
			parent.editCard();
		}
	});
	//删除
	$("#delete").click(function(){
		if(confirm("确定删除该卡片吗？")){
			delete_card(cardId);
		}
	})
	//刷新
	$("#refresh").click(function(){
		getCard();
	})
})
//-----------------------------------------------卡片初始化且取值展示-------------------------------------------------
function getCard(){
	doAsynchronousRequest({
		url:"../accountant/getCards",
		mute:true,
		data:JSON.stringify({"zclb":"0","gsbm":"0"}),
		onSuccess:function(data) {
			if(data.length==0){
				//初始化表格
				$("#card_tbody").html("");
				layer.msg("暂无卡片！",{time:2000});
			}else{
				$("#card_tbody").html("");
				$(data).each(function(i){
					var kpzt;
					if(data[i].kpzt=="1"){
						kpzt="正常使用";
					}else{
						kpzt="已清理";
					}
					var zclb = getZclbName(data[i].zclb);
					var gsbm = getGsbmName(data[i].gsbm);
					var zjff = getZjffName(data[i].zjff);
					var card='<tr role="row" tabindex="-1" class="ui-widget-content jqgrow ui-row-ltr" cardId="'+data[i].id+'">'
						+'<td role="gridcell" style="text-align: center;width: 5%" aria-describedby="grid_number">' 
						+ data[i].zcbm + '</td>'
						+'<td role="gridcell" style="text-align: center;width: 7%" aria-describedby="grid_name">' 
						+ data[i].name + '</td>'
						+'<td role="gridcell" style="text-align: center;width: 7%" aria-describedby="grid_count">' 
						+ data[i].zcsl + '</td>'
						+'<td role="gridcell" style="text-align: center;width: 8%" aria-describedby="grid_typeName">' 
						+ zclb + '</td>'
						+'<td role="gridcell" style="text-align: center;width: 6%" aria-describedby="grid_departmentName">' 
						+ gsbm + '</td>'
						+'<td role="gridcell" style="text-align: right;width: 6%" aria-describedby="grid_orgval">'
						+ formatNumber(data[i].zcyz.toFixed(2)) + '</td>'
						+'<td role="gridcell" style="text-align: right;width: 6%" aria-describedby="grid_orgval">'
						+ formatNumber(data[i].ljzj.toFixed(2)) + '</td>'
						+'<td role="gridcell" style="text-align: right;width: 6%" aria-describedby="grid_orgval">'
						+ formatNumber(data[i].jz.toFixed(2)) + '</td>'
						+'<td role="gridcell" style="text-align: right;width: 6%" aria-describedby="grid_perdepreciation">'
						+ formatNumber(data[i].myzj.toFixed(2)) + '</td>'
						+'<td role="gridcell" style="text-align: center;width: 9%" aria-describedby="grid_lifeperiods">'
						+ data[i].yjsyqx + '</td>'
						+'<td role="gridcell" style="text-align: right;width: 8%" aria-describedby="grid_goneperiods">'
						+ data[i].ysyqx + '</td>'
						+'<td role="gridcell" style="text-align: right;width: 6%" aria-describedby="grid_salvagerate">'
						+ data[i].czl + '</td>'
						+'<td role="gridcell" style="text-align: center;width: 7%" aria-describedby="grid_deprmethod">'
						+ zjff + '</td>'
						+'<td role="gridcell" style="text-align: center;width: 6%" aria-describedby="grid_state">'
						+ kpzt + '</td>'
						+'<td role="gridcell" style="text-align: center;width: 7%" aria-describedby="grid_clearperoid">'
						+ data[i].qlqj + '</td></tr>'
					$("#card_tbody").append(card);
					//点击选定
					$(".ui-row-ltr").on("click",function(){
						$(".ui-row-ltr").each(function(){
							$(this).removeClass("ui-state-highlight")
						});
						$(this).addClass("ui-state-highlight");
						cardId = $(this).attr("cardId");
					});
				});
			}
		}
	});
}
//----------------------------删除卡片----------------------------------------
function delete_card(cardId){
	doAsynchronousRequest({
		url:"../accountant/cleanCard",
		mute:true,
		data:JSON.stringify({"id":cardId}),
		onSuccess:function(data) {
			layer.msg(data.msg,{time:2000});
			getCard();
		}
	});
}
//---------------------------新增卡片后添加行-----------------------------------------
function addRow(data){
	var kpzt;
	if(data.kpzt=="1"){
		kpzt="正常使用";
	}else{
		kpzt="已清理";
	}
	var zclb = getZclbName(data.zclb);
	var gsbm = getGsbmName(data.gsbm);
	var zjff = getZjffName(data.zjff);
	var card='<tr role="row" tabindex="-1" class="ui-widget-content jqgrow ui-row-ltr" cardId="'+data.id+'">'
			+'<td role="gridcell" style="text-align: center;width: 5%" aria-describedby="grid_number">' 
			+ data.zcbm + '</td>'
			+'<td role="gridcell" style="text-align: center;width: 7%" aria-describedby="grid_name">' 
			+ data.name + '</td>'
			+'<td role="gridcell" style="text-align: center;width: 7%" aria-describedby="grid_count">' 
			+ data.zcsl + '</td>'
			+'<td role="gridcell" style="text-align: center;width: 8%" aria-describedby="grid_typeName">' 
			+ zclb + '</td>'
			+'<td role="gridcell" style="text-align: center;width: 6%" aria-describedby="grid_departmentName">' 
			+ gsbm + '</td>'
			+'<td role="gridcell" style="text-align: right;width: 6%" aria-describedby="grid_orgval">'
			+ formatNumber(data.zcyz.toFixed(2)) + '</td>'
			+'<td role="gridcell" style="text-align: right;width: 6%" aria-describedby="grid_orgval">'
			+ formatNumber(data.ljzj.toFixed(2)) + '</td>'
			+'<td role="gridcell" style="text-align: right;width: 6%" aria-describedby="grid_orgval">'
			+ formatNumber(data.jz.toFixed(2)) + '</td>'
			+'<td role="gridcell" style="text-align: right;width: 6%" aria-describedby="grid_perdepreciation">'
			+ formatNumber(data.myzj.toFixed(2)) + '</td>'
			+'<td role="gridcell" style="text-align: center;width: 9%" aria-describedby="grid_lifeperiods">'
			+ data.yjsyqx + '</td>'
			+'<td role="gridcell" style="text-align: right;width: 8%" aria-describedby="grid_goneperiods">'
			+ data.ysyqx + '</td>'
			+'<td role="gridcell" style="text-align: right;width: 6%" aria-describedby="grid_salvagerate">'
			+ data.czl + '</td>'
			+'<td role="gridcell" style="text-align: center;width: 7%" aria-describedby="grid_deprmethod">'
			+ zjff + '</td>'
			+'<td role="gridcell" style="text-align: center;width: 6%" aria-describedby="grid_state">'
			+ kpzt + '</td>'
			+'<td role="gridcell" style="text-align: center;width: 7%" aria-describedby="grid_clearperoid">'
			+ data.qlqj + '</td></tr>'
	$("#card_tbody").append(card);
}