package com.suolu.service;

import java.util.List;
import java.util.Map;

public interface UserService {

	public List<Map<String, Object>> getUser(String name,String password);

	List<Map<String, Object>> getUserAll();
}
