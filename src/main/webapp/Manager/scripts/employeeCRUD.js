var selected=false;
var currentCompany=null;//当前公司的科目
var currentUser=null;//当前登录的管理员
var localSubjects=null;//当前公司的科目
var subjectList=null;
function clearLocalData(key){
	switch(key){
		case "customer":
			selected=false;
			currentCompany=null;
			localSubjects=null;
			break;
		default:
			layer.msg("请指定要刷新的数据类型。（customer,user,accountant）")
	}
}
function addTab(title,url,name){
	if ($('#tabs').tabs('exists', title)){
		$('#tabs').tabs('select', title);//选中并刷新
		var currTab = $('#tabs').tabs('getSelected');
		var url = $(currTab.panel('options').content).attr('src');
		if(url != undefined && currTab.panel('options').title != 'Home') {
			$('#tabs').tabs('update',{
				tab:currTab,
				options:{
					content:createFrame(url,name==undefined?"myframe":name)
				}
			})
		}
	} else {
		var content = createFrame(url,name==undefined?"myframe":name);
		$('#tabs').tabs('add',{
			title:title,
			content:content,
			closable:true
		});
	}
	tabClose();
}
function createFrame(url,name) {
	var s = '<iframe scrolling="auto" frameborder="0" name="'+name+'" src="'+url+'" style="width:100%;height:99%;"></iframe>';
	return s;
}
		
function tabClose() {
	/*双击关闭TAB选项卡*/
	$(".tabs-inner").dblclick(function(){
		closeTable($(this).children(".tabs-closable").text());
	})
	/*为选项卡绑定右键*/
	$(".tabs-inner").bind('contextmenu',function(e){
		$('#mm').menu('show', {
			left: e.pageX,
			top: e.pageY
		});
		var subtitle =$(this).children(".tabs-closable").text();
		$('#mm').data("currtab",subtitle);
		$('#tabs').tabs('select',subtitle);
		return false;
	});
}		
//绑定右键菜单事件
function tabCloseEven() {
	//刷新
	$('#mm-tabupdate').click(function(){
		var currTab = $('#tabs').tabs('getSelected');
		var url = $(currTab.panel('options').content).attr('src');
		if(url != undefined && currTab.panel('options').title != 'Home') {
			$('#tabs').tabs('update',{
				tab:currTab,
				options:{
					content:createFrame(url,$(".tree-node-selected .tree-title a").attr("id"))
				}
			})
		}
	})
	//关闭当前
	$('#mm-tabclose').click(function(){
		closeTable($("#mm").data(".currTab"));
	})
	//全部关闭
	$('#mm-tabcloseall').click(function(){
		closeAllTabs();
	});
}
var prevPage=null;
function createTab(handler,selected){
	if(prevPage!=null){
		if(handler.attr("src")!=prevPage.attr("src")){
			var title=handler.attr("check");
			if(title=="1"){
				if(!selected){
					if(currentCompany!=null){
						selected=true;
					}else{
						layer.msg("请先选择公司，在进行此操作。",{time:1500});
						prevPage=handler;
						return;
					}
				}
				if(selected){
					var $this = handler;
					var href = $this.attr('src');
					var title = $this.text();
					addTab(title,href,handler.attr("id"));
				}
			}else{
				var $this = handler;
				var href = $this.attr('src');
				var title = $this.text();
				addTab(title,href,handler.attr("id"));
			}
			prevPage=handler;
		}
	}else{
		var title=handler.attr("check");
		if(title=="1"){
			if(!selected){
				if(currentCompany!=null){
					selected=true;
				}else{
					layer.msg("请先选择公司，在进行此操作。",{time:1500});
				}
			}
			if(selected){
				var $this = handler;
				var href = $this.attr('src');
				var title = $this.text();
				addTab(title,href,handler.attr("id"));
			}
		}else{
			var $this = handler;
			var href = $this.attr('src');
			var title = $this.text();
			addTab(title,href,handler.attr("id"));
		}
		prevPage=handler;
	}
}
function initPage(){
	doAsynchronousRequest({
		url:"getCurrentUser",
		tip:"正在获取用户数据...",
		mute:true,
		onSuccess:function(user){
			currentUser=user;
		}
	});
	$('#dd').dialog({
	    modal:true
	});
	$("#xzcbjzlx").click(function(){
		if(currentCompany!=null){
			if(currentCompany.cbjzlx==null){
				layer.confirm("该公司是否需要结转销售成本？",{
					closeBtn:0,
					btn:["需要","不需要"],
					btn1:function(i){
						layer.close(i);
						layer.confirm("请确定该公司的成本结转方式。",{
							closeBtn:0,
							btn:["加权平均法","毛利率结转法","自行结转"],
							btn1:function(index){
								doAsynchronousRequest({
									url:"setCbjzlx",
									data:JSON.stringify({flag:"1"}),
									mute:true,
									onSuccess:function(){
										layer.msg("选择成功！",{time:1500});
										currentCompany.cbjzlx = "1";
									}
								});
								layer.close(index);
							},
							btn2:function(index){
								doAsynchronousRequest({
									url:"setCbjzlx",
									data:JSON.stringify({flag:"2"}),
									mute:true,
									onSuccess:function(){
										layer.msg("选择成功！",{time:1500});
										currentCompany.cbjzlx = "2";
									}
								});
								layer.close(index);
							},
							btn3:function(index){
								doAsynchronousRequest({
									url:"setCbjzlx",
									data:JSON.stringify({flag:"0"}),
									mute:true,
									onSuccess:function(){
										layer.msg("选择成功！",{time:1500});
										currentCompany.cbjzlx = "0";
									}
								});
								layer.close(index);
							}
						});
					},
					btn2:function(i){
						doAsynchronousRequest({
							url:"setCbjzlx",
							data:JSON.stringify({flag:"0"}),
							mute:true,
							onSuccess:function(){
								currentCompany.cbjzlx = "0";
							}
						});
						layer.close(i);
					}
				})
			}
		}
	})
	tabCloseEven();
	//登出
	$("#logout").on("click",function(){
		log_out("../logout",sessionStorage.getItem("login-url"));
	});
	$('.cs-navi-tab').click(function(e) {
		var handler=$(this);
		var check=handler.attr("check");
		if(check=="1"){
			if(selected){
				addTab(handler.text(),handler.attr('src'),handler.attr("id"));
			}else{
				if(currentCompany!=null){
					selected=true;
					$(this).click();
				}else{
					layer.msg("请先选择公司，在进行此操作。",{time:1500});
				}
			}
		}else{
			addTab(handler.text(),handler.attr('src'),handler.attr("id"));
		}
	});
	/*
	$("#checkBill").on("click",function(){
		createTab($(this),selected);
	});
	$("#initSubjects").click(function(){
		createTab($(this),selected);
	});*/
	var themes = {
		'gray' : 'themes/gray/easyui.css',
		'black' : 'themes/black/easyui.css',
		'bootstrap' : 'themes/bootstrap/easyui.css',
		'default' : 'themes/default/easyui.css',
		'metro' : 'themes/metro/easyui.css'
	};
	var skins = $('.li-skinitem span').click(function() {
		var $this = $(this);
		if($this.hasClass('cs-skin-on')) return;
		skins.removeClass('cs-skin-on');
		$this.addClass('cs-skin-on');
		var skin = $this.attr('rel');
		$('#swicth-style').attr('href', themes[skin]);
		setCookie('cs-skin', skin);
		skin == 'dark-hive' ? $('.cs-north-logo').css('color', '#FFFFFF') : $('.cs-north-logo').css('color', '#000000');
	});
	if(getCookie('cs-skin')) {
		var skin = getCookie('cs-skin');
		$('#swicth-style').attr('href', themes[skin]);
		$this = $('.li-skinitem span[rel='+skin+']');
		$this.addClass('cs-skin-on');
		skin == 'dark-hive' ? $('.cs-north-logo').css('color', '#FFFFFF') : $('.cs-north-logo').css('color', '#000000');
	}
	//---------------------------------单据旋转-----------------------------------
	$("#poplayer").click(function(){
		var handler=$(".tabs-panels .panel:visible div iframe").contents();
		var targetBill=$.parseJSON(handler.find("#picInfo").html());
		rotateBill(targetBill,handler);
	});
	$("#dynamicEvents").click(function(){
		var id=$(this).html();
		$("#"+id).click();
	});
}
function closeTable(currtab_title){
	if(currtab_title==undefined)currtab_title=$(".tabs-selected .tabs-closable").text();
	$('#tabs').tabs('close',currtab_title);
}
function closeAllTabs(){
	$('.tabs-inner span').each(function(i,n){
		var t = $(n).text();
		if(t != 'Home') {
			$('#tabs').tabs('close',t);
		}
	});
}
function setCookie(name,value) {//两个参数，一个是cookie的名子，一个是值
    var Days = 30; //此 cookie 将被保存 30 天
    var exp = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getCookie(name) {//取cookies函数        
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
     if(arr != null) return unescape(arr[2]); return null;
}
var url;
function newUser(){
	alert("hello");
	$('#dlg').dialog('open').dialog('setTitle','新用户');
	$('#fm').form('clear');
	url='saveUser';
}
function editUser(){
	var row = $('#UserDg').datagrid('getSelected');
	if (row){
		$('#dlg').dialog('open').dialog('setTitle','修改用户信息');
		$('#fm').form('load',row);
		url ='update';
	}
}
function saveUser(){
	/*$('#fm').form('submit',{
		url: url,
		onSubmit: function(){
			return $(this).form('validate');
		},
		success: function(result){
			var result = eval('('+result+')');
			if (result.success){
				$('#dlg').dialog('close');		// close the dialog
				$('#UserDg').datagrid('reload');	// reload the user data
			} else {
				$.messager.show({
					title: 'Error',
					msg: result.msg
				});
			}
		}
	});*/
	var user = {
			id:$("#id").val(),
			name:$("#name").val(),
			pwd:$("#pwd").val(),
			email:$("#email").val(),
			identityCard:$("#identityCard").val(),
			qq:$("#qq").val(),
			address:$("#address").val(),
			remark:$("#remark").val()
	};
	var json_data = JSON.stringify(user);
	doAsynchronousRequest({
		url:url,
		mute:true,
		data:json_data,
		onSuccess:function(data){
			$('#dlg').dialog('close');
			$('#UserDg').datagrid('reload');
		}
	});
}
function removeUser(){
	var row = $('#UserDg').datagrid('getSelected');
	if (row){
		$.messager.confirm('删除用户','确定要删除该用户？',function(r){
			if (r){
				var ID=row.id;
				alert(ID);
				var data={id:ID};
				var json_data=JSON.stringify(data);
				alert(json_data);
				doAsynchronousRequest({
					url:'delete',
					cover:false,
					mute:true,
					data:json_data,
					onSuccess:function(data){
						if (result.success){
							$('#UserDg').datagrid('reload');	// reload the user data
						} else {
							$.messager.show({	// show error message
								title: 'Error',
								msg: result.msg
							});
						}
					}
				});
			}
		});
	}
}
//------------------------------移动单据展示层------------------------------
function poplayer_move(){
	var _move=false;//移动标记
	var _x,_y;//鼠标离控件左上角的相对位置
	$("#poplayer").mousedown(function(e){
		_move=true;
		_x=e.pageX-parseInt($("#poplayer").offset().left);
		_y=e.pageY-parseInt($("#poplayer").offset().top);
		//$("#treeDiv").fadeTo(20, 0.25);//点击后开始拖动并透明显示
	});
	$(document).mousemove(function(e){
		if(_move){
			var x=e.pageX-_x;//移动时根据鼠标位置计算控件左上角的绝对位置
			var y=e.pageY-_y;
			$("#poplayer").css({top:y,left:x});//控件新位置
		}
	}).mouseup(function(){
			_move=false;
			//$("#treeDiv").fadeTo("fast", 1);//松开鼠标后停止移动并恢复成不透明
	});
}
function save_message(json_obj){
	doAsynchronousRequest({
		url:"saveMessage",
		tip:"正在保存信息...",
		data:JSON.stringify(json_obj),
	});
}
function rotateBill(bill,handler){
	var img = bill.fileName;
	var imgUrl = "getBillImage/"+img+"/png/"+parseInt(Math.random()*100+1);//保证两次请求的url地址不一样
	layer.open({
        type: 2,
        title: '查看单据',
        maxmin: true,
        shade: false,
        area : ['1000px' , '80%'],
        content: 'rotate.htm?tag=image&img='+img,
        success:function(index){
        	layer.setTop(index);
        },
        end:function(){
        	handler.find("#"+bill.id+" img").attr("src",imgUrl);
        }
    });
}
function openCompanyDialog(option){
	var shadow=null;
	if(option.cover=="true"){
		shadow="#000";
	}else{
		shadow=0;
	}
	layer.open({
        type: 2,
        maxmin: true,
        title:"审核公司信息",
        shade:shadow,
        shadeClose: true, //点击遮罩关闭层
        area : ['760px','75%'],
        content: '../commons/companyInformation/informationEditor.htm',
        success:function(index){
        	layer.setTop(index);
        },
        end:function(){
        	$("#DataStorage").html("");
        }
    });
}
//-----------------------------新增卡片弹窗----------------------------------
function addCard(){
	layer.open({
		type: 2,
		title: ['新增卡片','background-color: #f7f7f7;border-bottom: 1px solid #DCDCDC'],
		shadeClose: true,
		shade: 0,
		maxmin: true,
		area: ['650px', '75%' ,'overflow: auto'],
		content: '../commons/cardInput/CardInput.htm',
	});
}
//-----------------------------修改卡片弹窗----------------------------------
function editCard(){
	layer.open({
		type: 2,
		title: ['修改卡片','background-color: #f7f7f7;border-bottom: 1px solid #DCDCDC'],
		shadeClose: true,
		shade: 0,
		maxmin: true,
		area: ['650px', '75%' ,'overflow: auto'],
		content: '../commons/cardInput/CardInput.htm?editCard'
	});
}