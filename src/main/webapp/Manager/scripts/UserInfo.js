/*
			var currentAccountant=null;
			
			var integer2=0;
			function getInit(integer){
				console.log("integerhaha123165"+integer);
				integer2=integer;
			}
			$(function(){
				$("input:text").click(function(){
					$(this).select();
				});
				
				console.log("integer2function"+integer2);
				init();
				var zoom_param=null;
				$(".center .top .inner").on("mousewheel",function(delta,deltaX,deltaY){	
					zoom_param=zoom_param+deltaX*20;
					var temp_pic=$(this).find("img:visible");
					if(wh_ratio<=1){
						if((zoom_param<original_height)){
							temp_pic.height(original_height);
							zoom_param=original_height;
						}else{
							temp_pic.height(zoom_param);
						}
					}else{
						if((zoom_param<original_width)){
							temp_pic.width(original_width);
							zoom_param=original_width;
						}else{
							temp_pic.width(zoom_param);
						}
					}
					return false;
				});
				//审核会计身份
				$("#audit-idCard").click(function(){
					openNewWindow("identity");
				});
				//初级中级会计资质审核
				$("#audit-qualification").click(function(){
					openNewWindow("accounant");
				});
				//其他会计资格审核
				$("#audit-other-qualification").click(function(){
					openNewWindow("other");
				});
				//图片加载后修正图片的样式
				var original_height=null;
				var original_width=null;
				var wh_ratio=null;
				$(".picture-zoom").load(function(){
					var temp_picture=$(this);
					temp_picture.show();
					$("#picture-detail .inner .loading").remove();
					wh_ratio=temp_picture.width()/temp_picture.height()
					if(wh_ratio>1){
						temp_picture.width(temp_picture.closest(".inner").width()*0.95);
						zoom_param=original_width=temp_picture.width();
						temp_picture.attr("org_width",original_width);
					}else{
						temp_picture.height(temp_picture.closest(".inner").height()*0.95);
						zoom_param=original_height=temp_picture.height();
						temp_picture.attr("org_height",original_height);
					}
				});
				var loadingCounter=0;
				var pictureNumber=0;
				$(".picture-shortcuts").load(function(){
					if((loadingCounter+1)==pictureNumber){
						$(".center .bottom .loading").remove();
						$(this).closest(".scroller-horizontal").show();
						loadingCounter=0;
						pictureNumber=0;
					}else{
						loadingCounter++;
					}
				});
				$(".picture-shortcuts").click(function(){
					$("#picture-detail").find(".picture-zoom:visible").hide();
					$("#picture-detail .inner .loading").remove();
					$(".shortcuts-selected").removeClass("shortcuts-selected");
					$(this).addClass("shortcuts-selected");
					var params=$(this).attr("src").split("/");
					var target=$("#picture-detail").find("#"+params[1]);
					if(target.length==0){
						var pic_model=$("#repository").find(".picture-zoom").clone(true);
						pic_model.attr("id",params[1]);
						pic_model.attr("src","getUserPicture/"+params[1]+"/jpg/2/"+params[4]);
						$("#picture-detail .inner").append($("#repository .loading").clone(true).addClass("loading-detail"));
						$("#picture-detail .inner").append(pic_model);
					}else{
						target.show();
						wh_ratio=target.width()/target.height();
						if(wh_ratio<=1){
							zoom_param=target.height();
							original_height=parseInt(target.attr("org_height"));
						}else{
							zoom_param=target.width();
							original_width=parseInt(target.attr("org_width"));
						}
					}
				});
				//文件夹的点击事件
				$(".folder").click(function(){
					var folder=$(this);
					$(".folder-selected").removeClass("folder-selected");
					folder.addClass("folder-selected");
					$(".center .bottom .scroller-horizontal:visible").hide();
					$("#picture-detail .inner img:visible").hide().closest(".inner").find(".loading").remove();
					var targetId=folder.attr("id");
					var targetBrowser=$(".center .bottom").find("#"+targetId);
					$(".center .bottom .loading").remove();
					if(targetBrowser.length==0){
						var container=$("#picture-browser").clone(true);
						var picture=$("#repository .picture-shortcuts").clone(true)
						container.attr("id",targetId);
						var temp_id=targetId.split("-")[1];
						$(currentAccountant.pictures).each(function(){
							if(this.type==temp_id){
								container.append(picture.clone(true).attr("src","getUserPicture/"+this.name+"/png/2/"+currentAccountant.id))
								pictureNumber++;
							}
						});
						$(".center .bottom").append($("#repository .loading").clone(true).addClass("loading-shortcuts"))
						$(".center .bottom").append(container);
					}else{
						targetBrowser.show();
					}
				});
				$("#proved").click(function(){
					setAccountantStatus("2");
				});
				$("#deny").click(function(){
					setAccountantStatus("3");
				});
			});
			function init(){
				console.log("哈哈 ");
				 currentAccountant 
				currentAccountant={
						id:21
						
					}
				console.log("jingr"+currentAccountant);
				doAsynchronousRequest({
					url:"../accountant/getAddress",
					tip:"加载地址数据......",
					mute:true,
					onSuccess:function(address){
						addressList=address;
						doAsynchronousRequest({
							url:"getTargetAccountant",
							mute:true,
							data:JSON.stringify(currentAccountant),
							onSuccess:function(accountant){
								currentAccountant=accountant;
								console.log(currentAccountant);
								$("#name").val(currentAccountant.name);
								$("#nick-name").val(currentAccountant.nick_name);
								$("#real-name").val(currentAccountant.identityName);
								$("#id-card-number").val(currentAccountant.identityCard);
								$("#email").val(currentAccountant.email);
								$("#years-number").val(currentAccountant.kjcynx+"年");
								$("#zcrq").val(timeFormat(currentAccountant.djrq,"年、月、日"));
								$("#max-company-number").val(currentAccountant.maxCompanyNumber);
								if(currentAccountant.type==null){
									$("#accoutant-type").val(0);
								}else{
									$("#accoutant-type").val(currentAccountant.type);
								}
								var group=$("#repository .folder").clone(true);
								$(currentAccountant.pictures).each(function(){
									if($("#group-"+this.type).length!=0)return true;
									var temp=group.clone(true);
									temp.attr("id","group-"+this.type);
									switch(this.type){
										case "0":
											temp.find(".folder-info .info-row:first").html("用户的头像");
											$("#groups").append(temp);
											break;
										case "1":
											temp.find(".folder-info .info-row:first").html("身份证");
											$("#groups").append(temp);
											break;
										case "2":
											temp.find(".folder-info .info-row:first").html("从业资格证书");
											$("#groups").append(temp);
											break;
										case "3":
											temp.find(".folder-info .info-row:first").html("其他资格证书");
											$("#groups").append(temp);
									}
								});
								var address=getItemName(currentAccountant.provence)+
											"->"+getItemName(currentAccountant.city)+
											"->"+getItemName(currentAccountant.zone);
								$("#address").html(address);
								$("#types").html(getAccountantType(currentAccountant.accountantClass));
								$("#qualification").html(getQualifications(currentAccountant.qualifications));
							}
						});
					}
				});
			}
			var accountantWindow=null;
			var identityWindow=null;
			var otherWindow=null;
			function openNewWindow(flag){
				switch(flag){
					case "identity":
						accountantWindow=getNewWindow("http://id.weixingmap.com",accountantWindow);
						break;
					case "accounant":
						identityWindow=getNewWindow("http://60.208.116.167/pas/querycert.jsp",identityWindow);
						break;
					case "other":
						otherWindow=getNewWindow("http://www.mof.gov.cn/zaixianfuwu/zxcx/",otherWindow);
				}
			}
			function getNewWindow(url,myWindow){
				if(myWindow==null){
					myWindow=open(url);
				}else{
					if(myWindow.closed){
						myWindow=open(url);
					}else{
						myWindow.focus();
					}
				}
				return myWindow;
			}
			function getItemName(targetId){
				var address=getItemById(targetId,"address");
				if(typeof(address) != "undefined" && address.name != undefined){
					return address.name;
				}
				return "";
			}
			function getItemById(targetId,flag){
				var item=null;
				if(flag=="address"){
					$(addressList).each(function(){
						if(this.id==targetId){
							item=this;
							return false;
						}
					});
				}else{
					$(industriesList).each(function(){
						if(this.id==targetId){
							item=this;
							return false;
						}
					});
				}
				if(item==null) pslog("no target element for id="+targetId);
				return item;
			}
			function getAccountantType(types){
				var type_names="";
				var bundery=types.length-1;
				$(types).each(function(i){
					if(bundery==i){
						type_names=type_names+this.name+"。"
					}else{
						type_names=type_names+this.name+"/";
					}
				});
				return type_names;
			}
			function getQualifications(qualifications){
				var qualifcation_list="";
				var bundery=qualifications.length-1;
				$(qualifications).each(function(i){
					if(bundery==i){
						qualifcation_list=qualifcation_list+this.name+"。";
					}else{
						qualifcation_list=qualifcation_list+this.name+"/";
					}
				});
				return qualifcation_list;
			}
			function setAccountantStatus(status){
				var myType=$("#accountant-type").val();
				myType=(myType=="0"||myType=="")?null:myType;
				var message="";
				switch(status){
					case "2":
						doAsynchronousRequest({
							url:"setAccountantUnlock",
							mute:true,
							data:JSON.stringify({id:currentAccountant.id,type:myType}),
							onSuccess:function(){
								switch(currentAccountant.status){
									case "1":
										layer.alert("审核已经通过，请等待企业选择。");
										break;
									case "2":
										layer.alert("补充审核已经通过。");
								}
								parent.frames["accountant"].updateTable(currentAccountant.id);
								parent.$("#tabs").tabs("close","会计信息");
							}
						});
						break;
					case "3":
					case "5":
						switch(currentAccountant.status){
							case "0":
							case "1":
								message="审核未通过。";
								break;
							case "2":
								message="补充审核未通过。";
						}
						layer.open({
							area:["400px"],
							content:$(".textarea-container").html(),
							btn:["提交问题","没有问题"],
							btn1:function(){
								var myMessage=$(".layui-layer-content textarea").val();
								if(myMessage==""){
									myMessage=message;
								}else{
									myMessage=message+"理由："+myMessage;
								}
								doAsynchronousRequest({
									url:"setAccountantlocked",
									mute:true,
									data:JSON.stringify({id:currentAccountant.id,tempMessage:myMessage,type:myType}),
									onSuccess:function(){
										parent.frames["accountant"].updateTable(currentAccountant.id);
										layer.alert("提交成功！",{
											end:function(){
												parent.$("#tabs").tabs("close","会计信息");
											}
										});
									}
								});
							},
							btn2:function(){
								doAsynchronousRequest({
									url:"setAccountantlocked",
									mute:true,
									data:JSON.stringify({id:currentAccountant.id,tempMessage:message,type:myType}),
									onSuccess:function(){
										parent.frames["accountant"].updateTable(currentAccountant.id);
										layer.alert("提交成功！",{
											end:function(){
												parent.$("#tabs").tabs("close","会计信息");
											}
										});
									}
								});
							},
						});
				}
				
			}*/