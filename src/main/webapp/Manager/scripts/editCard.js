var cardId="";
var Sub;
var srkId;		//全局输入框ID变量
var lrkmkId;	//全局录入科目匡ID
var sxkmId;		//所选科目ID
var now_time;	//实时日期
var return_response;	//返回值
$(function(){
	get_gsbm();
	request_subjects();
	var url = location.href;
	requestString = url.substring(url.indexOf("?")+1,url.length);
	if(requestString == "newCard"){
		var date = new Date();
		var now_month;
		var now_day;
		if(date.getMonth()+1<10){
			now_month = "-0"+(date.getMonth()+1);
		}else{
			now_month = "-"+(date.getMonth()+1);
		}
		if(date.getDate()<10){
			now_day = "-0"+(date.getDate());
		}else{
			now_day = "-"+(date.getDate());
		}
		now_time = date.getFullYear()+now_month+now_day;
		$("#record-period").val(now_time);
	}else{
		$("#update_state").show();
		$("#renew").hide();
		cardId=requestString;
		cardInit();
	}
	// ---------------------------科目下拉框-----------------------------------
	// 显示科目列表
	var nodeLi=$("#PopListBox_Subject .popListArea");
	$("[subjectInput]").click(function() {
		srkId = $(this).attr("id");
		lrkmkId = $(this).attr("id");
		var left = $(this).offset().left;
		var top = $(this).offset().top + 31;
		$("#PopListBox_Subject").css({left : left,top : top}).show();
		$(".addSubject").show();
		nodeLi.find("li").each(function(){
			$(this).show();
		});
	});
	//*****************新增科目上级科目***********************
	$("#parentSubject").click(function() {
		srkId = "parentSubject";
		var left = $(this).offset().left;
		var top = $(this).offset().top + 31;
		$("#PopListBox_Subject").css({left : left,top : top}).show();
		nodeLi.find("li").each(function(){
			$(this).show();
		});
	});
	//点击科目列表时
	$("#PopListBox_Subject .popListArea").on('mousedown','li',function(){
		var a =$(this).text();
		$("#"+srkId).val(a);
		Sub = $(this).attr("code");
		sxkmId = $(this).attr("id");
		$("#PopListBox_Subject").hide();
	});
	//-----------------显示匹配的的科目，隐藏不匹配的科目----------------------------
	$("[keyboard]").bind("input propertychange",function(){
		var a=$(this).val();
		nodeLi.find("li").each(function(){
			if($(this).text().indexOf(a)==0){
				$(this).show();
			}else{
				$(this).hide();
			}
		})
		nodeLi.find("li:visible").first().removeClass().addClass('selected').siblings().removeClass().addClass('unselected');
		
	});
	//**********************************键盘控制科目输入*********************************
	$("[keyboard]").keydown(function(event){ 
		var e = event || window.event; 
		var k = e.keyCode || e.which; 
		switch(k) { 
			case 38:
				if($("#PopListBox_Subject").is(":visible")){
					var a=$("#PopListBox_Subject .popListArea .selected").index()-1;
					if(a>=0){
						$("#PopListBox_Subject .popListArea li:eq("+a+")").removeClass().addClass('selected').siblings().removeClass().addClass('unselected');
					}
				}
			break;
			case 40: 
				if($("#PopListBox_Subject").is(":visible")){
					var a=$("#PopListBox_Subject .popListArea .selected").index()+1;
					$("#PopListBox_Subject .popListArea li:eq("+a+")").removeClass().addClass('selected').siblings().removeClass().addClass('unselected');
				}
			break;
			case 13:
				if($("#PopListBox_Subject").is(":visible")){
					var b = $("#PopListBox_Subject .popListArea .selected").text();
					$("#"+srkId).val(b);
					Sub = $("#PopListBox_Subject .popListArea .selected").attr("code");
					sxkmId = $("#PopListBox_Subject .popListArea .selected").attr("id");
					$("#PopListBox_Subject").hide();
				}
			break;
		} 
		
	}) 
	// ---------------------------公司部门下拉框-----------------------------------
	$("#department").click(function() {
		$("#PopListBox_Summary").show();
		var left = $(this).offset().left;
		var top = $(this).offset().top + 31;
		$("#PopListBox_Summary").css({
			left : left,
			top : top
		}).show();
	});
	//-------------------------------随鼠标焦点改变格式----------------------------
	$(".popListArea").on('mouseover','li',function(){
		$(this).removeClass().addClass('selected').siblings().removeClass().addClass('unselected');
	});
	//------------------------------选定部门并复制到输入框--------------------------------
	$("#PopListBox_Summary .popListArea").on('mousedown','li',function(){
		var a = $(this).text();
		$("#department").val(a);
		$("#PopListBox_Summary").hide();
	});
	//-------------------------------------保存-------------------------------------------
	$("#save").click(function(){
		save_card();
	})
	//-----------------------------------保存并新增---------------------------------------
	$("#renew").click(function(){
		save_card();
		if(return_response=="success"){
			$("#assets-number").val("");
			$("#assets-name").val("");
			$("#record-period").val(now_time);
			$("#department").val("");
			$("#start-period").val("");
			$("#clearperoid").val("");
			$("#expected-period").val("0");
			$("#assets-subject").val("");
			$("#depreciation-subject").val("");
			$("#depreciation-fee-subject").val("");
			$("#original-value").val("0.00");
			$("#residual-rate").val("0.00");
			$("#residual-value").val("0.00");
			$("#depreciation-reserves").val("0.00");
			$("#depreciation-period").val("0");
			$("#opening-depreciation").val("0.00");
			$("#net-value").val("0.00");
			$("#month-depreciation").val("0.00");
			$("#assets-note").val("");
		}
	})
	//-----------------------------清理和取消清理卡片----------------------
	$("#update_state").click(function(){
		var kpzt = $("#card-state").val();
		if(kpzt == "正常使用"){
			$("#card-state").val("已清理");
			$("#update_state").text("取消清理");
			$("#clearperoid").val(getNowPeriod());
		}
		if(kpzt == "已清理"){
			$("#card-state").val("正常使用");
			$("#update_state").text("清理卡片");
			$("#clearperoid").val("");
		}
	});
	//----------------------------------新增部门---------------------------------------
	$(".addGsbm").click(function(){
		$('#tab_new_gsbm').dialog('open').dialog('setTitle','新部门');
		$(".panel-tool-close").show();
		$('#fm_new_gsbm').form('clear');
	})
	//---------------------------------新增科目---------------------------------
	$(".addSubject").click(function(){
		$('#tab_new_subject').dialog('open').dialog('setTitle','新科目');
		$(".addSubject").hide();
		$(".panel-tool-close").hide();
		$('#fm_new_subject').form('clear');
	})
	//日期切换时
	$("#start-period").bind("input propertychange",function(e){

	});
	//------------------------------------点击页面其他地方进行的操作---------------------------------------
	$(".default").click(function(){
		var targetRe = event.target;
		if(targetRe.id!="PopListBox_Summary" && targetRe.id!="department"){
			var zcyz = $("#original-value").val();
			var czl = $("#residual-rate").val()/100;
			var yjsyqx = $("#expected-period").val();
			var jzzb = $("#depreciation-reserves").val();
			var yzjqj = $("#depreciation-period").val();
			var qcljzj = $("#opening-depreciation").val();
			$("#PopListBox_Summary").hide();
			$("#residual-value").val((zcyz*czl).toFixed(2));
			$("#net-value").val((zcyz-jzzb-qcljzj).toFixed(2));
			//年限平均法算每月折旧
			if($("#depreciation-method").val()==$("#nxpjf").val()){
				var yjcz = $("#residual-value").val();
				$("#month-depreciation").val(((zcyz-yjcz)/yjsyqx).toFixed(2));
				if($("#month-depreciation").val()=="Infinity" || $("#month-depreciation").val()=="NaN"){
					$("#month-depreciation").val(0.00);
				}
			}
		}
		if(targetRe.id!=srkId && targetRe.id!="PopListBox_Subject"){
			$("#PopListBox_Subject").hide();
		}
	});
})
function card_kssyrq(dp){
	var old_date = dp.cal.getDateStr();
	var new_date = dp.cal.getNewDateStr();
}
//********************************加载公司部门****************************************
function get_gsbm(){
	$.ajax({
		type:'POST',
		url:'../accountant/getGsbm',
		contentType:'application/json',
		datatype:'json',
		async:false,
		success:function(data) {
			$("#department").html("");
			$(data).each(function(index){
				var marker="<li class=\"PopListBoxItem unselected\" bmbh='"+ data[index].bmbh +"' name='" + data[index].name + "'>"+
					data[index].name+"</li>";
				$("#PopListBox_Summary .popListArea").append(marker);
			});
		}
	});
}
//********************************新增部门************************************************
function create_gsbm(){
	var gsbm={bmbh:$("#assistingNumber").val(),name:$("#assistingName").val()};
	var json_data = JSON.stringify(gsbm);
	$.ajax({
		type:'POST',
		url:'../accountant/create_gsbm',
		contentType:'application/json',
		datatype:'json',
		data:json_data,
		async:true,
		success:function(data) {
			if(data.response=="error"){
				alert(data.msg);
			}else{
				$("#department").val($("#assistingName").val());
				$('#tab_new_gsbm').dialog('close');
				var marker="<li class=\"PopListBoxItem unselected\" bmbh='"+ $("#assistingNumber").val() +"' name='" + $("#assistingName").val() + "'>"+
				$("#assistingName").val()+"</li>";
				$("#PopListBox_Summary .popListArea").append(marker);
			}
		}
	});
}
//********************************************新增科目*******************************************
function create_subject(){
	var subject = {
			subjectName:$("#subjectName").val(),
			subjectCode:Sub,
			subjectId:sxkmId
		}
	var json_data = JSON.stringify(subject);
	$.ajax({
		type:'POST',
		url:'../saveChildrenSubject',
		contentType:'application/json',
		datatype:'json',
		data:json_data,
		async:true,
		success:function(data){
			$("#"+lrkmkId).val(data.code + " " + data.fullName);
			$('#tab_new_subject').dialog('close');
			var marker="<li class=\"PopListBoxItem unselected\" id="+data.id+" code="+ data.code +">"+data.code+" "+data.fullName+"</li>";
			if(Sub+"01" == data.code){	//如果是第一个下级科目
				$('[code="'+ Sub +'"]').after(marker);0
			}else{
				$('[code="'+ (data.code-1) +'"]').after(marker);
			}
		}
	})
}
//********************************************加载选择科目表******************************************
function request_subjects(){
	$.ajax({
		type:'POST',
		url:'../accountant/getSubject',
		contentType:'application/json',
		datatype:'json',
		async:false,
		success:function(data) {
			subjects = data;
			$(data).each(function(index){
				if(data[index].childNumber<1){
					var marker="<li class=\"PopListBoxItem unselected\" id="+data[index].id+" code="+ data[index].code +">"+data[index].code+" "+data[index].fullName+"</li>";
					$("#PopListBox_Subject .popListArea").append(marker);
				}
			});
		}
	});
}
//********************************************加载所有科目表******************************************
function request_all_subjects(){
	$.ajax({
		type:'POST',
		url:'../accountant/getSubject',
		contentType:'application/json',
		datatype:'json',
		async:false,
		success:function(data) {
			subjects = data;
			$(data).each(function(index){
				var marker="<li class=\"PopListBoxItem unselected\" id="+data[index].id+" code="+ data[index].code +">"+data[index].code+" "+data[index].fullName+"</li>";
				$("#PopListBox_Subject .popListArea").append(marker);
			});
		}
	});
}
//******************************************保存卡片*****************************************
function save_card(){
	var kpzt;
	if($("#card-state").val()=="正常使用"){
		kpdzt="1";
	}else{
		kpdzt="0";
	}
	var card = {
			id:cardId,
			zcbm:$("#assets-number").val(),
			name:$("#assets-name").val(),
			zclb_name:$("#assets-class").val(),
			lrqj:$("#record-period").val(),
			kpzt:kpdzt,
			gsbm_name:$("#department").val(),
			kssyqj:$("#start-period").val(),
			qlqj:$("#clearperoid").val(),
			zjff_name:$("#depreciation-method").val(),
			yjsyqx:$("#expected-period").val(),
			gdzckm_name:$("#assets-subject").val(),
			ljzjkm_name:$("#depreciation-subject").val(),
			zjfykm_name:$("#depreciation-fee-subject").val(),
			zcyz:$("#original-value").val(),
			czl:$("#residual-rate").val(),
			cyjz:$("#residual-value").val(),
			jzzb:$("#depreciation-reserves").val(),
			ysyqx:$("#depreciation-period").val(),
			qcljzj:$("#opening-depreciation").val(),
			qcjz:$("#net-value").val(),
			myzj:$("#month-depreciation").val(),
			remark:$("#assets-note").val()
	};
	var json_data = JSON.stringify(card);
	$.ajax({
		type:'POST',
		url:'../accountant/saveCard',
		contentType:'application/json',
		datatype:'json',
		data:json_data,
		async:false,
		success:function(data) {
			return_response=data.response;
			alert(data.msg);
		}
	});
}
//*************************************初始化修改卡片页面*************************************
function cardInit(){
	var id={id:cardId}
	$.ajax({
		type:'POST',
		url:'../accountant/get_card',
		contentType:'application/json',
		datatype:'json',
		data:JSON.stringify(id),
		async:false,
		success:function(data){
			if(data.kpzt=="1"){
				$("#card-state").val("正常使用");
				$("#clean_card").text("清理卡片");
			}else{
				$("#card-state").val("已清理");
				$("#clean_card").text("取消清理");
			}
			$("#assets-number").val(data.zcbm);
			$("#assets-name").val(data.name);
			$("#assets-class").val(data.zclb_name);
			$("#record-period").val(data.lrqj);
			$("#department").val(data.gsbm_name);
			$("#start-period").val(data.kssyqj);
			$("#clearperoid").val(data.qlqj);
			$("#depreciation-method").val(data.zjff_name);
			$("#expected-period").val(data.yjsyqx);
			$("#assets-subject").val(data.gdzckm_name);
			$("#depreciation-subject").val(data.ljzjkm_name);
			$("#depreciation-fee-subject").val(data.zjfykm_name);
			$("#original-value").val(data.zcyz);
			$("#residual-rate").val(data.czl);
			$("#residual-value").val(data.cyjz);
			$("#depreciation-reserves").val(data.jzzb);
			$("#depreciation-period").val(data.ysyqx);
			$("#opening-depreciation").val(data.qcljzj);
			$("#net-value").val(data.qcjz);
			$("#month-depreciation").val(data.myzj);
			$("#assets-note").val(data.remark);
		}
	});
}
