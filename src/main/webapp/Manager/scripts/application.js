$(function(){
	var newApp=init();//初始化页面，并且创建一个空白的app对象。
	var statusHandler=null;
	$("#selector").click(function(){
		if($(this).attr("option")=="1"){
			newApp.os=$("#platform").find("option:selected").attr("value");
			newApp.type=$("#appType").find("option:selected").attr("value");
			newApp.versionName=$("#version_name").val();
			newApp.versionCode=$("#version_code").val();
			if(newApp.os==null){
				layer.msg("系统平台必须选择！",{time:1500});
				return false;
			}else if(newApp.type==null){
				layer.msg("应用软件的类型必须选择！",{time:1500});
				return false;
			}else if(newApp.versionName==null){
				layer.msg("应用软件的版本名称必须指定！",{time:1500});
				return false;
			}else if(newApp.versionCode==null){
				layer.msg("应用软件的版本号必须指定！",{time:1500});
				return false;
			}else if(!$.isNumeric(newApp.versionCode)){
				layer.msg("应用软件的版本号必须是整数！",{time:1500});
				return false;
			}
			$("#fileTrigger").click();
		}else{
			console.log("upload app......");
			statusHandler=layer.load(2,{shade:[0.3,'#717991']});
			doAsynchronousRequest({
				url:"saveApplicationVersion",
				cover:false,
				mute:true,
				data:JSON.stringify(newApp),
				onSuccess:function(data){
					$("#selector").attr("option",1);
					//动态改变form的action值，让服务端能从url上获取正确的参数os,type
					$("#uploadPanel").attr("action","uploadApplication/"+newApp.os+"/"+newApp.type+"/"+data);
					newApp=null;
					$("#submit").click();
				},
				onError:function(){
					newApp=init();
					layer.msg("连接错误，请重新上传！",{time:1500});
					layer.close(statusHandler);
				}
			});
		}
	});
	$("#fileTrigger").change(function(){
		var items=$(this).val().split("\\");
		newApp.name=items[items.length-1]
		$("#selector").html("上传文件");
		$("#selector").attr("option",2);
	});
	$("#dialog").click(function(){
		layer.close(statusHandler);
		newApp=init();
		layer.msg("上传成功！",{time:2000});
	});
});
function init(){
	var app={
			os:null,
			type:null,
			versionCode:null,
			versionName:null,
			name:null
		};
	$("#selector").attr("option",1);
	$("#selector").html("选择文件");
	$("#platform").prop("selectedIndex",0);
	$("#appType").prop("selectedIndex",0);
	$("#version_name").val("");
	$("#version_code").val("");
	return app;
}