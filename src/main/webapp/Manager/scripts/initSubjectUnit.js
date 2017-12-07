$(function(){
	init_table();
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
	$("#gridScroller").on("change",".subData input",function(){
		var cell=generate_cell($(this));
		doAsynchronousRequest({
			url:"SaveSubjectInitialAmount",
			data:JSON.stringify(cell),
			tip:"保存数据中......",
			mute:true,
			onSuccess:function(){
				layer.msg("保存成功！",{time:1500});
			}
		});
	});
})
var blank=null;
function init_table(){
	blank=$(".row").clone(true);
	$("#gridScroller").html("");
	doAsynchronousRequest({
		url:"getUnitSubject",
		tip:"加载科目数据......",
		mute:true,
		onSuccess:function(data){
			$("#title").html(parent.currentCompany.shortName+"--期初数量");
			if(data[0].id==0){
				$("#gridScroller").html("");
				return false;
			}
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
				subjectRow.find(".subCode").html(tab+this.code);
				subjectRow.find(".subName").html(this.fullName);
				subjectRow.find(".unit").val(this.unit);
				this.direction==1?subjectRow.find(".subDirection").html("借"):subjectRow.find(".subDirection").html("贷");
				subjectRow.find(".ncsl").val(this.ncsl);
				subjectRow.find(".jfljsl").val(this.jfljsl);
				subjectRow.find(".dfljsl").val(this.dfljsl);
				subjectRow.find(".qmsl").val(this.qmsl);
				$("#gridScroller").append(subjectRow);
			});
		}
	});
}
//-------------------------------保存期初数据-----------------------------------
function sava_initial_data(){
	var subjectInitialData=get_subject_data();
	doAsynchronousRequest({
		url:"saveSubject",
		data:JSON.stringify(subjectInitialData),
		tip:"保存数据中......",
		mute:true,
		onSuccess:function(){
			layer.msg("保存成功，初始化完毕！",{time:1500});
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
			ncsl:parseFloat($(this).find(".ncsl").val()),
			jfljsl:parseFloat($(this).find(".jfljsl").val()),
			dfljsl:parseFloat($(this).find(".dfljsl").val()),
			qmsl:parseFloat($(this).find(".qmsl").val())
		}
		subjects.push(subject);
	});
	return subjects;
}
function get_year_date(){
	var time=new Date();
	return time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate();
}
function get_parent_subjects(currentRow){
	var currentCode=$.trim(currentRow.find(".subCode span").text());
	var parentRow=new Array();
	var codeLength=currentCode.length;
	var index=0;
	while(codeLength>4){
		codeLength=codeLength-2;
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
	switch(opt){
		case "ncsl":
			opt=0;
			break;
		case "jfljsl":
			opt=1;
			break;
		case "dfljsl":
			opt=2;
			break;
		case "qmsl":
			opt=3;
			break;
	}
	var cell={
		id:myCell.closest(".row").attr("number"),
		requestNumber:opt,
		value:parseFloat(myCell.val())
	}
	return cell;
}