$(function(){
	init();
	var parentId=null;
	$(".item").click(function(){
		var currentitem=$(this);
		currentitem.addClass("selected");
		if(prevItem!=null)prevItem.removeClass("selected");
		prevItem=currentitem;
		var container=currentitem.closest(".cell");
		parentId=parseInt(currentitem.attr("id"));
		var targetContainer=container.next().find(".inner");
		targetContainer.html("");
		var item=$("#repository").find(".item").clone(true);
		switch(container.attr("id")){
			case "topClass":
				$(secondLeveClassList).each(function(){
					if(this.pid==parentId)appendItemsToContainer(item,this,targetContainer);
				});
				break;
			case "middleClass":
				$(thirdLeveClassList).each(function(){
					if(this.pid==parentId)appendItemsToContainer(item,this,targetContainer);
				});
				break;
		}
	});
	$(".addType").click(function(){
		if(parentId!=null){
			var container=$(this).closest(".cell");
			layer.open({
				  title:"新增问题类型",
				  content:$(".dialog").html(),
				  yes:function(dialog,layer){
					  switch(container.attr("id")){
							case "topClass":
								var type={
									className:$(layer).find(".dialogRow").eq(0).find("input").val(),
									pid:0,
									level:1,
									yxbz:"Y"
								}
								saveNewType(type,container.find(".inner"));
								break;
							case "middleClass":
								var type={
									className:$(layer).find(".dialogRow").eq(0).find("input").val(),
									pid:parentId,
									level:2,
									yxbz:"Y"
								}
								saveNewType(type,container.find(".inner"));
								break;
							case "primaryClass":
								var type={
									className:$(layer).find(".dialogRow").eq(0).find("input").val(),
									pid:parentId,
									level:3,
									yxbz:"Y"
								}
								saveNewType(type,container.find(".inner"));
								break;
					 }
				 }
			});
		}else{
			layer.msg("请先选择父类");
		}
	});
	$(".delete").click(function(e){
		e.stopPropagation();
		var item=$(this).closest(".item");
		var container=$(this).closest(".cell");
		var targetId=parseInt(item.attr("id"));
		var find=false;
		switch(container.attr("id")){
			case "topClass":
				$(secondLeveClassList).each(function(){
					if(this.pid==targetId){
						find=true;
						return false;
					}
				});
				if(!find){
					var type={id:targetId,level:1};
					deleteType(type,container.find(".inner"));
				}else{
					layer.msg("该类下面还有其他子项，不能删除。");
				}
				break;
			case "middleClass":
				$(thirdLeveClassList).each(function(){
					if(this.pid==targetId){
						find=true;
						return false;
					}
				});
				if(!find){
					var type={id:targetId,level:2};
					deleteType(type,container.find(".inner"));
				}else{
					layer.msg("该类下面还有其他子项，不能删除。");
				}
				break;
			case "primaryClass":
				var type={id:targetId,level:3};
				deleteType(type,container.find(".inner"));
				break;
		}
		find=false;
	});
	$(".item .context span").click(function(e){
		e.stopPropagation();
		$(this).hide();
		$(this).next().show().focus().val($(this).html());
	});
	$(".item .context input").blur(function(){
		$(this).hide();
		$(this).prev().show().html($(this).val());
	});
	$(".item .context input").change(function(){
		doAsynchronousRequest({
			url:"../commons/ticketSystem/changeTypeProperties",
			data:JSON.stringify({id:$(this).closest(".item").attr("id"),className:$(this).val()}),
		});
	});
});
var prevItem=null;
var firstLeveClassList=new Array();
var secondLeveClassList=new Array();
var thirdLeveClassList=new Array();
function init(){
	doAsynchronousRequest({
		url:"../commons/ticketSystem/getTicketClassTable",
		cover:layer.load(2,{shade:[0.3,'#717991']}),
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
			var container=$("#topClass .inner");
			var item=$("#repository").find(".item").clone(true);
			$(firstLeveClassList).each(function(){
				appendItemsToContainer(item,this,container);
			});
			prevItem=container.find("#1").addClass("selected");
			var target=firstLeveClassList[0].id;
			container=$("#middleClass .inner");
			$(secondLeveClassList).each(function(){
				if(this.pid==target)appendItemsToContainer(item,this,container);
			});
			container.find("#1").addClass("selected");
			target=secondLeveClassList[0].id;
			container=$("#primaryClass .inner");
			$(thirdLeveClassList).each(function(){
				if(this.pid==target)appendItemsToContainer(item,this,container);
			});
			container.find("#1").addClass("selected");
		}
	});
}
function appendItemsToContainer(item,type,container){
	var temp=item.clone(true);
	temp.attr("id",type.id);
	temp.find(".context span").html(type.className);
	container.append(temp);
}
function saveNewType(type,container){
	if(type.className==""){
		layer.msg("类型名称为空，不能保存。");
		return false;
	}
	doAsynchronousRequest({
		url:"../commons/ticketSystem/saveNewType",
		data:JSON.stringify(type),
		tip:"正在保存...",
		onSuccess:function(data){
			appendItemsToContainer($("#repository").find(".item").clone(true),data,container);
			switch(data.level){
				case 1:
					firstLeveClassList.push(data);
					break;
				case 2:
					secondLeveClassList.push(data);
					break;
				case 3:
					thirdLeveClassList.push(data);
					break;
			}
		}
	});
}
function deleteType(type,container){
	doAsynchronousRequest({
		url:"../commons/ticketSystem/deleteType",
		data:JSON.stringify(type),
		mute:true,
		tip:"正在删除...",
		onSuccess:function(){
			var targetId=type.id
			container.find("#"+targetId).remove();
			switch(type.level){
				case 1:
					$(firstLeveClassList).each(function(i){
						if(this.id==targetId){
							firstLeveClassList.splice(i,1);
							return false;
						}
					});
					break;
				case 2:
					$(secondLeveClassList).each(function(i){
						if(this.id==targetId){
							secondLeveClassList.splice(i,1);
							return false;
						}
					});
					break;
				case 3:
					$(thirdLeveClassList).each(function(i){
						if(this.id==targetId){
							thirdLeveClassList.splice(i,1);
							return false;
						}
					});
					break;
			}
		}
	});
}