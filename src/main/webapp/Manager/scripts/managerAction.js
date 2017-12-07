$(function(){
	$("#login").click(function(){
		login();
	})
	$("#register").click(function(){
		register();
	})
})
function register(){
	var data={
			name:$("#name").val(),
			pwd:$("#pwd").val(),
			email:$("#email").val()
	};
	doAsynchronousRequest({
		url:"../register/manager",
		cover:false,
		mute:true,
		data:JSON.stringify(data),
		onSuccess:function(server){
        	alert(server.response+server.msg+"=====>现在您可以登录了");
        }
	});
}
function login(){
	var data={
		name:$("#name").val(),
		pwd:$("#pwd").val()
	};
	var json_data=JSON.stringify(data);
	doAsynchronousRequest({
		url:"../login/manager",
		cover:false,
		mute:true,
		data:json_data,
		onSuccess:function(server){
			location.href="Usermanagement.html";
        }
	});
}