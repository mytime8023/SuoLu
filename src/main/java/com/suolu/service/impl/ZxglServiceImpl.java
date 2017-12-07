package com.suolu.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.suolu.dao.UserDao;
import com.suolu.dao.ZxglDao;
import com.suolu.service.ZxglService;
@Service
public class ZxglServiceImpl implements ZxglService {
	@Autowired
    private ZxglDao userDao;
	@Override
	public List<Map<String, Object>> getZxglData() {
		// TODO 测试咨询管理
	List<Map<String, Object>> list=userDao.getZxglData();
	System.out.println("list"+list);
	return list;
	}
	@Override
	public List<Object[]> getZxglDataBak() {
		// TODO Auto-generated method stub
		List<Object[]> list=userDao.getZxglDataBak();
		return list;
	}

}
