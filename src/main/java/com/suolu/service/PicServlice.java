package com.suolu.service;

import java.util.List;
import java.util.Map;

public interface PicServlice {

	int addPic(String picname, String picname2);

	List<Map<String, Object>> getPic();

	
}
