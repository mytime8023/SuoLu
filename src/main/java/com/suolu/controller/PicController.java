package com.suolu.controller;

import java.util.List;
import java.util.Map;

import org.junit.runners.Parameterized.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.suolu.service.PicServlice;
@Controller
public class PicController {
	@Autowired
	PicServlice picServlice;
	@RequestMapping("/addPic.do")
	@ResponseBody
	public int addPic(@RequestParam String picname,@RequestParam String picadd) {
		
		picServlice.addPic(picname,picadd);
		System.out.println("picname"+picname+"picadd"+picadd);

		return 666;		
	}
	@RequestMapping("/getPic.do")
	@ResponseBody
	public List<Map<String, Object>> getPic(){
		
		List<Map<String, Object>> list=picServlice.getPic();
		return list;
	}
}
