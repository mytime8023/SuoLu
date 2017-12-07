package com.suolu.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.suolu.dao.UserDao;
import com.suolu.service.UserService;
@Service
public class UserServiceImpl implements UserService {
	@Autowired
    private UserDao userDao;
	public List<Map<String, Object>> getUser(String name, String password) {
		Map<String,Object> map = new HashMap<>();
		map.put("username", name);
		map.put("password", password);
		return userDao.getUser(map);	
	}
	@Override
	public List<Map<String, Object>> getUserAll() {
		// TODO Auto-generated method stub
		return userDao.getUserAll();
	}

}
