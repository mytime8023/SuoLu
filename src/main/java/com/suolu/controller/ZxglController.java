package com.suolu.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.suolu.service.ZxglService;
@Controller
public class ZxglController {
	@Autowired
	ZxglService zxglService;
	@RequestMapping("/getZxgl.do")
	@ResponseBody
	public List<Map<String, Object>> getZxgliList(){
		System.out.println(">>>");
		List<Map<String, Object>> list=zxglService.getZxglData();
		return list;
	}
}
