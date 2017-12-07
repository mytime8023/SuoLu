package com.suolu.service;

import java.util.List;
import java.util.Map;

public interface ShouKuanService {

	List<Map<String, Object>> getShouKuan();

	List<Map<String, Object>> getCaiWu(String haha, String shouji, String time);

	List<Map<String, Object>> getShouji(String shouji);

	List<Map<String, Object>> getTime(String time);

	int setShuJu(Integer setShu);

	int  addJ(String fahuoshiqi, String kehuname, String shoujihao, String kehuname2, String xiandanshijian,
			String yingshoukuan);

	void addJ(String fahuoshiqi, String kehuname, String shoujihao, String kehuname2, String xiandanshijian,
			String yingshoukuan, String shoukuanshijian);

	List<Map<String, Object>> getFenYe(Integer fenye);

	List<Map<String, Object>> addShuJu();

	List<Map<String, Object>> getTuiHuo(Integer fenye);

	List<Map<String, Object>> editTuiHuo(Integer user_id);

	int addBianJi(String user_id, String thdh);

	List<Map<String, Object>> getTimecx(String aa1, String cc1);

	List<Map<String, Object>> getKeHush();

	int delDingDan(Integer user_id);

	List<Map<String, Object>> getWeiZhuFu(Integer fenye);

}
