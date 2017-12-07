package com.suolu.dao;

import java.util.List;
import java.util.Map;

public interface ZxglDao {

	List<Map<String, Object>> getZxglData();

	List<Object[]> getZxglDataBak();

}
