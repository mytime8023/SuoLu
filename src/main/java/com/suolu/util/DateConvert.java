package com.suolu.util;

import java.text.SimpleDateFormat;
import java.util.Date;


public class DateConvert {
	public static String getCurrentTime() {
		SimpleDateFormat df=new SimpleDateFormat("yyyy-MM-dd");
		return df.format(new Date());
	}

}

