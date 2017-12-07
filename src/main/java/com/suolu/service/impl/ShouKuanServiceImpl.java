package com.suolu.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.suolu.dao.ShouKuanDao;
import com.suolu.service.ShouKuanService;
@Service
public class ShouKuanServiceImpl implements ShouKuanService {
	@Autowired
	private ShouKuanDao shouKuanDao;
	@Override
	public List<Map<String, Object>> getShouKuan() {
		// TODO Auto-generated method stub
		List<Map<String, Object>> list=shouKuanDao.getShoukuan();
		
		return list;
	}
	@Override
	public List<Map<String, Object>> getCaiWu(String haha, String shouji, String time) {
		// TODO Auto-generated method stub
		Map<String, Object> map=new HashMap<>();
		map.put("haha", haha);
		map.put("shouji", shouji);
		return shouKuanDao.getCaiWu(map);
	}
	@Override
	public List<Map<String, Object>> getShouji(String shouji) {
		// TODO Auto-generated method stub
		Map<String, Object> map=new HashMap<>();
		map.put("shouji", shouji);
		return shouKuanDao.getShouji(map);
	}
	@Override
	public List<Map<String, Object>> getTime(String time) {
		// TODO Auto-generated method stub
		return shouKuanDao.getTime(time);
	}
	@Override
	public int setShuJu(Integer setShu) {
		// TODO Auto-generated method stub
		return shouKuanDao.setShuJu(setShu);
	}
	@Override
	public int  addJ(String fahuoshiqi, String kehuname, String shoujihao, String shoukuanshijian, String xiandanshijian,
			String yingshoukuan) {
		// TODO Auto-generated method stub
				Map<String, Object> map=new HashMap<>();
				map.put("fahuoshiqi", fahuoshiqi);
				map.put("kehuname", kehuname);
				map.put("shoujihao", shoujihao);
				map.put("shoukuanshijian", shoukuanshijian);
				map.put("xiandanshijian", xiandanshijian);
				map.put("yingshoukuan", yingshoukuan);
				return shouKuanDao.addJ1(map);
		
		
		/*shouKuanDao.addJ(fahuoshiqi,kehuname,shoujihao,xiandanshijian,yingshoukuan,shoukuanshijian);*/
		
	}
	@Override
	public void addJ(String fahuoshiqi, String kehuname, String shoujihao, String kehuname2, String xiandanshijian,
			String yingshoukuan, String shoukuanshijian) {
		// TODO Auto-generated method stub
		
	}
	@Override
	public List<Map<String, Object>> getFenYe(Integer fenye) {
		// TODO Auto-generated method stub
		List<Map<String, Object>> list=shouKuanDao.getFenYe(fenye);
		return list;
	}
	
		
	@Override
	public List<Map<String, Object>> addShuJu() {
		
		Map<String, Object> map=new HashMap<>();
		for (int i = 0; i <= 5000; i++) {
		map.put("kehuname", "张三"+i);
		map.put("original_price", "5"+i);
		map.put("mnemonic_code", "ZHUJIMA"+i);
		map.put("goods_order", "1"+i);
		map.put("goods_unit", "斤");
		map.put("min_order_amount", "10");
		map.put("goods_scale", "50/斤,满1件送货");
		map.put("stock_price", "5"+i);
		map.put("onlybuy_amount", "0");
		map.put("up_down_shelf", "0");
		map.put("common_price", "50");
		map.put("silver_price", "40");
		map.put("gold_price", "30");
		map.put("purchase_stock", "0");
		map.put("rest_amount", "10"+i);
		map.put("unit_Convert", "0");
		map.put("goods_code", "1"+i);
		map.put("on_sale_status", "0");
		map.put("description", "用最低的价格买最好的牛肉");
		shouKuanDao.addShuJu1(map);
		}
		
		return null;
	}
	@Override
	public List<Map<String, Object>> getTuiHuo(Integer fenye) {
		// TODO Auto-generated method stub
		List<Map<String, Object>> list=shouKuanDao.getTuiHuo(fenye);
			System.out.println("list"+list);
		return list;
		
	}
	@Override
	public List<Map<String, Object>> editTuiHuo(Integer user_id) {
		// TODO Auto-generated method stub
		
				List<Map<String, Object>> list =shouKuanDao.editTuiHuo(user_id);
				System.out.println("listedit"+list);
				return list;
	
	}
	@Override
	public int addBianJi(String user_id,String thdh) {
		// TODO Auto-generated method stub
		Map<String, Object> map=new HashMap<>();
		map.put("user_id", user_id);
		map.put("thdh", thdh);
		
		int a=shouKuanDao.addBianJi(map);
		System.out.println("a"+a);
		return a;
	}
	@Override
	public List<Map<String, Object>> getTimecx(String aa1, String cc1) {
		Map<String, Object> map=new HashMap<>();
		map.put("aa", aa1);
		map.put("cc", cc1);
		
		List<Map<String, Object>> list=shouKuanDao.getTimecx(map);
		System.out.println("list......."+list);
		return  list;
	}
	@Override
	public List<Map<String, Object>> getKeHush() {
		// TODO Auto-generated method stub
		
		List<Map<String, Object>> list=shouKuanDao.getKeHush();
		System.out.println("进入到"+list);
		return list;
	}
	@Override
	public int  delDingDan(Integer user_id) {
		// TODO Auto-generated method stub
		return shouKuanDao.delDingDan(user_id);
	}
	@Override
	public List<Map<String, Object>> getWeiZhuFu(Integer fenye) {
		// TODO Auto-generated method stub
		List<Map<String, Object>> list=shouKuanDao.getWeiZhiFu(fenye);
		System.out.println("getWeiZhuFu+list"+list);
		return list;
	}
	}
