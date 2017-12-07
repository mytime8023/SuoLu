var localSubjects=null;
var currentCompany=parent.currentCompany;
var valueBeforeChange=0;
$(function(){
	init_table();
	var balance=null;
	$("#gridScroller").on("click","#gridScroller input",function(){
		$(this).select();
	});
	$("#send").click(function(){
		var current=$(this);
		layer.confirm(tip_e6,function(index){
			if(currentCompany.sdslx==null){
				layer.alert("请点击公司所在的行，选择公司的所得税类型");
				return false;
			}
			if(currentCompany.type==null){
				layer.alert("请点击公司所在的行，选择公司的类型");
				return false;
			}
			if(balance){
				var option=current.attr("option");
				if(option=="1" || option=="4"){
					sava_initial_data(current,option);
				}else{
					layer.msg("已经完成初始化，不能再点击!",{time:1500});
				}
			}else{
				if(balance==null){
					layer.close(index);
					layer.alert("请先测算金额是否平衡");
					return false;
				}
				if(!balance)layer.alert("借贷不平衡，请重新计算");
			}
		});
	});
	$("#gridScroller").on('mouseover','.row',function(){
		$(this).css("background-color","#e9e2de");
		$(this).find(".subCode .add").show();
		$(this).find(".subName .del").show();
		$(this).find(".subName .addUnit").show();
	});
	$("#gridScroller").on('mouseout','.row',function(){
		$(this).css("background-color","#ffff80");
		$(this).find(".subCode .add").hide();
		$(this).find(".subName .del").hide();
		$(this).find(".subName .addUnit").hide();
	});
	//------------------------------键盘方向键切换单元格---------------------------------
	$("#gridScroller").on('keydown','input',function(e){
		var current_cell=$(this).closest(".subData")
		if(e.keyCode==39){
			if(current_cell.next()==null){
				current_cell=current_cell.find(".qcye");
			}
			current_cell.next().find("input").focus();
			$(this).blur();
		}
		if(e.keyCode==37){
			if(current_cell.prev()==null){
				current_cell=current_cell.find(".ncye");
			}
			current_cell.prev().find("input").focus();
			$(this).blur();
		}
	});
	//--------------------------分级添加科目表----------------------------
	$("#gridScroller").on('click','.add',function(){
		var currentRow=$(this).closest(".row");
		var subjectCode=$.trim(currentRow.find(".subCode span").text());
		parentRow=currentRow;
		var blankRow=blank.clone(true);
		var maxNode=null;
		var myRow=currentRow;
		var maxChild=null;
		while(true){
			myRowCode=$.trim(myRow.find(".subCode span").text())
			if(subjectCode.length==myRowCode.length-2){//最大子科目的编码值
				maxNode=maxChild=myRow;
			}
			if(myRowCode.indexOf(subjectCode)!=0){//最大的子科目的节点
				maxNode=myRow.prev();
				break;
			}
			myRow=myRow.next();
			if(myRow.length==0)break;//如果到了科目表的最后一行，就退出循环。
		}
		var maxCode=null;
		if(maxChild==null){//没有子节点
			maxNode=currentRow;
			maxCode=$.trim(maxNode.find(".subCode span").text())+"01";
		}else{//有子节点
			maxCode=$.trim(maxChild.find(".subCode span").text());
			//maxCode=childNode.find(".subCode span").text()
			maxCode=parseInt(maxCode)+1;
		}
		blankRow.attr("typeId",currentRow.attr("typeId"));
		blankRow.attr("cn","0");
		blankRow.attr("ref","0");
		blankRow.attr("proto","1");
		blankRow.find(".subData input").val("0.00");
		var tab="";
		for(var i=0;i<(($.trim(maxCode+"")).length-4)/2;i++){
			tab=tab+"&nbsp;";
		}
		blankRow.find(".subCode").html('<span>'+tab+maxCode+'</span><div class="add"></div>');
		blankRow.find(".subName").html('<div class="del"></div><span><input></input></span><div class="addUnit" title="启动数量单价式" style="display: none;"></div>');
		if(currentRow.find(".subDirection").html()=="借"){
			blankRow.find(".subDirection").html("借");
		}else{
			blankRow.find(".subDirection").html("贷");
		}
		blankRow.attr("newCode",maxCode);
		if(currentRow.attr("cn")=="0"){
			var temp_parent_cell=currentRow.find(".subData");
			var temp_child_cell=blankRow.find(".subData");
			temp_child_cell.eq(0).find("input").val(temp_parent_cell.eq(0).find("input").val());
			temp_child_cell.eq(1).find("input").val(temp_parent_cell.eq(1).find("input").val());
			temp_child_cell.eq(2).find("input").val(temp_parent_cell.eq(2).find("input").val());
			temp_child_cell.eq(3).find("input").val(temp_parent_cell.eq(3).find("input").val());
		}
		maxNode.after(blankRow);
		maxNode.next().find(".subName span input").focus();
	});
	$("#gridScroller").on("blur",".subName input",function(){
		if($(this).val()=="")$(this).change();//新增的科目没有名字的情况
	});
	$("#gridScroller").on("change",".subName input",function(){
		var handler=$(this).closest(".row");
		var parentRow=get_parent_subjects(handler);//返回所有的父科目
		if($(this).val()==""){
//PX
			var tag = $(this);
			layer.confirm('科目名称为空将被删除，确定删除吗？',{
				btn:["确定","取消"],
				btn1:function(index){
					layer.close(index);
					if(handler.attr("number")==undefined){
						tag.closest(".row").remove();
					}else{
						handler.find(".subName .del").click();
					}
					//parentRow[0].find(".subData input").removeAttr("disabled");
					//var childNumber=parseInt(parentRow[0].attr("cn"));
					//if(childNumber>0) parentRow[0].attr("cn",childNumber-1);
				},
				btn2:function(index){
					layer.close(index);
					tag.focus();
				}
			});
//原逻辑
//			if(confirm("科目名称为空将被删除，确定删除吗？")){
//				if(handler.attr("number")==undefined){
//					$(this).closest(".row").remove();
//				}else{
//					handler.find(".subName .del").click();
//				}
//				handler.find(".subData input").attr("disabled",false);
//				if(parentRow[0].attr("cn")!="0")parentRow[0].attr("cn",parseInt(parentRow[0].attr("cn"))-1);
//				$(this).closest(".row").remove();
//			}else{
//				$(this).focus();
//			}
		}else{
			if(handler.attr("number")==undefined){
				save_new_subject(handler,parentRow[0].attr("number"));
			}else{
				subName={
					id:handler.attr("number"),
					message:$(this).val()
				}
				doAsynchronousRequest({
					url:"changeSubjectName",
					data:JSON.stringify(subName),
					tip:"正在保存科目名称......",
					onSuccess:function(){
						balance=null;
					}
				});
			}
		}
	});
	//-------------------删除科目-----------------------
	$("#gridScroller").on("click",".subName .del",function(e){
		var handler=$(this).closest(".row");
//原逻辑（原始科目已移除删除和修改组名的按钮）
//		if(handler.attr("proto")=="0"){
//			layer.msg("该科目是一个原始科目，不能被删除!",{time:2000});
//			return false;
//		}
		if(handler.attr("ref")=="1"){
			layer.msg("本条科目已被引用，不能删除这条科目记录!",{time:1500});
			return false;
		}
		if(handler.attr("cn")!="0"){
			layer.msg("该科目是一个父科目，不能被删除!",{time:2000});
			return false;
		}
		layer.confirm("您确定要删除该科目？",{
			btn:["删除","取消"],
			btn1:function(index){
				layer.close(index);
				//var cells=new Array();
				//返回所有的父系科目
				var parentRow=get_parent_subjects(handler);
				//console.log(parentRow);
				if(parentRow.length!=0){
		//PX
					//若最近[0]父科目的子科目数量childNumber不为0
					var childNumber=parseInt(parentRow[0].attr("cn"));
					if(childNumber>0){
						//删除后若最近父科目没有子科目了，则恢复可编辑状态
						if(childNumber==1){
							parentRow[0].find(".subData input").removeAttr("disabled");
							//parentRow[0].find(".subData input").attr("disabled",false);
						}
						parentRow[0].attr("cn",childNumber-1);
					}
		//原逻辑
//					if(parentRow[0].attr("cn")!="0"){
//						parentRow[0].attr("cn",parseInt(parentRow[0].attr("cn"))-1);
//						if(parentRow[0].attr("cn")=="0"){
//							//删除后若最近父科目没有子科目了，则恢复可编辑状态
//							parentRow[0].find(".subData input").attr("disabled",false);
//						}
//					}
					//父系科目根据删除时的子科目对应列的值减少相等的值
					var tmp_cell=handler.find(".subData input");
					$(parentRow).each(function(i){
						var parentCell=parentRow[i].find(".subData input");
						$(parentCell).each(function(k){
							var parentValue=parseFloat(parentCell.eq(k).val());
							if(parentValue!=0){
								//alert(parentValue+".."+parseFloat(tmp_cell.eq(k).val()));
								var value=parentValue-parseFloat(tmp_cell.eq(k).val());
								parentCell.eq(k).val(value==0?"0.00":value.toFixed(2));
							}
						});
					});
				}
				var parentSubject=get_subject_data(parentRow);
				var subToDelete={
					subjects:parentSubject,
					subjectId:handler.attr("number")
				}
				//console.log(subToDelete);
				doAsynchronousRequest({
					url:"deleteSubject",
					data:JSON.stringify(subToDelete),
					mute:true,
					tip:"正在删除科目......",
					onSuccess:function(data){
						//console.log("deleteSubject",data);
						balance=null;
						handler.remove();
						//原逻辑
//						var code = data[0].code.substring(0,4);
//						if(code=="1405" || code=="5001" || code=="5401"){
//							linkageDeleteSub();
//							//location.href="initSubjects.html";
//						}
						// PX
						$(data).each(function(i){
							if(currentCompany.cbjzlx=="1"){
								var firstCode = data[i].code.substring(0,4);
								if(firstCode=="1405" || firstCode=="5001" || firstCode=="5401"){
									linkageDeleteSub(data[i]);//需要联动删除的科目
								}
							}
						});
					},
				});
			},
			btn2:function(index){
				layer.close(index);
			}
		});
		e.stopPropagation();
	});
	//启用数量单价式
	$("#gridScroller").on("click",".subName .addUnit",function(){
		var handler=$(this);
		var row=handler.closest(".row");
		if(row.attr("cn")!="0"){
			layer.msg("父科目不能启用数量单价式！",{time:2000});
			return false;
		}
		if(row.attr("ref")!="0"){
			layer.msg("被引用的科目不能启用数量单价式！",{time:2000});
			return false;
		}
//PX
		layer.prompt({
			title : '请输入科目单位',
			value: row.find(".subUnit").text(), //初始时的值，默认空字符
			formType : 0
		}, function(unit, index) {
			layer.close(index);
			var data={
					message:unit,
					subjectId:row.attr("number")
				}
			if(unit.length>0){
				doAsynchronousRequest({
					url:"setUnitToSubject",
					data:JSON.stringify(data),
					tip:"正在保存单位......",
					mute:true,
					onSuccess:function(){
						balance=null;
						handler.closest(".subName").siblings(".subUnit").html(unit);
					},
				});
			}
		});
//原逻辑
//		var unit=prompt("请输入单位","");
//		var data={
//				message:unit,
//				subjectId:row.attr("number")
//			}
//		if(unit=="null" || unit==null){
//			return false;
//		}
//		doAsynchronousRequest({
//			url:"setUnitToSubject",
//			data:JSON.stringify(data),
//			tip:"正在保存单位......",
//			mute:true,
//			onSuccess:function(){
//				balance=null;
//				handler.closest(".subName").siblings(".subUnit").html(unit);
//			},
//		});
	});
	//-----------------------实时保存科目数据----------------------
//PX
//	$("#gridScroller").on("click",".subData input",function(){
//		var tempVal=$(this).val();
//		if(tempVal==""){
//			tempVal=0;
//			valueBeforeChange=tempVal.toFixed(2);
//		}else{
//			valueBeforeChange=parseFloat(tempVal).toFixed(2);
//		}
//	});
//原逻辑
	$("#gridScroller").on("focus",".subData input",function(){
		valueBeforeChange=parseFloat($(this).val());
	});
	$("#gridScroller").on("change",".subData input",function(){
		var input=$(this);
		var tempVal=input.val();
		if(tempVal==""){
			input.val("0.00");
			tempVal=0;
		}else{
			if($.isNumeric(tempVal)){
				tempVal=parseFloat(tempVal);
				input.val(tempVal.toFixed(2));
			}else{
				input.val(valueBeforeChange);//如果用户输入非数字字符，这个输入框继续存放以前的值
				return false;
			}
		}
		var label=input.attr("class");
		var row=input.closest(".row");
		var currentDirection=row.find(".subDirection").html();
		var parentRows=get_parent_subjects(row);
		var cells=new Array();
		if(parentRows.length!=0){
			var size=parentRows.length;
			for(var i=0;i<size;i++){
				var myRow=parentRows[i];
				var cell=myRow.find(".subData ."+label);
				var parentVal=parseFloat(cell.val());
				if(label=="qcye" || label=="ncye"){
					if(currentDirection==myRow.find(".subDirection").html()){
						cell.val((parentVal-valueBeforeChange+tempVal).toFixed(2));
					}else{
						cell.val((parentVal+valueBeforeChange-tempVal).toFixed(2));
					}
				}else{
					cell.val((parentVal-valueBeforeChange+tempVal).toFixed(2));
				}
				cells.push(generate_cell(cell));
			}
		}
		valueBeforeChange=tempVal.toFixed(2);
		cells.push(generate_cell(input));
		var mypackage={
			subjects:cells
		}
		doAsynchronousRequest({
			url:"suspendAndSaveSubject",
			data:JSON.stringify(mypackage),
			tip:"正在保存科目数据......",
			mute:true,
			onSuccess:function(data){
				balance=null;
			}
		});
	});
	//-------------------------试算平衡-----------------------
	$("#tryBalance").click(function(){
		$("#dialogHeader #title").html("试算平衡");
		var qcSumLend=0.0;
		var ncSumLend=0.0;
		var qcSumLoan=0.0;
		var ncSumLoan=0.0;
		var lendSum=0.0;
		var loanSum=0.0;
		$(".row").each(function(i){
			if($.trim($(this).find(".subCode span").text()).length==4){
				var cell=$(this).find(".subData");
				var qcye=cell.find(".qcye").val();
				var ncye=cell.find(".ncye").val();
				var jflj=cell.find(".jflj").val();
				var dflj=cell.find(".dflj").val();
				lendSum=lendSum+parseFloat(jflj==""?0:jflj);
				loanSum=loanSum+parseFloat(dflj==""?0:dflj);
				if($(this).find(".subDirection").html()=="借"){
					qcSumLend=qcSumLend+parseFloat(qcye==""?0:qcye);
					ncSumLend=ncSumLend+parseFloat(ncye==""?0:ncye);
				}else{
					qcSumLoan=qcSumLoan+parseFloat(qcye==""?0:qcye);
					ncSumLoan=ncSumLoan+parseFloat(ncye==""?0:ncye);
				}
			}
		});
		var handler=$("#dialogContainer .rows").eq(0);
		row=handler.clone(true);
		row.find(".name").html("期末：");
		qcSumLend=qcSumLend.toFixed(2);
		qcSumLoan=qcSumLoan.toFixed(2);
		var tmpBalance=new Array();
		if(qcSumLend==qcSumLoan){
			row.find(".content").html("借贷平衡");
			tmpBalance.push(true);
		}else{
			row.find(".content").html("借："+qcSumLend+"  贷："+qcSumLoan).css("color","red");
			tmpBalance.push(false);
		}
		$("#dialogContainer").append(row.show());
		row=handler.clone(true);;
		row.find(".name").html("年初：");
		ncSumLend=ncSumLend.toFixed(2);
		ncSumLoan=ncSumLoan.toFixed(2);
		if(ncSumLend==ncSumLoan){
			row.find(".content").html("借贷平衡");
			tmpBalance.push(true);
		}else{
			row.find(".content").html("借："+ncSumLend+"  贷："+ncSumLoan).css("color","red");
			tmpBalance.push(false);
		}
		$("#dialogContainer").append(row.show());
		row=handler.clone(true);
		row.find(".name").html("发生累计：");
		lendSum=lendSum.toFixed(2);
		loanSum=loanSum.toFixed(2);
		if(lendSum==loanSum){
			row.find(".content").html("借贷平衡");
			tmpBalance.push(true);
		}else{
			row.find(".content").html("借："+lendSum+"  贷："+loanSum).css("color","red");
			tmpBalance.push(false);
		}
		if(tmpBalance[0] && tmpBalance[1] && tmpBalance[2]){
			balance=true;
		}else{
			balance=false;
		}
		$("#dialogContainer").append(row.show());
		$("#dialog").show();
	});
	$("#closeDialog").click(function(){
		$("#dialogContainer .rows").each(function(){
			if($(this).is(":visible"))$(this).remove();
		});
		$("#dialog").hide();
		if(balance){
			layer.msg("借贷平衡，您可以进行提交!",{time:2000});
		}else{
			if(!balance)layer.alert("借贷不平衡，请重新计算");
		}
	});
})
var blank=null;
function init_table(){
	if(currentCompany!=null){
		$(".shade .info",parent.document).html("正在获取公司初始化科目表......");
		$(".shade",parent.document).show();
		blank=$(".row").clone(true);
		$("#gridScroller").html("");
		// 不用缓存中的科目数据，直接新开TAB即获取
		/*if(parent.localSubjects!=null){
			renderSubjectTable(parent.localSubjects);
			return false;
		}*/
		//请求所有科目数据 
		doAsynchronousRequest({
			url:"getAllSubjects",
			timeout:600000,
			tip:"正在获取科目期初数据...",
			mute:true,
			cover:false,
			onSuccess:function(data){
				localSubjects=data;
				parent.subjectList=data;
				renderSubjectTable(data);
			},
			onComplete:function(){
				$(".shade .info",parent.document).html("");
				$(".shade",parent.document).hide();
			}
		});
	}else{
		layer.msg("请先选择公司！",{time:2000});
	}
}
function renderSubjectTable(data){
	$("#send").attr("option",currentCompany.status);
	$("#title").html(currentCompany.shortName+"--期初数据");
	$(data).each(function(rindex){
		var subjectRow=blank.clone(true);
		subjectRow.attr("number",this.id);
		subjectRow.attr("typeId",this.subjectType_id);
		subjectRow.attr("ref",this.referenced);
		subjectRow.attr("cn",this.childNumber);
		subjectRow.attr("proto",this.protoSubject);
		var tab="";
		for(var i=0;i<((this.code+"").length-4)/2;i++){
			tab=tab+"&nbsp;";
		}
		subjectRow.find(".subCode").html('<span>'+tab+this.code+'</span><div class="add" title="新增子科目"></div>');
		if(this.protoSubject=="0"){//若是原始科目则不可编辑
			subjectRow.find(".subName input").attr("disabled",true);
			//.addUnit .del
			subjectRow.find(".subName .del").remove();
			subjectRow.find(".subName .addUnit").remove();
		}
		subjectRow.find(".subName input").val(this.name);
		this.direction==1?subjectRow.find(".subDirection").html("借"):subjectRow.find(".subDirection").html("贷");
		subjectRow.find(".subUnit").html(this.unit==null?"":this.unit);
		if(this.childNumber!=0)subjectRow.find(".subData input").attr("disabled",true);
		subjectRow.find(".qcye").val(this.qcye==0?"0.00":this.qcye);
		subjectRow.find(".jflj").val(this.jflj==0?"0.00":this.jflj);
		subjectRow.find(".dflj").val(this.dflj==0?"0.00":this.dflj);
		subjectRow.find(".ncye").val(this.ncye==0?"0.00":this.ncye);
		$("#gridScroller").append(subjectRow);
	});
	$(".shade .info",parent.document).html("");
	$(".shade",parent.document).hide();
}
//-------------------------------保存期初数据-----------------------------------
function sava_initial_data(handler,option){
	layer.confirm(tip_e7,{
		btn:["已完成","再看看"],
		btn1:function(index){
			layer.close(index);
			var subjectInitialData={
					subjects:new Array()
				}
			$(".shade .info",parent.document).html("正在创建公司余额表......");
			$(".shade",parent.document).show();
			doAsynchronousRequest({
				url:"finishInitSubjectData",//保存新增的科目
				data:JSON.stringify(subjectInitialData),
				cover:false,
				mute:true,
				onSuccess:function(){
					$(".shade",parent.document).hide();
					$(".shade .info",parent.document).html("");
					handler.attr("option",3);
					if(option=="1")handler.attr("option","2");
					if(option=="4")handler.attr("option","5");
					//提醒公司列表页面及时删除已经初始化公司的记录以免用户再次点击，产生重复操作
					if(option=="1"){
						parent.frames["initialCompanes"].updateTable();
					}else{
						parent.frames["runningCompanes"].updateTable();
					}
					parent.$("#tabs").tabs("close","科目的期初数据");
					parent.clearLocalData("customer");
					layer.alert("初始化完成！");
				},
				onGlobalException:function(data){
					$(".shade",parent.document).hide();
					$(".shade .info",parent.document).html("");
					layer.alert(data.msg);
				}
			});
		},
		btn2:function(index){
			layer.close(index);
		}
	});
}
//上传并保存增加的科目
function save_new_subject(handler,parentSubId){
	var newSubjects=new Array();
	if(handler.find(".subDirection").html()=="借"){
		var dir=1;
	}else{
		var dir=2;
	}
	var newSub={
		id:handler.attr("number"),
		code:handler.attr("newCode"),
		name:handler.find(".subName span input").val(),
		direction:dir,
		cjrq:get_year_date(),
		protoSubject:1,
		childNumber:0,
		referenced:0,
		yxbz:'Y',
		subjectForm:{id:1},
		subjectType:{id:handler.attr("typeId")}
	}
	newSubjects.push(newSub);
	var userSubjects={
		subjectId:parentSubId,
		subjects:newSubjects
	}
	doAsynchronousRequest({
		url:"saveNewSubject",//保存新增的科目
		data:JSON.stringify(userSubjects),
		mute:true,
		tip:"正在保存新科目...",
		onSuccess:function(data){
			var refreshBz = 0;
//原逻辑
//			$(data).each(function(i){
//				if(data[i].parentId==parseFloat(parentSubId)){
//					var parent=handler.prev();
//					if(parent.attr("number")==parentSubId){//把父科目的属性设置为当前子科目的属性
//						handler.find(".subUnit").html(parent.find(".subUnit").text());
//						handler.find(".subData").eq(0).find("input").val(parent.find(".subData").eq(0).find("input").val());
//						handler.find(".subData").eq(1).find("input").val(parent.find(".subData").eq(1).find("input").val());
//						handler.find(".subData").eq(2).find("input").val(parent.find(".subData").eq(2).find("input").val());
//						handler.find(".subData").eq(3).find("input").val(parent.find(".subData").eq(3).find("input").val());
//						handler.attr("ref",data[i].referenced);
//						parent.find(".subUnit").html("");
//					}
//				}
//				if(currentCompany.cbjzlx=="1"){
//					var firstCode = data[i].code.substring(0,4);
//					//联动增加科目
//					if(firstCode=="1405" || firstCode=="5001" || firstCode=="5401"){
//						refreshBz = refreshBz + 1;
//					}
//				}
//			})
//			if(refreshBz>0){
//				location.href="initSubjects.html";
//			}
//PX
			var parent=null;
			$("#gridScroller .row").each(function(){
				if($(this).attr("number")==parentSubId){
					parent=$(this);
					return false;
				}
			})
			parent.attr("cn",parseInt(parent.attr("cn"))+1);
			parent.find(".subData input").attr("disabled",true);
			$(data).each(function(i){
				if(this.parentId==parseFloat(parentSubId)){
					//if(parent.attr("number")==parentSubId){//把父科目的属性设置为当前子科目的属性
					handler.find(".subUnit").html(parent.find(".subUnit").text());
					handler.attr("ref",this.referenced);
					handler.attr("number",this.id);
					parent.find(".subUnit").html("");
					//}
				}else{
					if(currentCompany.cbjzlx=="1"){
						var firstCode = this.code.substring(0,4);
						if(firstCode=="1405" || firstCode=="5001" || firstCode=="5401"){
							linkageCreateSub(this);//需要联动增加科目
						}
					}
				}
			});
		},
		onGlobalException:function(data){
			handler.remove();
			layer.alert(data.msg);
		}
	});
}
function get_subject_data(parentSubjects){
	var subjects=[];
	$(parentSubjects).each(function(i){
		var direction;
		$(this).find(".subDirection").html()=="借"?direction="1":direction="2";
		var cn=$(this).attr("cn");
		if(i==0 && $(this).attr("cn")!="0"){//当是第一个科目的时候，这就是最近的子科目。
			cn=parseInt($(this).attr("cn"))-1;
		}
		var subject={
			code:$.trim($(this).find(".subCode span").text()),
			direction:direction,
			subjectForm:{id:1},
			subjectType:{id:$(this).attr("typeId")},
			childNumber:cn,
			id:$(this).attr("number"),
			ncye:parseFloat($(this).find(".ncye").val()),
			jflj:parseFloat($(this).find(".jflj").val()),
			dflj:parseFloat($(this).find(".dflj").val()),
			qcye:parseFloat($(this).find(".qcye").val()),
		}
		subjects.push(subject);
	});
	return subjects;
}
function get_parent_subjects(currentRow){
	var currentCode=$.trim(currentRow.find(".subCode span").text());
	var parentRow=new Array();
	var codeLength=currentCode.length;
	var index=0;
	while(codeLength>4){
		codeLength-=2;
		var parentCode=currentCode.substr(0,codeLength);
		$(".row").each(function(){
			if($.trim($(this).find(".subCode span").text())==parentCode){
				parentRow[index]=$(this);
				return false;
			}
		});
		index++;
	}
	return parentRow;
}
function generate_cell(myCell){
	var opt=myCell.attr("class");
	var cell=null;
	switch(opt){
		case "ncye"://年初余额
			cell={
				id:myCell.closest(".row").attr("number"),
				name:1,
				ncye:parseFloat(myCell.val())
			}
			break;
		case "ncsl"://年初数量
			cell={
				id:myCell.closest(".row").attr("number"),
				name:2,
				ncsl:parseFloat(myCell.val())
			}
			break;
		case "jflj"://借方累计
			cell={
				id:myCell.closest(".row").attr("number"),
				name:3,
				jflj:parseFloat(myCell.val())
			}
			break;
		case "jfljsl"://借方累计数量
			cell={
				id:myCell.closest(".row").attr("number"),
				name:4,
				jfljsl:parseFloat(myCell.val())
			}
			break;
		case "dflj"://贷方累计
			cell={
				id:myCell.closest(".row").attr("number"),
				name:5,
				dflj:parseFloat(myCell.val())
			}
			break;
		case "dfljsl"://贷方累计数量
			cell={
				id:myCell.closest(".row").attr("number"),
				name:6,
				dfljsl:parseFloat(myCell.val())
			}
			break;
		case "qcye"://期末余额
			cell={
				id:myCell.closest(".row").attr("number"),
				name:7,
				qcye:parseFloat(myCell.val())
			}
			break;
		case "qmsl"://期末数量
			cell={
				id:myCell.closest(".row").attr("number"),
				name:8,
				qmsl:parseFloat(myCell.val())
			}
			break;
	}
	return cell;
}
// 当需要添加的下级科目的父级科目是库存商品或者主营业务收入或主营业务成本时
// 联动添加新子科目
function linkageCreateSub(sub){
	var nbsp="";
	for(var i=0;i<(($.trim(sub.code+"")).length-4)/2;i++){
		nbsp+="&nbsp;";
	}
	var blankRow=blank.clone(true);
	blankRow.attr("number",sub.id);
	blankRow.find(".subData").eq(0).find("input").val(parseFloat(sub.ncye).toFixed(2));
	blankRow.find(".subData").eq(1).find("input").val(parseFloat(sub.jflj).toFixed(2));
	blankRow.find(".subData").eq(2).find("input").val(parseFloat(sub.dflj).toFixed(2));
	blankRow.find(".subData").eq(3).find("input").val(parseFloat(sub.qcye).toFixed(2));
	blankRow.attr("typeId",sub.subjectType_id);
	blankRow.attr("proto",sub.protoSubject);
	blankRow.attr("ref",sub.referenced);
	blankRow.attr("cn",sub.childNumber);
	blankRow.attr("newCode",sub.code);
	blankRow.find(".subCode").html('<span>'+nbsp+sub.code+'</span><div class="add"></div>');
	blankRow.find(".subName").html('<div class="del"></div><span><input value="'+sub.name+'"></input></span><div class="addUnit" title="启动数量单价式" style="display: none;"></div>');
	//根据科目ID即number找父科目
	$("#gridScroller .row").each(function(){
		var currentSubId=parseInt($(this).attr("number"));
		// 添加时，先找其父科目，再找其最大子科目并在它后面新增
		if(sub.parentId==currentSubId){
			var currentRow=$(this);
			var subjectCode=$.trim(currentRow.find(".subCode span").text());
			var maxNode=null;
			var myRow=currentRow;
			var maxChild=null;
			while(true){
				var myRowCode=$.trim(myRow.find(".subCode span").text());
				if(subjectCode.length==myRowCode.length-2){//最大子科目的编码值
					maxNode=maxChild=myRow;
				}
				if(myRowCode.indexOf(subjectCode)!=0){//最大的子科目的节点
					maxNode=myRow.prev();
					break;
				}
				myRow=myRow.next();
				if(myRow.length==0)break;//如果到了科目表的最后一行，就退出循环。
			}
			currentRow.attr("cn",parseInt(currentRow.attr("cn"))+1);
			if(currentRow.find(".subDirection").html()=="借"){
				blankRow.find(".subDirection").html("借");
			}else{
				blankRow.find(".subDirection").html("贷");
			}
			maxNode.after(blankRow);
		}
	});
}
//删除的当前科目若为成本结转类型为加权平均法的子科目
function linkageDeleteSub(sub){
	//根据当前被删除科目的父科目ID找到与页面中科目ID即number相同的那行删除
	$("#gridScroller .row").each(function(){
		var currentSubId=parseInt($(this).attr("number"));
		// 删除时，根据当前被删除科目ID直接定位找到并移除
		if(sub.id==currentSubId){
			var currentRow=$(this);
			var myRow=currentRow;
			while(true){
				myRow=myRow.prev();
				var itemRowId=parseInt(myRow.attr("number"));
				if(sub.parentId==itemRowId){
					// 先找到它的父科目并使子科目数量("cn")减1
					myRow.attr("cn",parseInt(myRow.attr("cn"))-1);
					break;
				}
			}
			$(this).remove();
			return false;
		}
	});
}
