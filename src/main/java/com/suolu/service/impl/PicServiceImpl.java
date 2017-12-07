package com.suolu.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.suolu.dao.PicDao;
import com.suolu.service.PicServlice;

@Service
public class PicServiceImpl implements PicServlice {
	@Autowired
	PicDao picDao;
	@Override
	public int addPic(String picname, String picadd) {
		// TODO Auto-generated method stub
		Map<String, Object> map=new HashMap<>();
		map.put("picname", picname);
		map.put("sxname", picname);
		map.put("piczz", picname);
		map.put("picadd", picadd);
		/*return shouKuanDao.addJ1(map);*/		
		int pic=picDao.addPic(map);
		System.out.println("pic"+pic);
		return pic;
	}
	@Override
	public List<Map<String, Object>> getPic() {
		// TODO Auto-generated method stub
		List<Map<String, Object>> list=picDao.getPic();
		System.out.println("list>>>"+list);
		return list;
	}

}
