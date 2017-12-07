package com.suolu.dao;

import java.util.List;
import java.util.Map;

public interface PicDao {

	//int addPic(String picname, String picname2);

	int addPic(Map<String, Object> map);

	List<Map<String, Object>> getPic();

	
}
