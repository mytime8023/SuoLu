package com.suolu.dao;

import java.util.List;
import java.util.Map;

public interface ShouKuanDao {

	List<Map<String, Object>> getShoukuan();

	List<Map<String, Object>> getCaiWu(String haha,String shouji);

	List<Map<String, Object>> getCaiWu(Map<String, Object> map);

	List<Map<String, Object>> getShouji(Map<String, Object> map);

	List<Map<String, Object>> getTime(String time);

	int setShuJu(Integer setShu);

	void addJ(String fahuoshiqi, String kehuname, String shoujihao, String shoukuanshijian, String xiandanshijian,
			String yingshoukuan);

	int  addJ1(Map<String, Object> map);

	List<Map<String, Object>> getFenYe(Integer fenye);

	void addShuJu1(Map<String, Object> map);

	List<Map<String, Object>> getTuiHuo(Integer fenye);

	List<Map<String, Object>> editTuiHuo(Integer user_id);

	int addBianJi(Map<String, Object> map);

	List<Map<String, Object>> getTimecx(int aa1, int cc1);

	List<Map<String, Object>> getTimecx(Map<String, Object> map);

	List<Map<String, Object>> getKeHush();

	int delDingDan(Integer user_id);

	List<Map<String, Object>> getWeiZhiFu(Integer fenye);




}
