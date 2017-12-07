package com.suolu.dao;

import java.util.List;
import java.util.Map;

public interface UserDao {

	 List<Map<String, Object>> getUser(Map<String, Object> map);

	public List<Map<String, Object>> getUserAll();

}
