package com.suolu.controller;

import java.io.StringReader;
import java.io.UnsupportedEncodingException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


import com.suolu.pojo.Coffee;
import com.suolu.service.ShouKuanService;

/**
 * 
 * <p>Title: CaiWuShouKuanController.java<／p>
 * @author lvping
 * 2017年8月2日
 * @version 1.0
 */
@Controller
public class TestSSM {
	@Autowired
	private ShouKuanService shoukuanService;
	/*@Autowired
	private Coffee coffee;*/
	Coffee coffee=new Coffee();
	@RequestMapping("/skid/{skid}")
	@ResponseBody
	public List<Map<String, Object>> getById(@PathVariable long skid) {
		List<Map<String, Object>> list=shoukuanService.getShouKuan();
		return list;	
	}
	@RequestMapping("/getStringBak")
	public String getString(@RequestParam String name){
		System.out.println("这个名字是"+name);
		String namebak=EncodingTool.encodeStr(name);
		return namebak;
	}
	@RequestMapping("/login.html")
	public String getLogin(){
		
		return "redirect:../SuoLu/login.jsp";
	}
	@RequestMapping("/xml")
	public @ResponseBody Coffee getCoffeeinXML(@RequestParam String namebak) throws JAXBException{
		String name=EncodingTool.encodeStr(namebak);
		coffee.setId(1);
		coffee.setName(name);
		coffee.setAddress("四川成都");
		JAXBContext context;  
        try {  
            context = JAXBContext.newInstance(Coffee.class);  
            Marshaller mar = context.createMarshaller();  
            mar.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);  
            mar.setProperty(Marshaller.JAXB_ENCODING, "UTF-8");   
            /*StringWriter writer = new StringWriter();    
            mar.marshal(rc, writer);     
            System.out.println(writer.toString()); */ 
        } catch (JAXBException e) {  
            e.printStackTrace();  
        } 
		return coffee;
	}
	public static class EncodingTool {  
		public static String encodeStr(String str) {  
			try {  
				return new String(str.getBytes("ISO-8859-1"), "UTF-8");  
			} catch (UnsupportedEncodingException e) {  
				e.printStackTrace();  
				return null;  
			}  
		}  
	}
       

	@RequestMapping(value="/getString",produces = "application/json;charset=utf-8")
	@ResponseBody
	public String	getData(){
		System.err.println("进入");
		return "[{'id':15,'name':'张三'},{'id':18,'name':'吕平'}]";
	}
	/*@RequestMapping("/skid/{skid}")
	@ResponseBody
	public static String getAlbumPageData(String code,int p,int pageSize) throws SQLException{
		 String  cKey="Album_"+code+"_"+p+"_"+pageSize;
		 String  result=(String) Cache.get("Album", cKey);
		 if(result==null){
			 result=CourseDao.getCourseListByTopicCode(code,p,pageSize);
			 Cache.put("Album", cKey, result);
		 }
		return result;

	 }*/
}
