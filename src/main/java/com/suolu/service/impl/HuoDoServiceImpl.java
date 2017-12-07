package com.suolu.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.suolu.dao.HuoDoDao;
import com.suolu.service.HuoDoService;
@Service
public class HuoDoServiceImpl implements HuoDoService {
	@Autowired
	HuoDoDao huoDoDao;
	@Override
	public List<Map<String, Object>> getHuoDoData() {
		// TODO Auto-generated method stub
	List<Map<String, Object>> list=huoDoDao.getHuoDoData();
	for (int i = 0; i < list.size(); i++) {
		list.get(i).get(i);
		System.out.println(list.get(i));
		System.out.println(">>>"+list.get(i).get("name"));
	}
	
	System.out.println("list"+list);
		return list;
	}

}
