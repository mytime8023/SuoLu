package com.suolu.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;

/**
 * 日期公共处理工具类
 * 1、常量的抽取
 * 2、常用公共方法，尽量采用static来修饰
 * @author yu
 *
 */
public class DateUtil {
	//显示年-月-日 时:分:秒
	private final static String FULL_FORMAT="yyyy-MM-dd hh:mm:ss";
	
	//显示年-月-日
	private final static String SIMPLE_FORMAT="yyyy-MM-dd";
	
	/**
	 * 将毫秒转化为年-月-日 时:分:秒格式
	 * @param longTime 毫秒
	 * @return  字符串格式的年-月-日 时:分:秒
	 */
	public static String getLongToString(long longTime){
		SimpleDateFormat sdf=new SimpleDateFormat(FULL_FORMAT);
		return publicMethod(longTime,sdf);
	}
	/**
	 * 将毫秒转化为年-月-日 
	 * @param longTime 毫秒
	 * @return  字符串格式的年-月-日 
	 */
	public static String getLongToSimple(long longTime){
		SimpleDateFormat sdf=new SimpleDateFormat(SIMPLE_FORMAT);
		return publicMethod(longTime,sdf);
	}
	/**
	 * 得到当前的日期字符串  格式为yyyy-MM-dd hh:mm:ss
	 * @return
	 */
	public static String getCurrentTime(){
		Calendar calendar=Calendar.getInstance();
		SimpleDateFormat sdf=new SimpleDateFormat(FULL_FORMAT);
		return sdf.format(calendar.getTime());
	}
	
	private static String publicMethod(long longTime,SimpleDateFormat sdf){
		//将毫秒转化为日期
		Calendar calendar=Calendar.getInstance();
		calendar.setTimeInMillis(longTime);
		return sdf.format(calendar.getTime());
	}
	
	

}
