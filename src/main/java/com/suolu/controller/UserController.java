package com.suolu.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.http.HttpRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.suolu.controller.TestSSM.EncodingTool;
import com.suolu.service.UserService;


@Controller
public class UserController{
	@Autowired
	UserService userService;
	@RequestMapping("/getUser.do")
	@ResponseBody
	public int getString(HttpServletRequest request,@RequestParam String username,@RequestParam String password){
		//String namebak=EncodingTool.encodeStr(username);
		Map map = new HashMap();
		System.out.println("name"+username+"psw"+password);
		//HttpSession seesion = request.getSession();
		//String vaileString = (String) seesion.getAttribute("key");// 自动生成的验证码
		//if (code.equals(vaileString)) {
			//List<Map<String, Object>> mapbak=userService.getUserAll();
			List<Map<String, Object>> getuser=userService.getUser(username, password);
			if(getuser.size()>0){
				request.getSession().setAttribute("loginUser", getuser);
				return 1;
			}
			else{
				map.put("error", "用户名或者密码错误，请重新输入！");  
				return 0; 
			}
		//}
	}

	@RequestMapping("index.do")
	public String getString(){

		return "pages/common/index";
	}
}
