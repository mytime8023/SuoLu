package com.suolu.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.suolu.service.HuoDoService;

@Controller
public class HuoDoController {
	@Autowired
	HuoDoService huoDoService;
	@RequestMapping("/getHuoDoData.do")
	@ResponseBody
	public List<Map<String, Object>> getHuoDoData() {
		System.out.println("进入到活动数据");
	List<Map<String, Object>> list=huoDoService.getHuoDoData();
		return list;
	}
}
